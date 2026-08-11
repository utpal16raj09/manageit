import React, { createContext, useContext, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Property,
  Unit,
  Tenant,
  Payment,
  Expense,
  Complaint,
  Announcement,
  DocumentVaultItem,
  UserRole
} from '../types/property';
import {
  INITIAL_PROPERTIES,
  INITIAL_UNITS,
  INITIAL_TENANTS,
  INITIAL_COMPLAINTS,
  INITIAL_EXPENSES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_DOCUMENTS,
  INITIAL_USERS
} from '../data/initialData';

export type TabType = 'landing' | 'dashboard' | 'properties' | 'complaints' | 'more' | 'help' | 'settings';

interface PropertyContextType {
  // Navigation & Filtering
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Modals & Drawers
  isQuickAddOpen: boolean;
  setIsQuickAddOpen: (open: boolean) => void;
  isTenantQROpen: boolean;
  setIsTenantQROpen: (open: boolean) => void;
  isAgingModalOpen: boolean;
  setIsAgingModalOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isAIChatOpen: boolean;
  setIsAIChatOpen: (open: boolean) => void;
  selectedReceiptPayment: Payment | null;
  setSelectedReceiptPayment: (payment: Payment | null) => void;
  
  // Collections & Lists
  properties: Property[];
  units: Unit[];
  tenants: Tenant[];
  complaints: Complaint[];
  expenses: Expense[];
  announcements: Announcement[];
  documents: DocumentVaultItem[];
  users: UserRole[];
  payments: Payment[];

  // Aggregated Money & Metrics based on selectedPropertyId filter
  filteredMetrics: {
    todayCollection: number;
    duesThisMonth: number;
    collectedThisMonth: number;
    expectedRent: number;
    totalDuesAllTime: number;
    vacantUnitsCount: number;
    occupiedUnitsCount: number;
    totalUnitsCount: number;
    pendingComplaintsCount: number;
    occupancyRatePct: number;
    collectionEfficiencyPct: number;
    agingBreakdown: {
      d0_30: number;
      d30_60: number;
      d60_plus: number;
    };
  };

  // Actions
  recordPayment: (payment: Omit<Payment, 'id' | 'receiptNumber'>) => void;
  addTenant: (tenantData: Omit<Tenant, 'id' | 'duesStatus' | 'outstandingDueAmount'> & { emergencyContactName: string; emergencyContactPhone: string; kycDocUrl: string }) => void;
  addComplaint: (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status']) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'propertyName'>) => void;
  addBulkExpense: (data: { propertyIds: string[]; category: Expense['category']; amount: number; note: string }) => void;
  addBulkDues: (data: { propertyIds: string[]; dueName: string; amount: number }) => void;
  sendAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'deliveryStatus'>) => void;

  // Offline Simulator
  isOffline: boolean;
  toggleOffline: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isTenantQROpen, setIsTenantQROpen] = useState(false);
  const [isAgingModalOpen, setIsAgingModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState<Payment | null>(null);

  const [isOffline, setIsOffline] = useState(false);

  // Entities (Initialized empty/mock, will be hydrated by DB)
  const [properties, setProperties] = useState<Property[]>([]);
  const [units, setUnits] = useState<Unit[]>(INITIAL_UNITS);
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [documents] = useState<DocumentVaultItem[]>(INITIAL_DOCUMENTS);
  const [users] = useState<UserRole[]>(INITIAL_USERS);
  const [authToken, setAuthToken] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchLiveDbData = async () => {
      try {
        // 1. Dev login to get our site manager token
        const authRes = await fetch('http://localhost:3001/api/auth/dev-login');
        if (!authRes.ok) throw new Error('Auth failed');
        const authData = await authRes.json();
        const token = authData.token;
        setAuthToken(token);

        // 2. Fetch assigned locations from Postgres via Express API
        const locRes = await fetch('http://localhost:3001/api/locations', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const liveLocations = await locRes.json();
        
        let allUnits: Unit[] = [];
        let allTenants: Tenant[] = [];

        // 3. Fetch occupancy for each location and map to Frontend expected state
        const mappedProps: Property[] = await Promise.all(liveLocations.map(async (loc: any) => {
          const occRes = await fetch(`http://localhost:3001/api/locations/${loc.id}/occupancy`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (!occRes.ok) return {
            id: loc.id, name: loc.name, address: loc.address || loc.city,
            unitsCount: 0, occupiedUnitsCount: 0, vacantUnitsCount: 0,
            todayCollection: 0, duesThisMonth: 0, collectedThisMonth: 0, expectedRent: 0,
            totalDuesAllTime: 0, pendingComplaintsCount: 0, agingBreakdown: { d0_30: 0, d30_60: 0, d60_plus: 0 }
          };

          const occData = await occRes.json();
          let unitsCount = 0;
          let occupiedUnitsCount = 0;

          // Map rooms/beds to units
          occData.roomTypes?.forEach((rt: any) => {
            rt.rooms?.forEach((room: any) => {
              room.beds?.forEach((bed: any) => {
                unitsCount++;
                const isOccupied = bed.status === 'OCCUPIED';
                if (isOccupied) occupiedUnitsCount++;

                allUnits.push({
                  id: bed.id,
                  propertyId: loc.id,
                  unitNumber: bed.bedNumber,
                  type: rt.name,
                  status: isOccupied ? 'occupied' : 'vacant',
                  tenantId: bed.tenant?.id,
                  tenantName: bed.tenant?.user?.name,
                  rentAmount: rt.basePrice,
                  features: []
                });

                if (bed.tenant) {
                  allTenants.push({
                    id: bed.tenant.id,
                    name: bed.tenant.user?.name || 'Unknown',
                    phone: bed.tenant.phone || '',
                    email: bed.tenant.user?.email || '',
                    propertyId: loc.id,
                    unitId: bed.id,
                    moveInDate: bed.tenant.leaseStart?.split('T')[0] || '',
                    monthlyRent: bed.tenant.monthlyRent,
                    outstandingDueAmount: 0,
                    duesStatus: 'paid',
                    kycVerified: bed.tenant.kycVerified,
                    avatarUrl: bed.tenant.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                  });
                }
              });
            });
          });

          return {
            id: loc.id,
            name: loc.name,
            address: loc.address || loc.city,
            unitsCount,
            occupiedUnitsCount,
            vacantUnitsCount: unitsCount - occupiedUnitsCount,
            todayCollection: 0,
            duesThisMonth: 14000,
            collectedThisMonth: 0,
            expectedRent: 14000,
            totalDuesAllTime: 14000,
            pendingComplaintsCount: 0,
            agingBreakdown: { d0_30: 14000, d30_60: 0, d60_plus: 0 }
          };
        }));

        setProperties(mappedProps);
        setUnits(allUnits.length > 0 ? allUnits : INITIAL_UNITS);
        setTenants(allTenants.length > 0 ? allTenants : INITIAL_TENANTS);
        
        if (mappedProps.length > 0) {
          setSelectedPropertyId(mappedProps[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch from DB API:', err);
        // Fallback to initial data if backend isn't running yet
        setProperties(INITIAL_PROPERTIES);
      }
    };
    fetchLiveDbData();
  }, []);
  
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 'pay-1',
      dueId: 'due-101',
      tenantId: 't-101',
      tenantName: 'Aarav Sharma',
      propertyId: 'prop-1',
      propertyName: 'Sunrise PG',
      unitNumber: 'Room 101-A',
      amount: 14000,
      method: 'UPI',
      date: new Date().toISOString().split('T')[0],
      receiptNumber: 'REC-2026-0801',
      notes: 'Monthly rent paid via GPay'
    },
    {
      id: 'pay-2',
      dueId: 'due-201',
      tenantId: 't-201',
      tenantName: 'Siddharth Rao',
      propertyId: 'prop-2',
      propertyName: 'Green Villa',
      unitNumber: 'Flat 101',
      amount: 40000,
      method: 'Bank Transfer',
      date: new Date().toISOString().split('T')[0],
      receiptNumber: 'REC-2026-0802',
      notes: 'August rent NEFT transfer'
    }
  ]);

  // Compute aggregated stats dynamically based on selectedPropertyId filter
  const filteredMetrics = useMemo(() => {
    const activeProps = selectedPropertyId === 'all'
      ? properties
      : properties.filter(p => p.id === selectedPropertyId);

    const todayCollection = activeProps.reduce((sum, p) => sum + p.todayCollection, 0);
    const duesThisMonth = activeProps.reduce((sum, p) => sum + p.duesThisMonth, 0);
    const collectedThisMonth = activeProps.reduce((sum, p) => sum + p.collectedThisMonth, 0);
    const expectedRent = activeProps.reduce((sum, p) => sum + p.expectedRent, 0);
    const totalDuesAllTime = activeProps.reduce((sum, p) => sum + p.totalDuesAllTime, 0);
    const vacantUnitsCount = activeProps.reduce((sum, p) => sum + p.vacantUnitsCount, 0);
    const occupiedUnitsCount = activeProps.reduce((sum, p) => sum + p.occupiedUnitsCount, 0);
    const totalUnitsCount = activeProps.reduce((sum, p) => sum + p.unitsCount, 0);

    const activeComplaints = selectedPropertyId === 'all'
      ? complaints.filter(c => c.status !== 'Resolved')
      : complaints.filter(c => c.propertyId === selectedPropertyId && c.status !== 'Resolved');

    const pendingComplaintsCount = activeComplaints.length;

    const d0_30 = activeProps.reduce((sum, p) => sum + p.agingBreakdown.d0_30, 0);
    const d30_60 = activeProps.reduce((sum, p) => sum + p.agingBreakdown.d30_60, 0);
    const d60_plus = activeProps.reduce((sum, p) => sum + p.agingBreakdown.d60_plus, 0);

    const occupancyRatePct = totalUnitsCount > 0
      ? Math.round((occupiedUnitsCount / totalUnitsCount) * 100)
      : 0;

    const collectionEfficiencyPct = expectedRent > 0
      ? Math.round((collectedThisMonth / expectedRent) * 100)
      : 0;

    return {
      todayCollection,
      duesThisMonth,
      collectedThisMonth,
      expectedRent,
      totalDuesAllTime,
      vacantUnitsCount,
      occupiedUnitsCount,
      totalUnitsCount,
      pendingComplaintsCount,
      occupancyRatePct,
      collectionEfficiencyPct,
      agingBreakdown: {
        d0_30,
        d30_60,
        d60_plus
      }
    };
  }, [selectedPropertyId, properties, complaints]);

  // Action implementations
  const recordPayment = (paymentData: Omit<Payment, 'id' | 'receiptNumber'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      receiptNumber: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update Property metrics
    setProperties(prev => prev.map(p => {
      if (p.id === paymentData.propertyId) {
        const newCollected = p.collectedThisMonth + paymentData.amount;
        const newDues = Math.max(0, p.duesThisMonth - paymentData.amount);
        const newTotalDues = Math.max(0, p.totalDuesAllTime - paymentData.amount);
        return {
          ...p,
          todayCollection: p.todayCollection + paymentData.amount,
          collectedThisMonth: newCollected,
          duesThisMonth: newDues,
          totalDuesAllTime: newTotalDues
        };
      }
      return p;
    }));

    // Update Tenant status
    setTenants(prev => prev.map(t => {
      if (t.id === paymentData.tenantId) {
        const remDue = Math.max(0, t.outstandingDueAmount - paymentData.amount);
        return {
          ...t,
          outstandingDueAmount: remDue,
          duesStatus: remDue === 0 ? 'paid' : 'partial'
        };
      }
      return t;
    }));

    // Launch celebratory confetti effect!
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.75 }
    });

    // Auto open receipt preview
    setSelectedReceiptPayment(newPayment);
  };

  const addTenant = async (tenantData: Omit<Tenant, 'id' | 'duesStatus' | 'outstandingDueAmount'> & { emergencyContactName: string; emergencyContactPhone: string; kycDocUrl: string }) => {
    try {
      if (authToken) {
        const res = await fetch('http://localhost:3001/api/tenants/move-in', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            locationId: tenantData.propertyId,
            bedId: tenantData.unitId,
            email: tenantData.email,
            name: tenantData.name,
            phone: tenantData.phone,
            depositAmount: tenantData.depositAmount,
            monthlyRent: tenantData.monthlyRent,
            leaseStart: tenantData.moveInDate,
            leaseEnd: '2027-08-01',
            emergencyContactName: tenantData.emergencyContactName,
            emergencyContactPhone: tenantData.emergencyContactPhone,
            kycDocUrl: tenantData.kycDocUrl
          })
        });

        if (res.status === 409) {
          alert('Error: Bed is already occupied! Double booking prevented by Postgres.');
          return;
        }
        if (!res.ok) throw new Error('Failed to move in via DB');
      }

      // Optimistically update UI
      const newTenant: Tenant = {
        ...tenantData,
        id: `t-${Date.now()}`,
        duesStatus: 'paid',
        outstandingDueAmount: 0
      };

      setTenants(prev => [newTenant, ...prev]);

      // Update Unit status
      setUnits(prev => prev.map(u => {
        if (u.id === tenantData.unitId) {
          return {
            ...u,
            status: 'occupied',
            tenantId: newTenant.id,
            tenantName: newTenant.name
          };
        }
        return u;
      }));

      // Update Property counters
      setProperties(prev => prev.map(p => {
        if (p.id === tenantData.propertyId) {
          return {
            ...p,
            occupiedUnitsCount: p.occupiedUnitsCount + 1,
            vacantUnitsCount: Math.max(0, p.vacantUnitsCount - 1)
          };
        }
        return p;
      }));
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend.');
    }
  };

  const addComplaint = (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: `comp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Open'
    };

    setComplaints(prev => [newComplaint, ...prev]);

    setProperties(prev => prev.map(p => {
      if (p.id === complaintData.propertyId) {
        return {
          ...p,
          pendingComplaintsCount: p.pendingComplaintsCount + 1
        };
      }
      return p;
    }));
  };

  const updateComplaintStatus = (id: string, newStatus: Complaint['status']) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'propertyName'>) => {
    const targetProp = properties.find(p => p.id === expenseData.propertyId);
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      propertyName: targetProp?.name || 'Property'
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const addBulkExpense = ({ propertyIds, category, amount, note }: { propertyIds: string[]; category: Expense['category']; amount: number; note: string }) => {
    const batchId = `batch-${Date.now()}`;
    const splitAmount = Math.round(amount / propertyIds.length);

    const newExpenses: Expense[] = propertyIds.map(propId => {
      const prop = properties.find(p => p.id === propId);
      return {
        id: `exp-${Math.random()}`,
        propertyId: propId,
        propertyName: prop?.name || 'Property',
        category,
        amount: splitAmount,
        date: new Date().toISOString().split('T')[0],
        note: `[Bulk Split] ${note}`,
        bulkBatchId: batchId
      };
    });

    setExpenses(prev => [...newExpenses, ...prev]);
  };

  const addBulkDues = ({ propertyIds, dueName, amount }: { propertyIds: string[]; dueName: string; amount: number }) => {
    setProperties(prev => prev.map(p => {
      if (propertyIds.includes(p.id)) {
        return {
          ...p,
          duesThisMonth: p.duesThisMonth + amount * p.occupiedUnitsCount,
          totalDuesAllTime: p.totalDuesAllTime + amount * p.occupiedUnitsCount
        };
      }
      return p;
    }));

    setTenants(prev => prev.map(t => {
      if (propertyIds.includes(t.propertyId)) {
        const newDue = t.outstandingDueAmount + amount;
        return {
          ...t,
          outstandingDueAmount: newDue,
          duesStatus: 'overdue'
        };
      }
      return t;
    }));
  };

  const sendAnnouncement = (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'deliveryStatus'>) => {
    const newAnn: Announcement = {
      ...announcementData,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString(),
      deliveryStatus: 'Sent'
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const toggleOffline = () => {
    setIsOffline(prev => !prev);
  };

  return (
    <PropertyContext.Provider
      value={{
        selectedPropertyId,
        setSelectedPropertyId,
        activeTab,
        setActiveTab,
        isQuickAddOpen,
        setIsQuickAddOpen,
        isTenantQROpen,
        setIsTenantQROpen,
        isAgingModalOpen,
        setIsAgingModalOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isAIChatOpen,
        setIsAIChatOpen,
        selectedReceiptPayment,
        setSelectedReceiptPayment,
        properties,
        units,
        tenants,
        complaints,
        expenses,
        announcements,
        documents,
        users,
        payments,
        filteredMetrics,
        recordPayment,
        addTenant,
        addComplaint,
        updateComplaintStatus,
        addExpense,
        addBulkExpense,
        addBulkDues,
        sendAnnouncement,
        isOffline,
        toggleOffline
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
