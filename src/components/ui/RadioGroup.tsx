"use client";

import React, {
  createContext,
  useContext,
  useId,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

export type RadioSize = "sm" | "md" | "lg";
export type RadioVariant = "default" | "card";
export type RadioOrientation = "vertical" | "horizontal";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (val: string) => void;
  size: RadioSize;
  variant: RadioVariant;
  disabled?: boolean;
  hasError?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroupItem or Radio must be used within a RadioGroup");
  }
  return context;
}

const sizeStyles: Record<
  RadioSize,
  {
    circle: string;
    dot: string;
    label: string;
    desc: string;
    gap: string;
    rowHeight: string;
    icon: string;
    cardPadding: string;
    cardGap: string;
  }
> = {
  sm: {
    circle: "h-3.5 w-3.5",
    dot: "h-1.5 w-1.5",
    label: "text-xs",
    desc: "text-[11px]",
    gap: "gap-2",
    rowHeight: "h-4",
    icon: "w-3.5 h-3.5",
    cardPadding: "px-3 py-2.5",
    cardGap: "gap-2.5",
  },
  md: {
    circle: "h-4 w-4",
    dot: "h-2 w-2",
    label: "text-sm",
    desc: "text-xs",
    gap: "gap-2.5",
    rowHeight: "h-5",
    icon: "w-4 h-4",
    cardPadding: "px-3.5 py-3",
    cardGap: "gap-3",
  },
  lg: {
    circle: "h-[18px] w-[18px]",
    dot: "h-2.5 w-2.5",
    label: "text-base",
    desc: "text-sm",
    gap: "gap-3",
    rowHeight: "h-6",
    icon: "w-4.5 h-4.5",
    cardPadding: "px-4.5 py-3.5",
    cardGap: "gap-3.5",
  },
};

/* ==========================================================================
   RadioGroupItem (Compound Item Component)
   ========================================================================== */

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  size?: RadioSize;
  variant?: RadioVariant;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      id,
      value,
      label,
      description,
      icon,
      badge,
      disabled,
      size: itemSize,
      variant: itemVariant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const group = useRadioGroup();
    const generatedId = useId();
    const inputId = id || `${group.name}-${value}-${generatedId}`;

    const isChecked = group.value === value;
    const isDisabled = disabled ?? group.disabled;
    const effectiveSize = itemSize ?? group.size;
    const effectiveVariant = itemVariant ?? group.variant;
    const currentSize = sizeStyles[effectiveSize];
    const hasError = group.hasError;

    if (effectiveVariant === "card") {
      return (
        <label
          htmlFor={inputId}
          className={cn(
            "group relative flex items-start justify-between rounded-xl transition-all duration-150 cursor-pointer select-none",
            currentSize.cardPadding,
            currentSize.cardGap,
            isChecked
              ? "bg-primary-subtle text-primary font-semibold shadow-2xs"
              : "bg-muted/30 text-foreground hover:bg-muted/70 active:bg-muted/90",
            hasError && (isChecked ? "bg-destructive-subtle text-destructive" : "bg-destructive-subtle/20"),
            isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className
          )}
        >
          {/* Native Hidden Radio Input */}
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={group.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => group.onChange(value)}
            className="peer sr-only"
            aria-invalid={hasError ? "true" : undefined}
            {...props}
          />

          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Custom Circular Radio Indicator aligned with first line */}
            <div
              className={cn(
                "relative flex items-center justify-center shrink-0",
                currentSize.rowHeight
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-[1.5px] transition-all duration-150 shrink-0",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2",
                  currentSize.circle,
                  isChecked
                    ? "border-primary bg-card"
                    : "border-muted-foreground/35 bg-card group-hover:border-primary/70",
                  hasError && (isChecked ? "border-destructive" : "border-destructive")
                )}
              >
                {isChecked && (
                  <span
                    className={cn(
                      "rounded-full bg-primary animate-in zoom-in-75 duration-100",
                      hasError && "bg-destructive",
                      currentSize.dot
                    )}
                  />
                )}
              </div>
            </div>

            {/* Icon + Label + Badge + Description */}
            <div className="flex-1 min-w-0">
              <div className={cn("flex items-center gap-2", currentSize.rowHeight)}>
                {icon && (
                  <span
                    className={cn(
                      "shrink-0 inline-flex items-center justify-center text-current/80 transition-colors [&>svg]:w-full [&>svg]:h-full [&>svg]:shrink-0",
                      currentSize.icon
                    )}
                  >
                    {icon}
                  </span>
                )}
                {label && (
                  <span
                    className={cn(
                      "font-semibold transition-colors leading-none",
                      currentSize.label,
                      isChecked ? "text-primary font-bold" : "text-foreground",
                      hasError && "text-destructive"
                    )}
                  >
                    {label}
                  </span>
                )}
                {badge && (
                  <span className="shrink-0 inline-flex items-center ml-0.5 leading-none">
                    {badge}
                  </span>
                )}
              </div>

              {description && (
                <p
                  className={cn(
                    "mt-1 leading-relaxed text-muted-foreground",
                    currentSize.desc,
                    isChecked && "text-primary/80"
                  )}
                >
                  {description}
                </p>
              )}

              {children}
            </div>
          </div>
        </label>
      );
    }

    // Default Variant: Clean, soft selectable radio row with perfect alignment
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group relative flex items-start select-none cursor-pointer rounded-xl px-3 py-2 -mx-3 transition-all duration-150",
          currentSize.gap,
          isChecked
            ? "bg-primary-subtle text-primary font-semibold"
            : "text-foreground hover:bg-muted/70 active:bg-muted",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        {/* Custom Styled Circle Container with exact optical height */}
        <div
          className={cn(
            "relative flex items-center justify-center shrink-0",
            currentSize.rowHeight
          )}
        >
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={group.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => group.onChange(value)}
            className="peer sr-only"
            aria-invalid={hasError ? "true" : undefined}
            {...props}
          />

          <div
            className={cn(
              "flex items-center justify-center rounded-full border-[1.5px] transition-all duration-150 shrink-0",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2",
              currentSize.circle,
              isChecked
                ? "border-primary bg-card"
                : "border-muted-foreground/35 bg-card group-hover:border-primary/70",
              hasError && (isChecked ? "border-destructive" : "border-destructive")
            )}
          >
            {isChecked && (
              <span
                className={cn(
                  "rounded-full bg-primary animate-in zoom-in-75 duration-100",
                  hasError && "bg-destructive",
                  currentSize.dot
                )}
              />
            )}
          </div>
        </div>

        {/* Content: Icon, Label, Badge, Description */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className={cn("flex items-center gap-2", currentSize.rowHeight)}>
            {icon && (
              <span
                className={cn(
                  "shrink-0 inline-flex items-center justify-center text-current/80 transition-colors [&>svg]:w-full [&>svg]:h-full [&>svg]:shrink-0",
                  currentSize.icon
                )}
              >
                {icon}
              </span>
            )}
            {label && (
              <span
                className={cn(
                  "font-medium transition-colors leading-none",
                  currentSize.label,
                  isChecked ? "text-primary font-semibold" : "text-foreground",
                  hasError && "text-destructive"
                )}
              >
                {label}
              </span>
            )}
            {badge && (
              <span className="shrink-0 inline-flex items-center ml-0.5 leading-none">
                {badge}
              </span>
            )}
          </div>

          {description && (
            <p
              className={cn(
                "mt-1 leading-relaxed text-muted-foreground",
                currentSize.desc,
                isChecked && "text-primary/80"
              )}
            >
              {description}
            </p>
          )}

          {children}
        </div>
      </label>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";
export const Radio = RadioGroupItem;

/* ==========================================================================
   RadioGroup (Container & Provider)
   ========================================================================== */

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  size?: RadioSize;
  variant?: RadioVariant;
  orientation?: RadioOrientation;
  options?: RadioOption[];
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string | boolean;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      name,
      disabled = false,
      size = "md",
      variant = "default",
      orientation = "vertical",
      options,
      label,
      helperText,
      error,
      required = false,
      className,
      containerClassName,
      children,
      ...props
    },
    ref
  ) => {
    const generatedName = useId();
    const groupName = name || `radio-group-${generatedName}`;

    const [selectedValue, setSelectedValue] = useState<string>(
      value !== undefined ? value : defaultValue
    );

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = (newVal: string) => {
      if (disabled) return;
      if (value === undefined) {
        setSelectedValue(newVal);
      }
      onChange?.(newVal);
    };

    const hasError = Boolean(error);

    return (
      <RadioGroupContext.Provider
        value={{
          name: groupName,
          value: selectedValue,
          onChange: handleValueChange,
          size,
          variant,
          disabled,
          hasError,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-required={required ? "true" : undefined}
          aria-invalid={hasError ? "true" : undefined}
          className={cn("w-full space-y-2 text-left", containerClassName)}
          {...props}
        >
          {/* Group Header Label */}
          {label && (
            <div className="flex items-center gap-1 mb-1.5">
              <span className="block text-xs font-semibold text-foreground tracking-wide select-none">
                {label}
              </span>
              {required && <span className="text-primary">*</span>}
            </div>
          )}

          {/* Radio Items Container */}
          <div
            className={cn(
              orientation === "horizontal"
                ? "flex flex-wrap items-center gap-4 sm:gap-6"
                : variant === "card"
                ? "grid grid-cols-1 gap-3"
                : "flex flex-col space-y-2.5",
              className
            )}
          >
            {/* Render from options prop if provided */}
            {options
              ? options.map((opt) => (
                  <RadioGroupItem
                    key={opt.value}
                    value={opt.value}
                    label={opt.label}
                    description={opt.description}
                    icon={opt.icon}
                    badge={opt.badge}
                    disabled={opt.disabled}
                  />
                ))
              : children}
          </div>

          {/* Validation Error Message */}
          {hasError && typeof error === "string" ? (
            <p className="text-xs text-destructive font-medium mt-1.5 flex items-center gap-1">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-xs text-muted-foreground mt-1.5">{helperText}</p>
          ) : null}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;

