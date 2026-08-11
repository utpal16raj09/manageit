import fs from 'fs';
import path from 'path';

// Storage abstraction interface
export interface StorageProvider {
  uploadFile(file: Express.Multer.File): Promise<string>;
}

// Local disk storage implementation (for development)
export class LocalDiskStorage implements StorageProvider {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`;
    const destinationPath = path.join(this.uploadDir, filename);

    // If using multer with memoryStorage, file.buffer contains the data
    // If using diskStorage, this method might just need to return the URL,
    // but assuming memory storage here to mimic Cloudflare R2 direct stream.
    if (file.buffer) {
      await fs.promises.writeFile(destinationPath, file.buffer);
    } else {
      // If multer already saved it (e.g. diskStorage), we could just rename/move it
      // but let's assume buffer is provided.
      throw new Error('File buffer is empty');
    }

    // Return the public URL
    return `/uploads/${filename}`;
  }
}

// Future: CloudflareR2Storage class would be added here

// Export the active storage provider based on environment
// For now, always use local disk
export const storage = new LocalDiskStorage();
