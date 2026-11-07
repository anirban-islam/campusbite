"use client";

import { useState } from "react";
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
} from "@/components/ui";

export default function DesignArchitecturePage() {
  const [activeTab, setActiveTab] = useState<"dropdown" | "input" | "button">("dropdown");

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

  const inputVariants: InputVariant[] = ["outline", "filled", "subtle"];
  const inputSizes: InputSize[] = ["sm", "md", "lg"];

  const BagIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );

  const PinIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

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
          <div className="flex gap-2 pt-2">
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
                      {roundedOptions.map((r) => (
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
