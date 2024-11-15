"use server"
import { getUserSession } from "@/app/utils/serverSession";
import prisma from "../prisma";
import { strict } from "assert";

export async function fetchFiles() {
try {
  const session = await getUserSession();
  console.log(session?.user)
  const files = await prisma.file.findMany({
    where: {
      uploadedBy: session?.user.id
    },
    select: {
      s3Key: true,
      id: true,
      size: true
    }
    
  })
  const s3Keys = files.map((obj,ind)=>obj.s3Key)
  console.log(s3Keys)
  const root= {}
  
  s3Keys.forEach((key)=>{
    const path = key.replace(`${session?.user.id}/`,"").split("/");
    let currentLevel:any = root;

    path.forEach((part,index)=>{
      if(index == path.length-1)
        currentLevel[part] = {type: "file",key};
      else
      {
        currentLevel[part] = currentLevel[part] || { type: "folder", children: {} };
        currentLevel = currentLevel[part].children;
      }
    })
  })

  return root;
}
  catch (error) {
  
  }
  
}
