import React from "react";

const FileCard = ({ fileorFolderName }: { fileorFolderName: string }) => {
  return <div className="p-2">{fileorFolderName}</div>;
};

export default FileCard;
