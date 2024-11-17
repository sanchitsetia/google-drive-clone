"use client";

import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

type CurrentFolderContextType = {
  currentFolder: string | null; // Adjust this type based on your actual folder data structure
  setCurrentFolder: Dispatch<SetStateAction<string>>;
};

const CurrentFolderContext = createContext<
  CurrentFolderContextType | undefined
>(undefined);

export const CurrentFolderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = useSession();
  const userId = session.data?.user.id;
  const [currentFolder, setCurrentFolder] = useState(null);

  useEffect(() => {
    if (userId && currentFolder == null) {
      setCurrentFolder(userId);
    }
  }, [userId]);

  console.log("currentFolder", currentFolder);
  console.log("userid", userId);

  return (
    <CurrentFolderContext.Provider value={{ currentFolder, setCurrentFolder }}>
      {children}
    </CurrentFolderContext.Provider>
  );
};

export const useCurrentFolder = () => {
  const context = useContext(CurrentFolderContext);
  return context;
};
