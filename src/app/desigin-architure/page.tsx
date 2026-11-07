"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonRounded,
  Input,
  InputVariant,
  InputSize,
  InputRounded,
  Dropdown,
  DropdownOption,
  DropdownVariant,
  DropdownSize,
  DropdownRounded,
  Checkbox,
  CheckboxSize,
  CheckboxRounded,
  Textarea,
  TextareaVariant,
  TextareaSize,
  TextareaRounded,
  TextareaResize,
  Badge,
  BadgeVariant,
  BadgeSize,
  BadgeRounded,
  RadioGroup,
  RadioGroupItem,
  RadioSize,
  RadioVariant,
  RadioOrientation,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogSize,
  DialogRounded,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  DrawerDirection,
  DrawerSize,
  DrawerRounded,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonFoodCard,
  SkeletonRounded,
  SkeletonAnimation,
  EmptyState,
  EmptyStateVariant,
  EmptyStateSize,
  EmptyStateRounded,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/components/ui";
import {
  CartIcon,
  ArrowRight,
  LocationPinIcon,
  Search,
  Mail,
  Utensils,
  Coffee,
  Pizza,
  Salad,
  Store,
  Flame,
  Sparkles,
  Tag,
  Check,
  Bike,
  Clock,
  CreditCard,
} from "@/lib/icons";

export default function DesignArchitecturePage() {
  const [activeTab, setActiveTab] = useState<"emptystate" | "skeleton" | "drawer" | "dialog" | "radiogroup" | "badge" | "textarea" | "checkbox" | "dropdown" | "input" | "button">("emptystate");

  // EmptyState Playground State
  const [emptyVariant, setEmptyVariant] = useState<EmptyStateVariant>("dashed");
  const [emptySize, setEmptySize] = useState<EmptyStateSize>("md");
  const [emptyRounded, setEmptyRounded] = useState<EmptyStateRounded>("2xl");
  const [emptyScenario, setEmptyScenario] = useState<"cart" | "search" | "closed" | "orders">("cart");

  // Skeleton Playground State
  const [skeletonAnimation, setSkeletonAnimation] = useState<SkeletonAnimation>("shimmer");
  const [skeletonRounded, setSkeletonRounded] = useState<SkeletonRounded>("md");
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Drawer Playground State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDirection, setDrawerDirection] = useState<DrawerDirection>("right");
  const [drawerSize, setDrawerSize] = useState<DrawerSize>("md");
  const [drawerRounded, setDrawerRounded] = useState<DrawerRounded>("2xl");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // Dialog Playground State
  const [dialogSize, setDialogSize] = useState<DialogSize>("md");
  const [dialogRounded, setDialogRounded] = useState<DialogRounded>("2xl");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // RadioGroup Playground State
  const [radioSize, setRadioSize] = useState<RadioSize>("md");
  const [radioVariant, setRadioVariant] = useState<RadioVariant>("card");
  const [radioOrientation, setRadioOrientation] = useState<RadioOrientation>("vertical");
  const [radioValue, setRadioValue] = useState("delivery");
  const [radioHasError, setRadioHasError] = useState(false);
  const [radioDisabled, setRadioDisabled] = useState(false);

  // Badge Playground State
  const [badgeVariant, setBadgeVariant] = useState<BadgeVariant>("popular");
  const [badgeSize, setBadgeSize] = useState<BadgeSize>("md");
  const [badgeRounded, setBadgeRounded] = useState<BadgeRounded>("full");
  const [badgeDot, setBadgeDot] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const [badgeWithIcon, setBadgeWithIcon] = useState(true);
  const [badgeText, setBadgeText] = useState("Most Popular");

  // Textarea Playground State
  const [taVariant, setTaVariant] = useState<TextareaVariant>("outline");
  const [taSize, setTaSize] = useState<TextareaSize>("md");
  const [taRounded, setTaRounded] = useState<TextareaRounded>("lg");
  const [taResize, setTaResize] = useState<TextareaResize>("vertical");
  const [taLabel, setTaLabel] = useState("Special Food Instructions");
  const [taPlaceholder, setTaPlaceholder] = useState("e.g. Please put spicy sauce on the side, extra crispy fries...");
  const [taHelper, setTaHelper] = useState("The campus cafeteria kitchen will review your note.");
  const [taError, setTaError] = useState(false);
  const [taDisabled, setTaDisabled] = useState(false);
  const [taRequired, setTaRequired] = useState(false);
  const [taShowCount, setTaShowCount] = useState(true);

  // Checkbox Playground State
  const [cbChecked, setCbChecked] = useState(true);
  const [cbSize, setCbSize] = useState<CheckboxSize>("md");
  const [cbRounded, setCbRounded] = useState<CheckboxRounded>("md");
  const [cbIndeterminate, setCbIndeterminate] = useState(false);
  const [cbDisabled, setCbDisabled] = useState(false);
  const [cbError, setCbError] = useState(false);
  const [cbLabel, setCbLabel] = useState("Include Cutlery & Napkins");
  const [cbDescription, setCbDescription] = useState("Help our campus cafeteria reduce plastic waste if not needed.");

  // Dropdown Playground State
  const [dropdownValue, setDropdownValue] = useState("hall-a");
  const [dropdownVariant, setDropdownVariant] = useState<DropdownVariant>("outline");
  const [dropdownSize, setDropdownSize] = useState<DropdownSize>("md");
  const [dropdownRounded, setDropdownRounded] = useState<DropdownRounded>("lg");
  const [dropdownSearchable, setDropdownSearchable] = useState(true);
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [dropdownRequired, setDropdownRequired] = useState(true);
  const [dropdownError, setDropdownError] = useState(false);
  const [dropdownLeftIcon, setDropdownLeftIcon] = useState(true);
  const [dropdownHideScrollbar, setDropdownHideScrollbar] = useState(false);

  // Button Playground State
  const [btnVariant, setBtnVariant] = useState<ButtonVariant>("primary");
  const [btnSize, setBtnSize] = useState<ButtonSize>("md");
  const [btnRounded, setBtnRounded] = useState<ButtonRounded>("lg");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLeftIcon, setBtnLeftIcon] = useState(false);
  const [btnRightIcon, setBtnRightIcon] = useState(false);
  const [btnText, setBtnText] = useState("Order Meal");

  // Input Playground State
  const [inputVariant, setInputVariant] = useState<InputVariant>("outline");
  const [inputSize, setInputSize] = useState<InputSize>("md");
  const [inputRounded, setInputRounded] = useState<InputRounded>("lg");
  const [inputLabel, setInputLabel] = useState("Delivery Location");
  const [inputPlaceholder, setInputPlaceholder] = useState("e.g. Science Building, Room 204");
  const [inputHelper, setInputHelper] = useState("We will deliver your food directly to your floor.");
  const [hasError, setHasError] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputRequired, setInputRequired] = useState(true);
  const [inputLeftIcon, setInputLeftIcon] = useState(true);

  const campusLocations: DropdownOption[] = [
    { value: "hall-a", label: "Central Dining Hall", description: "Main Campus Center, Ground Floor" },
    { value: "sci-quad", label: "Science Quad Cafe", description: "Building B, Near Laboratory 3" },
    { value: "lib-bistro", label: "Library Bistro & Coffee", description: "2nd Floor, Quiet Study Wing" },
    { value: "eng-hub", label: "Engineering Food Hub", description: "Tech Block, East Terrace" },
    { value: "dorm-south", label: "South Residence Commons", description: "Hostel Zone 4, Fast Pickup" },
    { value: "admin-kiosk", label: "Administration Kiosk", description: "Main Gate, Pickup Point 1" },
  ];

  const mealCategories: DropdownOption[] = [
    { value: "all", label: "All Items" },
    { value: "breakfast", label: "Breakfast & Bakery" },
    { value: "meals", label: "Lunch & Dinner Plates" },
    { value: "snacks", label: "Quick Bites & Burgers" },
    { value: "drinks", label: "Beverages & Cold Brews" },
    { value: "dessert", label: "Desserts & Pastries" },
  ];

  const btnVariants: ButtonVariant[] = [
    "primary",
    "secondary",
    "outline",
    "subtle",
    "ghost",
    "destructive",
    "link",
  ];
  const btnSizes: ButtonSize[] = ["sm", "md", "lg", "icon", "icon-sm"];
  const roundedOptions = ["none", "sm", "md", "lg", "xl", "full"] as const;
  const btnRoundedOptions: ButtonRounded[] = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];

  const inputVariants: InputVariant[] = ["outline", "filled", "subtle"];
  const inputSizes: InputSize[] = ["sm", "md", "lg"];

  const BagIcon = () => <CartIcon className="w-4 h-4" />;
  const ArrowRightIcon = () => <ArrowRight className="w-4 h-4" />;
  const PinIcon = () => <LocationPinIcon className="w-4 h-4" />;
  const SearchIcon = () => <Search className="w-4 h-4" />;
  const MailIcon = () => <Mail className="w-4 h-4" />;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="border-b border-border pb-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary-200">
              Design Architecture
            </span>
            <span className="text-xs text-muted-foreground">@/components/ui/</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            CampusBite UI Component System
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Reusable, accessible UI components styled strictly with global brand tokens (<span className="text-primary font-semibold">#c34e31</span>).
            Organized inside <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-foreground">src/components/ui/</code>.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab("emptystate")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "emptystate"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Empty State Component
            </button>
            <button
              onClick={() => setActiveTab("skeleton")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "skeleton"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Skeleton Component
            </button>
            <button
              onClick={() => setActiveTab("drawer")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "drawer"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Drawer Component
            </button>
            <button
              onClick={() => setActiveTab("dialog")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "dialog"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Dialog Component
            </button>
            <button
              onClick={() => setActiveTab("radiogroup")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "radiogroup"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Radio Group Component
            </button>
            <button
              onClick={() => setActiveTab("badge")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "badge"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Badge Component
            </button>
            <button
              onClick={() => setActiveTab("textarea")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "textarea"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Textarea Component
            </button>
            <button
              onClick={() => setActiveTab("checkbox")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "checkbox"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Checkbox Component
            </button>
            <button
              onClick={() => setActiveTab("dropdown")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "dropdown"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Dropdown Component
            </button>
            <button
              onClick={() => setActiveTab("input")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "input"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Input Component
            </button>
            <button
              onClick={() => setActiveTab("button")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "button"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              Button Component
            </button>
          </div>
        </header>

        {/* ======================= EMPTY STATE COMPONENT TAB ======================= */}
        {activeTab === "emptystate" && (
          <div className="space-y-10">
            {/* Interactive EmptyState Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Empty State Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Versatile empty state indicators with optical icon scaling, configurable rounded corners, 4 visual variants, and 3 proportional sizes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-4 space-y-5 bg-muted/20 border border-border p-5 rounded-xl">
                  {/* Scenario Presets */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      Preset Scenario
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { key: "cart", label: "Empty Tray" },
                          { key: "search", label: "No Results" },
                          { key: "closed", label: "Closed Counter" },
                          { key: "orders", label: "No Deliveries" },
                        ] as const
                      ).map((sc) => (
                        <button
                          key={sc.key}
                          onClick={() => setEmptyScenario(sc.key)}
                          className={cn(
                            "px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center",
                            emptyScenario === sc.key
                              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                              : "bg-card border-border text-foreground hover:bg-muted"
                          )}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Variant */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      Variant (<code className="text-primary font-mono text-[11px]">{emptyVariant}</code>)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["default", "subtle", "card", "dashed"] as EmptyStateVariant[]).map((v) => (
                        <button
                          key={v}
                          onClick={() => setEmptyVariant(v)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all",
                            emptyVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                              : "bg-card border-border text-foreground hover:bg-muted"
                          )}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      Size (<code className="text-primary font-mono text-[11px]">{emptySize}</code>)
                    </label>
                    <div className="flex gap-2">
                      {(["sm", "md", "lg"] as EmptyStateSize[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setEmptySize(s)}
                          className={cn(
                            "flex-1 py-1.5 text-xs font-semibold rounded-lg border uppercase transition-all",
                            emptySize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                              : "bg-card border-border text-foreground hover:bg-muted"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded (Corner Radius) */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      Corner Radius (<code className="text-primary font-mono text-[11px]">{emptyRounded}</code>)
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as EmptyStateRounded[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => setEmptyRounded(r)}
                          className={cn(
                            "py-1 text-[11px] font-semibold rounded-md border transition-all",
                            emptyRounded === r
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview Box */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="p-6 sm:p-10 bg-muted/10 border border-border/70 rounded-2xl flex items-center justify-center min-h-[360px]">
                    {emptyScenario === "cart" && (
                      <EmptyState
                        variant={emptyVariant}
                        size={emptySize}
                        rounded={emptyRounded}
                        icon={<CartIcon />}
                        badge={<Badge variant="subtle" size="sm">Tray is empty</Badge>}
                        title="Your campus food tray is empty"
                        description="Explore daily specials, artisan pizzas, and refreshing cold drinks from our central dining halls."
                        action={
                          <Button variant="primary" size="sm">
                            Explore Dining Halls
                          </Button>
                        }
                        secondaryAction={
                          <Button variant="outline" size="sm">
                            Re-order Past Meal
                          </Button>
                        }
                      />
                    )}

                    {emptyScenario === "search" && (
                      <EmptyState
                        variant={emptyVariant}
                        size={emptySize}
                        rounded={emptyRounded}
                        icon={<Search />}
                        badge={<Badge variant="secondary" size="sm">0 results found</Badge>}
                        title="No cafeteria dishes found"
                        description="We couldn't find matches for your search keywords. Try adjusting dietary filters or browse popular categories."
                        action={
                          <Button variant="primary" size="sm">
                            Clear Search Filter
                          </Button>
                        }
                        secondaryAction={
                          <Button variant="ghost" size="sm">
                            View All Categories
                          </Button>
                        }
                      />
                    )}

                    {emptyScenario === "closed" && (
                      <EmptyState
                        variant={emptyVariant}
                        size={emptySize}
                        rounded={emptyRounded}
                        icon={<Clock />}
                        badge={<Badge variant="popular" size="sm">Opens at 5:00 PM</Badge>}
                        title="Night Kitchen station is closed"
                        description="This food counter is currently prepping for dinner service. Check nearby active stations for fast pickup."
                        action={
                          <Button variant="primary" size="sm">
                            Browse Open Food Stalls
                          </Button>
                        }
                      />
                    )}

                    {emptyScenario === "orders" && (
                      <EmptyState
                        variant={emptyVariant}
                        size={emptySize}
                        rounded={emptyRounded}
                        icon={<Bike />}
                        badge={<Badge variant="available" size="sm">Ready to order</Badge>}
                        title="No active deliveries in progress"
                        description="You don't have any ongoing meal deliveries or pickup orders. Place an order to track live preparation!"
                        action={
                          <Button variant="primary" size="sm">
                            Order Campus Lunch
                          </Button>
                        }
                      />
                    )}
                  </div>

                  {/* Code snippet */}
                  <div className="p-4 rounded-xl bg-muted/40 border border-border font-mono text-xs overflow-x-auto text-muted-foreground">
                    <span className="text-primary">&lt;EmptyState</span>
                    <br />
                    &nbsp;&nbsp;variant=&quot;{emptyVariant}&quot;
                    <br />
                    &nbsp;&nbsp;size=&quot;{emptySize}&quot;
                    <br />
                    &nbsp;&nbsp;rounded=&quot;{emptyRounded}&quot;
                    <br />
                    &nbsp;&nbsp;icon=&#123;&lt;CartIcon /&gt;&#125;
                    <br />
                    &nbsp;&nbsp;title=&quot;Your campus food tray is empty&quot;
                    <br />
                    &nbsp;&nbsp;description=&quot;Explore daily specials from central dining...&quot;
                    <br />
                    &nbsp;&nbsp;action=&#123;&lt;Button variant=&quot;primary&quot;&gt;Explore Dining Halls&lt;/Button&gt;&#125;
                    <br />
                    <span className="text-primary">/&gt;</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Food Ordering Scenarios Grid */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Campus Food Ordering Scenarios</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Production-grade empty states customized for carts, filter results, closed counters, and notifications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Empty Cart */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-2xs flex flex-col justify-between">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Scenario 1 • Empty Food Tray
                  </div>
                  <EmptyState
                    variant="subtle"
                    size="sm"
                    rounded="xl"
                    icon={<CartIcon />}
                    badge={<Badge variant="subtle" size="sm">0 items in tray</Badge>}
                    title="Your food tray is empty"
                    description="You haven't added any delicious meals or cold drinks yet. Check out student favorites!"
                    action={<Button variant="primary" size="sm">Start Ordering</Button>}
                  />
                </div>

                {/* 2. No Search Results */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-2xs flex flex-col justify-between">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Scenario 2 • Filter / Search Miss
                  </div>
                  <EmptyState
                    variant="dashed"
                    size="sm"
                    rounded="xl"
                    icon={<Search />}
                    title="No cafeteria dishes found"
                    description="No meals match your criteria. Try searching for &quot;Burger&quot;, &quot;Salad&quot;, or &quot;Latte&quot;."
                    action={<Button variant="outline" size="sm">Reset All Filters</Button>}
                  />
                </div>

                {/* 3. Station Closed */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-2xs flex flex-col justify-between">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Scenario 3 • Closed Food Station
                  </div>
                  <EmptyState
                    variant="card"
                    size="sm"
                    rounded="xl"
                    icon={<Store />}
                    badge={<Badge variant="popular" size="sm">Closed until 5 PM</Badge>}
                    title="Station Closed for Prep"
                    description="Express Grill is preparing the evening dinner service. Other stalls are currently serving."
                    action={<Button variant="subtle" size="sm">Find Open Counters</Button>}
                  />
                </div>

                {/* 4. No Active Live Orders */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-2xs flex flex-col justify-between">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Scenario 4 • Live Order Tracker
                  </div>
                  <EmptyState
                    variant="default"
                    size="sm"
                    rounded="xl"
                    icon={<Bike />}
                    badge={<Badge variant="available" size="sm">All orders delivered</Badge>}
                    title="No active orders"
                    description="You don't have any ongoing deliveries. When you place an order, live tracking appears here."
                    action={<Button variant="primary" size="sm">Browse Campus Menus</Button>}
                  />
                </div>
              </div>
            </section>

            {/* Visual Variants Showcase */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Visual Variants (4 Styles)</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Consistent tokens: <code className="text-xs font-mono text-primary">default</code> (minimal/transparent), <code className="text-xs font-mono text-primary">subtle</code> (soft brand tint), <code className="text-xs font-mono text-primary">card</code> (solid card), and <code className="text-xs font-mono text-primary">dashed</code> (interactive drop-zone style).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(["default", "subtle", "card", "dashed"] as EmptyStateVariant[]).map((v) => (
                  <div key={v} className="flex flex-col space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground capitalize">
                      Variant: {v}
                    </span>
                    <EmptyState
                      variant={v}
                      size="sm"
                      rounded="xl"
                      icon={<Coffee />}
                      title={`Empty ${v} state`}
                      description="Clean campusbite styling tokens."
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Size Proportions */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Size Proportions (sm, md, lg)</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Proportionate icon box sizes, typography scale, padding, and vertical spacing.
                </p>
              </div>

              <div className="space-y-6">
                {(["sm", "md", "lg"] as EmptyStateSize[]).map((s) => (
                  <div key={s} className="border border-border rounded-xl p-4 bg-muted/10 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Size: {s}
                    </span>
                    <EmptyState
                      variant="card"
                      size={s}
                      rounded="xl"
                      icon={<Utensils />}
                      badge={<Badge variant="secondary" size="sm">Size: {s}</Badge>}
                      title={`Demonstrating ${s.toUpperCase()} Empty State`}
                      description="Optical icon sizing with scalable SVG container and typography balance."
                      action={<Button variant="primary" size={s === "lg" ? "md" : "sm"}>Primary Action</Button>}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Compound Components Pattern */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Compound Component Sub-parts</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  You can also compose custom layouts using <code className="text-xs font-mono text-primary">&lt;EmptyStateIcon&gt;</code>, <code className="text-xs font-mono text-primary">&lt;EmptyStateTitle&gt;</code>, <code className="text-xs font-mono text-primary">&lt;EmptyStateDescription&gt;</code>, and <code className="text-xs font-mono text-primary">&lt;EmptyStateActions&gt;</code>.
                </p>
              </div>

              <div className="p-8 bg-primary-subtle/20 border border-primary-200/40 rounded-2xl text-center">
                <EmptyState variant="default" size="md" rounded="xl">
                  <EmptyStateIcon size="md">
                    <Sparkles />
                  </EmptyStateIcon>
                  <EmptyStateTitle size="md">
                    Compound Layout Composition
                  </EmptyStateTitle>
                  <EmptyStateDescription size="md">
                    Gives full control to insert custom badges, countdown timers, search inputs, or multi-button clusters directly inside the empty state.
                  </EmptyStateDescription>
                  <EmptyStateActions>
                    <Button variant="primary" size="sm">Custom Primary</Button>
                    <Button variant="outline" size="sm">Custom Secondary</Button>
                  </EmptyStateActions>
                </EmptyState>
              </div>
            </section>
          </div>
        )}

        {/* ======================= SKELETON COMPONENT TAB ======================= */}
        {activeTab === "skeleton" && (
          <div className="space-y-10">
            {/* Interactive Skeleton Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Skeleton Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Skeleton screen placeholders supporting pulse, liquid wave shimmer, configurable border radius, and food-ordering presets.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Animation Style */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Animation Mode (`animation`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["shimmer", "pulse", "none"] as SkeletonAnimation[]).map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setSkeletonAnimation(a)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            skeletonAnimation === a
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {a} {a === "shimmer" && "✨ (Liquid Wave)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Corner Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "xl", "2xl", "full"] as SkeletonRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSkeletonRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            skeletonRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulate Loading Toggle */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Interactive Simulation
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant={isLoadingContent ? "primary" : "outline"}
                        onClick={() => setIsLoadingContent((prev) => !prev)}
                        size="sm"
                      >
                        {isLoadingContent ? "Switch to Loaded Content" : "Simulate Loading Skeleton"}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        Current view: <strong className="text-foreground">{isLoadingContent ? "Skeleton Loading" : "Real Content"}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Preview Display */}
                <div className="lg:col-span-5 bg-background/50 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        Live Preview ({skeletonRounded})
                      </span>
                      <Badge variant={isLoadingContent ? "discount" : "available"} size="sm">
                        {isLoadingContent ? "Loading..." : "Ready"}
                      </Badge>
                    </div>

                    {/* Direct Primitive Skeleton Test Row */}
                    <div className="p-3.5 mb-4 rounded-xl border border-border/70 bg-card space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                          Direct Primitive: rounded="{skeletonRounded}"
                        </span>
                        <span className="text-[11px] font-mono text-primary font-bold">
                          {skeletonRounded}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 flex-1" rounded={skeletonRounded} animation={skeletonAnimation} />
                        <Skeleton className="h-8 w-24" rounded={skeletonRounded} animation={skeletonAnimation} />
                        <Skeleton className="h-8 w-12" rounded={skeletonRounded} animation={skeletonAnimation} />
                      </div>
                    </div>

                    {isLoadingContent ? (
                      <SkeletonFoodCard
                        animation={skeletonAnimation}
                        rounded={skeletonRounded}
                      />
                    ) : (
                      <div className="p-5 border border-border/80 bg-card rounded-2xl shadow-xs space-y-4">
                        <div className="w-full h-36 rounded-xl bg-primary-subtle/50 flex items-center justify-center text-primary text-4xl">
                          🍔
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-foreground text-sm">Double Peri-Peri Smash</h4>
                            <Badge variant="popular" size="sm">Popular</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Two beef patties, melted cheddar, campus sauce.</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <span className="font-mono font-bold text-primary text-base">$8.20</span>
                          <Button size="sm" leftIcon={<CartIcon />}>Add to Cart</Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Code snippet */}
                  <div className="bg-card p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground overflow-x-auto">
                    <code>
                      {isLoadingContent
                        ? `<Skeleton rounded="${skeletonRounded}" animation="${skeletonAnimation}" />\n<SkeletonFoodCard rounded="${skeletonRounded}" animation="${skeletonAnimation}" />`
                        : `<FoodCard title="Double Peri-Peri" price={8.20} />`}
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Presets Gallery */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Skeleton Helper Presets</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Built-in placeholders for text paragraphs, vendor avatars, action buttons, and food cards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Preset 1: Text Paragraphs */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    &lt;SkeletonText lines=&#123;4&#125; rounded="{skeletonRounded}" /&gt;
                  </span>
                  <div className="space-y-3 pt-2">
                    <SkeletonText lines={4} rounded={skeletonRounded} animation={skeletonAnimation} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Multi-line text with an automatically shortened final line for natural paragraph simulation.
                  </p>
                </div>

                {/* Preset 2: Avatars & Badges */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    &lt;SkeletonAvatar rounded="{skeletonRounded}" /&gt;
                  </span>
                  <div className="flex items-center gap-3 pt-2">
                    <SkeletonAvatar size="lg" rounded={skeletonRounded} animation={skeletonAnimation} />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" rounded={skeletonRounded} animation={skeletonAnimation} />
                      <Skeleton className="h-3 w-1/2" rounded={skeletonRounded} animation={skeletonAnimation} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="h-6 w-16" rounded={skeletonRounded} animation={skeletonAnimation} />
                    <Skeleton className="h-6 w-20" rounded={skeletonRounded} animation={skeletonAnimation} />
                    <Skeleton className="h-6 w-14" rounded={skeletonRounded} animation={skeletonAnimation} />
                  </div>
                </div>

                {/* Preset 3: Buttons & Controls */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    &lt;SkeletonButton rounded="{skeletonRounded}" /&gt;
                  </span>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <SkeletonButton size="sm" rounded={skeletonRounded} animation={skeletonAnimation} />
                      <SkeletonButton size="sm" rounded={skeletonRounded} animation={skeletonAnimation} className="w-16" />
                    </div>
                    <SkeletonButton size="md" className="w-full" rounded={skeletonRounded} animation={skeletonAnimation} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Button-shaped loading boxes matching size scales (`sm`, `md`, `lg`).
                  </p>
                </div>
              </div>

              {/* Grid of 3 Food Cards */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Food Menu Grid Loading State</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <SkeletonFoodCard animation={skeletonAnimation} rounded={skeletonRounded} />
                  <SkeletonFoodCard animation={skeletonAnimation} rounded={skeletonRounded} />
                  <SkeletonFoodCard animation={skeletonAnimation} rounded={skeletonRounded} />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= DRAWER COMPONENT TAB ======================= */}
        {activeTab === "drawer" && (
          <div className="space-y-10">
            {/* Interactive Drawer Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Drawer Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Multi-directional slide-over panel supporting right cart drawers, mobile bottom sheets with grab handles, left navigation, and top banners.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Direction */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Slide Direction (`direction`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["right", "bottom", "left", "top"] as DrawerDirection[]).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDrawerDirection(d)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            drawerDirection === d
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Drawer Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg", "xl", "full"] as DrawerSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setDrawerSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all uppercase ${
                            drawerSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Corner Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as DrawerRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setDrawerRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            drawerRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Trigger Controls
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => setDrawerOpen(true)} leftIcon={<CartIcon />}>
                        Open {drawerDirection.toUpperCase()} Drawer ({drawerRounded})
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Live Preview Display */}
                <div className="lg:col-span-5 bg-background/50 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        Drawer Status
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-foreground">
                        State: <strong className={drawerOpen ? "text-primary" : "text-muted-foreground"}>{drawerOpen ? "OPEN" : "CLOSED"}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Slide-over panel rendered into <code className="font-mono text-foreground">document.body</code> portal. Features smooth entrance transitions, scroll locking with anti-vibration padding, and inherited button corner curvature.
                    </p>
                  </div>

                  {/* Code snippet */}
                  <div className="bg-card p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground overflow-x-auto">
                    <code>
                      {`<Drawer direction="${drawerDirection}" size="${drawerSize}" rounded="${drawerRounded}">\n  <DrawerTrigger>Open Drawer</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Title</DrawerTitle>\n      <DrawerDescription>Subtitle</DrawerDescription>\n    </DrawerHeader>\n    <DrawerBody>Content</DrawerBody>\n    <DrawerFooter>\n      <DrawerClose>Close</DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`}
                    </code>
                  </div>
                </div>
              </div>

              {/* Standard Controlled Drawer Instance */}
              <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                direction={drawerDirection}
                size={drawerSize}
                rounded={drawerRounded}
              >
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Campus Dining Customizer</DrawerTitle>
                    <DrawerDescription>
                      Adjust your order preferences, dietary accommodations, and delivery instructions.
                    </DrawerDescription>
                  </DrawerHeader>

                  <DrawerBody className="space-y-4">
                    <div className="p-4 rounded-xl bg-primary-subtle text-primary border border-primary/20 space-y-1.5 text-xs">
                      <div className="font-bold flex items-center gap-1.5">
                        <Flame className="w-4 h-4" /> Live Kitchen Station Notice
                      </div>
                      <p className="text-primary/90">
                        Peak lunch hour in progress. Orders placed now have an estimated wait time of 8-12 minutes.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">Meal Customization Notes</label>
                      <Textarea
                        placeholder="e.g. No jalapeños, extra house sauce on the side..."
                        rows={3}
                      />
                    </div>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDrawerOpen(false)} leftIcon={<Check />}>
                      Save Preferences
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </section>

            {/* Real World Food Ordering Drawer Scenarios */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World CampusBite Drawers</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Everyday food ordering interfaces: Right Slide-Over Cart and Mobile Filter Bottom Sheet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scenario 1: Cart Slide-Over (Right Drawer) */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">1. Campus Cart Slide-Over</h3>
                    <Badge variant="popular" size="sm">Right Drawer</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Interactive side drawer displaying ordered food items, quantity controls, and checkout summary.
                  </p>

                  <Button onClick={() => setCartDrawerOpen(true)} leftIcon={<CartIcon />}>
                    View Active Cart (3 items)
                  </Button>

                  <Drawer
                    open={cartDrawerOpen}
                    onOpenChange={setCartDrawerOpen}
                    direction="right"
                    size="md"
                    rounded="2xl"
                  >
                    <DrawerContent>
                      <DrawerHeader>
                        <div className="flex items-center justify-between">
                          <DrawerTitle>Your Order Cart</DrawerTitle>
                          <Badge variant="popular" size="sm">3 Items</Badge>
                        </div>
                        <DrawerDescription>
                          Central Dining Hall, Counter #4 Pickup
                        </DrawerDescription>
                      </DrawerHeader>

                      <DrawerBody className="space-y-4">
                        {/* Cart Item 1 */}
                        <div className="p-3.5 rounded-xl bg-card border border-border space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-foreground text-sm">Double Peri-Peri Smash Burger</h4>
                              <p className="text-xs text-muted-foreground">Extra campus sauce, medium fries</p>
                            </div>
                            <span className="font-mono font-bold text-primary text-sm">$8.20</span>
                          </div>
                        </div>

                        {/* Cart Item 2 */}
                        <div className="p-3.5 rounded-xl bg-card border border-border space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-foreground text-sm">Iced Caramel Cinnamon Brew</h4>
                              <p className="text-xs text-muted-foreground">Oat milk, 50% sugar</p>
                            </div>
                            <span className="font-mono font-bold text-primary text-sm">$4.20</span>
                          </div>
                        </div>

                        {/* Cart Item 3 */}
                        <div className="p-3.5 rounded-xl bg-card border border-border space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-foreground text-sm">Warm Fresh Cookie</h4>
                              <p className="text-xs text-muted-foreground">Triple chocolate chip</p>
                            </div>
                            <span className="font-mono font-bold text-primary text-sm">$2.30</span>
                          </div>
                        </div>
                      </DrawerBody>

                      <DrawerFooter className="flex-col !items-stretch">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-foreground text-sm">Subtotal</span>
                          <span className="font-mono font-bold text-primary text-base">$14.70</span>
                        </div>
                        <Button onClick={() => setCartDrawerOpen(false)} leftIcon={<ArrowRight />}>
                          Proceed to Payment ($14.70)
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>

                {/* Scenario 2: Mobile Filter Bottom Sheet (Bottom Drawer) */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">2. Dietary Filter Bottom Sheet</h3>
                    <Badge variant="available" size="sm">Bottom Sheet</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mobile-optimized bottom sheet with grab handle pill for filtering cafeteria stations and diets.
                  </p>

                  <Button variant="outline" onClick={() => setBottomSheetOpen(true)}>
                    Open Filter Bottom Sheet
                  </Button>

                  <Drawer
                    open={bottomSheetOpen}
                    onOpenChange={setBottomSheetOpen}
                    direction="bottom"
                    size="md"
                    rounded="3xl"
                  >
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Filter Food Stations & Diets</DrawerTitle>
                        <DrawerDescription>
                          Show cafeteria menus matching your nutritional preferences.
                        </DrawerDescription>
                      </DrawerHeader>

                      <DrawerBody className="space-y-4">
                        <div className="space-y-2.5">
                          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                            Dietary Accommodations
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Checkbox label="Vegetarian & Vegan" defaultChecked />
                            <Checkbox label="Halal Certified Counter" defaultChecked />
                            <Checkbox label="Gluten-Friendly Kitchen" />
                            <Checkbox label="Nut-Free Facility" />
                          </div>
                        </div>
                      </DrawerBody>

                      <DrawerFooter>
                        <Button variant="outline" onClick={() => setBottomSheetOpen(false)}>
                          Reset Filters
                        </Button>
                        <Button onClick={() => setBottomSheetOpen(false)}>
                          Apply Filters
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= DIALOG COMPONENT TAB ======================= */}
        {activeTab === "dialog" && (
          <div className="space-y-10">
            {/* Interactive Dialog Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Dialog Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Modal dialog overlay with scroll lock, backdrop blur, keyboard escape listener, and compound components.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Modal Width (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg", "xl", "full"] as DialogSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setDialogSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all uppercase ${
                            dialogSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Corner Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as DialogRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setDialogRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dialogRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Trigger Controls
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => setDialogOpen(true)} leftIcon={<Utensils />}>
                        Open {dialogSize.toUpperCase()} Dialog ({dialogRounded})
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Live Preview Display */}
                <div className="lg:col-span-5 bg-background/50 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        Modal Status
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-foreground">
                        State: <strong className={dialogOpen ? "text-primary" : "text-muted-foreground"}>{dialogOpen ? "OPEN" : "CLOSED"}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Click the button above to trigger the dialog. It handles smooth portal rendering to <code className="font-mono text-foreground">document.body</code>, traps keyboard focus, and locks background scrolling without layout vibration/shift.
                    </p>
                  </div>

                  {/* Code snippet */}
                  <div className="bg-card p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground overflow-x-auto">
                    <code>
                      {`<Dialog size="${dialogSize}" rounded="${dialogRounded}">\n  <DialogTrigger>Open</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Title</DialogTitle>\n      <DialogDescription>Text</DialogDescription>\n    </DialogHeader>\n    <DialogBody>Content</DialogBody>\n    <DialogFooter>\n      <DialogClose>Cancel</DialogClose>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`}
                    </code>
                  </div>
                </div>
              </div>

              {/* Standard Controlled Dialog Instance */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen} size={dialogSize} rounded={dialogRounded}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Campus Dining Hall Notice</DialogTitle>
                    <DialogDescription>
                      Important schedule adjustments for finals week dinner services.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogBody className="space-y-3">
                    <p>
                      Central Dining Hall and Student Union Food Court will operate on extended hours throughout the upcoming finals week (Nov 15 – Nov 22).
                    </p>
                    <div className="p-3.5 rounded-xl bg-primary-subtle text-primary border border-primary/20 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> Late Night Breakfast Counter
                      </div>
                      <p className="text-primary/90">
                        Pancakes, coffee, and grilled wraps served until 2:00 AM daily with student ID.
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mobile orders placed via CampusBite will receive priority counter preparation.
                    </p>
                  </DialogBody>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Dismiss
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>
                      Understood
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </section>

            {/* Food Ordering Real-World Dialog Scenarios */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World CampusBite Dialogs</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Production modal flows for order checkout confirmations, meal customizations, and cancellations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scenario 1: Order Checkout Confirmation Modal */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">1. Order Checkout Summary</h3>
                    <Badge variant="popular" size="sm">Cart Flow</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Review items, delivery destination, payment deduction, and total before sending to kitchen.
                  </p>

                  <Button onClick={() => setOrderDialogOpen(true)} leftIcon={<CartIcon />}>
                    Review & Confirm Order ($14.70)
                  </Button>

                  <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen} size="md">
                    <DialogContent>
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          <DialogTitle>Confirm Your Order</DialogTitle>
                          <Badge variant="popular" size="sm">Counter #4</Badge>
                        </div>
                        <DialogDescription>
                          Review your items before dispatching order to Central Dining Hall kitchen.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogBody className="space-y-4">
                        {/* Order Items */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/60">
                            <div>
                              <span className="font-semibold text-foreground">1x Double Peri-Peri Smash Burger</span>
                              <p className="text-muted-foreground text-[11px]">Extra crispy fries, campus sauce</p>
                            </div>
                            <span className="font-mono font-bold text-foreground">$8.20</span>
                          </div>

                          <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/60">
                            <div>
                              <span className="font-semibold text-foreground">1x Iced Caramel Cinnamon Brew</span>
                              <p className="text-muted-foreground text-[11px]">Oat milk, 50% sweetness</p>
                            </div>
                            <span className="font-mono font-bold text-foreground">$4.20</span>
                          </div>

                          <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/60">
                            <div>
                              <span className="font-semibold text-foreground">1x Fresh Baked Chocolate Cookie</span>
                              <p className="text-muted-foreground text-[11px]">Warm counter pickup</p>
                            </div>
                            <span className="font-mono font-bold text-foreground">$2.30</span>
                          </div>
                        </div>

                        {/* Delivery & Payment Info */}
                        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/40 text-xs">
                          <div>
                            <span className="text-muted-foreground block text-[11px]">Fulfillment:</span>
                            <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                              <Store className="w-3.5 h-3.5 text-primary" /> Express Pickup
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[11px]">Payment Method:</span>
                            <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                              <CreditCard className="w-3.5 h-3.5 text-primary" /> Student ID Pay
                            </span>
                          </div>
                        </div>

                        {/* Total Summary */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="font-bold text-foreground">Total Charged:</span>
                          <span className="text-base font-bold text-primary font-mono">$14.70</span>
                        </div>
                      </DialogBody>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOrderDialogOpen(false)}>
                          Modify Order
                        </Button>
                        <Button onClick={() => setOrderDialogOpen(false)} leftIcon={<Check />}>
                          Place Order Now
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Scenario 2: Cancel Order Destructive Alert */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">2. Destructive Action Alert</h3>
                    <Badge variant="destructive" size="sm">Warning</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Confirmation modal before cancelling an order in progress or discarding cafeteria cart.
                  </p>

                  <Button variant="destructive" onClick={() => setCancelDialogOpen(true)}>
                    Cancel Active Order #CB-8924
                  </Button>

                  <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen} size="sm">
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-destructive">Cancel Order?</DialogTitle>
                        <DialogDescription>
                          This action will notify the campus kitchen to halt meal preparation.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogBody className="space-y-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Are you sure you want to cancel order <strong className="text-foreground font-semibold">#CB-8924</strong>? If the kitchen has already begun grilling, cancellation fees may apply to your student card account.
                        </p>
                      </DialogBody>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                          Keep Order
                        </Button>
                        <Button variant="destructive" onClick={() => setCancelDialogOpen(false)}>
                          Yes, Cancel Order
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= RADIO GROUP COMPONENT TAB ======================= */}
        {activeTab === "radiogroup" && (
          <div className="space-y-10">
            {/* Interactive RadioGroup Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive RadioGroup Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Single-choice selection component supporting standard radio indicators, horizontal flows, and food-ordering card tiles.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["default", "card"] as RadioVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setRadioVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            radioVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as RadioSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRadioSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            radioSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orientation */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Orientation (`orientation`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["vertical", "horizontal"] as RadioOrientation[]).map((o) => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setRadioOrientation(o)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            radioOrientation === o
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Toggles */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Interactive States
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <Checkbox
                        size="sm"
                        label="Error state"
                        checked={radioHasError}
                        onChange={(e) => setRadioHasError(e.target.checked)}
                      />
                      <Checkbox
                        size="sm"
                        label="Disabled group"
                        checked={radioDisabled}
                        onChange={(e) => setRadioDisabled(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview Display */}
                <div className="lg:col-span-5 bg-background/50 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        Live Preview
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-foreground">
                        Selected: <strong className="text-primary font-bold">{radioValue}</strong>
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-dashed border-border/80 bg-card">
                      <RadioGroup
                        value={radioValue}
                        onChange={setRadioValue}
                        size={radioSize}
                        variant={radioVariant}
                        orientation={radioOrientation}
                        disabled={radioDisabled}
                        error={radioHasError ? "Please select a fulfillment method to proceed." : undefined}
                        label="Select Campus Fulfillment Method"
                        required
                        helperText="Estimated arrival times updated live based on kitchen queue."
                      >
                        <RadioGroupItem
                          value="delivery"
                          label="Dorm Delivery"
                          description="Courier delivers straight to your residential hall entrance."
                          icon={<Bike />}
                          badge={<Badge variant="popular" size="sm">Fastest</Badge>}
                        />
                        <RadioGroupItem
                          value="pickup"
                          label="Express Counter Pickup"
                          description="Skip lines at Campus Central Dining Hall, Counter #4."
                          icon={<Store />}
                          badge={<Badge variant="available" size="sm">Ready in 5m</Badge>}
                        />
                        <RadioGroupItem
                          value="dine_in"
                          label="Cafeteria Dine-In"
                          description="Reserved seating at Student Center table with food bell."
                          icon={<Utensils />}
                        />
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div className="bg-card p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground overflow-x-auto">
                    <code>
                      {`<RadioGroup value="${radioValue}" size="${radioSize}" variant="${radioVariant}">\n  <RadioGroupItem value="delivery" label="Dorm Delivery" />\n  <RadioGroupItem value="pickup" label="Express Pickup" />\n</RadioGroup>`}
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Food Ordering Real-World Card Radios */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Food Ordering Real-World Scenarios</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  How RadioGroup is applied across CampusBite meal customizations, portions, and payments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scenario 1: Portion Size Selector */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <h3 className="font-bold text-foreground flex items-center justify-between">
                    <span>1. Portion Size Options</span>
                    <Badge variant="subtle" size="sm">Required</Badge>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Card radio selector for double patties, sides, and drink combos.
                  </p>

                  <RadioGroup defaultValue="regular" variant="card" size="md">
                    <RadioGroupItem
                      value="small"
                      label="Standard Single Patty"
                      description="120g beef patty with classic house seasoning."
                      badge={<span className="text-xs font-mono font-bold text-foreground">$5.50</span>}
                    />
                    <RadioGroupItem
                      value="regular"
                      label="Double Deluxe Combo"
                      description="Two patties + melted cheese + seasoned campus fries."
                      badge={<span className="text-xs font-mono font-bold text-primary">$8.20</span>}
                    />
                    <RadioGroupItem
                      value="jumbo"
                      label="Campus Beast Monster Box"
                      description="Three patties + bacon + waffle fries + beverage."
                      badge={<span className="text-xs font-mono font-bold text-foreground">$11.00</span>}
                    />
                  </RadioGroup>
                </div>

                {/* Scenario 2: Payment Method */}
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <h3 className="font-bold text-foreground flex items-center justify-between">
                    <span>2. Campus Checkout Payment</span>
                    <Badge variant="subtle" size="sm">Single Choice</Badge>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Quick tap radio choices supporting Student ID card balance or credit.
                  </p>

                  <RadioGroup defaultValue="campus_card" variant="card" size="md">
                    <RadioGroupItem
                      value="campus_card"
                      label="Campus ID Smart Pay"
                      description="Deduct from semester meal balance: $84.50 remaining."
                      icon={<CreditCard />}
                      badge={<Badge variant="discount" size="sm">5% Student Rebate</Badge>}
                    />
                    <RadioGroupItem
                      value="credit_card"
                      label="Credit / Debit Card"
                      description="Visa, Mastercard, or Google Pay via campus terminal."
                      icon={<CreditCard />}
                    />
                    <RadioGroupItem
                      value="cash_counter"
                      label="Pay with Cash at Counter"
                      description="Pay physical currency when collecting your order."
                      icon={<Store />}
                    />
                  </RadioGroup>
                </div>
              </div>
            </section>

            {/* Standard Circular Radios & Horizontal Scales */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Standard Circular Radios & Sizes</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Classic circular indicators with centered typography and balanced scales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Size sm */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    size="sm" (compact)
                  </span>
                  <RadioGroup defaultValue="medium" size="sm" label="Spice Preference">
                    <RadioGroupItem value="mild" label="Mild (Gentle herbs)" />
                    <RadioGroupItem value="medium" label="Medium (Jalapeño kick)" />
                    <RadioGroupItem value="hot" label="Ghost Chili (Extreme)" />
                  </RadioGroup>
                </div>

                {/* Size md */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    size="md" (default)
                  </span>
                  <RadioGroup defaultValue="medium" size="md" label="Beverage Temperature">
                    <RadioGroupItem value="iced" label="Extra Iced" description="Chilled with cube ice" />
                    <RadioGroupItem value="room" label="Room Temperature" description="No ice added" />
                    <RadioGroupItem value="hot" label="Steamed Hot" description="Served at 70°C" />
                  </RadioGroup>
                </div>

                {/* Size lg */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    size="lg" (prominent)
                  </span>
                  <RadioGroup defaultValue="fast" size="lg" label="Delivery Urgency">
                    <RadioGroupItem value="standard" label="Standard (25-30m)" />
                    <RadioGroupItem value="fast" label="Priority Rush (10-15m)" />
                  </RadioGroup>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= BADGE COMPONENT TAB ======================= */}
        {activeTab === "badge" && (
          <div className="space-y-10">
            {/* Interactive Badge Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Badge Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview badges with custom variants, icons, live status dots, and sizes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "popular",
                          "new",
                          "discount",
                          "available",
                          "primary",
                          "secondary",
                          "outline",
                          "subtle",
                          "destructive",
                        ] as BadgeVariant[]
                      ).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setBadgeVariant(v);
                            if (v === "popular") setBadgeText("Most Popular");
                            else if (v === "new") setBadgeText("New Dish");
                            else if (v === "discount") setBadgeText("20% OFF");
                            else if (v === "available") {
                              setBadgeText("Available Now");
                              setBadgeDot(true);
                              setBadgePulse(true);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${
                            badgeVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as BadgeSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setBadgeSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            badgeSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "full"] as BadgeRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setBadgeRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            badgeRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Badge Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={badgeDot}
                          onChange={(e) => setBadgeDot(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Dot Indicator (`dot`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={badgePulse}
                          onChange={(e) => setBadgePulse(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Pulsing Dot (`pulse`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={badgeWithIcon}
                          onChange={(e) => setBadgeWithIcon(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>With Icon</span>
                      </label>
                    </div>
                  </div>

                  {/* Custom Label */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full max-w-sm px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 border border-border min-h-[260px] space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-xl shadow-xs">
                    <Badge
                      variant={badgeVariant}
                      size={badgeSize}
                      rounded={badgeRounded}
                      dot={badgeDot}
                      pulse={badgePulse}
                      leftIcon={
                        badgeWithIcon ? (
                          badgeVariant === "popular" ? (
                            <Flame />
                          ) : badgeVariant === "new" ? (
                            <Sparkles />
                          ) : badgeVariant === "discount" ? (
                            <Tag />
                          ) : badgeVariant === "available" ? (
                            <Check />
                          ) : undefined
                        ) : undefined
                      }
                    >
                      {badgeText}
                    </Badge>
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Badge
  variant="${badgeVariant}"
  size="${badgeSize}"
  rounded="${badgeRounded}"${badgeDot ? "\n  dot" : ""}${badgePulse ? "\n  pulse" : ""}
>
  ${badgeText}
</Badge>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* The 4 Special Food & Menu Variants Showcase */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Core Food Platform Badges</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Specialized variants requested for CampusBite dishes, deals, and cafeteria items.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Popular */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="popular"
                    </span>
                    <Badge variant="popular" leftIcon={<Flame />}>
                      Popular
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Warm brand primary color (#c34e31) for student favorite meals and top-rated orders.
                  </p>
                </div>

                {/* New */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="new"
                    </span>
                    <Badge variant="new" leftIcon={<Sparkles />}>
                      New Dish
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fresh blue highlight to catch the eye for new seasonal items and menu additions.
                  </p>
                </div>

                {/* Discount */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="discount"
                    </span>
                    <Badge variant="discount" leftIcon={<Tag />}>
                      25% OFF
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Warm secondary amber color for student deals, meal combos, and promo discounts.
                  </p>
                </div>

                {/* Available */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      variant="available"
                    </span>
                    <Badge variant="available" dot pulse>
                      In Stock
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fresh green status badge with live pulsing dot for immediate counter pickup availability.
                  </p>
                </div>
              </div>
            </section>

            {/* Real World Food Card Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Menu Item Previews</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  How badges look attached to food items and campus dining cards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Menu Item 1: Popular Burger */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="popular" leftIcon={<Flame />}>
                      Campus Favorite
                    </Badge>
                    <span className="text-xs font-semibold text-primary font-mono">$6.50</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Double Peri-Peri Smash Burger</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Two grilled beef patties with melted cheddar and signature campus sauce.
                    </p>
                  </div>
                </div>

                {/* Menu Item 2: New Beverage */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="new" leftIcon={<Sparkles />}>
                      New Arrival
                    </Badge>
                    <span className="text-xs font-semibold text-primary font-mono">$4.20</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Iced Caramel Cinnamon Brew</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Slow-steeped cold brew with oat milk and brown sugar syrup.
                    </p>
                  </div>
                </div>

                {/* Menu Item 3: Discount Combo with Available Status */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="discount" leftIcon={<Tag />}>
                      Save $3.00
                    </Badge>
                    <Badge variant="available" dot pulse size="sm">
                      Ready in 5m
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Study Snack Power Combo</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Includes sandwich, fresh chips, and cold lemonade beverage.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= TEXTAREA COMPONENT TAB ======================= */}
        {activeTab === "textarea" && (
          <div className="space-y-10">
            {/* Interactive Textarea Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Textarea Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview multi-line input variants, size scales, corner radii, and live character counting.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["outline", "filled", "subtle"] as TextareaVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setTaVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`textareaSize`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as TextareaSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setTaSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "xl", "full"] as TextareaRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setTaRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resize */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Resize Behavior (`resize`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "vertical", "horizontal", "both"] as TextareaResize[]).map((rs) => (
                        <button
                          key={rs}
                          type="button"
                          onClick={() => setTaResize(rs)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            taResize === rs
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          resize-{rs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      State & Count Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taShowCount}
                          onChange={(e) => setTaShowCount(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Character Counter (`showCount`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taRequired}
                          onChange={(e) => setTaRequired(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Required Asterisk</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taError}
                          onChange={(e) => setTaError(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={taDisabled}
                          onChange={(e) => setTaDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full">
                    <Textarea
                      label={taLabel}
                      placeholder={taPlaceholder}
                      helperText={!taError ? taHelper : undefined}
                      error={taError ? "Please provide cooking instructions" : undefined}
                      variant={taVariant}
                      textareaSize={taSize}
                      rounded={taRounded}
                      resize={taResize}
                      showCount={taShowCount}
                      maxLength={150}
                      disabled={taDisabled}
                      required={taRequired}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Textarea
  label="${taLabel}"
  placeholder="${taPlaceholder}"
  variant="${taVariant}"
  textareaSize="${taSize}"
  rounded="${taRounded}"${taShowCount ? "\n  showCount\n  maxLength={150}" : ""}${taDisabled ? "\n  disabled" : ""}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Real World Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Examples</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Order delivery notes, kitchen allergy warnings, and dining feedback.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kitchen Allergy & Customization */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Kitchen Dietary Notes
                  </span>
                  <Textarea
                    label="Allergy Instructions"
                    placeholder="e.g. Peanut allergy, gluten intolerant..."
                    variant="outline"
                    showCount
                    maxLength={100}
                    helperText="Kitchen chef will strictly adhere to allergy notes."
                  />
                </div>

                {/* Delivery Drop-off Instructions (Filled) */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Rider Drop-off (Filled)
                  </span>
                  <Textarea
                    label="Hostel Room Directions"
                    defaultValue="Leave order with security desk if after 9 PM. Call upon arrival."
                    variant="filled"
                    rows={3}
                  />
                </div>

                {/* Review & Feedback (Subtle) */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Meal Review (Subtle)
                  </span>
                  <Textarea
                    label="Cafeteria Review"
                    placeholder="How was your spicy burger meal?"
                    variant="subtle"
                    showCount
                    maxLength={250}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= CHECKBOX COMPONENT TAB ======================= */}
        {activeTab === "checkbox" && (
          <div className="space-y-10">
            {/* Interactive Checkbox Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Checkbox Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview check states, indeterminate mode, size scales, and corner radii.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as CheckboxSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setCbSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            cbSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["none", "sm", "md", "lg", "full"] as CheckboxRounded[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setCbRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            cbRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Toggles */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      State Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbChecked}
                          onChange={(e) => setCbChecked(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Checked</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbIndeterminate}
                          onChange={(e) => setCbIndeterminate(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Indeterminate (`-`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbDisabled}
                          onChange={(e) => setCbDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cbError}
                          onChange={(e) => setCbError(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>
                    </div>
                  </div>

                  {/* Custom Label and Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                        Label Text
                      </label>
                      <input
                        type="text"
                        value={cbLabel}
                        onChange={(e) => setCbLabel(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                        Description Text
                      </label>
                      <input
                        type="text"
                        value={cbDescription}
                        onChange={(e) => setCbDescription(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full p-4 rounded-xl bg-card border border-border">
                    <Checkbox
                      label={cbLabel}
                      description={cbDescription}
                      size={cbSize}
                      rounded={cbRounded}
                      checked={cbChecked}
                      onChange={(e) => setCbChecked(e.target.checked)}
                      indeterminate={cbIndeterminate}
                      disabled={cbDisabled}
                      error={cbError ? "You must accept to continue" : undefined}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Checkbox
  label="${cbLabel}"
  description="${cbDescription}"
  size="${cbSize}"
  rounded="${cbRounded}"${cbIndeterminate ? "\n  indeterminate" : ""}${cbDisabled ? "\n  disabled" : ""}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Real World Food Ordering Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Examples</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Meal customization, dietary preferences, and checkout options.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Meal Add-ons */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Meal Customization Add-ons
                  </span>
                  <div className="space-y-3">
                    <Checkbox label="Extra Cheddar Cheese" description="+$1.00 • Melted rich cheddar" defaultChecked />
                    <Checkbox label="Spicy Peri-Peri Sauce" description="+$0.50 • Medium campus heat" />
                    <Checkbox label="Double Patty" description="+$2.50 • Extra 100g beef" />
                  </div>
                </div>

                {/* Dietary Filter Checkboxes */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Dietary Badges (Circular)
                  </span>
                  <div className="space-y-3">
                    <Checkbox label="Vegetarian Only" rounded="full" defaultChecked />
                    <Checkbox label="100% Halal Certified" rounded="full" defaultChecked />
                    <Checkbox label="Gluten-Free Prep" rounded="full" />
                  </div>
                </div>

                {/* Checkout Agreements */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase block">
                    Order Delivery Notification
                  </span>
                  <div className="space-y-3">
                    <Checkbox
                      label="SMS Delivery Alert"
                      description="Receive a text ping when rider is at your campus door."
                      defaultChecked
                    />
                    <Checkbox
                      label="Hostel Room Drop-off"
                      description="Leave order outside room door if in class."
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= DROPDOWN COMPONENT TAB ======================= */}
        {activeTab === "dropdown" && (
          <div className="space-y-10">
            {/* Interactive Dropdown Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Dropdown Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview selection, search filtering, sizes, radii, and validation states.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["outline", "filled", "subtle"] as DropdownVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setDropdownVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dropdownVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["sm", "md", "lg"] as DropdownSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setDropdownSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dropdownSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roundedOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setDropdownRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            dropdownRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Options & Modifiers
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownSearchable}
                          onChange={(e) => setDropdownSearchable(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Searchable (`isSearchable`)</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownRequired}
                          onChange={(e) => setDropdownRequired(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Required Asterisk</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownError}
                          onChange={(e) => setDropdownError(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownDisabled}
                          onChange={(e) => setDropdownDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownLeftIcon}
                          onChange={(e) => setDropdownLeftIcon(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Left Icon</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dropdownHideScrollbar}
                          onChange={(e) => setDropdownHideScrollbar(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Hide Scrollbar (`hideScrollbar`)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full">
                    <Dropdown
                      label="Pickup & Delivery Point"
                      options={campusLocations}
                      value={dropdownValue}
                      onChange={setDropdownValue}
                      variant={dropdownVariant}
                      size={dropdownSize}
                      rounded={dropdownRounded}
                      isSearchable={dropdownSearchable}
                      disabled={dropdownDisabled}
                      required={dropdownRequired}
                      error={dropdownError ? "Please select a designated campus location" : undefined}
                      helperText={!dropdownError ? "Your hot meal will be prepared near this station." : undefined}
                      leftIcon={dropdownLeftIcon ? <PinIcon /> : undefined}
                      hideScrollbar={dropdownHideScrollbar}
                    />
                  </div>

                  <div className="w-full">
                    <div className="text-xs text-muted-foreground mb-1 font-mono">Code Snippet:</div>
                    <pre className="p-3 bg-card border border-border rounded-lg text-xs font-mono overflow-x-auto text-primary">
{`<Dropdown
  label="Pickup Point"
  options={campusLocations}
  value="${dropdownValue}"
  onChange={setSelectedPoint}
  variant="${dropdownVariant}"
  size="${dropdownSize}"
  rounded="${dropdownRounded}"
  isSearchable={${dropdownSearchable}}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Real World Examples */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Real-World Examples</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Pre-configured dropdowns for campus food ordering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pill Category Filter */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Pill Category Filter
                  </span>
                  <Dropdown
                    placeholder="Filter by Food Category"
                    options={mealCategories}
                    defaultValue="meals"
                    rounded="full"
                    variant="outline"
                  />
                </div>

                {/* Searchable Station Picker */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Searchable Stations (Filled)
                  </span>
                  <Dropdown
                    label="Cafeteria Station"
                    options={campusLocations}
                    defaultValue="central"
                    variant="filled"
                    isSearchable
                  />
                </div>

                {/* Validation Error */}
                <div className="p-5 rounded-xl border border-border bg-background/50 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Error Validation State
                  </span>
                  <Dropdown
                    label="Required Dropdown"
                    options={mealCategories}
                    error="Selection is required to proceed"
                    required
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= INPUT COMPONENT TAB ======================= */}
        {activeTab === "input" && (
          <div className="space-y-10">
            {/* Interactive Input Playground */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Input Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Test and preview all combinations of variants, sizes, radii, and error states.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  {/* Variant */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inputVariants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setInputVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            inputVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`inputSize`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inputSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setInputSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            inputSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounded */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roundedOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setInputRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            inputRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State Toggles */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      State & Icon Controls
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inputRequired}
                          onChange={(e) => setInputRequired(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Required Asterisk</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasError}
                          onChange={(e) => {
                            setHasError(e.target.checked);
                            if (e.target.checked) setHasSuccess(false);
                          }}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Error State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasSuccess}
                          onChange={(e) => {
                            setHasSuccess(e.target.checked);
                            if (e.target.checked) setHasError(false);
                          }}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Success State</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inputDisabled}
                          onChange={(e) => setInputDisabled(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inputLeftIcon}
                          onChange={(e) => setInputLeftIcon(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                        />
                        <span>Left Icon</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-muted/30 border border-border space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <div className="w-full">
                    <Input
                      label={inputLabel}
                      placeholder={inputPlaceholder}
                      helperText={!hasError && !hasSuccess ? inputHelper : undefined}
                      error={hasError ? "Please enter a valid campus delivery room" : false}
                      success={hasSuccess}
                      variant={inputVariant}
                      inputSize={inputSize}
                      rounded={inputRounded}
                      disabled={inputDisabled}
                      required={inputRequired}
                      leftIcon={inputLeftIcon ? <PinIcon /> : undefined}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================= BUTTON COMPONENT TAB ======================= */}
        {activeTab === "button" && (
          <div className="space-y-10">
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Button Playground</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Customize button props and inspect live styling with the global theme.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Variant (`variant`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {btnVariants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setBtnVariant(v)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            btnVariant === v
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Size (`size`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {btnSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setBtnSize(s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            btnSize === s
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Border Radius (`rounded`)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {btnRoundedOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setBtnRounded(r)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            btnRounded === r
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          rounded-{r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={btnLoading}
                        onChange={(e) => setBtnLoading(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Loading (`isLoading`)</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={btnDisabled}
                        onChange={(e) => setBtnDisabled(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Disabled (`disabled`)</span>
                    </label>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-muted/40 border border-border min-h-[260px] space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Live Preview
                  </span>

                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    rounded={btnRounded}
                    isLoading={btnLoading}
                    disabled={btnDisabled}
                    leftIcon={btnLeftIcon ? <BagIcon /> : undefined}
                    rightIcon={btnRightIcon ? <ArrowRightIcon /> : undefined}
                  >
                    {btnSize.startsWith("icon") ? <BagIcon /> : btnText}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
