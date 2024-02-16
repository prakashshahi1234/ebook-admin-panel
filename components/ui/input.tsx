import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "yflex yh-10 yw-full yrounded-md yborder yborder-input ybg-background ypx-3 ypy-2 ytext-sm yring-offset-background file:yborder-0 file:ybg-transparent file:ytext-sm file:yfont-medium placeholder:ytext-muted-foreground focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ycursor-not-allowed disabled:yopacity-50 border-gray-300 h-10 px-3 border rounded focus:border-blue-400 transition duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
