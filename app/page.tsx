import { Appbar } from "@/components/Appbar";
import GetFiles from "@/components/GetFiles";
import UploadFile from "@/components/UploadFile";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Appbar />
      <UploadFile />
      <GetFiles />
    </div>
  );
}
