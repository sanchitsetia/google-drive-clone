"use client";
import React, { useState } from "react";
import { useCurrentFolder } from "./currentFolderContext";
import { generatePresignedDownloadURL } from "@/app/lib/actions/download";
import { blob } from "stream/consumers";

const FileCard = ({
  fileorFolderName,
  type,
}: {
  fileorFolderName: string;
  type: string;
}) => {
  const { currentFolder, setCurrentFolder } = useCurrentFolder();
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDoubleClick = (e) => {
    console.log(currentFolder);
    console.log(type);
    if (type == "folder")
      setCurrentFolder(currentFolder + e.target.innerText + "/");
  };
  const handleDownload = async (name: string) => {
    setIsDownloading(true);
    setProgress(0);
    const s3Key = currentFolder + name;
    const presignedURL = await generatePresignedDownloadURL(s3Key);
    console.log(presignedURL);
    const fileResponse = await fetch(presignedURL);
    if (!fileResponse.ok) {
      console.error("failed to download file");
      setIsDownloading(false);
      return;
    }

    const contentLength = fileResponse.headers.get("Content-Length");
    if (!contentLength) {
      console.error("Unable to determine file size for progress tracking.");
      setIsDownloading(false);
      return;
    }

    const totalBytes = parseInt(contentLength, 10);
    let downloadedBytes = 0;

    const reader = fileResponse.body?.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader?.read();
      if (done) break;

      downloadedBytes += value.length;
      setProgress(Math.round((downloadedBytes / totalBytes) * 100));
      chunks.push(value);
    }
    // Convert the response to a blob
    const fileBlob = new Blob(chunks);

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(fileBlob);

    // Trigger the file download
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // Sets the downloaded file name
    link.click();

    // Revoke the temporary URL to free up memory
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };
  return (
    <div
      className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-800 flex items-center justify-between"
      onDoubleClick={handleDoubleClick}
    >
      <div className="mx-10">{fileorFolderName}</div>
      {type == "file" ? (
        <div>
          <button
            className="rounded-md bg-blue-600 p-2 mx-10 hover:bg-blue-800"
            onClick={() => handleDownload(fileorFolderName)}
            disabled={isDownloading}
          >
            {isDownloading ? "Downloading..." : "Download"}
          </button>
          {isDownloading && (
            <div className="mt-2">
              <p>Download progress: {progress}%</p>
              <div className="w-full bg-gray-200 rounded">
                <div
                  className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileCard;
