import {clsx , type ClassValue} from "clsx"
import { twMerge } from "tailwind-merge"


export const cn = (...rest : ClassValue[])=>{
   return twMerge(clsx(rest))
}