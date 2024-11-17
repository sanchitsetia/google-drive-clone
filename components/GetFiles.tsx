"use client";
import { fetchFiles } from "@/app/lib/actions/fetchFiles";
import React, { useEffect, useState } from "react";
import FileCard from "./FileCard";
import { useCurrentFolder } from "./currentFolderContext";

const GetFiles = () => {
  const { currentFolder, setCurrentFolder } = useCurrentFolder();
  const [DirectoryStructure, setDirectoryStructure] = useState([]);

  useEffect(() => {
    temp();
  }, [currentFolder]);

  const temp = async () => {
    let a = await fetchFiles(currentFolder);
    setDirectoryStructure(a);
  };

  let files = DirectoryStructure?.filter((val) => val.type == "file");
  let folders = DirectoryStructure?.filter((val) => val.type == "folder");
  return (
    <div>
      {files!.map((file) => (
        <FileCard fileorFolderName={file.name} key={file.id} />
      ))}
      {folders!.map((file) => (
        <FileCard fileorFolderName={file.name} key={file.id} />
      ))}
    </div>
  );
};

export default GetFiles;
