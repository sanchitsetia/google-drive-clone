import { fetchFiles } from "@/app/lib/actions/fetchFiles";
import React from "react";
import FileCard from "./FileCard";

const GetFiles = async () => {
  const DirectoryStructure = await fetchFiles();
  console.log(DirectoryStructure);
  let files = [];
  let folders = [];
  for (let key in DirectoryStructure) {
    if (DirectoryStructure[key]["type"] == "file") files.push(key);
    else folders.push(key);
  }
  console.log(files);
  console.log(folders);
  return (
    <div>
      {files.map((file) => (
        <FileCard fileorFolderName={file} />
      ))}
    </div>
  );
};

export default GetFiles;
