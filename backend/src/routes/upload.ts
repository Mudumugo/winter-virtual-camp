import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { fileStorage, BUCKETS } from '../storage/minioClient';
import { isAuthenticated, requireRole } from './auth';
import { randomUUID } from 'crypto';
import { logger } from '../utils/logger';

const router = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter for allowed file types
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    // Images
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    // Documents
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain', 'text/csv',
    // Video
    'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm',
    // Audio
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 5, // Maximum 5 files per upload
  },
});

router.post('/camp-resource',
  isAuthenticated,
  requireRole(['admin', 'instructor']),
  upload.single('file'),
  async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileId = randomUUID();
      const fileName = `${fileId}-${req.file.originalname}`;
      
      const metadata = {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        uploadedBy: req.session.user.id,
        uploadedAt: new Date().toISOString(),
        fileId,
      };

      // Upload original file
      await fileStorage.uploadFile(
        BUCKETS.CAMP_RESOURCES,
        fileName,
        req.file.buffer,
        metadata
      );

      const fileUrl = await fileStorage.generatePresignedUrl(
        BUCKETS.CAMP_RESOURCES,
        fileName
      );

      let thumbnailUrl = null;

      // Generate thumbnail for images
      if (req.file.mimetype.startsWith('image/')) {
        try {
          const thumbnail = await sharp(req.file.buffer)
            .resize(300, 300, { fit: 'cover', position: 'center' })
            .jpeg({ quality: 70 })
            .toBuffer();

          const thumbnailName = `thumb-${fileName}`;
          
          await fileStorage.uploadFile(
            BUCKETS.THUMBNAILS,
            thumbnailName,
            thumbnail,
            { ...metadata, type: 'thumbnail' }
          );

          thumbnailUrl = await fileStorage.generatePresignedUrl(
            BUCKETS.THUMBNAILS,
            thumbnailName
          );
        } catch (error) {
          logger.error('Error generating thumbnail:', error);
        }
      }

      logger.info(`File uploaded: ${req.file.originalname} by ${req.session.user.email}`);

      res.json({
        success: true,
        file: {
          id: fileId,
          originalName: req.file.originalname,
          url: fileUrl,
          thumbnailUrl,
          mimeType: req.file.mimetype,
          size: req.file.size,
        },
      });
    } catch (error) {
      logger.error('Error uploading file:', error);
      res.status(500).json({ error: 'File upload failed' });
    }
  }
);

router.post('/profile-image',
  isAuthenticated,
  upload.single('image'),
  async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }

      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Only image files are allowed' });
      }

      const userId = req.session.user.id;
      const fileId = randomUUID();
      const fileName = `${userId}/profile/${fileId}-${req.file.originalname}`;
      
      const processedImage = await sharp(req.file.buffer)
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 80 })
        .toBuffer();

      const metadata = {
        originalName: req.file.originalname,
        mimeType: 'image/jpeg',
        uploadedBy: userId,
        uploadedAt: new Date().toISOString(),
        fileId,
        type: 'profile-image',
      };

      await fileStorage.uploadFile(
        BUCKETS.USER_UPLOADS,
        fileName,
        processedImage,
        metadata
      );

      const imageUrl = await fileStorage.generatePresignedUrl(
        BUCKETS.USER_UPLOADS,
        fileName
      );

      logger.info(`Profile image uploaded by ${req.session.user.email}`);

      res.json({
        success: true,
        imageUrl,
      });
    } catch (error) {
      logger.error('Error uploading profile image:', error);
      res.status(500).json({ error: 'Profile image upload failed' });
    }
  }
);

router.post('/assignment-submission',
  isAuthenticated,
  requireRole(['student']),
  upload.array('files', 3),
  async (req: any, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const userId = req.session.user.id;
      const uploadedFiles = [];

      for (const file of req.files) {
        const fileId = randomUUID();
        const fileName = `${userId}/assignments/${fileId}-${file.originalname}`;
        
        const metadata = {
          originalName: file.originalname,
          mimeType: file.mimetype,
          uploadedBy: userId,
          uploadedAt: new Date().toISOString(),
          fileId,
          type: 'assignment-submission',
        };

        await fileStorage.uploadFile(
          BUCKETS.ASSIGNMENTS,
          fileName,
          file.buffer,
          metadata
        );

        const fileUrl = await fileStorage.generatePresignedUrl(
          BUCKETS.ASSIGNMENTS,
          fileName
        );

        uploadedFiles.push({
          id: fileId,
          originalName: file.originalname,
          url: fileUrl,
          mimeType: file.mimetype,
          size: file.size,
        });
      }

      logger.info(`Assignment files uploaded by ${req.session.user.email}`);

      res.json({
        success: true,
        files: uploadedFiles,
      });
    } catch (error) {
      logger.error('Error uploading assignment files:', error);
      res.status(500).json({ error: 'Assignment upload failed' });
    }
  }
);

// Error handling middleware for uploads
const handleUploadError = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size must be less than 50MB'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Too many files',
        message: 'Maximum 5 files allowed per upload'
      });
    }
  }
  
  if (err.message.includes('File type')) {
    return res.status(400).json({
      error: 'Invalid file type',
      message: err.message
    });
  }

  return res.status(500).json({
    error: 'Upload failed',
    message: 'An error occurred during file upload'
  });
};

router.use(handleUploadError);

export const uploadRoutes = router;
