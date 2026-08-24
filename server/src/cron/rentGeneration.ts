import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const initRentGenerationCron = () => {
  // Run on the 1st of every month at 00:00
  cron.schedule('0 0 1 * *', async () => {
    console.log('Running monthly rent generation cron job...');
    
    try {
      // Determine the start of the current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      // Fetch active tenants who haven't received an invoice this month
      const activeTenants = await prisma.tenant.findMany({
        where: {
          bedId: { not: null }, // Actively occupying a bed
          invoices: {
            none: {
              createdAt: {
                gte: startOfMonth
              }
            }
          }
        },
        include: {
          bed: {
            include: {
              room: {
                include: {
                  roomType: true
                }
              }
            }
          }
        }
      });

      for (const tenant of activeTenants) {
        if (!tenant.bed || !tenant.bed.room) continue;
        
        // Fallback to room type base price if tenant's monthlyRent is not set
        const amountDue = tenant.monthlyRent || tenant.bed.room.roomType.basePrice;
        
        // Due date is 5th of the current month
        const dueDate = new Date();
        dueDate.setDate(5);
        dueDate.setHours(23, 59, 59, 999);
        
        await prisma.invoice.create({
          data: {
            tenantId: tenant.id,
            amountDue,
            dueDate
          }
        });
      }
      
      console.log(`Successfully generated rent invoices for ${activeTenants.length} tenants.`);
    } catch (error) {
      console.error('Error in rent generation cron:', error);
    }
  });
};
