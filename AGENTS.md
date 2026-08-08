# PG Management System — Agent Context

## What this is
A multi-location PG (paying guest) management system for a client operating 15+ locations
in Bangalore. Three user-facing surfaces + a shared backend.

## Current state (as of last update)
- React + TypeScript + Vite, Tailwind CSS
- State via React Context (`PropertyContext.tsx`)
- Views: Dashboard, Properties, Complaints, More, etc. — sidebar + bottom nav
- Modals: QuickAddSheet, TenantQRModal, ReceiptModal, etc.
- Hardcoded data in `src/data/initialData.ts`, modeled around Properties and Units
- Indian context already present: cities (Bengaluru), KYC types (Aadhaar, PAN),
  expenses (BESCOM, Water Tankers)
- DB plan: Neon (Postgres, serverless) + custom Node.js/Express backend
  (NOTE: PlanetScale was considered and dropped — discontinued free tier / product
  transition, not a good bet to build against right now)

## User roles & hierarchy (IMPORTANT — model this correctly from the start)
Multi-instance hierarchy, not a single fixed tree:

- **Owner** — top level, monitoring approach not yet defined by client
- **Executive Manager** — multiple exist, each oversees a cluster of ~5 Site Managers
- **Site Manager** — onsite caretaker, non-tech-savvy, scoped to 1+ locations
- **Tenant** — end user of the tenant portal

Model as separate assignment/join tables, NOT a manager_id column on users directly:
- `exec_manager_assignments`
- `site_manager_assignments` (site_manager_id, exec_manager_id)
- `location_assignments` (site_manager_id, property_id)

This allows reassignment/handover flexibility without schema migrations.

## Quota / performance tracking — DO NOT HARDCODE
Owner hasn't decided what "quota" means yet (occupancy %, leads converted, complaint
resolution time, etc). Model as a generic:
`targets` table (site_manager_id, metric_type, target_value, period)
so the metric definition can change without a rebuild.

## Three main sections (+ 2 new admin layers)
1. **Public website / lead capture** — ads → website/WhatsApp/chatbot → token payment to reserve
2. **Tenant portal** — lease info, payments, tickets/complaints, referral program
3. **Site Manager (admin) panel** — occupancy, rent collection, expenses, tickets, staff —
   built for NON-technical users, keep UI simple
4. **Executive Manager panel** (NEW) — oversight dashboard for their assigned site managers'
   performance/quota, drill into individual site manager's locations
5. **Owner / super-admin dashboard** — cross-location reporting, spending analytics
   (visual breakdowns first, AI-driven optimization insights later), sales pipeline,
   access control

## Key architectural decisions already made
- Pricing/policy model: global defaults + per-location overrides (not duplicated config
  per location) — e.g. `location_room_pricing` table only stores rows that DIFFER from
  base template
- Location-scoped access control must be baked into the query layer early, not bolted on
  later — a bug here leaks tenant data across PG locations
- Referral reward type (cash/discount vs points) — NOT decided yet, don't hardcode
- Token payment refund policy — owner-configurable, not a fixed global rule

## Integrations planned
- Razorpay — rent + token/reservation payments
- WhatsApp Business API (via BSP — Gupshup/AiSensy/Interakt, TBD) — rent reminders,
  lead follow-up sequences, notices
- Claude API — lead qualification, FAQ bot (rule-based FAQ first, live AI chat later)
- Meta Graph API — Instagram/Facebook lead ads
- Google Calendar API — visit scheduling

## Open questions (do not silently resolve these — flag if blocked)
- Referral reward structure
- Token payment refund policy (global vs per-location)
- Visitor log — in scope or not
- Owner's own monitoring/access pattern — not yet specified by client
- Whether Exec Manager has edit/override power over Site Managers, or read-only oversight

## How to work
- Build module by module, not everything at once
- Confirm schema/architecture decisions match this doc before large refactors
- If a new feature request conflicts with something documented here, flag it rather
  than quietly changing direction

## Decisions Made During Build
*(Agent: append a short entry here whenever you make a real architectural/schema choice
that isn't already specified above. Format: date, decision, why.)*

-

---

## Milestones

Each milestone lists: what "done" means, common mistakes AI agents make at this stage
specifically, and what to manually verify before moving on. Do not mark a milestone
complete just because the code runs without errors — check the "definition of done"
list explicitly.

### M1 — Data model & auth foundation
**Scope:** Prisma schema (Locations, RoomTypes, Rooms/Beds, Tenants, Users + role/
assignment tables, Targets), auth with roles, location-scoping middleware.

**Common agent bugs at this stage:**
- Puts `manager_id` directly on the `users` table instead of using join tables —
  breaks the multi-exec-manager structure the first time reassignment is needed
- Implements location-scoping in the UI/frontend only, not in the query layer —
  looks correct in testing, leaks data the moment someone calls the API directly
- Hardcodes the pricing override pattern as duplicated rows per location instead of
  default + override — works fine until location 12 needs a special case
- Skips migrations and edits the DB schema by hand / via `db push` repeatedly,
  leaving no reproducible migration history
- Uses `role` as a free-text string instead of an enum — allows typos like
  "site_manger" to silently create a broken permission

**Definition of done:**
- [ ] Every table from this doc exists with correct relations, not just the obvious ones
- [ ] A site manager account genuinely cannot fetch another location's data via
      direct API call (not just hidden in UI) — test this manually
- [ ] Migration files exist and are committed, not just an ad-hoc schema push
- [ ] Seed script can rebuild a working dev DB from scratch

### M2 — Occupancy & tenant management (Site Manager panel core)
**Scope:** Room/bed CRUD, move-in/move-out flow, tenant profile + KYC upload.

**Common agent bugs at this stage:**
- Builds a UI that's technically functional but dense/cluttered — remember this
  panel is for non-technical users; agents default to "admin dashboard" patterns
  (dense tables, many icons) rather than simple guided flows
- Move-out doesn't actually free up the bed/room status — occupancy count drifts
  from reality over time
- KYC file uploads stored directly in the database as blobs instead of object
  storage (S3/R2) with just a reference URL in the DB
- No validation preventing double-booking the same bed

**Definition of done:**
- [ ] A non-technical tester (not you) can complete move-in and move-out without
      explanation
- [ ] Occupancy dashboard numbers match actual bed status after a full move-in/
      move-out cycle
- [ ] Uploaded documents are in object storage, DB only holds references
- [ ] Attempting to assign an already-occupied bed is blocked with a clear error

### M3 — Payments (rent + token reservation)
**Scope:** Recurring rent generation, Razorpay integration, payment history/receipts,
overdue tracking, token/reservation payment on the public site.

**Common agent bugs at this stage:**
- Trusts the client-side "payment successful" callback instead of verifying via
  Razorpay webhook — this is the classic mistake, and it's exploitable (fake success)
- Recurring rent generation cron double-fires or skips a month on edge-of-month
  timing bugs
- No idempotency key on payment creation — a network retry double-charges a tenant
- Overdue calculation uses wall-clock "days since due" without accounting for
  partial payments, so a tenant who paid half still shows as fully overdue

**Definition of done:**
- [ ] Payment status is only ever marked "successful" after webhook confirmation,
      never from frontend response alone
- [ ] Duplicate payment attempts (e.g. double-click, retry) don't double-charge
- [ ] Rent generation tested across a month boundary (e.g. 28/30/31-day months)
- [ ] Partial payments correctly reduce the overdue amount, not just flip a boolean

### M4 — Communication (WhatsApp/SMS reminders, notices)
**Scope:** Rent due reminders, lead follow-up sequence, announcements.

**Common agent bugs at this stage:**
- Sends marketing-category messages for what should be utility-category (reminders)
  — inflates cost ~7x per the pricing we discussed, and agents won't know this
  distinction unless told
- No rate limiting / dedup — a cron misfire sends the same reminder 10 times
- Hardcodes message templates in code instead of making them editable, so every
  wording tweak needs a redeploy

**Definition of done:**
- [ ] Rent reminders are confirmed to use Utility template category, not Marketing
- [ ] A reminder job re-run (e.g. after a crash/restart) does not resend already-sent
      messages for the same period
- [ ] Message templates are stored data, not hardcoded strings

### M5 — Tickets, referrals, exec manager oversight panel
**Scope:** Complaint/ticket system, referral tracking, Executive Manager dashboard.

**Common agent bugs at this stage:**
- Referral reward logic hardcoded as a fixed amount before the client has actually
  decided the reward type — flagged as an open question in this doc, don't let the
  agent quietly pick one
- Exec Manager panel shows ALL site managers instead of only the ones assigned to
  that specific exec manager (same class of bug as location-scoping in M1)
- Ticket status transitions aren't logged/auditable — no way to see who resolved
  what, when

**Definition of done:**
- [ ] Referral reward amount/type is read from config, not hardcoded, and clearly
      marked as pending client decision if not yet set
- [ ] Exec Manager A cannot see Exec Manager B's site managers — test with two
      real accounts, not just one
- [ ] Ticket history shows a full audit trail (created → assigned → resolved, with
      timestamps and actor)

### M6 — Owner dashboard & spending analytics
**Scope:** Cross-location reporting, spending breakdowns (visual first), sales pipeline.

**Common agent bugs at this stage:**
- Aggregates expenses without normalizing per-tenant or per-bed, so a 200-bed
  location "looks worse" than a 20-bed location purely on raw totals, not efficiency
- Dashboard queries run unindexed full-table scans across all 15 locations' history —
  fine in dev with sample data, slow in production
- AI-optimization-suggestion feature (phase 2) gets built before the visual
  breakdowns (phase 1) are validated with the client — reread the phasing above

**Definition of done:**
- [ ] Location comparisons include normalized metrics (cost per bed / per tenant),
      not just raw totals
- [ ] Dashboard load time is acceptable with realistic data volume, not just 3 test rows
- [ ] Visual/manual analytics ship and get client sign-off before any AI-generated
      insight feature is started