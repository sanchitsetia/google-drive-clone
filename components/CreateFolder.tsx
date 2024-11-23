"use client";
import prisma from "@/app/lib/prisma";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { useCurrentFolder } from "./currentFolderContext";
import { createFolderinDB } from "@/app/lib/actions/createFolder";

const CreateFolder = () => {
  const { currentFolder, setCurrentFolder, triggerFileUpdate } =
    useCurrentFolder();
  const folderRef = useRef(null);
  const handleFolderCreation = async () => {
    console.log(currentFolder);
    await createFolderinDB(folderRef.current?.value, currentFolder);
    folderRef.current.value = null;
    triggerFileUpdate();
  };
  return (
    <div>
      <input
        placeholder="enter folder name"
        className="p-2 rounded-md text-black"
        ref={folderRef}
      ></input>
      <button
        className="rounded-md bg-blue-500 text-white hover:bg-blue-600 p-2 m-2"
        onClick={handleFolderCreation}
      >
        Create Folder
      </button>
    </div>
  );
};

export default CreateFolder;
