import { Client } from 'minio';
import NodeCache from 'node-cache';

// Initialize MinIO client
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

// Local cache for metadata and frequently accessed data
export const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default TTL
  checkperiod: 60, // Check for expired keys every minute
  useClones: false,
});

// Cache for file metadata
export const fileMetadataCache = new NodeCache({
  stdTTL: 600, // 10 minutes for file metadata
  checkperiod: 120,
  useClones: false,
});

// Cache for thumbnails and processed images
export const mediaCache = new NodeCache({
  stdTTL: 1800, // 30 minutes for media files
  checkperiod: 300,
  useClones: false,
});

// Bucket names for different content types
export const BUCKETS = {
  CAMP_RESOURCES: 'camp-resources',
  USER_UPLOADS: 'user-uploads',
  THUMBNAILS: 'thumbnails',
  PROCESSED_MEDIA: 'processed-media',
  ASSIGNMENTS: 'assignments',
} as const;

// Initialize MinIO buckets
export async function initializeBuckets() {
  try {
    for (const bucket of Object.values(BUCKETS)) {
      const exists = await minioClient.bucketExists(bucket);
      if (!exists) {
        await minioClient.makeBucket(bucket);
        console.log(`Created MinIO bucket: ${bucket}`);
      }
    }
    console.log('MinIO buckets initialized successfully');
  } catch (error) {
    console.error('Error initializing MinIO buckets:', error);
    throw error;
  }
}

// File storage service
export class FileStorageService {
  
  async uploadFile(
    bucketName: string,
    objectName: string,
    buffer: Buffer,
    metadata?: Record<string, string>
  ): Promise<string> {
    try {
      const uploadInfo = await minioClient.putObject(
        bucketName,
        objectName,
        buffer,
        buffer.length,
        metadata
      );

      // Cache file metadata
      const fileInfo = {
        bucket: bucketName,
        object: objectName,
        size: buffer.length,
        etag: uploadInfo.etag,
        uploadedAt: new Date().toISOString(),
        metadata,
      };
      
      fileMetadataCache.set(`${bucketName}:${objectName}`, fileInfo);
      
      return uploadInfo.etag;
    } catch (error) {
      console.error('Error uploading file to MinIO:', error);
      throw error;
    }
  }

  async getFile(bucketName: string, objectName: string): Promise<Buffer> {
    try {
      // Check cache first
      const cacheKey = `${bucketName}:${objectName}`;
      const cachedFile = mediaCache.get<Buffer>(cacheKey);
      if (cachedFile) {
        return cachedFile;
      }

      // Fetch from MinIO
      const stream = await minioClient.getObject(bucketName, objectName);
      const chunks: Buffer[] = [];
      
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          // Cache the file for future requests
          mediaCache.set(cacheKey, buffer);
          resolve(buffer);
        });
        stream.on('error', reject);
      });
    } catch (error) {
      console.error('Error getting file from MinIO:', error);
      throw error;
    }
  }

  async generatePresignedUrl(
    bucketName: string,
    objectName: string,
    expiry: number = 3600
  ): Promise<string> {
    try {
      return await minioClient.presignedGetObject(bucketName, objectName, expiry);
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw error;
    }
  }

  async deleteFile(bucketName: string, objectName: string): Promise<void> {
    try {
      await minioClient.removeObject(bucketName, objectName);
      
      // Remove from caches
      const cacheKey = `${bucketName}:${objectName}`;
      fileMetadataCache.del(cacheKey);
      mediaCache.del(cacheKey);
    } catch (error) {
      console.error('Error deleting file from MinIO:', error);
      throw error;
    }
  }
}

export const fileStorage = new FileStorageService();
export default minioClient;
