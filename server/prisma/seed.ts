import { UserRole } from '@prisma/client';
import { prisma } from '../src/db';

async function main() {
  console.log('Clearing database...');
  await prisma.tenant.deleteMany();
  await prisma.bed.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.siteManagerAssignment.deleteMany();
  await prisma.execManagerAssignment.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating users...');
  const owner = await prisma.user.create({
    data: {
      email: 'owner@proppulse.com',
      name: 'Utpal (Owner)',
      role: UserRole.OWNER,
      passwordHash: 'hashed_password_mock',
    }
  });

  const execManager1 = await prisma.user.create({
    data: {
      email: 'exec1@proppulse.com',
      name: 'Rajesh (Exec Manager)',
      role: UserRole.EXEC_MANAGER,
      passwordHash: 'hashed_password_mock',
    }
  });

  const siteManager1 = await prisma.user.create({
    data: {
      email: 'site1@proppulse.com',
      name: 'Suresh (Site Manager)',
      role: UserRole.SITE_MANAGER,
      passwordHash: 'hashed_password_mock',
    }
  });

  console.log('Creating assignments...');
  await prisma.execManagerAssignment.create({
    data: {
      execManagerId: execManager1.id,
      siteManagerId: siteManager1.id,
    }
  });

  console.log('Creating locations...');
  const location1 = await prisma.location.create({
    data: {
      name: 'Sunrise PG & Co-Living',
      address: '4th Block, Koramangala',
      city: 'Bengaluru',
    }
  });

  await prisma.siteManagerAssignment.create({
    data: {
      siteManagerId: siteManager1.id,
      locationId: location1.id,
    }
  });

  console.log('Creating room types, rooms, and beds...');
  const doubleSharing = await prisma.roomType.create({
    data: {
      name: 'Double Sharing',
      locationId: location1.id,
      basePrice: 14000,
    }
  });

  const room101 = await prisma.room.create({
    data: {
      roomNumber: '101',
      locationId: location1.id,
      roomTypeId: doubleSharing.id,
    }
  });

  const bedA = await prisma.bed.create({
    data: {
      bedNumber: 'A',
      roomId: room101.id,
      status: 'OCCUPIED',
    }
  });

  const bedB = await prisma.bed.create({
    data: {
      bedNumber: 'B',
      roomId: room101.id,
      status: 'VACANT',
    }
  });

  console.log('Creating tenants...');
  const tenantUser = await prisma.user.create({
    data: {
      email: 'aarav@example.com',
      name: 'Aarav Sharma',
      role: UserRole.TENANT,
      passwordHash: 'hashed_password_mock',
    }
  });

  await prisma.tenant.create({
    data: {
      userId: tenantUser.id,
      bedId: bedA.id,
      phone: '+91 98765 43210',
      kycVerified: true,
      kycDocType: 'Aadhaar Card',
      leaseStart: new Date('2025-09-01'),
      leaseEnd: new Date('2026-08-31'),
      depositAmount: 28000,
      monthlyRent: 14000,
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
