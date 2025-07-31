import { createContext } from "react";
import type { ProductLineContextType } from "./ProductLineTypes";

export const ProductLineContext = createContext<ProductLineContextType | undefined>(undefined);
