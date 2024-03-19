import React from "react";

import {cn} from "@/shared/lib/utils";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const ColorPicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, onChange, ...props}, ref) => {
    const [selectedColor, setSelectedColor] = React.useState<string>("#16A34A");

    return (
      <button
        className="h-8 w-8 rounded-full  ring-2 ring-ring ring-offset-2 ring-offset-background"
        style={{backgroundColor: selectedColor}}
        type="button"
      >
        <input
          ref={ref}
          className={cn("opacity-0 w-full h-full", className)}
          type="color"
          onChange={(e) => {
            setSelectedColor(e.target.value);
            onChange?.(e);
          }}
          {...props}
        />
      </button>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export {ColorPicker};
