export type UnitStatus = 'vacant' | 'occupied' | 'notice_period';
export type DueStatus = 'paid' | 'partial' | 'overdue';
export type AgingBucket = '0_30' | '30_60' | '60_plus';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  unitsCount: number;
  photo: string;
  expectedRent: number;
  collectedThisMonth: number;
  duesThisMonth: number;
  todayCollection: number;
  totalDuesAllTime: number;
  vacantUnitsCount: number;
  occupiedUnitsCount: number;
  pendingComplaintsCount: number;
  agingBreakdown: {
    d0_30: number;
    d30_60: number;
    d60_plus: number;
  };
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string; // e.g. "Room 101" or "Flat 4B"
  status: UnitStatus;
  rentAmount: number;
  daysVacant?: number;
  tenantId?: string;
  tenantName?: string;
}

export interface Tenant {
  id: string;
  unitId: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  name: string;
  phone: string;
  email: string;
  kycVerified: boolean;
  kycDocType?: string;
  leaseStart: string;
  leaseEnd: string;
  depositAmount: number;
  monthlyRent: number;
  duesStatus: DueStatus;
  outstandingDueAmount: number;
  avatarUrl: string;
  joinedDate: string;
}

export interface Due {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  month: string;
  year: number;
  expectedAmount: number;
  paidAmount: number;
  status: 'unpaid' | 'partial' | 'paid';
  dueDate: string;
  daysOverdue: number;
  agingCategory: AgingBucket;
}

export interface Payment {
  id: string;
  dueId: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  amount: number;
  method: 'UPI' | 'Cash' | 'Bank Transfer' | 'Card';
  date: string;
  receiptNumber: string;
  notes?: string;
}

export interface Expense {
  id: string;
  propertyId: string;
  propertyName: string;
  category: 'Maintenance' | 'Electricity & Diesel' | 'Water & Plumbing' | 'Salaries' | 'Internet' | 'Other';
  amount: number;
  date: string;
  note: string;
  bulkBatchId?: string;
  receiptImage?: string;
}

export interface Complaint {
  id: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  category: 'Electrical' | 'Plumbing' | 'Carpentry' | 'Appliance' | 'Internet' | 'Security';
  priority: 'Urgent' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  description: string;
  photoUrl?: string;
  assignedTo?: string;
  createdAt: string;
  reportedByTenant: string;
}

export interface Announcement {
  id: string;
  scope: 'all' | 'property' | 'tenant';
  targetPropertyIds?: string[];
  targetTenantIds?: string[];
  title: string;
  message: string;
  scheduledAt: string;
  createdAt: string;
  channel: 'In-App & WhatsApp' | 'SMS & WhatsApp' | 'In-App Only';
  deliveryStatus: 'Sent' | 'Scheduled';
}

export interface DocumentVaultItem {
  id: string;
  propertyId: string;
  tenantId?: string;
  title: string;
  category: 'Lease Agreement' | 'KYC Doc' | 'Maintenance Bill' | 'Property Tax' | 'Insurance';
  fileSize: string;
  uploadedAt: string;
  url: string;
}

export interface UserRole {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'accountant';
  propertiesScope: string[]; // 'all' or property IDs
}
