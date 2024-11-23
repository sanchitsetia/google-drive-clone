"use client";
import { fetchFiles } from "@/app/lib/actions/fetchFiles";
import React, { useEffect, useState } from "react";
import FileCard from "./FileCard";
import { useCurrentFolder } from "./currentFolderContext";

const GetFiles = () => {
  const { currentFolder, setCurrentFolder } = useCurrentFolder();
  const [DirectoryStructure, setDirectoryStructure] = useState([]);

  useEffect(() => {
    createDirectory();
  }, [currentFolder]);

  const createDirectory = async () => {
    let a = await fetchFiles(currentFolder);
    setDirectoryStructure(a);
  };
  const goBack = () => {
    console.log(currentFolder);
  };

  let files = DirectoryStructure?.filter((val) => val.type == "file");
  let folders = DirectoryStructure?.filter((val) => val.type == "folder");
  return (
    <div>
      <button className="rounded-md bg-blue-500 p-2 m-2" onClick={goBack}>
        Back
      </button>
      {files!.map((file) => (
        <FileCard fileorFolderName={file.name} key={file.id} type={file.type} />
      ))}
      {folders!.map((file) => (
        <FileCard fileorFolderName={file.name} key={file.id} type={file.type} />
      ))}
    </div>
  );
};

export default GetFiles;
