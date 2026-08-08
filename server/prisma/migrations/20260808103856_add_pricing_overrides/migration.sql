-- CreateTable
CREATE TABLE "LocationRoomPricing" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "roomTypeId" TEXT NOT NULL,
    "overridePrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationRoomPricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationRoomPricing_locationId_roomTypeId_key" ON "LocationRoomPricing"("locationId", "roomTypeId");

-- AddForeignKey
ALTER TABLE "LocationRoomPricing" ADD CONSTRAINT "LocationRoomPricing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationRoomPricing" ADD CONSTRAINT "LocationRoomPricing_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
