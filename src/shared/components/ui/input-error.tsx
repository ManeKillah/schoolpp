import * as React from "react";

import {cn} from "@/shared/lib/utils";

export type ComponentProps = React.HTMLAttributes<HTMLSpanElement>;

const ErrorInput = React.forwardRef<HTMLSpanElement, ComponentProps>(
  ({className, ...props}, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-xs block mt-1 ml-1 text-red-400", className)}
        {...props}
      />
    );
  },
);

ErrorInput.displayName = "ErrorInput";

export {ErrorInput};
