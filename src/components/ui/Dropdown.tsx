"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type DropdownVariant = "outline" | "filled" | "subtle";
export type DropdownSize = "sm" | "md" | "lg";
export type DropdownRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  variant?: DropdownVariant;
  size?: DropdownSize;
  rounded?: DropdownRounded;
  leftIcon?: React.ReactNode;
  isSearchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  containerClassName?: string;
}

const variantStyles: Record<DropdownVariant, string> = {
  outline:
    "border border-border bg-card hover:border-primary-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
  filled:
    "border border-transparent bg-muted/60 hover:border-border focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20",
  subtle:
    "border border-primary-100 bg-primary-subtle/30 hover:border-primary-200 focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20",
};

const sizeStyles: Record<DropdownSize, { trigger: string; text: string; icon: string }> = {
  sm: {
    trigger: "h-8 px-2.5 text-xs gap-1.5",
    text: "text-xs",
    icon: "w-3.5 h-3.5",
  },
  md: {
    trigger: "h-10 px-3.5 text-sm gap-2",
    text: "text-sm",
    icon: "w-4 h-4",
  },
  lg: {
    trigger: "h-12 px-4 text-base gap-2.5",
    text: "text-base",
    icon: "w-5 h-5",
  },
};

const roundedStyles: Record<DropdownRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  variant = "outline",
  size = "md",
  rounded = "lg",
  leftIcon,
  isSearchable = false,
  searchPlaceholder = "Search options...",
  className,
  containerClassName,
}) => {
  const generatedId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Controlled vs Uncontrolled state
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue || ""
  );
  const selectedValue = isControlled ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const hasError = Boolean(error);
  const currentSize = sizeStyles[size];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    if (!isControlled) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredOptions = isSearchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <div
      ref={containerRef}
      className={cn("w-full space-y-1.5 text-left relative", containerClassName)}
    >
      {/* Label */}
      {label && (
        <label
          id={`${generatedId}-label`}
          className={cn(
            "block text-xs font-semibold text-foreground tracking-wide select-none",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        >
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${generatedId}-label` : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between text-left transition-all duration-150 outline-none select-none cursor-pointer",
          "disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed",
          variantStyles[variant],
          roundedStyles[rounded],
          currentSize.trigger,
          isOpen && "border-primary ring-2 ring-primary/20",
          hasError &&
            "border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20",
          className
        )}
      >
        <div className="flex items-center gap-2 overflow-hidden truncate">
          {leftIcon && (
            <span className="shrink-0 text-muted-foreground">{leftIcon}</span>
          )}
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span
            className={cn(
              "truncate",
              currentSize.text,
              selectedOption ? "text-foreground font-medium" : "text-muted-foreground"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        {/* Chevron Icon */}
        <svg
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-200",
            currentSize.icon,
            isOpen && "rotate-180 text-primary"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute z-50 mt-1.5 w-full bg-card border border-border shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100",
            rounded === "none" ? "rounded-none" : "rounded-xl"
          )}
        >
          {/* Optional Search Input */}
          {isSearchable && (
            <div className="p-2 border-b border-border bg-muted/30">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-xs text-muted-foreground">
                No options found.
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === selectedValue;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={opt.disabled}
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer select-none",
                      currentSize.text,
                      opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
                      isSelected
                        ? "bg-primary-subtle text-primary font-semibold"
                        : "text-foreground hover:bg-muted active:bg-muted/80"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {opt.icon && (
                        <span className="shrink-0">{opt.icon}</span>
                      )}
                      <div className="truncate">
                        <div className="truncate">{opt.label}</div>
                        {opt.description && (
                          <div className="text-[11px] text-muted-foreground font-normal truncate">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selected Checkmark */}
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-primary shrink-0 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Error / Helper text */}
      {hasError && typeof error === "string" ? (
        <p className="text-xs text-destructive flex items-center gap-1 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
