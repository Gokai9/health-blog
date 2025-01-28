import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResponse {
  url: string;
  error?: string;
}

export async function uploadToCloudinary(
  file: File | Buffer | string
): Promise<UploadResponse> {
  try {
    // Handle different input types
    let uploadData;
    
    if (typeof file === 'string' && file.startsWith('data:')) {
      // Handle base64 string
      uploadData = `data:application/octet-stream;base64,${Buffer.from(file).toString('base64')}`;
    } else if (file instanceof Buffer) {
      // Handle Buffer
      uploadData = file.toString('base64');
    } else if (file instanceof File) {
      // Convert File to base64
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      uploadData = `data:${file.type};base64,${base64}`;
    } else {
      throw new Error('Invalid file format');
    }

    // Upload to Cloudinary
    interface CloudinaryUploadResult {
      secure_url: string;
    }

    const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        uploadData,
        {
          resource_type: 'auto',
          folder: 'my-uploads', // Customize folder name
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('Upload result is undefined'));
        }
      );
    });

    return {
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      url: '',
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}