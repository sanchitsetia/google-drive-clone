import { Appbar } from "@/components/Appbar";
import CreateFolder from "@/components/CreateFolder";
import { CurrentFolderProvider } from "@/components/currentFolderContext";
import GetFiles from "@/components/GetFiles";
import UploadFile from "@/components/UploadFile";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Appbar />
      <CurrentFolderProvider>
        <UploadFile />
        <CreateFolder />
        <GetFiles />
      </CurrentFolderProvider>
    </div>
  );
}
