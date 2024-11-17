"use server"
import { getUserSession } from "@/app/utils/serverSession";
import prisma from "../prisma";
import { strict } from "assert";

export async function fetchFiles(currentFolder: string) {
  console.log("lasssss",currentFolder)
try {
  const session = await getUserSession();
  const files = await prisma.file.findMany({
    where: {
      uploadedBy: session?.user.id,
      parentFolder: currentFolder || ''
    },
    select: {
      name: true,
      id: true,
      size: true,
      type: true,
    }
    
  })
  console.log("fileeee",files)
  return files;
}
  catch (error) {
  
  }
  
}
