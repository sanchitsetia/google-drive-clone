"use server"

import { getUserSession } from "@/app/utils/serverSession";
import prisma from "../prisma"

export async function createFolderinDB(folderName:string,currentFolder:string) {
  const session = await getUserSession();
  const existingFolder = await prisma.file.findFirst({
    where: {
      name: folderName,
      uploadedBy: session?.user.id,
      parentFolder: currentFolder,
    },
  });
  if (existingFolder) console.log("existing folder");
  else {
    await prisma.file.create({
      data: {
        name: folderName,
        parentFolder: currentFolder,
        uploadedBy: session?.user.id,
        type: "folder"
      }
    })
  }

}