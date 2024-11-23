"use client";
import React from "react";
import { useCurrentFolder } from "./currentFolderContext";
import { generatePresignedDownloadURL } from "@/app/lib/actions/download";

const FileCard = ({
  fileorFolderName,
  type,
}: {
  fileorFolderName: string;
  type: string;
}) => {
  const { currentFolder, setCurrentFolder } = useCurrentFolder();

  const handleDoubleClick = (e) => {
    console.log(currentFolder);
    console.log(type);
    if (type == "folder")
      setCurrentFolder(currentFolder + e.target.innerText + "/");
  };
  const handleDownload = async (name: string) => {
    const s3Key = currentFolder + name;
    const presignedURL = await generatePresignedDownloadURL(s3Key);
    console.log(presignedURL);
    const fileResponse = await fetch(presignedURL);
    if (!fileResponse.ok) {
      console.error("failed to download file");
      return;
    }
    // Convert the response to a blob
    const fileBlob = await fileResponse.blob();

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(fileBlob);

    // Trigger the file download
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // Sets the downloaded file name
    link.click();

    // Revoke the temporary URL to free up memory
    URL.revokeObjectURL(url);
  };
  return (
    <div
      className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-800 flex items-center justify-between"
      onDoubleClick={handleDoubleClick}
    >
      <div className="mx-10">{fileorFolderName}</div>
      {type == "file" ? (
        <button
          className="rounded-md bg-blue-600 p-2 mx-10 hover:bg-blue-800"
          onClick={() => handleDownload(fileorFolderName)}
        >
          Download
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileCard;
