import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface College {
  college_code: string;
  college_name: string;
}  

interface CollegeContextType {
  colleges: College[];
  fetchColleges: () => Promise<void>;
  addCollege: (college: College) => void;
  removeCollege: (college_code: string) => void;
  updateCollege: (college_code: string, updated: Partial<College>) => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);
