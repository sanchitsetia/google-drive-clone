"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { generatePresignedURL } from "@/app/lib/actions/upload";
import { useCurrentFolder } from "./currentFolderContext";

const UploadFile = () => {
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);
  const { currentFolder, setCurrentFolder } = useCurrentFolder();

  const session = useSession();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const presignedURL = await generatePresignedURL(
      file!.name,
      file!.size,
      file!.type,
      `${session.data!.user!.id}/${
        currentFolder ? currentFolder + "/" : currentFolder
      }`,
      session.data!.user!.id
    );
    console.log(presignedURL);
    if (!presignedURL) setUploadMessage("File Upload Failed");
    const upload = await fetch(presignedURL, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file?.type,
      },
    });

    if (upload.ok) {
      console.log("Upload successful");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setUploadMessage("File Uploaded");
  };
  return (
    <div>
      {session.data ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600
      disabled:opacity-50"
            onChange={handleFileUpload}
          />

          <div>{uploadMessage}</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UploadFile;
