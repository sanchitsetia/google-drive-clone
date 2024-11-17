"use client";
import React from "react";
import { useCurrentFolder } from "./currentFolderContext";

const FileCard = ({ fileorFolderName }: { fileorFolderName: string }) => {
  const { currentFolder, setCurrentFolder } = useCurrentFolder();

  const handleDoubleClick = (e) => {
    console.log(currentFolder);
    setCurrentFolder(e.target.innerText);
  };
  return (
    <div
      className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-800"
      onDoubleClick={handleDoubleClick}
    >
      {fileorFolderName}
    </div>
  );
};

export default FileCard;
