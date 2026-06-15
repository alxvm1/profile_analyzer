import * as React from "react";
import * as Label from "@radix-ui/react-label";

import type { InputProps } from "./types";
import "./style.css";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, hint, error, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="field">
        {label ? (
          <Label.Root className="field__label" htmlFor={inputId}>
            {label}
          </Label.Root>
        ) : null}

        <input
          {...props}
          ref={ref}
          id={inputId}
          className={["input", error ? "input--invalid" : "", className]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />

        {hint ? (
          <div id={hintId} className="field__hint">
            {hint}
          </div>
        ) : null}

        {error ? (
          <div id={errorId} className="field__hint" role="alert">
            {error}
          </div>
        ) : null}
      </div>
    );
  },
);