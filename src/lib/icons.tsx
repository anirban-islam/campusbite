import React, { forwardRef } from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Factory helper to create lightweight, type-safe SVG icon components
 */
export function createIcon(displayName: string, path: React.ReactNode) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, width, height, className, ...props }, ref) => {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={width ?? size}
          height={height ?? size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
          {...props}
        >
          {path}
        </svg>
      );
    }
  );

  Icon.displayName = displayName;
  return Icon;
}

/* ==========================================================================
   NAVIGATION & CHEVRONS
   ========================================================================== */

/** Chevron Down */
export const ChevronDownIcon = createIcon("ChevronDownIcon", <path d="m6 9 6 6 6-6" />);
export const ChevronDown = ChevronDownIcon;

/** Chevron Up */
export const ChevronUpIcon = createIcon("ChevronUpIcon", <path d="m18 15-6-6-6 6" />);
export const ChevronUp = ChevronUpIcon;

/** Chevron Right */
export const ChevronRightIcon = createIcon("ChevronRightIcon", <path d="m9 18 6-6-6-6" />);
export const ChevronRight = ChevronRightIcon;

/** Chevron Left */
export const ChevronLeftIcon = createIcon("ChevronLeftIcon", <path d="m15 18-6-6 6-6" />);
export const ChevronLeft = ChevronLeftIcon;

/** Arrow Right */
export const ArrowRightIcon = createIcon(
  "ArrowRightIcon",
  <>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </>
);
export const ArrowRight = ArrowRightIcon;

/** Arrow Left */
export const ArrowLeftIcon = createIcon(
  "ArrowLeftIcon",
  <>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </>
);
export const ArrowLeft = ArrowLeftIcon;

/** Arrow Up */
export const ArrowUpIcon = createIcon(
  "ArrowUpIcon",
  <>
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </>
);
export const ArrowUp = ArrowUpIcon;

/** Arrow Down */
export const ArrowDownIcon = createIcon(
  "ArrowDownIcon",
  <>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </>
);
export const ArrowDown = ArrowDownIcon;

/* ==========================================================================
   CORE UI & CONTROLS
   ========================================================================== */

/** Search */
export const SearchIcon = createIcon(
  "SearchIcon",
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>
);
export const Search = SearchIcon;

/** Close / X */
export const CloseIcon = createIcon(
  "CloseIcon",
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
);
export const XIcon = CloseIcon;
export const X = CloseIcon;

/** Check */
export const CheckIcon = createIcon("CheckIcon", <path d="M20 6 9 17l-5-5" />);
export const Check = CheckIcon;

/** Check Circle */
export const CheckCircleIcon = createIcon(
  "CheckCircleIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
);
export const CheckCircle = CheckCircleIcon;

/** Alert Circle / Error */
export const AlertCircleIcon = createIcon(
  "AlertCircleIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </>
);
export const AlertCircle = AlertCircleIcon;

/** Alert Triangle / Warning */
export const AlertTriangleIcon = createIcon(
  "AlertTriangleIcon",
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </>
);
export const AlertTriangle = AlertTriangleIcon;

/** Info */
export const InfoIcon = createIcon(
  "InfoIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </>
);
export const Info = InfoIcon;

/** Menu */
export const MenuIcon = createIcon(
  "MenuIcon",
  <>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </>
);
export const Menu = MenuIcon;

/** More Horizontal */
export const MoreHorizontalIcon = createIcon(
  "MoreHorizontalIcon",
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </>
);
export const MoreHorizontal = MoreHorizontalIcon;

/** More Vertical */
export const MoreVerticalIcon = createIcon(
  "MoreVerticalIcon",
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </>
);
export const MoreVertical = MoreVerticalIcon;

/** Plus */
export const PlusIcon = createIcon(
  "PlusIcon",
  <>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </>
);
export const Plus = PlusIcon;

/** Minus */
export const MinusIcon = createIcon("MinusIcon", <path d="M5 12h14" />);
export const Minus = MinusIcon;

/** Trash */
export const TrashIcon = createIcon(
  "TrashIcon",
  <>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </>
);
export const Trash = TrashIcon;
export const Trash2 = TrashIcon;

/** Edit */
export const EditIcon = createIcon(
  "EditIcon",
  <>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </>
);
export const Edit = EditIcon;

/** Eye */
export const EyeIcon = createIcon(
  "EyeIcon",
  <>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
export const Eye = EyeIcon;

/** Eye Off */
export const EyeOffIcon = createIcon(
  "EyeOffIcon",
  <>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </>
);
export const EyeOff = EyeOffIcon;

/** Filter */
export const FilterIcon = createIcon(
  "FilterIcon",
  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
);
export const Filter = FilterIcon;

/** Loader / Spinner */
export const LoaderIcon = createIcon(
  "LoaderIcon",
  <>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </>
);
export const Loader2 = LoaderIcon;
export const Spinner = LoaderIcon;

/* ==========================================================================
   CAMPUS & FOOD ORDERING DOMAIN
   ========================================================================== */

/** Shopping Bag / Cart */
export const CartIcon = createIcon(
  "CartIcon",
  <>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </>
);
export const ShoppingBag = CartIcon;

/** Shopping Cart */
export const ShoppingCartIcon = createIcon(
  "ShoppingCartIcon",
  <>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </>
);
export const ShoppingCart = ShoppingCartIcon;

/** Utensils / Cutlery */
export const UtensilsIcon = createIcon(
  "UtensilsIcon",
  <>
    <path d="M18 2v20" />
    <path d="m21 15-3-3-3 3" />
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </>
);
export const Utensils = UtensilsIcon;
export const FoodIcon = UtensilsIcon;

/** Coffee Cup */
export const CoffeeIcon = createIcon(
  "CoffeeIcon",
  <>
    <path d="M10 2v2" />
    <path d="M14 2v2" />
    <path d="M16 8a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Zm0 0h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
    <path d="M6 2v2" />
    <path d="M6 19h10" />
  </>
);
export const Coffee = CoffeeIcon;

/** Pizza */
export const PizzaIcon = createIcon(
  "PizzaIcon",
  <>
    <path d="M15 11h.01" />
    <path d="M11 15h.01" />
    <path d="M16 16h.01" />
    <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16Z" />
  </>
);
export const Pizza = PizzaIcon;

/** Salad */
export const SaladIcon = createIcon(
  "SaladIcon",
  <>
    <path d="M7 21h10" />
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
    <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47 2.63 2.4 2.4 0 0 1-.37 4.91" />
  </>
);
export const Salad = SaladIcon;

/** Store / Station */
export const StoreIcon = createIcon(
  "StoreIcon",
  <>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0" />
  </>
);
export const Store = StoreIcon;

/** Map Pin / Location */
export const LocationPinIcon = createIcon(
  "LocationPinIcon",
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>
);
export const MapPin = LocationPinIcon;
export const MapPinIcon = LocationPinIcon;

/** Graduation Cap / Campus */
export const GraduationCapIcon = createIcon(
  "GraduationCapIcon",
  <>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </>
);
export const GraduationCap = GraduationCapIcon;
export const CampusIcon = GraduationCapIcon;

/** Tag / Discount */
export const TagIcon = createIcon(
  "TagIcon",
  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z M7 7h.01" />
);
export const Tag = TagIcon;

/** Sparkles / New */
export const SparklesIcon = createIcon(
  "SparklesIcon",
  <>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </>
);
export const Sparkles = SparklesIcon;

/** Flame / Hot / Popular */
export const FlameIcon = createIcon(
  "FlameIcon",
  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
);
export const Flame = FlameIcon;
export const HotFoodIcon = FlameIcon;

/** Clock / Time */
export const ClockIcon = createIcon(
  "ClockIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
);
export const Clock = ClockIcon;

/** Receipt */
export const ReceiptIcon = createIcon(
  "ReceiptIcon",
  <>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8h-8" />
    <path d="M16 12h-8" />
    <path d="M11 16H8" />
  </>
);
export const Receipt = ReceiptIcon;

/** Credit Card */
export const CreditCardIcon = createIcon(
  "CreditCardIcon",
  <>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </>
);
export const CreditCard = CreditCardIcon;

/** Bike / Delivery */
export const BikeIcon = createIcon(
  "BikeIcon",
  <>
    <circle cx="18.5" cy="17.5" r="3.5" />
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="15" cy="5" r="1" />
    <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
  </>
);
export const Bike = BikeIcon;

/** Star / Rating */
export const StarIcon = createIcon(
  "StarIcon",
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
);
export const Star = StarIcon;

/** Heart / Favorite */
export const HeartIcon = createIcon(
  "HeartIcon",
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
);
export const Heart = HeartIcon;

/** Bell / Notification */
export const BellIcon = createIcon(
  "BellIcon",
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>
);
export const Bell = BellIcon;

/** Mail / Email */
export const MailIcon = createIcon(
  "MailIcon",
  <>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>
);
export const Mail = MailIcon;

/** Phone */
export const PhoneIcon = createIcon(
  "PhoneIcon",
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
);
export const Phone = PhoneIcon;

/** User */
export const UserIcon = createIcon(
  "UserIcon",
  <>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
);
export const User = UserIcon;

/** Users */
export const UsersIcon = createIcon(
  "UsersIcon",
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);
export const Users = UsersIcon;

/** Lock */
export const LockIcon = createIcon(
  "LockIcon",
  <>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>
);
export const Lock = LockIcon;

/** Unlock */
export const UnlockIcon = createIcon(
  "UnlockIcon",
  <>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </>
);
export const Unlock = UnlockIcon;
