"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "../prisma";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export async function generatePresignedURL(fileName:string,size:number,mimeType:string,currentDirectory:string,userId:string) {
  try {

    let s3Key = `${currentDirectory}${fileName}`
    
    await prisma.file.upsert({
      create: {
        mimeType,
        name:fileName,
        s3Key,
        size,
        uploadedBy:userId,
        uploadStatus: 'Uploading'
      },
      update:{
        mimeType,
        name:fileName,
        s3Key,
        size,
        uploadedBy:userId,
        uploadStatus: 'Uploading'        
      },
      where:{
        s3Key,
        uploadedBy: userId
      }
    })
    console.log("file metadata uploaded");
  
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      ContentType: mimeType
    })
  
    const preSignedURL = await getSignedUrl(s3Client,command,{expiresIn:3600})
    console.log("generated presigned url")
    return preSignedURL;
    
  } catch (error) {
    console.error("error - ",error)
    return null
  }


  
}
