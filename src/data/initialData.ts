import { Property, Unit, Tenant, Due, Payment, Expense, Complaint, Announcement, DocumentVaultItem, UserRole } from '../types/property';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'Sunrise PG & Co-Living',
    address: '4th Block, Koramangala',
    city: 'Bengaluru',
    unitsCount: 24,
    photo: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    expectedRent: 320000,
    collectedThisMonth: 245000,
    duesThisMonth: 75000,
    todayCollection: 28000,
    totalDuesAllTime: 112000,
    vacantUnitsCount: 3,
    occupiedUnitsCount: 21,
    pendingComplaintsCount: 3,
    agingBreakdown: {
      d0_30: 45000,
      d30_60: 42000,
      d60_plus: 25000
    }
  },
  {
    id: 'prop-2',
    name: 'Green Villa Apartments',
    address: '100ft Road, Indiranagar',
    city: 'Bengaluru',
    unitsCount: 12,
    photo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    expectedRent: 480000,
    collectedThisMonth: 410000,
    duesThisMonth: 70000,
    todayCollection: 45000,
    totalDuesAllTime: 70000,
    vacantUnitsCount: 2,
    occupiedUnitsCount: 10,
    pendingComplaintsCount: 1,
    agingBreakdown: {
      d0_30: 50000,
      d30_60: 20000,
      d60_plus: 0
    }
  },
  {
    id: 'prop-3',
    name: 'Royal Heights Suites',
    address: 'Sector 3, HSR Layout',
    city: 'Bengaluru',
    unitsCount: 16,
    photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    expectedRent: 640000,
    collectedThisMonth: 580000,
    duesThisMonth: 60000,
    todayCollection: 0,
    totalDuesAllTime: 60000,
    vacantUnitsCount: 1,
    occupiedUnitsCount: 15,
    pendingComplaintsCount: 2,
    agingBreakdown: {
      d0_30: 40000,
      d30_60: 20000,
      d60_plus: 0
    }
  },
  {
    id: 'prop-4',
    name: 'Palms Student Residence',
    address: 'EPIP Zone, Whitefield',
    city: 'Bengaluru',
    unitsCount: 30,
    photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    expectedRent: 360000,
    collectedThisMonth: 290000,
    duesThisMonth: 70000,
    todayCollection: 14000,
    totalDuesAllTime: 148000,
    vacantUnitsCount: 2,
    occupiedUnitsCount: 28,
    pendingComplaintsCount: 4,
    agingBreakdown: {
      d0_30: 58000,
      d30_60: 45000,
      d60_plus: 45000
    }
  }
];

export const INITIAL_UNITS: Unit[] = [
  // Sunrise PG
  { id: 'u-101', propertyId: 'prop-1', unitNumber: 'Room 101-A', status: 'occupied', rentAmount: 14000, tenantId: 't-101', tenantName: 'Aarav Sharma' },
  { id: 'u-102', propertyId: 'prop-1', unitNumber: 'Room 101-B', status: 'occupied', rentAmount: 14000, tenantId: 't-102', tenantName: 'Rohan Verma' },
  { id: 'u-103', propertyId: 'prop-1', unitNumber: 'Room 102-A', status: 'vacant', rentAmount: 13500, daysVacant: 14 },
  { id: 'u-104', propertyId: 'prop-1', unitNumber: 'Room 102-B', status: 'notice_period', rentAmount: 13500, tenantId: 't-104', tenantName: 'Priya Nair' },
  { id: 'u-105', propertyId: 'prop-1', unitNumber: 'Room 201-A', status: 'occupied', rentAmount: 15000, tenantId: 't-105', tenantName: 'Vikram Patel' },
  { id: 'u-106', propertyId: 'prop-1', unitNumber: 'Room 202-A', status: 'vacant', rentAmount: 15000, daysVacant: 8 },

  // Green Villa
  { id: 'u-201', propertyId: 'prop-2', unitNumber: 'Flat 101 (2BHK)', status: 'occupied', rentAmount: 40000, tenantId: 't-201', tenantName: 'Siddharth Rao' },
  { id: 'u-202', propertyId: 'prop-2', unitNumber: 'Flat 102 (2BHK)', status: 'occupied', rentAmount: 40000, tenantId: 't-202', tenantName: 'Ananya Roy' },
  { id: 'u-203', propertyId: 'prop-2', unitNumber: 'Flat 201 (3BHK)', status: 'vacant', rentAmount: 55000, daysVacant: 22 },

  // Royal Heights
  { id: 'u-301', propertyId: 'prop-3', unitNumber: 'Penthouse 401', status: 'occupied', rentAmount: 65000, tenantId: 't-301', tenantName: 'Kabir Mehta' },
  { id: 'u-302', propertyId: 'prop-3', unitNumber: 'Suite 302', status: 'occupied', rentAmount: 45000, tenantId: 't-302', tenantName: 'Divya Iyer' },

  // Palms Residence
  { id: 'u-401', propertyId: 'prop-4', unitNumber: 'Block A-04', status: 'occupied', rentAmount: 12000, tenantId: 't-401', tenantName: 'Neha Deshmukh' },
  { id: 'u-402', propertyId: 'prop-4', unitNumber: 'Block A-05', status: 'vacant', rentAmount: 12000, daysVacant: 5 }
];

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 't-101',
    unitId: 'u-101',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    unitNumber: 'Room 101-A',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    kycVerified: true,
    kycDocType: 'Aadhaar Card',
    leaseStart: '2025-09-01',
    leaseEnd: '2026-08-31',
    depositAmount: 28000,
    monthlyRent: 14000,
    duesStatus: 'paid',
    outstandingDueAmount: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2025-09-01'
  },
  {
    id: 't-102',
    unitId: 'u-102',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    unitNumber: 'Room 101-B',
    name: 'Rohan Verma',
    phone: '+91 98123 45678',
    email: 'rohan.v@example.com',
    kycVerified: true,
    kycDocType: 'PAN Card',
    leaseStart: '2025-10-15',
    leaseEnd: '2026-10-14',
    depositAmount: 28000,
    monthlyRent: 14000,
    duesStatus: 'overdue',
    outstandingDueAmount: 28000,
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2025-10-15'
  },
  {
    id: 't-104',
    unitId: 'u-104',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    unitNumber: 'Room 102-B',
    name: 'Priya Nair',
    phone: '+91 97444 33221',
    email: 'priya.nair@example.com',
    kycVerified: true,
    kycDocType: 'Passport',
    leaseStart: '2025-06-01',
    leaseEnd: '2026-08-31',
    depositAmount: 27000,
    monthlyRent: 13500,
    duesStatus: 'partial',
    outstandingDueAmount: 6500,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2025-06-01'
  },
  {
    id: 't-201',
    unitId: 'u-201',
    propertyId: 'prop-2',
    propertyName: 'Green Villa',
    unitNumber: 'Flat 101',
    name: 'Siddharth Rao',
    phone: '+91 99001 12233',
    email: 'siddharth.rao@example.com',
    kycVerified: true,
    kycDocType: 'Aadhaar Card',
    leaseStart: '2025-01-01',
    leaseEnd: '2026-12-31',
    depositAmount: 120000,
    monthlyRent: 40000,
    duesStatus: 'paid',
    outstandingDueAmount: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2025-01-01'
  },
  {
    id: 't-301',
    unitId: 'u-301',
    propertyId: 'prop-3',
    propertyName: 'Royal Heights',
    unitNumber: 'Penthouse 401',
    name: 'Kabir Mehta',
    phone: '+91 98888 77766',
    email: 'kabir.m@example.com',
    kycVerified: true,
    kycDocType: 'Aadhaar Card',
    leaseStart: '2025-04-01',
    leaseEnd: '2027-03-31',
    depositAmount: 200000,
    monthlyRent: 65000,
    duesStatus: 'overdue',
    outstandingDueAmount: 65000,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2025-04-01'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-101',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    unitNumber: 'Room 101-B',
    category: 'Plumbing',
    priority: 'Urgent',
    status: 'Open',
    description: 'Bathroom flush pipe leaking continuously onto the floor.',
    reportedByTenant: 'Rohan Verma',
    createdAt: '2026-08-05T14:30:00Z',
    assignedTo: 'Ramesh (Plumber)'
  },
  {
    id: 'comp-102',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    unitNumber: 'Room 201-A',
    category: 'Electrical',
    priority: 'Medium',
    status: 'In Progress',
    description: 'Main ceiling light flickering in the bedroom.',
    reportedByTenant: 'Vikram Patel',
    createdAt: '2026-08-04T09:15:00Z',
    assignedTo: 'Suresh (Electrician)'
  },
  {
    id: 'comp-103',
    propertyId: 'prop-4',
    propertyName: 'Palms Student Residence',
    unitNumber: 'Block A-04',
    category: 'Internet',
    priority: 'Urgent',
    status: 'Open',
    description: 'Wi-Fi router on 2nd floor loses connection every evening.',
    reportedByTenant: 'Neha Deshmukh',
    createdAt: '2026-08-05T18:00:00Z'
  },
  {
    id: 'comp-104',
    propertyId: 'prop-2',
    propertyName: 'Green Villa',
    unitNumber: 'Flat 102',
    category: 'Appliance',
    priority: 'Low',
    status: 'Resolved',
    description: 'Kitchen water purifier filter replacement requested.',
    reportedByTenant: 'Ananya Roy',
    createdAt: '2026-08-02T11:00:00Z',
    assignedTo: 'Urban Company Tech'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    category: 'Electricity & Diesel',
    amount: 18500,
    date: '2026-08-03',
    note: 'Generator diesel fill (250 Liters) + BESCOM power bill'
  },
  {
    id: 'exp-2',
    propertyId: 'prop-2',
    propertyName: 'Green Villa',
    category: 'Maintenance',
    amount: 12000,
    date: '2026-08-01',
    note: 'Lift monthly AMC servicing & safety inspection'
  },
  {
    id: 'exp-3',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    category: 'Water & Plumbing',
    amount: 8400,
    date: '2026-08-04',
    note: '3 Water Tankers (12,000L total)'
  },
  {
    id: 'exp-4',
    propertyId: 'prop-3',
    propertyName: 'Royal Heights',
    category: 'Salaries',
    amount: 35000,
    date: '2026-08-01',
    note: 'Security Guard + Housekeeping staff salary'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    scope: 'all',
    title: 'Scheduled Water Tank Cleaning',
    message: 'Water supply will be temporarily turned off on Saturday between 10 AM - 2 PM across all properties for overhead tank sanitization.',
    scheduledAt: '2026-08-08 10:00 AM',
    createdAt: '2026-08-04T10:00:00Z',
    channel: 'In-App & WhatsApp',
    deliveryStatus: 'Sent'
  },
  {
    id: 'ann-2',
    scope: 'property',
    targetPropertyIds: ['prop-1'],
    title: 'Koramangala High-Speed Wi-Fi Upgrade',
    message: 'New 1 Gbps Fiber connection is installed! Connect to Sunrise_5G with the updated security code.',
    scheduledAt: '2026-08-05 06:00 PM',
    createdAt: '2026-08-05T08:00:00Z',
    channel: 'In-App & WhatsApp',
    deliveryStatus: 'Sent'
  }
];

export const INITIAL_DOCUMENTS: DocumentVaultItem[] = [
  {
    id: 'doc-1',
    propertyId: 'prop-1',
    tenantId: 't-101',
    title: 'Rental Agreement - Aarav Sharma',
    category: 'Lease Agreement',
    fileSize: '2.4 MB',
    uploadedAt: '2025-09-01',
    url: '#'
  },
  {
    id: 'doc-2',
    propertyId: 'prop-1',
    tenantId: 't-101',
    title: 'Aadhaar Verification - Aarav Sharma',
    category: 'KYC Doc',
    fileSize: '1.1 MB',
    uploadedAt: '2025-09-01',
    url: '#'
  },
  {
    id: 'doc-3',
    propertyId: 'prop-2',
    title: 'Property Tax Receipt FY 2025-26',
    category: 'Property Tax',
    fileSize: '3.8 MB',
    uploadedAt: '2025-04-10',
    url: '#'
  }
];

export const INITIAL_USERS: UserRole[] = [
  { id: 'usr-1', name: 'Utpal (Owner)', email: 'owner@proppulse.com', role: 'owner', propertiesScope: ['all'] },
  { id: 'usr-2', name: 'Rajesh Kumar (Koramangala Manager)', email: 'rajesh@proppulse.com', role: 'manager', propertiesScope: ['prop-1'] },
  { id: 'usr-3', name: 'Sanjay Gupta (CA / Accountant)', email: 'sanjay.ca@example.com', role: 'accountant', propertiesScope: ['all'] }
];
