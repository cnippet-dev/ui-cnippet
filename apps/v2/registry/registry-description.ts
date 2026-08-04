/**
 * AI-facing registry of component variants.
 *
 * Ship this file alongside the `variants/` folder into any project. It has
 * no dependency on this repo's internal registry types — an AI coding agent
 * (e.g. Claude) reads `description` to pick the right pre-built variant file
 * for a UI request, then copies/imports it from `file`.
 */

export interface VariantDescription {
  /** Unique variant id, matches the exported component's source name. */
  name: string;
  /** Coarse component family, e.g. "accordion", "button". Filter by this first. */
  category: string;
  /** Path relative to the variants root, e.g. "variants/v-accordion-1.tsx". */
  file: string;
  /** Rich, task-oriented description: what it looks like, what it's for, when to use it. */
  description: string;
  /** Extra search terms not already implied by the description. */
  keywords?: string[];
}

export const variantDescriptions: VariantDescription[] = [
  // --- accordion ---
  {
    category: "accordion",
    description:
      "Baseline single-open accordion with three plain FAQ-style items (title + text panel). Last item starts expanded via defaultValue. Use as the starting point for any simple expand/collapse Q&A list with no styling extras.",
    file: "variants/v-accordion-1.tsx",
    name: "v-accordion-1",
  },
  {
    category: "accordion",
    description:
      "Identical minimal three-item accordion to v-accordion-1 but with no item open by default. Use when you want a fully collapsed accordion on initial render.",
    file: "variants/v-accordion-2.tsx",
    name: "v-accordion-2",
  },
  {
    category: "accordion",
    description:
      "Same three-item accordion with the `multiple` prop enabled, so more than one panel can stay open simultaneously. Use whenever the accordion should allow multiple sections expanded at once instead of auto-closing others.",
    file: "variants/v-accordion-3.tsx",
    keywords: ["multi-open", "multiple selection"],
    name: "v-accordion-3",
  },
  {
    category: "accordion",
    description:
      "Fully controlled accordion: value/onValueChange are lifted into component state, plus a Button that programmatically opens a specific set of items and a text line echoing which items are currently open. Use when the parent app needs to drive or read accordion open-state externally (e.g. 'expand all', deep-linking to a section, or syncing with other UI).",
    file: "variants/v-accordion-4.tsx",
    keywords: ["controlled", "programmatic open", "external state"],
    name: "v-accordion-4",
  },
  {
    category: "accordion",
    description:
      "Accordion whose trigger shows a Plus icon when closed and a Minus icon when open (via lucide-react, toggled with in-data-open CSS state) instead of the default chevron. Three feature-style items (Data Security, API Integration, Team Collaboration). Use when the design calls for +/- expand indicators rather than a rotating chevron.",
    file: "variants/v-accordion-5.tsx",
    keywords: ["plus minus icon", "expand collapse icon"],
    name: "v-accordion-5",
  },
  {
    category: "accordion",
    description:
      "Accordion with each item rendered as its own bordered, rounded-corner card with spacing between items (rather than one continuous bordered list). Billing/security/integrations FAQ content, one item open by default. Use for a segmented, card-like FAQ or settings-panel look instead of a flush list.",
    file: "variants/v-accordion-6.tsx",
    keywords: ["bordered items", "rounded cards", "segmented"],
    name: "v-accordion-6",
  },
  {
    category: "accordion",
    description:
      "Accordion embedded inside a Card with CardHeader (title 'Subscription & Billing' + description) and CardContent wrapping the accordion body. Items include rich JSX content with an inline link and a CTA Button ('View plans'). Use when FAQ/help content needs to sit inside a titled card section rather than standalone.",
    file: "variants/v-accordion-7.tsx",
    keywords: ["card wrapper", "titled section"],
    name: "v-accordion-7",
  },
  {
    category: "accordion",
    description:
      "Nested accordion: one top-level item ('Additional Details') renders a second, independent Accordion inside its panel with its own sub-items (Technical Specifications, Compatibility), while sibling items show plain content. Use for hierarchical content like product info with drill-down sub-sections.",
    file: "variants/v-accordion-8.tsx",
    keywords: ["nested", "sub-accordion", "hierarchy"],
    name: "v-accordion-8",
  },
  {
    category: "accordion",
    description:
      "One single-item accordion per user, each rendered inside its own Frame/FramePanel row: trigger shows Avatar (image + initials fallback), name, and a role Badge (Admin/Viewer/Editor with color-coded variant), panel shows a description of that user's permissions. Use for an expandable team/user permissions list or 'who has access' UI.",
    file: "variants/v-accordion-9.tsx",
    keywords: [
      "user list",
      "team members",
      "permissions",
      "avatar",
      "role badge",
    ],
    name: "v-accordion-9",
  },
  {
    category: "accordion",
    description:
      "Changelog / release-notes accordion: each item's trigger shows a monospace version number, a 'Latest' badge on the newest release, a 'Breaking' badge if that release contains a breaking change, and the release date; the panel lists individual changes each tagged with a color-coded badge (new/improved/fixed/breaking). Multiple releases can be open at once. Use for a product changelog, release history, or version notes page.",
    file: "variants/v-accordion-10.tsx",
    keywords: ["changelog", "release notes", "version history", "what's new"],
    name: "v-accordion-10",
  },
  {
    category: "accordion",
    description:
      "FAQ accordion with a live search Input above it (search icon inline); typing filters the FAQ list by matching against both question and answer text, and shows a 'No results for ...' empty message when nothing matches. Multiple items can be open. Use for a searchable help center / FAQ page with more than a handful of questions.",
    file: "variants/v-accordion-11.tsx",
    keywords: ["searchable faq", "filter", "help center", "live search"],
    name: "v-accordion-11",
  },
  {
    category: "accordion",
    description:
      "Settings-page sidebar-style accordion: each section (Account, Security, Notifications, Billing) has an icon + label trigger with hover background highlight, and expands to a bulleted list of sub-page links indented with a left border. One section open by default. Use for a settings navigation sidebar or grouped-links menu, not for FAQ/content panels.",
    file: "variants/v-accordion-12.tsx",
    keywords: [
      "settings navigation",
      "sidebar menu",
      "grouped links",
      "icon sections",
    ],
    name: "v-accordion-12",
  },
  {
    category: "accordion",
    description:
      "Job board / careers listing accordion: header shows an 'N roles' count Badge; each item's trigger shows job title plus department, location (with icons), and an employment-type Badge, and the panel shows the job description, a bulleted requirements list, salary, and an 'Apply Now' Button. Multiple listings can be open. Use for careers pages or any expandable listing with a description + requirements + CTA pattern.",
    file: "variants/v-accordion-13.tsx",
    keywords: [
      "job board",
      "careers",
      "listings",
      "apply button",
      "requirements",
    ],
    name: "v-accordion-13",
  },
  {
    category: "accordion",
    description:
      "Onboarding / setup-wizard step tracker built on an accordion: header shows 'X of N steps completed'; each step's trigger has a numbered circle that becomes a green checkmark once done, completed steps get a green-tinted border/background, and each panel has a 'Mark as complete' Button that closes the current step and auto-opens the next one. Use for guided setup checklists, onboarding flows, or getting-started progress trackers.",
    file: "variants/v-accordion-14.tsx",
    keywords: [
      "onboarding",
      "step tracker",
      "setup wizard",
      "checklist",
      "progress",
    ],
    name: "v-accordion-14",
  },
  {
    category: "accordion",
    description:
      "Product specifications accordion grouped by category (Display, Performance, Battery & Power, Connectivity) with a header Badge showing the product name; each panel renders a definition-list (label/value rows, e.g. 'Screen Size — 14.2-inch Liquid Retina XDR') separated by dividers. Multiple categories can be open. Use for tech-spec sheets, product detail pages, or any structured key/value data broken into collapsible categories.",
    file: "variants/v-accordion-15.tsx",
    keywords: [
      "product specs",
      "spec sheet",
      "key value table",
      "technical specifications",
    ],
    name: "v-accordion-15",
  },

  // --- alert ---
  {
    category: "alert",
    description:
      "Bare-minimum alert: title 'Heads up!' with a plain description paragraph, no icon and no variant color. Use as the plainest possible callout box when you just need a bordered title+text notice.",
    file: "variants/v-alert-1.tsx",
    name: "v-alert-1",
  },
  {
    category: "alert",
    description:
      "Same plain alert but with a leading InfoIcon next to the title. Use when a bare alert needs a visual icon cue but no color-coded severity.",
    file: "variants/v-alert-2.tsx",
    name: "v-alert-2",
  },
  {
    category: "alert",
    description:
      "Alert with an icon, title/description, and an AlertAction row containing 'Dismiss' (ghost) and 'Update' (primary) buttons — e.g. a security-update nudge. Use when the alert needs inline action buttons alongside the message.",
    file: "variants/v-alert-3.tsx",
    keywords: ["action buttons", "dismiss button"],
    name: "v-alert-3",
  },
  {
    category: "alert",
    description:
      "Alert using the 'info' color variant (blue) with an InfoIcon, title 'Info!' and a descriptive message. Use for neutral informational callouts.",
    file: "variants/v-alert-4.tsx",
    keywords: ["info alert", "blue alert"],
    name: "v-alert-4",
  },
  {
    category: "alert",
    description:
      "Alert using the 'success' color variant (green) with a CircleCheckIcon, title 'Success!' confirming a completed action. Use for confirmation/success feedback messages.",
    file: "variants/v-alert-5.tsx",
    keywords: ["success alert", "green alert", "confirmation"],
    name: "v-alert-5",
  },
  {
    category: "alert",
    description:
      "Alert using the 'warning' color variant (yellow) with a TriangleAlertIcon, title 'Warning!' asking the user to check their settings. Use for non-blocking caution messages.",
    file: "variants/v-alert-6.tsx",
    keywords: ["warning alert", "yellow alert", "caution"],
    name: "v-alert-6",
  },
  {
    category: "alert",
    description:
      "Alert using the 'error' color variant (red) with a CircleAlertIcon, title 'Error!' telling the user to retry or contact support. Use for failure/error state messages.",
    file: "variants/v-alert-7.tsx",
    keywords: ["error alert", "red alert", "failure"],
    name: "v-alert-7",
  },
  {
    category: "alert",
    description:
      "Two alerts stacked back-to-back with no gap or rounded corners inside a shared Frame (flush borderless panels): a success 'Deployment Successful' alert and a warning 'Resource Limit Reached' alert with a 'Verify' action button. Use when multiple alerts need to appear as one continuous grouped block, e.g. a status feed or activity panel.",
    file: "variants/v-alert-8.tsx",
    keywords: ["stacked alerts", "grouped alerts", "frame panel"],
    name: "v-alert-8",
  },
  {
    category: "alert",
    description:
      "Single alert embedded in a Frame/FramePanel (borderless, flush card look) with a ShieldCheckIcon, 'Security Update' title, and both 'Dismiss' (outline) and 'Update' (primary) action buttons. Use for a security/account-nudge alert that needs to sit inside a card-like frame rather than standalone.",
    file: "variants/v-alert-9.tsx",
    keywords: ["frame panel", "security update", "action buttons"],
    name: "v-alert-9",
  },
  {
    category: "alert",
    description:
      "Feature-announcement alert inside a Frame with an info variant, LightbulbIcon, a small close (X) icon-button in the corner instead of text buttons, and an inline 'Explore features' link-style button inside the description. Use for 'new feature' discovery banners with a lightweight dismiss control.",
    file: "variants/v-alert-10.tsx",
    keywords: ["feature announcement", "discovery banner", "dismiss icon"],
    name: "v-alert-10",
  },
  {
    category: "alert",
    description:
      "Dismissible announcement banner with custom violet/purple theming (border/background/text all tinted), a MegaphoneIcon, close (X) button that unmounts the alert via useState, and an inline 'Learn more' link with a trailing arrow icon. Use for marketing/promo banners (e.g. 'Introducing Pro') that the user can permanently dismiss for the session.",
    file: "variants/v-alert-11.tsx",
    keywords: [
      "announcement banner",
      "promo banner",
      "custom color theme",
      "dismissible",
    ],
    name: "v-alert-11",
  },
  {
    category: "alert",
    description:
      "Cookie-consent banner alert: CookieIcon, 'We use cookies' title, description with an inline underlined link to a cookie policy, and two action buttons ('Decline' outline, 'Accept All' primary) that both dismiss the alert (component unmounts via useState). Use for GDPR/cookie consent notices.",
    file: "variants/v-alert-12.tsx",
    keywords: ["cookie consent", "gdpr banner", "accept decline"],
    name: "v-alert-12",
  },
  {
    category: "alert",
    description:
      "Storage-limit warning alert in a Frame with HardDriveIcon, an 'Upgrade' action button, and a description showing usage text ('9.1 GB of 10 GB (91%)') plus a color-filled progress bar beneath it. Use for storage/quota/usage-limit warnings that need an inline progress visualization.",
    file: "variants/v-alert-13.tsx",
    keywords: ["storage warning", "usage progress bar", "quota limit"],
    name: "v-alert-13",
  },
  {
    category: "alert",
    description:
      "Update-available alert with async state: shows an info-variant DownloadIcon alert with an 'Update now' button that, when clicked, shows an 'Updating…' disabled state for 2 seconds (setTimeout) then flips to a success-variant PackageCheckIcon alert reading 'You're up to date' with no action button. Use for app/software update prompts that need to simulate or reflect an async install action.",
    file: "variants/v-alert-14.tsx",
    keywords: ["update available", "async loading state", "install progress"],
    name: "v-alert-14",
  },
  {
    category: "alert",
    description:
      "Email-verification alert with MailIcon and a 'Resend' button that starts a live 60-second countdown (useEffect + setTimeout ticking each second), disabling the button and relabeling it 'Resend in Ns' until it reaches zero; description text also updates once a resend has been sent. Use for email/OTP verification prompts that need a resend-cooldown timer.",
    file: "variants/v-alert-15.tsx",
    keywords: ["email verification", "resend countdown", "cooldown timer"],
    name: "v-alert-15",
  },

  // --- alert-dialog ---
  {
    category: "alert dialog",
    description:
      "Standard destructive-confirmation alert dialog: 'Delete Account' destructive-outline trigger opens a popup titled 'Are you absolutely sure?' with description text, and footer buttons 'Cancel' (ghost) / 'Delete Account' (destructive). Use as the default pattern for any irreversible destructive action confirmation.",
    file: "variants/v-alert-dialog-1.tsx",
    keywords: ["delete confirmation", "destructive action", "are you sure"],
    name: "v-alert-dialog-1",
  },
  {
    category: "alert dialog",
    description:
      "Small, compact alert dialog (max-w-xs) with a centered circular icon badge (BluetoothIcon) above the title, for a lightweight system-permission-style prompt ('Allow accessory to connect?') with 'Don't allow' / 'Allow' buttons. Use for brief native-feeling permission or connection prompts that don't need much text.",
    file: "variants/v-alert-dialog-2.tsx",
    keywords: ["small dialog", "permission prompt", "media picker style"],
    name: "v-alert-dialog-2",
  },
  {
    category: "alert dialog",
    description:
      "AlertDialog nested inside a regular Dialog: opening a Dialog first, then its footer has a button that opens a second, inner AlertDialog confirmation on top of it. Use when you need a confirm-before-closing or confirm-before-action step layered inside an already-open modal dialog.",
    file: "variants/v-alert-dialog-3.tsx",
    keywords: ["nested dialog", "dialog inside dialog", "confirm inside modal"],
    name: "v-alert-dialog-3",
  },
  {
    category: "alert dialog",
    description:
      "Success-confirmation alert dialog: green circular CheckIcon badge next to 'Task successful' title/description, plus a 'Don't show again' checkbox+label in the footer alongside 'Cancel'/'Confirm' buttons. Use for confirming a completed task while giving the user a persistent opt-out checkbox.",
    file: "variants/v-alert-dialog-4.tsx",
    keywords: [
      "success confirmation",
      "task complete",
      "dont show again checkbox",
    ],
    name: "v-alert-dialog-4",
  },
  {
    category: "alert dialog",
    description:
      "Account-deactivation confirmation dialog: destructive-styled circular CircleAlertIcon badge, title 'Deactivate your account?', description warning about profile removal, and 'Keep My Account' / 'Deactivate Anyway' (destructive) buttons. Use for account deactivation/suspension confirmations.",
    file: "variants/v-alert-dialog-5.tsx",
    keywords: ["deactivate account", "account suspension"],
    name: "v-alert-dialog-5",
  },
  {
    category: "alert dialog",
    description:
      "Unsaved-changes warning dialog rendered inside a Frame/FramePanel wrapper (borderless card look) with an amber CardSimIcon badge, 'Unsaved changes' title, a 'Don't ask again' checkbox, and 'Stay' / 'Discard Changes' buttons. Use when navigating away from a form or editor with unsaved work.",
    file: "variants/v-alert-dialog-6.tsx",
    keywords: ["unsaved changes", "leave page warning", "discard changes"],
    name: "v-alert-dialog-6",
  },
  {
    category: "alert dialog",
    description:
      "Centered success/receipt-style dialog for e-ticket registration: large centered CheckIcon badge, centered title/description, then a muted key-value summary card (Order Number, Order Date, Event Name, Event Date, Register Date), and a single full-width 'Back to Home' button (no cancel). Use for post-purchase/registration confirmation screens showing order details.",
    file: "variants/v-alert-dialog-7.tsx",
    keywords: [
      "order confirmation",
      "e-ticket",
      "receipt summary",
      "registration success",
    ],
    name: "v-alert-dialog-7",
  },
  {
    category: "alert dialog",
    description:
      "System-update notification dialog: centered ShieldAlertIcon badge, title 'System Update Available!', a version/date Badge, description in a muted footer band, and 'Remind Me Later' / 'Update Now' buttons. Use for app/OS update prompts announcing a new release with version info.",
    file: "variants/v-alert-dialog-8.tsx",
    keywords: ["system update", "version release", "app update prompt"],
    name: "v-alert-dialog-8",
  },
  {
    category: "alert dialog",
    description:
      "Billing/subscription-expiry warning dialog: centered BellIcon badge, title 'Subscription Expiring Soon', a destructive 'Expires in 2 days' Badge, description prompting a payment update, and 'Remind Me Later' / 'Update Payment' buttons. Use for expiring-subscription or payment-due warnings.",
    file: "variants/v-alert-dialog-9.tsx",
    keywords: ["subscription expiring", "billing warning", "payment reminder"],
    name: "v-alert-dialog-9",
  },
  {
    category: "alert dialog",
    description:
      "Logout confirmation dialog styled like a native mobile alert: centered violet ShieldQuestionMarkIcon badge, 'Are you sure?' title, and a full-width two-column footer with a vertical divider ('No' / 'Yes, Logout' as borderless ghost buttons filling equal halves). Use for a compact, mobile-alert-style logout or sign-out confirmation.",
    file: "variants/v-alert-dialog-10.tsx",
    keywords: [
      "logout confirmation",
      "sign out",
      "mobile alert style",
      "two column footer",
    ],
    name: "v-alert-dialog-10",
  },
  {
    category: "alert dialog",
    description:
      "File-overwrite conflict dialog: FileIcon badge, 'File already exists' title, description naming the specific file/size/path, and a three-way choice footer ('Keep Both' / 'Skip' / 'Replace') instead of the usual two-button confirm/cancel. Use for file-upload or save conflicts needing more than a binary choice.",
    file: "variants/v-alert-dialog-11.tsx",
    keywords: [
      "file conflict",
      "overwrite confirmation",
      "three way choice",
      "keep both skip replace",
    ],
    name: "v-alert-dialog-11",
  },
  {
    category: "alert dialog",
    description:
      "Subscription-downgrade warning dialog: destructive TrendingDownIcon badge, 'Downgrade to Free plan?' title, and a bulleted list (in a bordered muted box) of specific Pro features the user will lose, followed by 'Keep Pro' / 'Downgrade Anyway' buttons. Use when a destructive account/plan change should show a concrete list of consequences before confirming.",
    file: "variants/v-alert-dialog-12.tsx",
    keywords: ["downgrade plan", "feature loss list", "plan change warning"],
    name: "v-alert-dialog-12",
  },
  {
    category: "alert dialog",
    description:
      "Typed-confirmation ownership-transfer dialog: amber KeyRoundIcon badge, description warning of immediate admin-privilege loss, an Input requiring the user to type the literal word 'transfer' to match a constant before the destructive 'Transfer Ownership' button becomes enabled; input resets when the dialog closes. Use for the highest-risk destructive actions that need explicit typed confirmation, not just a click.",
    file: "variants/v-alert-dialog-13.tsx",
    keywords: [
      "typed confirmation",
      "type to confirm",
      "ownership transfer",
      "high risk action",
    ],
    name: "v-alert-dialog-13",
  },
  {
    category: "alert dialog",
    description:
      "Data-wipe confirmation gated by an explicit checkbox: centered Trash2Icon badge, 'Clear all workspace data?' title/description, a bordered destructive-tinted checkbox+label box reading 'I understand this will permanently delete all data...', and a 'Delete Everything' button that stays disabled until the checkbox is checked (resets on close). Use for irreversible bulk-delete actions that require explicit acknowledgment before the confirm button activates.",
    file: "variants/v-alert-dialog-14.tsx",
    keywords: [
      "checkbox gate",
      "consent checkbox",
      "clear all data",
      "disabled until confirmed",
    ],
    name: "v-alert-dialog-14",
  },
  {
    category: "alert dialog",
    description:
      "Rate-limit-exceeded dialog with a live MM:SS countdown timer (useEffect + setTimeout ticking every second) showing time until automatic retry, an amber ZapIcon badge, an upsell line about upgrading for higher limits, and 'Dismiss' / 'Upgrade to Pro' equal-width buttons. Use for API/usage rate-limit errors that need a visible live countdown before the user can retry.",
    file: "variants/v-alert-dialog-15.tsx",
    keywords: [
      "rate limit",
      "live countdown timer",
      "retry timer",
      "api limit exceeded",
    ],
    name: "v-alert-dialog-15",
  },

  // --- autocomplete ---
  {
    category: "autocomplete",
    description:
      "Baseline autocomplete: text input with a fruit list (10 items), popup showing a filtered list as you type and an empty-state message when nothing matches. Use as the default starting point for any type-to-filter single-select combobox-like input.",
    file: "variants/v-autocomplete-1.tsx",
    name: "v-autocomplete-1",
  },
  {
    category: "autocomplete",
    description:
      "Same baseline fruit autocomplete rendered with the `disabled` prop, so the input can't be focused or typed into. Use to show a read-only/disabled state of an autocomplete field.",
    file: "variants/v-autocomplete-2.tsx",
    keywords: ["disabled state"],
    name: "v-autocomplete-2",
  },
  {
    category: "autocomplete",
    description:
      "Two autocompletes rendered side by side to compare the `sm` and `lg` input size props. Use as a reference when picking/demoing autocomplete input sizes.",
    file: "variants/v-autocomplete-3.tsx",
    keywords: ["sizes", "small large"],
    name: "v-autocomplete-3",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete with an explicit associated <Label> above the input (linked via useId/htmlFor) instead of only an aria-label. Use when the field needs a visible label rather than a purely accessible one.",
    file: "variants/v-autocomplete-4.tsx",
    keywords: ["with label", "visible label"],
    name: "v-autocomplete-4",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete configured with `mode=\"both\"`, which combines inline autocomplete-style text completion with the dropdown list simultaneously as the user types. Use when you want the browser-style 'inline ghost suggestion + dropdown' combined behavior.",
    file: "variants/v-autocomplete-5.tsx",
    keywords: ["inline autocomplete", "inline suggestion"],
    name: "v-autocomplete-5",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete with `autoHighlight` enabled, so the first matching item in the list is automatically highlighted/selected as the user types (no need to arrow-down first). Use when pressing Enter should confidently commit the top match.",
    file: "variants/v-autocomplete-6.tsx",
    keywords: ["auto highlight", "first match selected"],
    name: "v-autocomplete-6",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete input with `showClear`, adding a clear (X) button inside the input once text is typed. Use when users need a quick way to reset the search text.",
    file: "variants/v-autocomplete-7.tsx",
    keywords: ["clear button", "reset input"],
    name: "v-autocomplete-7",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete input with both `showClear` and `showTrigger`, adding a clear (X) button and a dropdown-trigger button (to open the full list without typing) inside the input. Use when the field should behave like a combobox you can open by button click as well as by typing.",
    file: "variants/v-autocomplete-8.tsx",
    keywords: ["clear and trigger buttons", "open on click"],
    name: "v-autocomplete-8",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete input with a leading SearchIcon rendered via `startAddon`. Use when the field should visually read as a search box.",
    file: "variants/v-autocomplete-9.tsx",
    keywords: ["search icon", "start addon"],
    name: "v-autocomplete-9",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete with items grouped into labeled sections (Status, Priority, Team) using AutocompleteGroup/AutocompleteGroupLabel/AutocompleteCollection with separators between groups; data is pre-bucketed via a groupTags() helper. Use whenever the option list needs categorized headers instead of one flat list (e.g. tag pickers, filters).",
    file: "variants/v-autocomplete-10.tsx",
    keywords: ["grouped items", "categorized list", "section headers"],
    name: "v-autocomplete-10",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete capped to a `limit` of visible results (7 of many programming languages) using useAutocompleteFilter to compute the true total match count, and an AutocompleteStatus footer showing '+N more (keep typing to narrow down)'. Use for large datasets where you want to cap rendered rows but still tell the user how many more matches exist.",
    file: "variants/v-autocomplete-11.tsx",
    keywords: ["limit results", "capped list", "more count", "large dataset"],
    name: "v-autocomplete-11",
  },
  {
    category: "autocomplete",
    description:
      "Async-search autocomplete: debounced (300ms) simulated network search over a movies dataset, with a Spinner + 'Searching...' status while loading, an error state ('Failed to fetch movies...') on simulated failure, a 'no results' message, and result count status text; popup only renders once the user has typed something. Use as the template for a real server-backed/async-fetched autocomplete search.",
    file: "variants/v-autocomplete-12.tsx",
    keywords: [
      "async search",
      "debounced search",
      "loading spinner",
      "server search",
      "error state",
    ],
    name: "v-autocomplete-12",
  },
  {
    category: "autocomplete",
    description:
      "Autocomplete wired into a Field + Form (required, with FieldError shown on invalid submit) that submits via FormData, resolves the selected label back to its value, shows a loading state on the submit Button, and alerts the chosen value. Use as the pattern for a required, form-validated autocomplete field.",
    file: "variants/v-autocomplete-13.tsx",
    keywords: [
      "form integration",
      "required field",
      "field error",
      "validation",
    ],
    name: "v-autocomplete-13",
  },
  {
    category: "autocomplete",
    description:
      "Timezone picker autocomplete: items grouped by region (Americas / Europe & Africa / Asia & Pacific) with a Globe start icon, showClear/showTrigger, and each item row showing the timezone label plus a monospace UTC-offset badge on the right. Use for timezone selection fields needing grouped, offset-labeled options.",
    file: "variants/v-autocomplete-14.tsx",
    keywords: ["timezone picker", "utc offset", "grouped by region"],
    name: "v-autocomplete-14",
  },
  {
    category: "autocomplete",
    description:
      "'Assign to' team-member picker autocomplete: start icon, showClear/showTrigger, each item rendered as a colored initials avatar circle plus name/email (truncating) and a role badge on the right. Use for assignee/user pickers in task or project management UIs.",
    file: "variants/v-autocomplete-15.tsx",
    keywords: [
      "person picker",
      "assignee picker",
      "user search",
      "avatar initials",
    ],
    name: "v-autocomplete-15",
  },
  {
    category: "autocomplete",
    description:
      "Country picker autocomplete: each item shows a flag emoji, the country name, and a monospace ISO country code aligned to the right; showClear/showTrigger enabled. Use for country/region selection fields.",
    file: "variants/v-autocomplete-16.tsx",
    keywords: ["country picker", "flag emoji", "iso code"],
    name: "v-autocomplete-16",
  },
  {
    category: "autocomplete",
    description:
      "'Link repository' GitHub-style picker: each item shows org/repo name in monospace, a star count with icon, a colored language dot, the language name, and a truncated description line beneath. Use for repository/package pickers that need rich multi-line metadata per row.",
    file: "variants/v-autocomplete-17.tsx",
    keywords: [
      "repository picker",
      "github style",
      "star count",
      "language dot",
    ],
    name: "v-autocomplete-17",
  },
  {
    category: "autocomplete",
    description:
      "Multi-select tag input built on top of a single-value Autocomplete: selected items render as removable Badge pills above the input (with an X button per pill), typing an exact label match auto-adds it to the selected list and clears the input, and the dropdown only offers technologies not already selected. Use for tech-stack / tag pickers where the result is a growing list of chips rather than one value.",
    file: "variants/v-autocomplete-18.tsx",
    keywords: ["multi-select", "tag input", "chip pills", "removable badges"],
    name: "v-autocomplete-18",
  },
  {
    category: "autocomplete",
    description:
      "Priority-level picker: each item shows a colored icon (urgent=red alert circle, high=orange up arrow, medium=yellow right arrow, low=slate down arrow, none=muted minus) plus a label and short description line. Use for issue/task priority selectors needing icon + description per option.",
    file: "variants/v-autocomplete-19.tsx",
    keywords: ["priority selector", "issue priority", "icon per option"],
    name: "v-autocomplete-19",
  },
  {
    category: "autocomplete",
    description:
      "Tech-stack skill picker grouped into labeled categories (Language, Framework, Tool) with separators between groups, showClear/showTrigger enabled. Use for skill/technology pickers that need categorized grouping (similar to v-autocomplete-10 but tech-stack themed).",
    file: "variants/v-autocomplete-20.tsx",
    keywords: ["tech stack picker", "grouped by category", "skills"],
    name: "v-autocomplete-20",
  },

  // --- avatar ---
  {
    category: "avatar",
    description:
      "Baseline single avatar with an image and a two-letter initials AvatarFallback shown while the image is loading/fails. Use as the default single-user avatar.",
    file: "variants/v-avatar-1.tsx",
    name: "v-avatar-1",
  },
  {
    category: "avatar",
    description:
      "Avatar with no image at all, rendering only the initials AvatarFallback. Use for users without a profile photo, or as a placeholder/anonymous avatar.",
    file: "variants/v-avatar-2.tsx",
    keywords: ["fallback only", "initials only", "no image"],
    name: "v-avatar-2",
  },
  {
    category: "avatar",
    description:
      "Three avatars of increasing size (default, size-12, size-16) shown side by side to demonstrate size scaling via className. Use as a size reference/comparison for avatars.",
    file: "variants/v-avatar-3.tsx",
    keywords: ["sizes", "small medium large"],
    name: "v-avatar-3",
  },
  {
    category: "avatar",
    description:
      "Three avatars side by side with different corner radii (rounded-md, rounded-xl, rounded-full) to demonstrate square, squircle, and circular avatar shapes. Use as a radius/shape reference for avatars.",
    file: "variants/v-avatar-4.tsx",
    keywords: ["radius", "shape", "square circle"],
    name: "v-avatar-4",
  },
  {
    category: "avatar",
    description:
      "Overlapping avatar stack: three avatars with negative horizontal spacing and a background-colored ring so they visually overlap like a typical 'group of people' cluster. Use for showing multiple users compactly (e.g. participants, collaborators) without labels.",
    file: "variants/v-avatar-5.tsx",
    keywords: ["avatar group", "overlapping avatars", "stack"],
    name: "v-avatar-5",
  },
  {
    category: "avatar",
    description:
      "Overlapping avatar group of three named users plus a trailing '+3' fallback-only avatar indicating additional hidden members. Use when a group has more members than you want to render individually and need a numeric overflow indicator.",
    file: "variants/v-avatar-6.tsx",
    keywords: ["overflow count", "plus n avatars", "avatar group with count"],
    name: "v-avatar-6",
  },
  {
    category: "avatar",
    description:
      "Single avatar next to a text block: name + a 'Pro' Badge on one line, and a role/title ('Founder & CEO') beneath. Use for a compact user identity row combining avatar, name, status badge, and title.",
    file: "variants/v-avatar-7.tsx",
    keywords: ["user identity", "name with badge", "profile row"],
    name: "v-avatar-7",
  },
  {
    category: "avatar",
    description:
      "Social-proof pill: small overlapping avatar stack inside a bordered rounded-full pill next to text reading 'Trusted by 100K+ users.' Use for landing-page social-proof widgets showing a handful of user faces plus a trust statistic.",
    file: "variants/v-avatar-8.tsx",
    keywords: ["social proof", "trusted by", "landing page widget"],
    name: "v-avatar-8",
  },
  {
    category: "avatar",
    description:
      "Compact social-proof row similar to v-avatar-8 but wrapped in a Frame/FramePanel card and reading 'Joined by 500+ developers.' Use when the social-proof avatar stack needs to sit inside a bordered card/panel section rather than a pill.",
    file: "variants/v-avatar-9.tsx",
    keywords: ["social proof card", "joined by", "frame panel"],
    name: "v-avatar-9",
  },
  {
    category: "avatar",
    description:
      "Avatar group with a fanned hover effect: avatars start slightly overlapped/offset via CSS custom properties (--index) and spread apart with a scale-up + translate transition when the group is hovered. Use for a more playful, interactive team/collaborator avatar cluster.",
    file: "variants/v-avatar-10.tsx",
    keywords: ["hover effect", "fan out avatars", "interactive avatar group"],
    name: "v-avatar-10",
  },
  {
    category: "avatar",
    description:
      "Same fanned hover-effect avatar group as v-avatar-10, but each avatar is wrapped in a Tooltip that reveals the person's full name on hover. Use when the interactive avatar cluster also needs to disclose each person's identity on hover.",
    file: "variants/v-avatar-11.tsx",
    keywords: ["hover effect", "tooltip on avatar", "fan out avatars"],
    name: "v-avatar-11",
  },
  {
    category: "avatar",
    description:
      "Empty-state illustration for a team/collaborators list: grayscale overlapping avatars plus a dashed-looking 'add' circular button (UserPlusIcon), under a heading 'No active collaborators' and a prompt to invite teammates. Use for empty collaborator/team lists that still want to visually hint at the avatar-group UI.",
    file: "variants/v-avatar-12.tsx",
    keywords: [
      "empty state",
      "no collaborators",
      "invite teammates",
      "grayscale avatars",
    ],
    name: "v-avatar-12",
  },
  {
    category: "avatar",
    description:
      "Single avatar with a semi-transparent overlay and centered Spinner that toggles on/off every 2 seconds (setInterval demo) to simulate a loading/refreshing avatar state. Use to show an avatar mid-upload, refreshing, or syncing.",
    file: "variants/v-avatar-13.tsx",
    keywords: ["loading state", "avatar spinner", "uploading avatar"],
    name: "v-avatar-13",
  },
  {
    category: "avatar",
    description:
      "Four avatars each with a custom SVG verification/checkmark badge (blue circular badge, not the built-in Badge component) positioned at a different corner (bottom-left, top-left, bottom-right, top-right) via absolute positioning. Use as a reference for placing a custom overlay badge/icon at any corner of an avatar.",
    file: "variants/v-avatar-14.tsx",
    keywords: ["custom badge", "verified badge", "corner badge position"],
    name: "v-avatar-14",
  },
  {
    category: "avatar",
    description:
      "Single avatar with an animated pulsing green ring (animate-pulse + ring-offset) plus a small solid green dot in the bottom-right corner, together reading as a live/active/online status indicator. Use for a single user's live presence indicator with an animated cue.",
    file: "variants/v-avatar-15.tsx",
    keywords: [
      "online status",
      "animated ring",
      "presence indicator",
      "live indicator",
    ],
    name: "v-avatar-15",
  },
  {
    category: "avatar",
    description:
      "Small avatar embedded inside a pill-shaped outline Button that also shows the user's name and a chevron-up-down icon, acting as a DropdownMenu trigger; the menu has grouped items (Profile, Settings / Teams, Invite) and a destructive 'Log out' item. Use for an account-switcher / user-menu trigger in a navbar or sidebar.",
    file: "variants/v-avatar-16.tsx",
    keywords: [
      "account menu",
      "user dropdown",
      "profile menu trigger",
      "navbar avatar",
    ],
    name: "v-avatar-16",
  },
  {
    category: "avatar",
    description:
      "Team grid inside a Frame: header shows 'Team · N online' count, then a 3-column grid of member avatars each with a colored presence-status dot (online/busy/away/offline, color-coded) in the bottom-right corner and first name below. Use for a team roster view that needs per-member online/busy/away/offline status at a glance.",
    file: "variants/v-avatar-17.tsx",
    keywords: [
      "team grid",
      "presence status dots",
      "online busy away offline",
      "team roster",
    ],
    name: "v-avatar-17",
  },
  {
    category: "avatar",
    description:
      "Pull-request/issue-style comment thread inside a Frame: a header showing comment count, then each comment row with a small avatar, name, relative timestamp, comment body text, and a like Button with a heart icon and count. Use for rendering a threaded comments/discussion list (PR reviews, blog comments, etc.).",
    file: "variants/v-avatar-18.tsx",
    keywords: [
      "comment thread",
      "pull request comments",
      "discussion list",
      "like button",
    ],
    name: "v-avatar-18",
  },
  {
    category: "avatar",
    description:
      "Interactive assignee-picker list inside a Frame: each candidate is a full-width clickable row (avatar, name, role) that toggles a selected/highlighted state (tinted background/border) and shows a checkmark icon when selected; multiple selection supported via local state. Use for multi-select assignee/reviewer pickers rendered as a list rather than a dropdown.",
    file: "variants/v-avatar-19.tsx",
    keywords: [
      "assignee picker",
      "selectable list",
      "multi select",
      "toggle selection",
    ],
    name: "v-avatar-19",
  },
  {
    category: "avatar",
    description:
      "Contributor leaderboard inside a Frame: header with trophy icon, title, and a 'This month' Badge; each ranked row shows a medal emoji (🥇🥈🥉) or plain rank number, avatar, name, and a commit count with a git-commit icon. Use for a contributor/leaderboard ranking list ordered by an activity metric.",
    file: "variants/v-avatar-20.tsx",
    keywords: [
      "leaderboard",
      "contributor ranking",
      "commit count",
      "medal rank",
    ],
    name: "v-avatar-20",
  },
  {
    category: "avatar",
    description:
      "GitHub-style profile card inside a Frame: large avatar with ring-offset, name + 'Pro' Badge, @handle, bio text, location/website meta line with icons, a divider, a 3-column stats row (Repos/Followers/Following), and 'Follow' / 'Message' action buttons. Use for a full user profile summary card (developer/social profile view).",
    file: "variants/v-avatar-21.tsx",
    keywords: [
      "profile card",
      "github profile",
      "stats row",
      "follow button",
      "bio",
    ],
    name: "v-avatar-21",
  },

  // --- badge ---
  {
    category: "badge",
    description:
      "Baseline default-variant Badge with plain text ('Badge'). Use as the default small label/tag pill.",
    file: "variants/v-badge-1.tsx",
    name: "v-badge-1",
  },
  {
    category: "badge",
    description:
      "Badge with the 'outline' variant (border only, no filled background). Use when a lighter-weight, non-filled tag is needed.",
    file: "variants/v-badge-2.tsx",
    keywords: ["outline badge"],
    name: "v-badge-2",
  },
  {
    category: "badge",
    description:
      "Badge with the 'secondary' variant (muted gray filled background). Use for neutral, low-emphasis tags.",
    file: "variants/v-badge-3.tsx",
    keywords: ["secondary badge", "muted badge"],
    name: "v-badge-3",
  },
  {
    category: "badge",
    description:
      "Badge with the 'destructive' variant (red). Use to flag errors, danger, or destructive-related states/tags.",
    file: "variants/v-badge-4.tsx",
    keywords: ["destructive badge", "red badge"],
    name: "v-badge-4",
  },
  {
    category: "badge",
    description:
      "Badge with the 'info' variant (blue). Use for neutral informational tags/labels.",
    file: "variants/v-badge-5.tsx",
    keywords: ["info badge", "blue badge"],
    name: "v-badge-5",
  },
  {
    category: "badge",
    description:
      "Badge with the 'success' variant (green). Use for positive/success-state tags (e.g. Active, Verified, Paid).",
    file: "variants/v-badge-6.tsx",
    keywords: ["success badge", "green badge"],
    name: "v-badge-6",
  },
  {
    category: "badge",
    description:
      "Badge with the 'warning' variant (yellow/amber). Use for caution-state tags (e.g. Pending, Expiring).",
    file: "variants/v-badge-7.tsx",
    keywords: ["warning badge", "yellow badge"],
    name: "v-badge-7",
  },
  {
    category: "badge",
    description:
      "Badge with the 'error' variant (distinct from destructive — check design tokens; visually a red/error tone). Use for explicit error-state tags.",
    file: "variants/v-badge-8.tsx",
    keywords: ["error badge"],
    name: "v-badge-8",
  },
  {
    category: "badge",
    description:
      "Three badges side by side demonstrating the `size` prop (sm, default, lg). Use as a size reference/comparison for badges.",
    file: "variants/v-badge-9.tsx",
    keywords: ["sizes", "small default large"],
    name: "v-badge-9",
  },
  {
    category: "badge",
    description:
      "Outline badge with a leading CheckIcon reading 'Verified'. Use for a verified/confirmed status tag with an icon.",
    file: "variants/v-badge-10.tsx",
    keywords: ["with icon", "verified badge", "check icon"],
    name: "v-badge-10",
  },
  {
    category: "badge",
    description:
      "Badge rendered as a Next.js Link via the `render` prop, making the whole badge a clickable navigational element instead of static text. Use when a badge/tag itself needs to be a link (e.g. clickable category tag).",
    file: "variants/v-badge-11.tsx",
    keywords: [
      "badge as link",
      "clickable badge",
      "render prop",
      "next.js link",
    ],
    name: "v-badge-11",
  },
  {
    category: "badge",
    description:
      "Single circular ('rounded-full') Badge showing just a number ('7'). Use as a compact numeric count indicator (e.g. unread count) rather than a text label.",
    file: "variants/v-badge-12.tsx",
    keywords: [
      "count badge",
      "numeric badge",
      "circular badge",
      "notification count",
    ],
    name: "v-badge-12",
  },
  {
    category: "badge",
    description:
      "Row of status badges (Online/success, Busy/destructive, Away/warning, Offline/secondary) each with a small colored dot before the label. Use for presence/status indicator tags in a legend or list.",
    file: "variants/v-badge-13.tsx",
    keywords: ["status dot", "presence status", "online busy away offline"],
    name: "v-badge-13",
  },
  {
    category: "badge",
    description:
      "Row of release-channel badges (Stable/success, Beta/info, Experimental/warning, Deprecated/destructive) under a 'Release channels' label. Use for tagging feature/version maturity levels.",
    file: "variants/v-badge-14.tsx",
    keywords: [
      "release channel",
      "stable beta experimental deprecated",
      "version tag",
    ],
    name: "v-badge-14",
  },
  {
    category: "badge",
    description:
      "Pricing-tier list inside a Frame: each row shows a small color-coded plan Badge (Free/secondary, Starter/info, Pro/default, Enterprise/success) next to a description and the price on the right. Use for a compact subscription-plan comparison list.",
    file: "variants/v-badge-15.tsx",
    keywords: ["pricing tiers", "subscription plans", "plan badge with price"],
    name: "v-badge-15",
  },
  {
    category: "badge",
    description:
      "Notification-settings-style list inside a Frame: each ghost Button row has an icon + label (Messages, Mentions, Reviews) on the left and a small color-coded count Badge on the right. Use for a notification category list with per-category unread counts.",
    file: "variants/v-badge-16.tsx",
    keywords: ["notification categories", "unread count", "notification list"],
    name: "v-badge-16",
  },
  {
    category: "badge",
    description:
      "Task list inside a Frame: each row shows a task title, assignee, and a color-coded capitalized priority Badge (urgent=destructive, high=warning, medium=info, low=secondary) on the right. Use for a task/issue list needing per-row priority labels.",
    file: "variants/v-badge-17.tsx",
    keywords: ["priority labels", "task list", "issue priority badge"],
    name: "v-badge-17",
  },

  // --- breadcrumb ---
  {
    category: "breadcrumb",
    description:
      "Standard 4-segment Next.js Link breadcrumb (Home / collapsed-menu ellipsis / Components / current page) where the second segment is a Menu triggered by a BreadcrumbEllipsis button revealing hidden links (Docs, Particles). Use as the default breadcrumb when there are more segments than should be shown inline.",
    file: "variants/v-breadcrumb-1.tsx",
    keywords: ["ellipsis menu", "collapsed breadcrumb", "next.js link"],
    name: "v-breadcrumb-1",
  },
  {
    category: "breadcrumb",
    description:
      "Simple 3-segment breadcrumb (Home / Components / current page) using a custom '/' text separator instead of the default icon separator. Use for a plain, custom-character-separated breadcrumb.",
    file: "variants/v-breadcrumb-2.tsx",
    keywords: ["custom separator", "slash separator"],
    name: "v-breadcrumb-2",
  },
  {
    category: "breadcrumb",
    description:
      "Breadcrumb with a collapsed-segment DropdownMenu (Documentation, Themes, GitHub) triggered by an ellipsis icon button, using plain href links rather than Next.js Link. Use when middle breadcrumb segments should collapse into a dropdown menu.",
    file: "variants/v-breadcrumb-3.tsx",
    keywords: ["dropdown menu", "collapsed segments"],
    name: "v-breadcrumb-3",
  },
  {
    category: "breadcrumb",
    description:
      "Minimal 3-segment breadcrumb (Home / Components / current page) using Next.js Link for every link. Use as the plainest Next.js-integrated breadcrumb with no icons or extras.",
    file: "variants/v-breadcrumb-4.tsx",
    keywords: ["next.js link", "simple breadcrumb"],
    name: "v-breadcrumb-4",
  },
  {
    category: "breadcrumb",
    description:
      "Breadcrumb where every segment (Home, Components, current Settings page) has a leading lucide icon next to its label. Use when each breadcrumb level should be visually identified with its own icon.",
    file: "variants/v-breadcrumb-5.tsx",
    keywords: ["icons for each item", "icon breadcrumb"],
    name: "v-breadcrumb-5",
  },
  {
    category: "breadcrumb",
    description:
      "Breadcrumb where the first two segments show a small Avatar (org logo 'Vercel', user '@shadcn') before the text label, and the final segment is a plain 'Projects' page label. Use for org/user-scoped breadcrumbs that need avatar icons per segment.",
    file: "variants/v-breadcrumb-6.tsx",
    keywords: ["avatar breadcrumb", "org user scope"],
    name: "v-breadcrumb-6",
  },
  {
    category: "breadcrumb",
    description:
      "Breadcrumb (Home icon+label / Products / bold current 'Checkout' page) rendered inside a Card wrapper with tight padding. Use when a breadcrumb needs to sit inside a bordered card/panel container, e.g. atop a checkout or content card.",
    file: "variants/v-breadcrumb-7.tsx",
    keywords: ["inside card", "checkout breadcrumb"],
    name: "v-breadcrumb-7",
  },
  {
    category: "breadcrumb",
    description:
      "Breadcrumb whose first segment is an icon-only outline Button (Home icon, sr-only label) instead of a text link, followed by 'Help Center' and current 'Getting Started' page. Use when the home/root breadcrumb segment should be a compact icon button rather than text.",
    file: "variants/v-breadcrumb-8.tsx",
    keywords: ["icon button home", "help center breadcrumb"],
    name: "v-breadcrumb-8",
  },
  {
    category: "breadcrumb",
    description:
      "Button-styled breadcrumb: each segment (Home, Workspace) is a ghost Button with icon+label, ChevronRightIcon separators, and the current 'Settings' page rendered as a solid secondary-variant Button rather than plain text. Use for a more tactile, button-like breadcrumb navigation bar.",
    file: "variants/v-breadcrumb-9.tsx",
    keywords: ["button style breadcrumb", "chevron separator"],
    name: "v-breadcrumb-9",
  },
  {
    category: "breadcrumb",
    description:
      "Rich breadcrumb inside a Frame: first segment is just an org Avatar icon, second segment is an avatar plus two-line name/email block, and the current page is a colored icon-badge (file icon) plus a two-line title/filename block, all separated by plain '/' text. Use for document/project breadcrumbs that need multi-line metadata (name + email, title + filename) per segment, not just single labels.",
    file: "variants/v-breadcrumb-10.tsx",
    keywords: [
      "project user document info",
      "multi-line breadcrumb",
      "rich metadata",
    ],
    name: "v-breadcrumb-10",
  },
  {
    category: "breadcrumb",
    description:
      "File-path style breadcrumb inside a horizontally-scrollable Frame: each folder segment shows a FolderIcon plus monospace lowercase label, current file segment shows a FileIcon in accent color, joined by plain '/' separators, and the whole list is `flex-nowrap` with `overflow-x-auto` for long paths. Use for rendering a filesystem/repo file path (e.g. a code file's directory breadcrumb).",
    file: "variants/v-breadcrumb-11.tsx",
    keywords: [
      "file path breadcrumb",
      "folder icons",
      "monospace path",
      "scrollable breadcrumb",
    ],
    name: "v-breadcrumb-11",
  },
  {
    category: "breadcrumb",
    description:
      "Checkout-style step-progress breadcrumb (Cart / Shipping / Payment / Review) built on Breadcrumb primitives but acting as a stepper: completed steps show a green checkmark circle and are clickable to go back, the current step shows a primary-colored numbered circle as BreadcrumbPage, future steps are disabled/dimmed, plus 'Back'/'Continue'/'Place Order' buttons drive the `current` step state. Use for multi-step checkout or wizard progress indicators built on breadcrumb styling.",
    file: "variants/v-breadcrumb-12.tsx",
    keywords: [
      "checkout steps",
      "step progress",
      "wizard stepper",
      "numbered circles",
    ],
    name: "v-breadcrumb-12",
  },
  {
    category: "breadcrumb",
    description:
      "Admin/org hierarchy breadcrumb inside a Frame: each segment (Acme Corp / Engineering / Alex Johnson) has its own colored square icon badge (violet building icon, blue users icon, emerald user icon) before the label. Use for organization → team → member hierarchy navigation with distinct per-level icon coloring.",
    file: "variants/v-breadcrumb-13.tsx",
    keywords: ["admin hierarchy", "org team member", "colored icon badges"],
    name: "v-breadcrumb-13",
  },
  {
    category: "breadcrumb",
    description:
      "Page-header breadcrumb inside a Frame's top panel (Docs / Components / current page) with 'Share' and 'Edit' ghost buttons (icon+label) separated by a vertical Separator on the right side of the same row, and a second Frame panel below showing placeholder 'Page content'. Use as a page header bar combining breadcrumb navigation with document action buttons.",
    file: "variants/v-breadcrumb-14.tsx",
    keywords: ["page header", "share edit buttons", "document actions"],
    name: "v-breadcrumb-14",
  },
  {
    category: "breadcrumb",
    description:
      "Compact breadcrumb (Home icon / collapsed-count Menu / current 'Notifications' page) where the collapsed segment shows a BreadcrumbEllipsis plus a small secondary Badge with the hidden-item count, opening a Menu listing the hidden links (Dashboard, Settings, Integrations) via Next.js Link. Use when you want the ellipsis collapse indicator to also show exactly how many items are hidden.",
    file: "variants/v-breadcrumb-15.tsx",
    keywords: [
      "ellipsis with count badge",
      "hidden items count",
      "compact breadcrumb",
    ],
    name: "v-breadcrumb-15",
  },

  // --- button ---
  {
    category: "button",
    description:
      "Baseline default-variant Button with plain text. Use as the default primary action button.",
    file: "variants/v-button-1.tsx",
    name: "v-button-1",
  },
  {
    category: "button",
    description:
      "Button with the 'outline' variant (bordered, transparent background). Use for secondary/less-emphasized actions next to a primary button.",
    file: "variants/v-button-2.tsx",
    keywords: ["outline button"],
    name: "v-button-2",
  },
  {
    category: "button",
    description:
      "Button with the 'secondary' variant (muted filled background). Use for secondary-emphasis actions.",
    file: "variants/v-button-3.tsx",
    keywords: ["secondary button"],
    name: "v-button-3",
  },
  {
    category: "button",
    description:
      "Button with the 'destructive-outline' variant reading 'Delete' (bordered red outline, not solid fill). Use for destructive actions that should be visually present but not the loudest element on the page.",
    file: "variants/v-button-4.tsx",
    keywords: ["destructive outline", "delete button"],
    name: "v-button-4",
  },
  {
    category: "button",
    description:
      "Duplicate of v-button-4: destructive-outline 'Delete' button. Use interchangeably with v-button-4 for a bordered destructive action button.",
    file: "variants/v-button-5.tsx",
    keywords: ["destructive outline", "delete button"],
    name: "v-button-5",
  },
  {
    category: "button",
    description:
      "Button with the 'ghost' variant (no background/border until hovered). Use for the lowest-emphasis actions, e.g. toolbar icons or inline actions.",
    file: "variants/v-button-6.tsx",
    keywords: ["ghost button"],
    name: "v-button-6",
  },
  {
    category: "button",
    description:
      "Button with the 'link' variant (looks like a plain text hyperlink, no button chrome). Use when an action should visually read as an inline link rather than a button.",
    file: "variants/v-button-7.tsx",
    keywords: ["link button", "text link"],
    name: "v-button-7",
  },
  {
    category: "button",
    description:
      "Button using the 'xs' (extra-small) size prop. Use as a size reference for the smallest button size, e.g. in dense toolbars.",
    file: "variants/v-button-8.tsx",
    keywords: ["extra small size", "xs button"],
    name: "v-button-8",
  },
  {
    category: "button",
    description:
      "Button using the 'sm' (small) size prop. Use as a size reference for compact UI contexts.",
    file: "variants/v-button-9.tsx",
    keywords: ["small size"],
    name: "v-button-9",
  },
  {
    category: "button",
    description:
      "Button using the 'lg' (large) size prop. Use as a size reference for prominent call-to-action buttons.",
    file: "variants/v-button-10.tsx",
    keywords: ["large size"],
    name: "v-button-10",
  },
  {
    category: "button",
    description:
      "Button using the 'xl' (extra-large) size prop. Use as a size reference for hero/landing-page-scale call-to-action buttons.",
    file: "variants/v-button-11.tsx",
    keywords: ["extra large size", "xl button", "hero cta"],
    name: "v-button-11",
  },
  {
    category: "button",
    description:
      "Button rendered with the `disabled` attribute, showing the muted/non-interactive visual state. Use to represent an unavailable or not-yet-actionable button.",
    file: "variants/v-button-12.tsx",
    keywords: ["disabled button"],
    name: "v-button-12",
  },
  {
    category: "button",
    description:
      "Icon-only Button (size='icon') containing just a SearchIcon with an aria-label for accessibility, no visible text. Use for compact toolbar/icon-only action buttons.",
    file: "variants/v-button-13.tsx",
    keywords: ["icon button", "icon only"],
    name: "v-button-13",
  },
  {
    category: "button",
    description:
      "Default button with text 'Get Started' followed by a trailing ArrowRightIcon. Use for primary CTA buttons that benefit from a directional trailing icon.",
    file: "variants/v-button-14.tsx",
    keywords: ["icon on the right", "cta button", "arrow icon"],
    name: "v-button-14",
  },
  {
    category: "button",
    description:
      "Default button with a leading CloudDownloadIcon followed by 'Download' text. Use for download/action buttons that benefit from a leading icon.",
    file: "variants/v-button-15.tsx",
    keywords: ["icon on the left", "download button"],
    name: "v-button-15",
  },
  {
    category: "button",
    description:
      "Outline-variant button with a leading PlusIcon and 'Add Item' text. Use for 'add new item' actions styled as a secondary/outline button.",
    file: "variants/v-button-16.tsx",
    keywords: ["outline button with icon", "add item"],
    name: "v-button-16",
  },
  {
    category: "button",
    description:
      "Ghost-variant button with 'Logout' text and a trailing LogOutIcon. Use for low-emphasis sign-out actions, e.g. in a user menu.",
    file: "variants/v-button-17.tsx",
    keywords: ["ghost button with icon", "logout button"],
    name: "v-button-17",
  },
  {
    category: "button",
    description:
      "Destructive-variant (solid red) button with a leading Trash2Icon and 'Delete Account' text. Use for the loudest, most explicit destructive action button (as opposed to the outline destructive variants).",
    file: "variants/v-button-18.tsx",
    keywords: ["destructive button with icon", "delete account"],
    name: "v-button-18",
  },
  {
    category: "button",
    description:
      "Link-variant button reading 'View Documentation' with a trailing ArrowUpRightIcon that rotates 45° on hover (group-hover transition). Use for external/documentation links styled as text with an animated 'opens externally' icon cue.",
    file: "variants/v-button-19.tsx",
    keywords: [
      "link button with icon",
      "external link",
      "hover rotate animation",
    ],
    name: "v-button-19",
  },
  {
    category: "button",
    description:
      "Outline button styled as a GitHub-style 'Star' button: StarIcon + 'Star' label, with a vertical divider and a star-count number ('589') segment on the right, all inside one button. Use for a repository/content star-and-count action button.",
    file: "variants/v-button-20.tsx",
    keywords: ["star button with count", "github star button"],
    name: "v-button-20",
  },
  {
    category: "button",
    description:
      "Outline button reading 'Inbox' with a MailIcon and a small destructive-variant circular count Badge ('8') absolutely positioned at the top-right corner, plus an aria-label announcing the unread count. Use for a notification/inbox button that needs an unread-count badge overlay.",
    file: "variants/v-button-21.tsx",
    keywords: [
      "unread badge",
      "notification button",
      "inbox button",
      "badge overlay",
    ],
    name: "v-button-21",
  },
  {
    category: "button",
    description:
      "Outline button reading 'Search' with a leading SearchIcon and a trailing KbdGroup showing the '⌘K' keyboard shortcut hint. Use for a command-palette/search trigger button that needs to advertise its keyboard shortcut.",
    file: "variants/v-button-22.tsx",
    keywords: ["keyboard shortcut button", "command k", "search trigger"],
    name: "v-button-22",
  },
  {
    category: "button",
    description:
      "Icon-only outline button wrapped in a Tooltip that copies a URL to the clipboard via useCopyToClipboard, swapping its icon from CopyIcon to a CheckIcon and its tooltip/aria-label text to 'Copied' for 1.5s after clicking. Use for a copy-link/copy-to-clipboard icon button with visual copy feedback.",
    file: "variants/v-button-23.tsx",
    keywords: ["copy button", "copy to clipboard", "copy feedback", "tooltip"],
    name: "v-button-23",
  },
  {
    category: "button",
    description:
      "Icon-only outline button that animates between a MenuIcon (hamburger) and an XIcon (close) using rotate/scale/opacity transitions based on toggled open state, with aria-expanded/aria-label reflecting the state. Use as an animated hamburger-to-close toggle for mobile nav menus or sidebars.",
    file: "variants/v-button-24.tsx",
    keywords: [
      "hamburger menu button",
      "animated toggle",
      "menu close icon swap",
    ],
    name: "v-button-24",
  },
  {
    category: "button",
    description:
      "Pill-shaped ('rounded-full') button reading 'Get Started' where, on hover, the text slides left and a trailing ArrowRightIcon slides in from the right and fades in (group-hover transitions on both). Use for a CTA button with a 'sliding reveal' hover animation.",
    file: "variants/v-button-25.tsx",
    keywords: [
      "sliding icon button",
      "hover reveal animation",
      "cta hover effect",
    ],
    name: "v-button-25",
  },
  {
    category: "button",
    description:
      "Social-login button stack: full-width outline 'Continue with GitHub' (GitBranch icon) and 'Continue with Google' (custom multi-color Google SVG logo) buttons, an 'or' divider with Separators on each side, then a full-width default 'Continue with email' button. Use for an auth/login screen's social sign-in options block.",
    file: "variants/v-button-26.tsx",
    keywords: [
      "social login buttons",
      "github google oauth",
      "sign in options",
      "auth buttons",
    ],
    name: "v-button-26",
  },
  {
    category: "button",
    description:
      "Stateful 'Save Changes' button cycling through idle → loading (spinner via `loading` prop, disabled, 'Saving…') → success (outline variant, green CheckIcon, 'Saved' text) → back to idle after a timed sequence (setTimeout chain). Use for save/submit buttons that need to visually confirm a completed async action before resetting.",
    file: "variants/v-button-27.tsx",
    keywords: [
      "loading state button",
      "success state button",
      "animated icon swap",
      "save button",
    ],
    name: "v-button-27",
  },
  {
    category: "button",
    description:
      "File-upload button: an outline 'Attach file' button (PaperclipIcon) triggers a hidden native file input; once a file is chosen the label changes to 'Change file' and a small pill below shows the filename with a clear (X) button to remove the selection. Use for a simple single-file attach/upload control built from a button plus hidden input.",
    file: "variants/v-button-28.tsx",
    keywords: ["file upload button", "attachment preview", "clear file action"],
    name: "v-button-28",
  },
  {
    category: "button",
    description:
      "Split button built with Group: a primary 'Deploy' button (RocketIcon) joined via GroupSeparator to a small icon-only chevron button that opens a Menu with additional deploy options (Staging, Preview, custom env, and a destructive 'Force deploy'). Use for a primary action plus a menu of secondary/related actions joined into one visual control.",
    file: "variants/v-button-29.tsx",
    keywords: [
      "split button",
      "primary action with dropdown",
      "group button",
      "deploy menu",
    ],
    name: "v-button-29",
  },
  {
    category: "button",
    description:
      "Segmented view-toggle control built with Group: three buttons (List/Table/Board, each with its own icon) separated by GroupSeparators, where the active view is highlighted (default variant) and others are ghost; a status line below reads 'Viewing as: <view>'. Use for switching between list/table/kanban (or similar) view modes.",
    file: "variants/v-button-30.tsx",
    keywords: [
      "segmented control",
      "view mode toggle",
      "list table kanban switch",
    ],
    name: "v-button-30",
  },

  // --- calendar ---
  {
    category: "calendar",
    description:
      "Baseline single-date-select calendar month grid (mode='single') defaulting to today. Use as the default date picker calendar with no extra features.",
    file: "variants/v-calendar-1.tsx",
    name: "v-calendar-1",
  },
  {
    category: "calendar",
    description:
      "Same single-date calendar as v-calendar-1 but with larger day-cell size overridden via the `--cell-size` CSS variable (responsive: bigger on mobile, smaller on sm+). Use when the calendar needs bigger tap targets, e.g. on mobile-first layouts.",
    file: "variants/v-calendar-2.tsx",
    keywords: ["cell size", "fallback only", "larger touch targets"],
    name: "v-calendar-2",
  },
  {
    category: "calendar",
    description:
      "Date-range calendar (mode='range') defaulting to a 7-day range from today. Use for selecting a start/end date range in one calendar (e.g. booking or reporting periods).",
    file: "variants/v-calendar-3.tsx",
    keywords: ["date range picker", "range mode"],
    name: "v-calendar-3",
  },
  {
    category: "calendar",
    description:
      "Single-date calendar with `captionLayout='dropdown'` plus `startMonth`/`endMonth` bounds (1930–2030), rendering native month/year dropdown selectors in the header for fast long-range navigation. Use when users need to jump far back/forward in time (e.g. birthdates) via dropdowns instead of paging month-by-month.",
    file: "variants/v-calendar-4.tsx",
    keywords: [
      "dropdown navigation",
      "month year dropdown",
      "long range date picker",
    ],
    name: "v-calendar-4",
  },
  {
    category: "calendar",
    description:
      "Same dropdown-navigation calendar as v-calendar-4, but the month/year dropdown is a custom component using this library's Select (SelectTrigger/SelectPopup/SelectItem) instead of a native <select>, wired via react-day-picker's `components.Dropdown` override. Use as the pattern for restyling the calendar's month/year picker with your own Select component.",
    file: "variants/v-calendar-5.tsx",
    keywords: ["custom select dropdown", "styled month year picker"],
    name: "v-calendar-5",
  },
  {
    category: "calendar",
    description:
      "Same dropdown-navigation calendar as v-calendar-4/5, but the month/year dropdown is replaced with a searchable Combobox (type-to-filter, autoHighlight) via `components.Dropdown`. Use when the month/year picker should be filterable/searchable rather than a plain list.",
    file: "variants/v-calendar-6.tsx",
    keywords: ["custom combobox dropdown", "searchable month year picker"],
    name: "v-calendar-6",
  },
  {
    category: "calendar",
    description:
      "Multiple-date-selection calendar (mode='multiple') where clicking days toggles them individually (not a range); selected dates are listed below as a sorted set of small pill tags with a count. Use for picking several independent, non-contiguous dates (e.g. multi-day event scheduling).",
    file: "variants/v-calendar-7.tsx",
    keywords: [
      "multiple selection",
      "multi date picker",
      "non-contiguous dates",
    ],
    name: "v-calendar-7",
  },
  {
    category: "calendar",
    description:
      "Appointment-booking calendar: past dates, weekends, and a hardcoded list of 'fully booked' dates are all disabled/greyed out via the `disabled` prop (array of matchers), and selecting a valid date shows a confirmation line below. Use for booking flows that need to block out weekends and pre-filled unavailable dates.",
    file: "variants/v-calendar-8.tsx",
    keywords: [
      "appointment booking",
      "disabled dates",
      "weekends blocked",
      "fully booked",
    ],
    name: "v-calendar-8",
  },
  {
    category: "calendar",
    description:
      "Two-month side-by-side range-picker calendar (`numberOfMonths={2}`, mode='range') with a summary line below showing the formatted start → end dates and a computed 'N nights' pill badge. Use for hotel/stay-style date-range pickers that benefit from seeing two months at once.",
    file: "variants/v-calendar-9.tsx",
    keywords: [
      "two month calendar",
      "range picker with nights",
      "stay duration",
    ],
    name: "v-calendar-9",
  },
  {
    category: "calendar",
    description:
      "Single-date calendar with a custom DayButton override that renders a small colored dot under any day that has an associated event (meeting=blue, deadline=red, holiday=amber), plus a legend below explaining each dot color. Use for calendars that need to visually flag which days have scheduled events.",
    file: "variants/v-calendar-10.tsx",
    keywords: [
      "event indicators",
      "calendar dots",
      "event legend",
      "scheduled events",
    ],
    name: "v-calendar-10",
  },
  {
    category: "calendar",
    description:
      "Single-date calendar preceded by a row of quick-select preset buttons (Today, Tomorrow, Next Monday, In 1/2 weeks, In 1 month) that jump the selected date; the active preset/date is highlighted, and the full formatted date shows below the calendar. Use for date pickers that want fast common-choice shortcuts above the grid.",
    file: "variants/v-calendar-11.tsx",
    keywords: [
      "date picker presets",
      "quick select shortcuts",
      "today tomorrow buttons",
    ],
    name: "v-calendar-11",
  },
  {
    category: "calendar",
    description:
      "Date-of-birth picker: dropdown month/year navigation (custom Select-based dropdown) bounded 1900–today, disables future dates, defaults to starting around 1990, and computes/displays the selected date's age in years below. Use specifically for birthdate fields that need age calculation and a wide selectable year range.",
    file: "variants/v-calendar-12.tsx",
    keywords: ["date of birth", "age calculation", "birthdate picker"],
    name: "v-calendar-12",
  },
  {
    category: "calendar",
    description:
      "Week-picker calendar: clicking any day snaps the range selection to that day's full Monday–Sunday ISO week (`ISOWeek` + `showWeekNumber`), and the formatted week range is shown below. Use when users need to pick an entire calendar week rather than an arbitrary date range (e.g. weekly reports/scheduling).",
    file: "variants/v-calendar-13.tsx",
    keywords: ["week picker", "iso week", "week number", "select whole week"],
    name: "v-calendar-13",
  },
  {
    category: "calendar",
    description:
      "Read-only holiday calendar: weekends are disabled, a fixed set of US holidays are highlighted in a distinct rose color via `modifiers`/`modifiersClassNames`, and clicking a highlighted date reveals its holiday name below. Use for holiday/company-calendar reference views (not really for picking a value, more for display + lookup).",
    file: "variants/v-calendar-14.tsx",
    keywords: [
      "holiday calendar",
      "highlighted dates",
      "us holidays",
      "reference calendar",
    ],
    name: "v-calendar-14",
  },
  {
    category: "calendar",
    description:
      "Hotel-style check-in/check-out calendar: today is fixed and visually marked as 'check-in' via a custom modifier class, dates before tomorrow are disabled, and selecting a later date sets 'check-out', with a nights-count summary card below. Use for hotel/rental booking flows with a fixed check-in day and a selectable check-out date.",
    file: "variants/v-calendar-15.tsx",
    keywords: ["check-in check-out", "hotel booking", "nights calculation"],
    name: "v-calendar-15",
  },
  {
    category: "calendar",
    description:
      "Habit-tracker calendar: a custom DayButton highlights 'completed' days green with a small checkmark based on a hardcoded set of dates, dates are non-selectable/read-only for tracking display, and a 'Days completed this month' streak counter (X / days-so-far) is shown below. Use for habit-tracking or attendance-style completion calendars.",
    file: "variants/v-calendar-16.tsx",
    keywords: ["habit tracker", "completion indicators", "streak counter"],
    name: "v-calendar-16",
  },
  {
    category: "calendar",
    description:
      "Sprint-planner two-month range calendar: disables past dates, computes duration in days and a 'sprint number' (based on 14-day sprints since Jan 1) shown as a badge, with a 3-column Start/End/Duration stats grid below. Use for engineering sprint-planning date-range selection with derived sprint metadata.",
    file: "variants/v-calendar-17.tsx",
    keywords: [
      "sprint planner",
      "two month range",
      "duration stats",
      "sprint number badge",
    ],
    name: "v-calendar-17",
  },
  {
    category: "calendar",
    description:
      "Time-off-request calendar: a row of selectable leave-type pill buttons (Vacation, Sick Leave, Personal, Work From Home) above a range calendar (past dates disabled), showing computed day count and type, plus a 'Request Time Off' submit button that shows a temporary 'Submitted!' confirmation and resets. Use for HR/leave-request forms combining a type selector with a date range picker.",
    file: "variants/v-calendar-18.tsx",
    keywords: [
      "time off request",
      "leave type selector",
      "hr leave form",
      "vacation request",
    ],
    name: "v-calendar-18",
  },
  {
    category: "calendar",
    description:
      "Mini year-at-a-glance view: renders all 12 months of the current year as a 3–4 column grid of tiny, nav-hidden single-date calendars sharing one selected-date state, with the full selected date shown below. Use when users need to see and pick from an entire year at once rather than paging month by month.",
    file: "variants/v-calendar-19.tsx",
    keywords: ["mini year view", "all 12 months grid", "year overview"],
    name: "v-calendar-19",
  },
  {
    category: "calendar",
    description:
      "Time-slot booking flow: a single-date calendar (past disabled) followed by a grid of hourly time-slot buttons that are marked booked/disabled per a hardcoded schedule per date, a selected-slot Badge summary, and a 'Book Slot' confirm button showing a temporary 'Booked!' state before resetting. Use for appointment-booking UIs that need both a date calendar and a same-day available/booked time-slot grid.",
    file: "variants/v-calendar-20.tsx",
    keywords: [
      "time slot booking",
      "available booked slots",
      "appointment scheduling",
      "hourly slots",
    ],
    name: "v-calendar-20",
  },

  // --- card ---
  {
    category: "card",
    description:
      "'Create project' form card: CardHeader (title + description), CardPanel containing a Form with Name Input and Framework Select fields plus a full-width 'Deploy' submit Button, and a CardFooter with a small info icon note ('This will take a few seconds to complete'). Use as a project-creation/deploy config form inside a card.",
    file: "variants/v-card-1.tsx",
    keywords: ["create project form", "deploy form card", "form in card"],
    name: "v-card-1",
  },
  {
    category: "card",
    description:
      "Basic card with a `border-b` applied to CardHeader, visually separating the header from the CardContent body. Use as the default pattern for a card whose header should be visually divided from its content.",
    file: "variants/v-card-2.tsx",
    keywords: ["header border", "border separation"],
    name: "v-card-2",
  },
  {
    category: "card",
    description:
      "Card with both a bordered header (`border-b`) and a bordered footer (`border-t` on CardFooter containing a full-width outline 'Action' button), separating header/content/footer into three distinct visual bands. Use when a card needs clear divider lines between all three sections.",
    file: "variants/v-card-3.tsx",
    keywords: ["header and footer border", "three section card"],
    name: "v-card-3",
  },
  {
    category: "card",
    description:
      "Compact help card ('Need a help in Claim?') with tight header/content/footer spacing and a link-style Button with a trailing ExternalLinkIcon in the footer ('See our guideline'). Use for small inline help/support callout cards with a single link action.",
    file: "variants/v-card-4.tsx",
    keywords: ["help card", "link footer", "support callout"],
    name: "v-card-4",
  },
  {
    category: "card",
    description:
      "Same help-card layout as v-card-4, but the header includes a DropdownMenu (triggered by a MoreHorizontalIcon button) with grouped items (Manage members, Team preferences, Open dashboard), and the footer shows a small avatar + '@shadcn' Button instead of a link. Use for a help/info card that also needs an overflow menu and an attributed footer action.",
    file: "variants/v-card-5.tsx",
    keywords: [
      "overflow menu card",
      "dropdown menu in header",
      "avatar footer button",
    ],
    name: "v-card-5",
  },
  {
    category: "card",
    description:
      "Feature/promo card: full-bleed 16:9 cover image, a row with a 'Trending' outline Badge and a 'Featured' sparkle label, a short pitch paragraph, and a full-width 'Get Started' Button with trailing arrow. Use for marketing/feature-announcement cards with an image, tags, and CTA.",
    file: "variants/v-card-6.tsx",
    keywords: ["image card", "promo card", "feature card with cta"],
    name: "v-card-6",
  },
  {
    category: "card",
    description:
      "Full-bleed background-image card (borderless, no padding) with a dark gradient overlay fading from the bottom, a title and description positioned at the bottom, and a smooth image zoom-in (`scale-110`) plus stronger overlay on hover. Use for a cinematic hover-interactive image/content card, e.g. a blog or article teaser.",
    file: "variants/v-card-7.tsx",
    keywords: [
      "image scale hover effect",
      "gradient overlay card",
      "hero image card",
    ],
    name: "v-card-7",
  },
  {
    category: "card",
    description:
      "Full-bleed background-image author-profile card with the same image-scale hover effect as v-card-7, plus a header overlay (avatar with a custom verified-badge SVG, name link, email, and a 'New' success Badge) and bottom overlay text ('Author Profile' title + description). Use for author/profile teaser cards over a background image with layered header and footer overlays.",
    file: "variants/v-card-8.tsx",
    keywords: [
      "author profile card",
      "image shadow fade effect",
      "avatar overlay",
    ],
    name: "v-card-8",
  },
  {
    category: "card",
    description:
      "Standard card (header/content/footer, outline 'Action' button) with two extra bordered rectangles stacked behind it (offset downward, decreasing width) to create a 'stack of cards' depth illusion. Use when a single card should visually read as the top of a stack (e.g. representing multiple items/documents behind it).",
    file: "variants/v-card-9.tsx",
    keywords: ["stacked depth effect", "card stack illusion"],
    name: "v-card-9",
  },
  {
    category: "card",
    description:
      "'Sign in' auth form card: header (title + description), CardContent with email Field, a password Field with a show/hide toggle (InputGroup + Eye/EyeOff icon button) and a 'Forgot password?' link, a full-width 'Sign in' submit Button, an 'Or continue with' divider, an outline GitHub-style OAuth button, and a footer ToS disclaimer line. Use as a complete login form card.",
    file: "variants/v-card-10.tsx",
    keywords: [
      "login form card",
      "sign in card",
      "password visibility toggle",
      "oauth button",
    ],
    name: "v-card-10",
  },
  {
    category: "card",
    description:
      "Billing-usage card that expands/collapses its content: header shows 'N days remaining in cycle' plus a 'Billing' outline Button (CardAction), content shows a credit-usage summary block with a Progress bar and a list of usage line items whose max-height animates between collapsed and expanded, with a floating chevron toggle button anchored at the bottom-center and a fade-out gradient when collapsed. Use for an expandable usage/billing summary card.",
    file: "variants/v-card-11.tsx",
    keywords: [
      "expandable content card",
      "billing usage card",
      "collapsible card",
      "progress bar",
    ],
    name: "v-card-11",
  },
  {
    category: "card",
    description:
      "Analytics stat card: label ('Revenue') with an overflow DropdownMenu (Settings, Add Alert, Pin to Dashboard, Share, destructive Remove), a large current value with a color-coded up/down trend Badge, a Separator, and a 'Vs last month' comparison line. Use for a single KPI/metric card with an overflow actions menu and trend indicator.",
    file: "variants/v-card-12.tsx",
    keywords: [
      "stat card with menu",
      "kpi card",
      "trend badge",
      "overflow menu",
    ],
    name: "v-card-12",
  },
  {
    category: "card",
    description:
      "Integration listing card (no outer padding): top bar with a 'Live' secondary Badge and a DropdownMenu (Edit, Copy link), body with integration name, an 'Installed' success Badge, description text, and an overlapping avatar stack with a '+3' overflow indicator, and a footer with a full-width outline 'Open' button. Use for third-party integration/marketplace listing cards.",
    file: "variants/v-card-13.tsx",
    keywords: [
      "integration card",
      "installed badge",
      "marketplace listing",
      "overflow menu",
    ],
    name: "v-card-13",
  },
  {
    category: "card",
    description:
      "Simple link-card: a colored square icon badge (ShoppingBagIcon), a bold title link ('Recent Orders Overview'), a short description paragraph, and a small 'View Orders' link with a trailing chevron. Use for a compact icon+title+description+link teaser card, e.g. a dashboard shortcut tile.",
    file: "variants/v-card-14.tsx",
    keywords: ["icon title link card", "dashboard shortcut", "teaser card"],
    name: "v-card-14",
  },
  {
    category: "card",
    description:
      "Header-labeled resource card (no outer padding): a bordered top band with icon + 'Documentation' label, then description text and a 'View docs' link with a link icon below. Use for a resource/help-link card with a distinct labeled header band above the body content.",
    file: "variants/v-card-15.tsx",
    keywords: ["header label link card", "resource card", "documentation card"],
    name: "v-card-15",
  },
  {
    category: "card",
    description:
      "GitHub-style repository list rendered as a stack of individual cards: each card shows repo name with a branch icon, a 'Public' secondary Badge, a description, and a metadata row (colored language dot + language name, star count, fork count). Use for a repository listing/dashboard where each repo is its own card rather than table rows.",
    file: "variants/v-card-16.tsx",
    keywords: [
      "github repository cards",
      "repo list",
      "language star fork counts",
    ],
    name: "v-card-16",
  },
  {
    category: "card",
    description:
      "Settings card with an internal sidebar: a left nav column (Profile, Notifications, Billing, Security, each with an icon) inside the card switches the right-hand content panel's title/description via local state, without any external routing. Use for a self-contained settings/preferences card with swappable content sections navigated by an inline sidebar.",
    file: "variants/v-card-17.tsx",
    keywords: [
      "settings card sidebar",
      "swappable content panels",
      "internal navigation",
    ],
    name: "v-card-17",
  },
  {
    category: "card",
    description:
      "Pricing plan card with a highlighted ring border (`ring-2 ring-primary`) marking it as the emphasized plan: plan name + 'Most Popular' Badge, large price with period, a Separator, a checklist of included features (checkmarks), and a full-width 'Start free trial' CTA button. Use for a single featured pricing-tier card in a pricing page/table.",
    file: "variants/v-card-18.tsx",
    keywords: [
      "pricing plan card",
      "highlighted ring",
      "feature checklist",
      "most popular",
    ],
    name: "v-card-18",
  },
  {
    category: "card",
    description:
      "Event card: title with a category Badge (e.g. 'Workshop'), a stacked meta list with icons for date, time, location, and attendee count plus a highlighted 'spots left' count, and a full-width 'Reserve a Spot' button. Use for event listing/registration cards needing date/time/location/attendee metadata and an RSVP action.",
    file: "variants/v-card-19.tsx",
    keywords: ["event card", "rsvp button", "date time location attendees"],
    name: "v-card-19",
  },
  {
    category: "card",
    description:
      "Stats dashboard grid: a 2-column grid of four small metric cards (Total Users, Monthly Revenue, Churn Rate, Active Sessions), each showing a label, a large value, and a color-coded (green/red) trend line with an up/down icon and percentage delta vs last month. Use for a compact KPI dashboard grid of independent metric tiles.",
    file: "variants/v-card-20.tsx",
    keywords: [
      "stats dashboard grid",
      "metric tiles",
      "kpi grid",
      "trend indicators",
    ],
    name: "v-card-20",
  },

  // --- carousel ---
  {
    category: "carousel",
    description:
      "Baseline carousel using this library's Carousel primitives: 5 numbered Card slides with Previous/Next arrow buttons on the sides. Use as the default carousel for simple slide-through content.",
    file: "variants/v-carousel-1.tsx",
    name: "v-carousel-1",
  },
  {
    category: "carousel",
    description:
      "Multi-item carousel: CarouselItem basis set to show 2 (and 3 on large screens) cards per view simultaneously (`opts={{align:'start'}}`), with Previous/Next buttons. Use when several items should be visible side-by-side per slide instead of one at a time.",
    file: "variants/v-carousel-2.tsx",
    keywords: ["multiple items visible", "basis columns"],
    name: "v-carousel-2",
  },
  {
    category: "carousel",
    description:
      "Same multi-item carousel as v-carousel-2 but with explicit negative-margin/padding classes (`-ml-1`/`pl-1`) controlling the gap/spacing between visible items. Use as a reference for customizing the gutter spacing between carousel slides.",
    file: "variants/v-carousel-3.tsx",
    keywords: ["custom spacing", "gutter between items"],
    name: "v-carousel-3",
  },
  {
    category: "carousel",
    description:
      "Vertical-orientation carousel (`orientation='vertical'`) showing 2 numbered cards per view in a fixed-height column with Previous/Next buttons. Use when slides should scroll top-to-bottom instead of left-to-right.",
    file: "variants/v-carousel-4.tsx",
    keywords: ["vertical carousel", "vertical orientation"],
    name: "v-carousel-4",
  },
  {
    category: "carousel",
    description:
      "Autoplay carousel built directly on embla-carousel-react (not this library's Carousel wrapper): loops automatically every 2.5s via setInterval, colorful gradient slides with a headline/subline, and small pill-style dot indicators below that highlight the active slide and are clickable to jump. Use for auto-advancing marketing/hero carousels with dot navigation.",
    file: "variants/v-carousel-5.tsx",
    keywords: [
      "autoplay carousel",
      "dot indicators",
      "auto advance",
      "embla carousel",
    ],
    name: "v-carousel-5",
  },
  {
    category: "carousel",
    description:
      "Testimonials carousel: each slide is a Card with a 5-star rating row, an italicized quote, and an avatar+name+role footer; loops via `opts={{loop:true}}` with Previous/Next buttons. Use for customer testimonial/review carousels.",
    file: "variants/v-carousel-6.tsx",
    keywords: ["testimonial carousel", "reviews", "star rating", "quote"],
    name: "v-carousel-6",
  },
  {
    category: "carousel",
    description:
      "Product-showcase carousel using the Carousel API (`setApi`) to drive external custom circular Previous/Next buttons below (disabled at the ends via `canScrollPrev`/`canScrollNext`): each slide is a product Card with a colored icon panel, badge (Bestseller/New/Sale/Popular), name, price, and 'Add to Cart' button, showing ~1.3 items per view. Use for an e-commerce product carousel with external nav controls and per-item purchase actions.",
    file: "variants/v-carousel-7.tsx",
    keywords: [
      "product showcase",
      "e-commerce carousel",
      "add to cart",
      "external nav buttons",
    ],
    name: "v-carousel-7",
  },
  {
    category: "carousel",
    description:
      "Onboarding-steps carousel built directly on embla-carousel-react (`watchDrag:false` to disable manual swipe): a progress bar and 'Step X of N' label above, each slide showing a centered icon, title, and description, and 'Back'/'Next' buttons below that advance via the embla API, with the last step's button becoming 'Finish' with a checkmark. Use for a linear onboarding/setup wizard driven by carousel slides instead of separate pages.",
    file: "variants/v-carousel-8.tsx",
    keywords: [
      "onboarding steps",
      "setup wizard",
      "progress bar",
      "step by step",
    ],
    name: "v-carousel-8",
  },
  {
    category: "carousel",
    description:
      "Team-members carousel using the Carousel API with external circular Previous/Next buttons: each slide is a Card showing a large avatar, name, role, department Badge, and GitHub/website links, showing ~1.25 members per view. Use for a 'meet the team' carousel with rich per-member profile cards.",
    file: "variants/v-carousel-9.tsx",
    keywords: ["team members carousel", "meet the team", "profile cards"],
    name: "v-carousel-9",
  },
  {
    category: "carousel",
    description:
      "Gallery-with-thumbnails carousel: a main large-image Carousel synced to a secondary drag-free thumbnail strip (two separate embla instances) — clicking a thumbnail or advancing the main carousel keeps both in sync, with the active thumbnail highlighted via a ring. Use for image/media galleries needing a main view plus a scrollable thumbnail strip.",
    file: "variants/v-carousel-10.tsx",
    keywords: [
      "gallery with thumbnails",
      "synced carousels",
      "thumbnail strip",
    ],
    name: "v-carousel-10",
  },
  {
    category: "carousel",
    description:
      "Testimonial carousel built directly on embla-carousel-react (loop) with quote-card slides (QuoteIcon, quote text, circular initials avatar, name/role) and small pill dot indicators below that are clickable to jump to a slide. Use as an alternative testimonial carousel style with dot navigation instead of arrow buttons (compare with v-carousel-6).",
    file: "variants/v-carousel-11.tsx",
    keywords: ["testimonial carousel", "dot indicators", "quote slides"],
    name: "v-carousel-11",
  },
  {
    category: "carousel",
    description:
      "Pricing-plan carousel built on embla-carousel-react, starting on the middle 'Pro' slide (`startIndex:1`) which is visually highlighted with a ring and 'Popular' badge; each slide is a full plan card (name, price, feature list, CTA button), with round Prev/Next arrow buttons and a 'current / total' counter below. Use for a swipeable pricing comparison carousel that highlights a recommended/active plan.",
    file: "variants/v-carousel-12.tsx",
    keywords: [
      "pricing plan carousel",
      "highlighted active plan",
      "arrow navigation",
    ],
    name: "v-carousel-12",
  },
  {
    category: "carousel",
    description:
      "Media-gallery carousel using this library's Carousel with Previous/Next arrows: each slide is a gradient placeholder tile with a small 'Image'/'Video' type badge and a caption, plus a 'current of total' counter and progress-dot row below that track the active slide. Use for a media asset gallery carousel that needs a type badge per item and a progress indicator.",
    file: "variants/v-carousel-13.tsx",
    keywords: [
      "media gallery",
      "caption badge",
      "progress dots",
      "image video type",
    ],
    name: "v-carousel-13",
  },
  {
    category: "carousel",
    description:
      "Changelog carousel built directly on embla-carousel-react with `dragFree:true` and `align:'start'` so cards can be freely dragged/scrolled rather than snapping one at a time: each card shows a colored version-tag pill (e.g. v2.4.0), release date, and a bulleted list of changes, with dot indicators below. Use for a horizontally-scrollable release-notes/changelog carousel with free-drag multi-card scrolling.",
    file: "variants/v-carousel-14.tsx",
    keywords: [
      "changelog carousel",
      "drag free scrolling",
      "version tags",
      "release notes",
    ],
    name: "v-carousel-14",
  },
  {
    category: "carousel",
    description:
      "Feature-highlight carousel built directly on embla-carousel-react (no loop): each slide is a large emoji icon plus a feature title/description on a soft colored background, with dot indicators and 'Prev'/'Next' pill buttons below (last slide's 'Next' becomes a 'Done' button with a checkmark). Use for a product feature-tour carousel with a definitive end state.",
    file: "variants/v-carousel-15.tsx",
    keywords: [
      "feature highlight carousel",
      "product tour",
      "prev next controls",
      "done state",
    ],
    name: "v-carousel-15",
  },

  // --- chart ---
  {
    category: "chart",
    description:
      "Multi-series bar chart (recharts BarChart) comparing 'Desktop' and 'Mobile' values side-by-side per month, no grid/axis/tooltip chrome — just two colored Bar series. Use as the minimal starting point for comparing two numeric series across categories.",
    file: "variants/v-chart-1.tsx",
    keywords: ["multi series bars", "recharts", "grouped bar chart"],
    name: "v-chart-1",
  },
  {
    category: "chart",
    description:
      "Simple area chart (recharts AreaChart) plotting one 'Desktop' series across months with a filled gradient area, cartesian grid, abbreviated month X-axis, and a line-style tooltip. Use as the default single-series area/trend chart.",
    file: "variants/v-chart-2.tsx",
    keywords: ["area chart", "single series trend"],
    name: "v-chart-2",
  },
  {
    category: "chart",
    description:
      "Simple bar chart (recharts BarChart) plotting one 'Desktop' series per month with rounded bar corners, cartesian grid, abbreviated month axis, and a label-hidden tooltip. Use as the default single-series bar chart.",
    file: "variants/v-chart-3.tsx",
    keywords: ["bar chart", "single series"],
    name: "v-chart-3",
  },
  {
    category: "chart",
    description:
      "Simple line chart (recharts LineChart) plotting one smoothed 'Desktop' series per month with no dots, cartesian grid, abbreviated month axis, and a label-hidden tooltip. Use as the default single-series line/trend chart.",
    file: "variants/v-chart-4.tsx",
    keywords: ["line chart", "single series trend"],
    name: "v-chart-4",
  },
  {
    category: "chart",
    description:
      "Simple pie chart (recharts PieChart) showing browser market-share (Chrome/Safari/Firefox/Edge/Other) as colored pie slices with a label-hidden tooltip and no legend. Use as the default category-share/pie visualization.",
    file: "variants/v-chart-5.tsx",
    keywords: ["pie chart", "market share", "category breakdown"],
    name: "v-chart-5",
  },
  {
    category: "chart",
    description:
      "Radar chart (recharts RadarChart) plotting one 'Desktop' series across months around a polar grid with angle-axis month labels and a filled radar shape. Use for multi-axis/spider-style comparisons across categorical dimensions.",
    file: "variants/v-chart-6.tsx",
    keywords: ["radar chart", "spider chart"],
    name: "v-chart-6",
  },
  {
    category: "chart",
    description:
      "Radial bar chart (recharts RadialBarChart) showing browser market-share as concentric radial bar segments with a name-keyed tooltip. Use as an alternative to a pie chart for showing proportional category values as radial arcs.",
    file: "variants/v-chart-7.tsx",
    keywords: ["radial bar chart", "radial chart"],
    name: "v-chart-7",
  },
  {
    category: "chart",
    description:
      "Stacked bar chart with a legend: monthly Housing/Food/Transport expense values stacked into single bars per month (shared `stackId`), with rounded top corners on the topmost segment, cartesian grid, and a full tooltip + ChartLegend. Use for expense/budget breakdowns where multiple categories sum to a total per period.",
    file: "variants/v-chart-8.tsx",
    keywords: [
      "stacked bar chart",
      "expense breakdown",
      "budget chart",
      "legend",
    ],
    name: "v-chart-8",
  },
  {
    category: "chart",
    description:
      "Scatter plot (recharts ScatterChart) correlating 'study hours' (X) against 'score' (Y) as individual points, with labeled numeric axes and a full tooltip. Use for showing correlation between two continuous numeric variables.",
    file: "variants/v-chart-9.tsx",
    keywords: ["scatter plot", "correlation chart", "xy plot"],
    name: "v-chart-9",
  },
  {
    category: "chart",
    description:
      "Monthly revenue bar chart with a dashed horizontal ReferenceLine marking a fixed 'Target' value, a currency-formatted Y-axis, and a currency-formatted tooltip. Use for showing progress toward a fixed goal/target line overlaid on periodic bars.",
    file: "variants/v-chart-10.tsx",
    keywords: ["target reference line", "goal tracking chart", "revenue chart"],
    name: "v-chart-10",
  },
  {
    category: "chart",
    description:
      "Stacked area chart comparing 'One-time' vs 'Recurring' revenue per month (shared `stackId`, two fill opacities), with a currency-formatted Y-axis and a ChartLegend. Use for showing how two revenue/value series compose a combined total over time.",
    file: "variants/v-chart-11.tsx",
    keywords: [
      "stacked area chart",
      "revenue breakdown",
      "recurring vs one-time",
    ],
    name: "v-chart-11",
  },
  {
    category: "chart",
    description:
      "Horizontal bar chart (`layout='vertical'`) ranking traffic channels (Organic, Direct, Referral, Social, Email, Paid) by session count, with channel names as the Y-axis category labels and a label-hidden tooltip. Use for ranking/comparing categories by a single metric with long category names that read better horizontally.",
    file: "variants/v-chart-12.tsx",
    keywords: ["horizontal bar chart", "ranking chart", "traffic channels"],
    name: "v-chart-12",
  },
  {
    category: "chart",
    description:
      "Donut chart (Pie with `innerRadius`/`outerRadius` and padding between slices) showing department headcount (Design/Engineering/Marketing/Operations) as colored segments, with a centered total-headcount number and 'headcount' label rendered inside the donut hole via SVG text, plus a bottom ChartLegend. Use for a headcount/category-share donut with a prominent center total.",
    file: "variants/v-chart-13.tsx",
    keywords: ["donut chart", "center label", "headcount by department"],
    name: "v-chart-13",
  },
  {
    category: "chart",
    description:
      "Multi-series line chart comparing API latency percentiles (p50 solid, p90 dashed, p99 finer-dashed) per month, with a ms-formatted Y-axis, full tooltip, and ChartLegend distinguishing the three lines by stroke pattern as well as color. Use for latency/percentile monitoring charts or any multi-line comparison needing dash-pattern differentiation.",
    file: "variants/v-chart-14.tsx",
    keywords: [
      "multi series line chart",
      "latency percentiles",
      "p50 p90 p99",
      "api monitoring",
    ],
    name: "v-chart-14",
  },
  {
    category: "chart",
    description:
      "Composed chart overlaying monthly revenue Bars (left Y-axis, currency-formatted) with a growth-rate Line (right Y-axis, percentage-formatted, with dots) on dual independent axes, plus full tooltip and ChartLegend. Use when two related metrics with different units/scales (e.g. absolute revenue and percentage growth) need to share one chart via dual axes.",
    file: "variants/v-chart-15.tsx",
    keywords: [
      "composed chart",
      "dual axis chart",
      "revenue and growth rate",
      "bar and line combo",
    ],
    name: "v-chart-15",
  },

  // --- checkbox ---
  {
    category: "checkbox",
    description:
      "Baseline checkbox wrapped directly in a Label ('Accept terms and conditions') with no extra layout. Use as the default single checkbox with an inline text label.",
    file: "variants/v-checkbox-1.tsx",
    name: "v-checkbox-1",
  },
  {
    category: "checkbox",
    description:
      "Same 'Accept terms and conditions' checkbox but `defaultChecked` and `disabled`, showing the checked-and-locked visual state. Use to represent a pre-agreed, non-editable checkbox (e.g. mandatory terms already accepted).",
    file: "variants/v-checkbox-2.tsx",
    keywords: ["disabled checkbox", "checked and disabled"],
    name: "v-checkbox-2",
  },
  {
    category: "checkbox",
    description:
      "Checkbox with a separate Label plus a helper description paragraph beneath it, laid out with the checkbox aligned to the top of the text block. Use when a checkbox option needs an explanatory sentence under its label.",
    file: "variants/v-checkbox-3.tsx",
    keywords: ["with description", "helper text"],
    name: "v-checkbox-3",
  },
  {
    category: "checkbox",
    description:
      "Checkbox styled as a clickable bordered card row ('Enable notifications' + helper text) that highlights its border/background when checked (`has-data-checked` variants). Use for settings toggles that should look like a selectable option card rather than a plain checkbox row.",
    file: "variants/v-checkbox-4.tsx",
    keywords: ["card style checkbox", "selectable option card"],
    name: "v-checkbox-4",
  },
  {
    category: "checkbox",
    description:
      "Checkbox integrated into a Field/Form: submitting reads the checkbox's form value via FormData, shows a loading state on the submit Button, and alerts whether terms were accepted. Use as the pattern for a required/optional checkbox inside a real form submission flow.",
    file: "variants/v-checkbox-5.tsx",
    keywords: ["form integration", "checkbox in form", "formdata"],
    name: "v-checkbox-5",
  },
  {
    category: "checkbox",
    description:
      "Payment-method selection card: a Frame/FramePanel row showing a card-brand icon (custom Mastercard SVG), masked card number, and expiry, with a circular checkbox absolutely positioned in the top-right corner to mark it as the selected/default payment method. Use for a saved-payment-method picker UI.",
    file: "variants/v-checkbox-6.tsx",
    keywords: [
      "payment method card",
      "select default card",
      "circular checkbox",
    ],
    name: "v-checkbox-6",
  },
  {
    category: "checkbox",
    description:
      "Permission list with a parent 'Select all permissions' checkbox that shows an indeterminate state when only some child permissions (Read/Write/Delete/Admin) are checked, and toggles all children when clicked. Use for the classic 'select all / indeterminate / individual items' checkbox pattern.",
    file: "variants/v-checkbox-7.tsx",
    keywords: [
      "select all indeterminate",
      "parent child checkboxes",
      "indeterminate state",
    ],
    name: "v-checkbox-7",
  },
  {
    category: "checkbox",
    description:
      "Issue-label picker: a list of colored-dot labels (bug, feature, improvement, etc.) each with its own checkbox, a live 'N selected' counter above, and hover-highlighted clickable rows. Use for a GitHub-style multi-select label/tag picker rendered as a checkbox list rather than a dropdown.",
    file: "variants/v-checkbox-8.tsx",
    keywords: ["issue label picker", "tag selector", "colored dot labels"],
    name: "v-checkbox-8",
  },
  {
    category: "checkbox",
    description:
      "Notification-channel selector: each channel (Email, SMS, In-app, Slack) has its own checkbox plus an icon badge that changes color/style when checked, label, and description, in a divided list. Use for a notification-preferences channel picker with per-channel icon feedback.",
    file: "variants/v-checkbox-9.tsx",
    keywords: ["notification channel selector", "icon feedback checkbox"],
    name: "v-checkbox-9",
  },
  {
    category: "checkbox",
    description:
      "Multi-consent registration gate: several required checkboxes (Terms, Privacy Policy, age confirmation) plus one optional marketing-consent checkbox, each with label + description; a 'Create account' Button stays disabled and shows a 'N required items remaining' message until all required consents are checked. Use for signup/registration flows needing multiple gated legal consents before allowing submission.",
    file: "variants/v-checkbox-10.tsx",
    keywords: [
      "multi consent gate",
      "registration checkboxes",
      "required agreements",
      "signup consent",
    ],
    name: "v-checkbox-10",
  },
  {
    category: "checkbox",
    description:
      "Weekly-availability grid: a table with days of the week as columns and time-of-day (Morning/Afternoon/Evening) as rows, each cell containing an independent checkbox to mark availability, with a live 'N slots selected' counter. Use for scheduling/availability pickers needing a day-by-timeslot grid of checkboxes.",
    file: "variants/v-checkbox-11.tsx",
    keywords: [
      "weekly availability grid",
      "schedule picker",
      "day time slot checkboxes",
    ],
    name: "v-checkbox-11",
  },
  {
    category: "checkbox",
    description:
      "Role-permissions picker: each permission (Read/Write/Delete/Admin) is a bordered row with a checkbox, label, and a color-coded Badge matching its access-level severity (secondary/info/warning/destructive), plus a description. Use for an access-control/role-permission selector where each permission's risk level should be visually distinct via badge color.",
    file: "variants/v-checkbox-12.tsx",
    keywords: [
      "role permissions picker",
      "access level badges",
      "colored badge per permission",
    ],
    name: "v-checkbox-12",
  },
  {
    category: "checkbox",
    description:
      "Notification-preferences matrix: a table with notification events as rows (New message, Mention, Task assigned, etc.) and channels (Email/Push/SMS) as columns, each cell an independent checkbox, defaulting to email-only enabled, plus a 'Save preferences' button. Use for a full notification-settings matrix combining event rows with channel columns.",
    file: "variants/v-checkbox-13.tsx",
    keywords: [
      "notification preferences matrix",
      "event rows channel columns",
      "settings table",
    ],
    name: "v-checkbox-13",
  },
  {
    category: "checkbox",
    description:
      "Plan add-on selector: a list of feature checkboxes (High Availability, Data Encryption, Advanced Monitoring, SSO & SAML, Priority Support) each in a bordered card row with label+description, a live-computed 'Estimated total' price band that increases per add-on beyond the first two included, and a 'Confirm selection' button. Use for a pricing add-on/feature customizer with a dynamically updating price total.",
    file: "variants/v-checkbox-14.tsx",
    keywords: [
      "plan add-on selector",
      "dynamic price total",
      "feature toggles pricing",
    ],
    name: "v-checkbox-14",
  },
  {
    category: "checkbox",
    description:
      "Sprint task checklist: each task row has a checkbox, a priority Badge (high/medium/low, color-coded), and strikethrough+dimmed styling once checked off; shows a live 'N remaining' counter, a celebratory 'All tasks complete! 🎉' banner when everything is done, and a 'Reset' button to clear all completions. Use for a sprint/todo checklist with priority tags and a completion celebration state.",
    file: "variants/v-checkbox-15.tsx",
    keywords: [
      "sprint task checklist",
      "priority badges",
      "completion celebration",
      "todo list",
    ],
    name: "v-checkbox-15",
  },

  // --- checkbox-group ---
  {
    category: "checkbox group",
    description:
      "Baseline CheckboxGroup with three plain framework options (Next.js/Vite/Astro), one pre-checked via `defaultValue`. Use as the default multi-select checkbox group.",
    file: "variants/v-checkbox-group-1.tsx",
    name: "v-checkbox-group-1",
  },
  {
    category: "checkbox group",
    description:
      "Same three-item framework CheckboxGroup but with the 'Vite' item individually `disabled`, showing a mixed enabled/disabled group. Use when specific options in a checkbox group need to be non-interactive while others stay selectable.",
    file: "variants/v-checkbox-group-2.tsx",
    keywords: ["disabled item", "mixed enabled disabled"],
    name: "v-checkbox-group-2",
  },
  {
    category: "checkbox group",
    description:
      "Controlled CheckboxGroup with a 'parent' Checkbox ('Frameworks') that selects/deselects all child framework checkboxes via the `parent` prop and `allValues`, showing indeterminate state automatically. Use for the built-in parent-checkbox select-all pattern (single level).",
    file: "variants/v-checkbox-group-3.tsx",
    keywords: ["parent checkbox", "select all"],
    name: "v-checkbox-group-3",
  },
  {
    category: "checkbox group",
    description:
      "Nested CheckboxGroup: an outer 'User Permissions' group contains a 'Manage Users' parent checkbox that is itself the label for an inner nested CheckboxGroup ('Create/Edit/Delete User', 'Assign Roles'), with manual indeterminate-state wiring between the two levels via React state. Use for two-level permission trees where checking a sub-group should also toggle its parent item in the outer group.",
    file: "variants/v-checkbox-group-4.tsx",
    keywords: [
      "nested parent checkbox",
      "two level permissions",
      "indeterminate sync",
    ],
    name: "v-checkbox-group-4",
  },
  {
    category: "checkbox group",
    description:
      "CheckboxGroup integrated into a Fieldset/Field/Form: 'Frameworks' Fieldset with a legend, three checkboxes wrapped in FieldItem/FieldLabel, and a submit Button that reads all checked values via `formData.getAll('frameworks')` and alerts them, with a loading state. Use as the form-submission pattern for a checkbox group field.",
    file: "variants/v-checkbox-group-5.tsx",
    keywords: ["form integration", "fieldset", "formdata getall"],
    name: "v-checkbox-group-5",
  },
  {
    category: "checkbox group",
    description:
      "Horizontally-wrapping CheckboxGroup (`flex-row flex-wrap`) with all 7 days of the week as inline options, weekdays pre-checked by default. Use for a compact day-of-week selector laid out in a single wrapping row instead of a vertical list.",
    file: "variants/v-checkbox-group-6.tsx",
    keywords: ["horizontal layout", "day of week selector", "flex row"],
    name: "v-checkbox-group-6",
  },
  {
    category: "checkbox group",
    description:
      "Programming-language CheckboxGroup with a live 'N selected' secondary Badge shown next to the group's title, updating as items are (de)selected. Use when a checkbox group needs a compact selected-count indicator rather than a full summary list.",
    file: "variants/v-checkbox-group-7.tsx",
    keywords: ["selected count badge", "language picker"],
    name: "v-checkbox-group-7",
  },
  {
    category: "checkbox group",
    description:
      "Notification-preferences CheckboxGroup rendered as a divided list (`divide-y`) where each item is a clickable row with checkbox, bold label, and a description line beneath (Mentions, Weekly digest, Security alerts, Product updates), two pre-checked. Use for a preferences list where each checkbox option needs its own explanatory subtext.",
    file: "variants/v-checkbox-group-8.tsx",
    keywords: [
      "notification preferences list",
      "divided rows",
      "label with description",
    ],
    name: "v-checkbox-group-8",
  },
  {
    category: "checkbox group",
    description:
      "Feature-flags CheckboxGroup rendered entirely `disabled` (the whole group, not individual items), with two flags pre-checked, showing a fully read-only checkbox-group display. Use to show a locked/reference view of feature flags or settings the user cannot currently edit.",
    file: "variants/v-checkbox-group-9.tsx",
    keywords: ["disabled group", "read only checkboxes", "feature flags"],
    name: "v-checkbox-group-9",
  },
  {
    category: "checkbox group",
    description:
      "Notification-channel CheckboxGroup laid out horizontally with an icon next to each label (Email, Push, SMS, In-app), two channels pre-checked. Use for a compact inline channel selector that pairs each option with a recognizable icon.",
    file: "variants/v-checkbox-group-10.tsx",
    keywords: [
      "notification channels",
      "icon labels",
      "horizontal checkbox group",
    ],
    name: "v-checkbox-group-10",
  },
  {
    category: "checkbox group",
    description:
      "Two-level nested checkbox groups for tech-stack interests: separate 'Frontend' (React/Vue/Svelte) and 'Backend' (Node.js/Python/Go) category groups, each with its own 'parent' select-all checkbox, plus a combined 'Selected: ...' summary line listing all chosen items across both categories. Use for grouping selectable options into independent labeled categories with per-category select-all and a combined summary.",
    file: "variants/v-checkbox-group-11.tsx",
    keywords: [
      "tech stack picker",
      "category groups",
      "frontend backend",
      "per category select all",
    ],
    name: "v-checkbox-group-11",
  },
  {
    category: "checkbox group",
    description:
      "Recurring-schedule picker with a top-level 'Select all' parent group wrapping two nested sub-groups (Weekdays, Weekend), each with its own parent checkbox, and a live 'N days/wk' Badge summarizing total selected days; defaults to weekdays selected. Use for a recurring day-of-week scheduler needing weekday/weekend sub-grouping and a day-count summary.",
    file: "variants/v-checkbox-group-12.tsx",
    keywords: [
      "recurring schedule picker",
      "weekday weekend groups",
      "day count badge",
    ],
    name: "v-checkbox-group-12",
  },
  {
    category: "checkbox group",
    description:
      "Integration-enablement list: a top-level 'Enable all' parent checkbox above a set of card-style rows (GitHub, Jira, Slack, Figma, Notion), each with its own checkbox, name, and description, plus a 'Save integrations (N)' button reflecting the current selection count. Use for a third-party integrations settings page with a master enable-all toggle.",
    file: "variants/v-checkbox-group-13.tsx",
    keywords: [
      "integration enablement list",
      "enable all parent checkbox",
      "integrations settings",
    ],
    name: "v-checkbox-group-13",
  },
  {
    category: "checkbox group",
    description:
      "Data-export selector with a top-level 'Select everything' parent group containing two nested section groups (Content: posts/pages/media; Settings: general/users/plugins), each with its own section-level parent checkbox, plus an item-count summary ('N of M items selected'). Use for an export/backup configuration UI needing hierarchical section selection and a running total.",
    file: "variants/v-checkbox-group-14.tsx",
    keywords: [
      "data export selector",
      "two section groups",
      "item count summary",
      "export configuration",
    ],
    name: "v-checkbox-group-14",
  },
  {
    category: "checkbox group",
    description:
      "Food-preference picker with two fully independent CheckboxGroup sections (Cuisines: Italian/Japanese/Mexican/Indian/Thai/American in a 2-column grid; Dietary: Vegetarian/Vegan/Gluten-free/Halal), each with its own 'select all' parent checkbox, and a combined summary line of all selected items across both. Use for onboarding/preference forms with multiple independent, unrelated checkbox categories shown together.",
    file: "variants/v-checkbox-group-15.tsx",
    keywords: [
      "food preference picker",
      "cuisine dietary groups",
      "independent checkbox categories",
    ],
    name: "v-checkbox-group-15",
  },

  // --- collapsible ---
  {
    category: "collapsible",
    description:
      "Baseline collapsible: 'Show recovery keys' trigger with a rotating chevron that reveals a short list of monospace recovery-key codes. Use as the default single expand/collapse disclosure.",
    file: "variants/v-collapsible-1.tsx",
    name: "v-collapsible-1",
  },
  {
    category: "collapsible",
    description:
      "Order-detail collapsible: header shows order number and an icon-only toggle button (chevrons-up-down), a status Badge row stays always visible, and CollapsibleContent reveals shipping address and item details when expanded. Use for order/detail summary cards that keep key status visible and hide secondary details behind a toggle.",
    file: "variants/v-collapsible-2.tsx",
    keywords: ["order details", "toggle icon button", "collapsible summary"],
    name: "v-collapsible-2",
  },
  {
    category: "collapsible",
    description:
      "FAQ-style collapsible inside a Card: question as the full-width trigger with a rotating chevron, answer revealed with an animated collapsible-up/down transition. Use for a single accordion-like FAQ item built from Collapsible rather than the Accordion component.",
    file: "variants/v-collapsible-3.tsx",
    keywords: ["faq item", "animated expand collapse", "card collapsible"],
    name: "v-collapsible-3",
  },
  {
    category: "collapsible",
    description:
      "Billing-usage Card with an always-visible credit-usage summary and Progress bar, a floating circular chevron toggle button anchored below the card's bottom edge, and CollapsibleContent revealing a detailed cost breakdown (Requests, Active CPU, Events, Storage) when expanded. Use for a usage/billing summary card with a floating expand affordance (compare with v-card-11's near-identical layout built on Card alone).",
    file: "variants/v-collapsible-4.tsx",
    keywords: [
      "billing usage card",
      "floating toggle button",
      "cost breakdown",
    ],
    name: "v-collapsible-4",
  },
  {
    category: "collapsible",
    description:
      "Unit-pricing Card: a base-price input is always visible with a settings-gear icon-button trigger; expanding reveals additional Tax Rate and Discount percentage input fields via CollapsibleContent (controlled open state). Use for progressively-disclosed advanced/optional form fields hidden behind a settings icon.",
    file: "variants/v-collapsible-5.tsx",
    keywords: [
      "collapsible form fields",
      "advanced settings toggle",
      "pricing calculator",
    ],
    name: "v-collapsible-5",
  },
  {
    category: "collapsible",
    description:
      "Multi-level collapsible sidebar navigation menu: recursively nested Collapsible groups (Dashboard > Analytics > Real-time/Historical, Team > Members/Permissions, etc.) rendered via a recursive NavMenuItem component with indentation per level, chevron rotation, and a selectable leaf-item highlight state. Use for a deeply-nested sidebar/tree navigation menu with arbitrary folder depth.",
    file: "variants/v-collapsible-6.tsx",
    keywords: [
      "multi level nested menu",
      "sidebar navigation tree",
      "recursive collapsible",
    ],
    name: "v-collapsible-6",
  },
  {
    category: "collapsible",
    description:
      "VS Code-style file explorer tree: recursive folder/file Collapsible tree with folder chevron+icon rows, file rows showing hover-revealed Download/Trash action buttons, a selectable active-file highlight, and an Explorer/Outline Tabs header above the tree. Use for a code-editor-like file tree component with per-file inline actions.",
    file: "variants/v-collapsible-7.tsx",
    keywords: [
      "file explorer tree",
      "vscode style",
      "folder file icons",
      "hover actions",
    ],
    name: "v-collapsible-7",
  },
  {
    category: "collapsible",
    description:
      "'Read more' text-expander inside a Card: shows a truncated product description with a bottom fade-out gradient when collapsed, and a 'Read more'/'Show less' trigger with rotating chevron that reveals the full text. Use for long product/article descriptions that should be truncated by default with a manual expand control.",
    file: "variants/v-collapsible-8.tsx",
    keywords: [
      "read more expander",
      "truncated text",
      "fade gradient",
      "show less",
    ],
    name: "v-collapsible-8",
  },
  {
    category: "collapsible",
    description:
      "CI/CD build-step log viewer: a stack of Cards, one per pipeline step (Install dependencies, Type check, Build), each with a status Badge (success/failed/pending, color-coded), duration, and a chevron toggle (disabled entirely for pending steps with no log); expanding reveals a monospace terminal-style log block with error lines highlighted in red. Use for build/CI pipeline step viewers with expandable per-step logs.",
    file: "variants/v-collapsible-9.tsx",
    keywords: [
      "ci cd build log",
      "pipeline steps",
      "terminal log viewer",
      "build status",
    ],
    name: "v-collapsible-9",
  },
  {
    category: "collapsible",
    description:
      "Incident-status Card defaulting open: header shows an alert icon, incident title, start time, and a status Badge ('Monitoring'), with a 'View incident timeline' trigger; expanding reveals a vertical timeline of status updates (each with a colored dot, status badge, timestamp, and message) plus a 'Next update in N minutes' footer line. Use for status-page/incident-report components with an expandable timeline history.",
    file: "variants/v-collapsible-10.tsx",
    keywords: [
      "incident status",
      "status timeline",
      "status page",
      "monitoring badge",
    ],
    name: "v-collapsible-10",
  },
  {
    category: "collapsible",
    description:
      "Accordion-style FAQ list built from independent Collapsibles with single-open behavior (opening one closes any other via shared `open` state keyed by id), rounded bordered trigger/panel per question, and a question-count Badge in the header. Use for an FAQ section needing exclusive single-panel-open behavior without using the Accordion component directly.",
    file: "variants/v-collapsible-11.tsx",
    keywords: [
      "faq single open accordion",
      "question count badge",
      "exclusive open collapsible",
    ],
    name: "v-collapsible-11",
  },
  {
    category: "collapsible",
    description:
      "Sidebar filter panel: three collapsible filter groups (Category, Status, Priority), each defaulting open, containing checkbox option lists; a header shows a total-active-filters Badge and a 'Clear all' button, each group header also shows its own per-group active-count badge, and an 'Apply filters' button sits at the bottom. Use for a faceted search/filter sidebar with collapsible filter groups and running active-filter counts.",
    file: "variants/v-collapsible-12.tsx",
    keywords: [
      "filter sidebar",
      "faceted filters",
      "active filter count",
      "checkbox filter groups",
    ],
    name: "v-collapsible-12",
  },
  {
    category: "collapsible",
    description:
      "Package-dependency list: a stack of Cards, one per package group (Middleware, Security, UI), each header showing an icon, name, and version Badge with a chevron toggle; expanding reveals the description and a monospace list of individual package names within that group. Use for a dependency/package-manifest browser with expandable per-group package lists.",
    file: "variants/v-collapsible-13.tsx",
    keywords: [
      "package dependency list",
      "version badges",
      "expandable package names",
    ],
    name: "v-collapsible-13",
  },
  {
    category: "collapsible",
    description:
      "Team directory: one collapsible section per team (Design, Engineering, Marketing), each defaulting open, with a member-count Badge in the header and a member list showing a color-coded presence-status dot (active/away/offline), name, and role per person. Use for an org/team directory with per-team collapsible sections and per-member status dots.",
    file: "variants/v-collapsible-14.tsx",
    keywords: [
      "team directory",
      "presence status dots",
      "org chart",
      "per team sections",
    ],
    name: "v-collapsible-14",
  },
  {
    category: "collapsible",
    description:
      "Privacy-policy Card with accordion-style single-panel-open sections (What data we collect, How we use your data, Data sharing, Your rights), divided by borders, one section open by default. Use for legal/policy documents needing expandable sections with exclusive single-open behavior.",
    file: "variants/v-collapsible-15.tsx",
    keywords: [
      "privacy policy sections",
      "legal document collapsible",
      "single panel open",
    ],
    name: "v-collapsible-15",
  },

  // --- combobox ---
  {
    category: "combobox",
    description:
      "Baseline combobox: type-to-filter text input with a fruit list (10 items) and an empty-state message. Use as the default single-select searchable dropdown.",
    file: "variants/v-combobox-1.tsx",
    name: "v-combobox-1",
  },
  {
    category: "combobox",
    description:
      "Same fruit combobox but rendered `disabled` with a pre-selected default value, showing the disabled/locked visual state. Use to represent a read-only combobox field.",
    file: "variants/v-combobox-2.tsx",
    keywords: ["disabled combobox"],
    name: "v-combobox-2",
  },
  {
    category: "combobox",
    description:
      "Two comboboxes rendered side by side to compare `sm` and `lg` input size props. Use as a size reference for combobox inputs.",
    file: "variants/v-combobox-3.tsx",
    keywords: ["sizes", "small large"],
    name: "v-combobox-3",
  },
  {
    category: "combobox",
    description:
      "Combobox with an explicit visible <Label> above the input (linked via useId). Use when the field needs a visible label rather than only an aria-label.",
    file: "variants/v-combobox-4.tsx",
    keywords: ["with label", "visible label"],
    name: "v-combobox-4",
  },
  {
    category: "combobox",
    description:
      "Combobox with `autoHighlight` enabled so the first matching item is auto-highlighted as you type. Use when pressing Enter should confidently commit the top match.",
    file: "variants/v-combobox-5.tsx",
    keywords: ["auto highlight", "first match selected"],
    name: "v-combobox-5",
  },
  {
    category: "combobox",
    description:
      "Combobox input with `showClear`, adding a clear (X) button once text is typed. Use when users need a quick way to reset the search/selection.",
    file: "variants/v-combobox-6.tsx",
    keywords: ["clear button"],
    name: "v-combobox-6",
  },
  {
    category: "combobox",
    description:
      "Combobox with items grouped into labeled sections (Status, Priority, Team) using ComboboxGroup/ComboboxGroupLabel/ComboboxCollection with separators. Use whenever the option list needs categorized headers instead of one flat list.",
    file: "variants/v-combobox-7.tsx",
    keywords: ["grouped items", "categorized list", "section headers"],
    name: "v-combobox-7",
  },
  {
    category: "combobox",
    description:
      "Multi-select combobox using ComboboxChips: selected fruits render as removable chip pills inline with the search input (ComboboxChipsInput), two pre-selected via `defaultValue` with `multiple`. Use for a multi-select combobox where chosen values should appear as chips inside the input itself, not as a separate list.",
    file: "variants/v-combobox-8.tsx",
    keywords: ["multiple selection", "chip pills", "multi-select combobox"],
    name: "v-combobox-8",
  },
  {
    category: "combobox",
    description:
      "Combobox input with a leading SearchIcon via `startAddon`, styled to visually read as a search box. Use when the field should look like a search input rather than a generic dropdown.",
    file: "variants/v-combobox-9.tsx",
    keywords: ["search icon", "start addon"],
    name: "v-combobox-9",
  },
  {
    category: "combobox",
    description:
      "Country-picker combobox using a button-style ComboboxTrigger (ComboboxValue + chevron) that opens a popup with its own embedded search input at the top (separate from the trigger); full list of ~150 countries with `defaultValue` preselected. Use for a select-like combobox where the trigger looks like a button/select and the search input lives inside the popup.",
    file: "variants/v-combobox-10.tsx",
    keywords: [
      "country picker",
      "trigger button popup search",
      "select style combobox",
    ],
    name: "v-combobox-10",
  },
  {
    category: "combobox",
    description:
      "Combobox using this library's `SelectButton` component as the ComboboxTrigger render target (so it visually matches the Select component) with a search input inside the popup and a placeholder-driven ComboboxValue. Use when a combobox needs to visually look exactly like a Select trigger but retain search/filter behavior.",
    file: "variants/v-combobox-11.tsx",
    keywords: [
      "select button trigger",
      "select style combobox",
      "with select button",
    ],
    name: "v-combobox-11",
  },
  {
    category: "combobox",
    description:
      "Combobox integrated into a Field + Form (required, FieldError shown on invalid submit), submits via FormData resolving the selected label back to its value, with a loading submit Button. Use as the pattern for a required, form-validated single-select combobox field.",
    file: "variants/v-combobox-12.tsx",
    keywords: ["form integration", "required field", "field error"],
    name: "v-combobox-12",
  },
  {
    category: "combobox",
    description:
      "Multi-select combobox (chips) integrated into a Field + Form (required, FieldError), reading all selected values via `formData.getAll('items')` on submit with a loading Button. Use as the pattern for a required, form-validated multi-select chip combobox.",
    file: "variants/v-combobox-13.tsx",
    keywords: [
      "form integration multiple",
      "multi-select form field",
      "chips form validation",
    ],
    name: "v-combobox-13",
  },
  {
    category: "combobox",
    description:
      "Async-search combobox: debounced (300ms) simulated repository search with a loading spinner swapped into the start-icon slot while fetching, each result row showing repo name, language, and star count. Use as the template for a real server-backed/async-fetched combobox search.",
    file: "variants/v-combobox-14.tsx",
    keywords: [
      "async search",
      "debounced search",
      "loading spinner",
      "server search",
    ],
    name: "v-combobox-14",
  },
  {
    category: "combobox",
    description:
      "'Assign to' team-member combobox: each item row shows a colored initials-avatar circle plus name and role, with the check indicator pushed to the far right via a custom class. Use for assignee/user pickers needing rich avatar+role rows in a combobox.",
    file: "variants/v-combobox-15.tsx",
    keywords: ["person picker", "assignee picker", "avatar initials"],
    name: "v-combobox-15",
  },
  {
    category: "combobox",
    description:
      "Status-picker combobox: button-style trigger showing a colored dot + current status label (or 'Set status...' placeholder) plus an outside Badge summary line and a separate clear (X) button next to the trigger. Use for an issue/task status selector where the current status should also be reflected as a badge outside the control.",
    file: "variants/v-combobox-16.tsx",
    keywords: [
      "status selector",
      "colored status dot",
      "external clear button",
    ],
    name: "v-combobox-16",
  },
  {
    category: "combobox",
    description:
      "Placeholder/stub file — renders only a plain 'Combobox' text div with no actual Combobox implementation. Not a usable pattern; skip when looking for a real combobox variant.",
    file: "variants/v-combobox-17.tsx",
    keywords: ["placeholder", "stub", "empty"],
    name: "v-combobox-17",
  },
  {
    category: "combobox",
    description:
      "City-picker combobox with a MapPinIcon start addon; each item row shows the city name and a trailing 'Country · Timezone' meta string, plus a 'Selected: ...' summary line below showing the chosen city's timezone. Use for city/timezone selection fields needing per-item country and offset metadata.",
    file: "variants/v-combobox-18.tsx",
    keywords: [
      "city picker",
      "timezone metadata",
      "country code trailing text",
    ],
    name: "v-combobox-18",
  },
  {
    category: "combobox",
    description:
      "Sprint-selector combobox: button-style trigger (ComboboxValue + chevron), each item row shows sprint name, date range, and a color-coded status Badge (active/upcoming/completed), popup search input has `showTrigger={false}`. Use for sprint/iteration pickers needing status badges and date ranges per option.",
    file: "variants/v-combobox-19.tsx",
    keywords: ["sprint selector", "status badge per item", "date range item"],
    name: "v-combobox-19",
  },
  {
    category: "combobox",
    description:
      "Font-picker combobox grouped by category (Sans-serif, Serif, Monospace) with separators between groups, button-style trigger, and a live preview sentence below rendered in the selected font's category style (monospace for mono fonts). Use for typography/font selection fields needing grouped categories and a live preview.",
    file: "variants/v-combobox-20.tsx",
    keywords: ["font picker", "grouped by category", "live preview sentence"],
    name: "v-combobox-20",
  },
  {
    category: "combobox",
    description:
      "Timezone-picker combobox: button-style trigger shows a UTC-offset Badge plus the selected label, each item row shows label and offset, a separate clear (X) button next to the trigger, and a summary line below showing region and full timezone identifier. Use for timezone fields needing an offset badge in the trigger and an external clear control.",
    file: "variants/v-combobox-21.tsx",
    keywords: [
      "timezone picker",
      "utc offset badge in trigger",
      "external clear button",
    ],
    name: "v-combobox-21",
  },
  {
    category: "combobox",
    description:
      "Currency-picker combobox: button-style trigger shows a small symbol-in-box icon (e.g. '$') plus the selected currency name, each item row shows the symbol, name, and trailing currency code, and a summary line below confirms 'Displaying prices in ... (CODE)'. Use for currency-selection fields needing a symbol icon in both the trigger and each option row.",
    file: "variants/v-combobox-22.tsx",
    keywords: [
      "currency picker",
      "symbol icon trigger",
      "currency code trailing",
    ],
    name: "v-combobox-22",
  },

  // --- command ---
  {
    category: "command",
    description:
      "Full-featured command palette: a trigger button with a ⌘J badge and a global keydown listener toggling the palette from anywhere, opening a CommandDialog with grouped items (Suggestions, Commands) each with a keyboard shortcut on the right, and a footer showing Navigate/Open/Close key hints. Use as the default, complete command-palette pattern (global shortcut + grouped items + footer hints).",
    file: "variants/v-command-1.tsx",
    keywords: ["command palette", "global keyboard shortcut", "footer hints"],
    name: "v-command-1",
  },
  {
    category: "command",
    description:
      "Minimal command dialog: a small popup (max-w-xs) with one ungrouped list of three items (Profile, Billing, Settings), each with an icon and a shortcut. Use for the simplest possible command menu with no search grouping or footer.",
    file: "variants/v-command-2.tsx",
    keywords: ["simple command", "minimal command menu"],
    name: "v-command-2",
  },
  {
    category: "command",
    description:
      "Command dialog with two ungrouped-but-separated CommandGroups (a plain action group: Calendar/Search Emoji/Calculator, then a separator, then an account group: Profile/Billing/Settings with shortcuts). Use as a slightly richer command menu than v-command-2, combining plain actions and shortcut actions in one list, without a search input.",
    file: "variants/v-command-3.tsx",
    keywords: ["command with groups", "separated action groups"],
    name: "v-command-3",
  },
  {
    category: "command",
    description:
      "File-search command dialog: trigger shows a search icon, 'Search files...', and a ⌘K Kbd hint; the popup has a real CommandInput filtering a hardcoded file list, each result row showing a FileIcon, filename, full path, and a file-type Badge on the right. Use for a 'go to file' / file-search command palette.",
    file: "variants/v-command-4.tsx",
    keywords: ["file search command", "go to file", "file type badge"],
    name: "v-command-4",
  },
  {
    category: "command",
    description:
      "User-search command dialog: CommandInput filters a hardcoded user list by name/email, each row shows an avatar with initials fallback, name, email, and a role Badge (Admin/Editor/Viewer, color-coded) on the right. Use for a 'search and select a user' command palette (e.g. assigning, mentioning, or switching accounts).",
    file: "variants/v-command-5.tsx",
    keywords: ["user search command", "avatar rows", "role badge"],
    name: "v-command-5",
  },
  {
    category: "command",
    description:
      "Action-palette command dialog grouped into Create / Navigate / Settings sections, each item with an icon and a keyboard-shortcut hint (e.g. ⌘N, ⌘⇧N). Use for an app-wide 'quick actions' command palette organized by action category with visible shortcuts.",
    file: "variants/v-command-6.tsx",
    keywords: ["action palette", "keyboard shortcuts", "grouped quick actions"],
    name: "v-command-6",
  },
  {
    category: "command",
    description:
      "'Search Everything' command dialog with Starred / Recent / Help sections: starred items show a yellow star icon, recent items show a clock icon plus a relative-time string ('2m ago') on the right, help items show book/lifebuoy/message icons. Use for a unified search-and-navigate command palette combining favorites, recent history, and help links.",
    file: "variants/v-command-7.tsx",
    keywords: ["recent and favorites", "unified search", "relative time"],
    name: "v-command-7",
  },
  {
    category: "command",
    description:
      "'Switch project' command dialog: single 'All Projects' group where starred projects show a yellow star icon (others a plain folder icon), selecting sets the active project and closes, and the currently active project shows a 'Current' label. Use for a project/workspace switcher command palette.",
    file: "variants/v-command-8.tsx",
    keywords: [
      "switch project",
      "workspace switcher",
      "starred projects",
      "current indicator",
    ],
    name: "v-command-8",
  },
  {
    category: "command",
    description:
      "'Invite members' command dialog: a 'Teammates' group listing colleagues with avatar initials, name, and email; selecting a row toggles it into an 'invited' state (checkmark shown) without closing the dialog, and a footer bar appears once at least one is selected showing 'N invites pending' plus a 'Send invites' button that clears selection and closes. Use for a multi-select team-invite command palette with a pending-invite summary footer.",
    file: "variants/v-command-9.tsx",
    keywords: [
      "invite team member",
      "multi select command",
      "pending invites footer",
    ],
    name: "v-command-9",
  },
  {
    category: "command",
    description:
      "'Apply labels' command dialog (small outline trigger button) with a 'Labels' group of colored-dot tags (bug, feature, enhancement, etc.); selecting toggles a tag in/out of a locally-tracked selected set (checkmark shown, dialog stays open for multi-select), and selected tags render as outlined Badge pills below the trigger once chosen. Use for a GitHub-style multi-select label picker driven by a command palette.",
    file: "variants/v-command-10.tsx",
    keywords: [
      "issue label picker",
      "multi select tags",
      "selected badges outside dialog",
    ],
    name: "v-command-10",
  },
  {
    category: "command",
    description:
      "Account-settings command dialog (trigger shows a ⌘K hint) grouped into Account / Preferences / Session sections; selecting any item closes the dialog via `onSelect`. Use for an account-settings quick-access command palette (profile, notifications, billing, API keys, theme, sign out).",
    file: "variants/v-command-11.tsx",
    keywords: ["account settings palette", "profile preferences sign out"],
    name: "v-command-11",
  },
  {
    category: "command",
    description:
      "Repository-search command dialog grouped into Issues / Pull Requests / Branches & Files, each result showing a type-specific icon (colored circle-dot for issues, violet PR icon, branch/folder icons) and an issue/PR number Badge. Use for a GitHub-style 'search this repo' command palette spanning multiple result types.",
    file: "variants/v-command-12.tsx",
    keywords: ["repository search palette", "issues prs branches files"],
    name: "v-command-12",
  },
  {
    category: "command",
    description:
      "'Go to page' navigation command dialog (trigger shows a 'G' Kbd hint) grouped into Navigation / Admin sections; items with a shortcut show it via CommandShortcut, items without one show a trailing arrow icon instead. Use for a site/app navigation command palette ('go to X') with optional per-item keyboard shortcuts.",
    file: "variants/v-command-13.tsx",
    keywords: [
      "go to page palette",
      "navigation shortcuts",
      "arrow icon fallback",
    ],
    name: "v-command-13",
  },
  {
    category: "command",
    description:
      "Appearance-picker command dialog grouped into Theme (Light/Dark/System) and Accent Color (colored dot options); selecting an item marks it active with a checkmark and updates local state, closing via onSelect. Use for a theme/accent-color quick-switcher command palette with active-selection checkmarks.",
    file: "variants/v-command-14.tsx",
    keywords: [
      "appearance picker",
      "theme switcher",
      "accent color",
      "active check marks",
    ],
    name: "v-command-14",
  },
  {
    category: "command",
    description:
      "'Quick open' command dialog (trigger shows a ⌘P hint) with a single 'Pages' group where some items show a numeric Badge (e.g. unread channel count) and a footer with Navigate/Open/Close key hints. Use for an IDE-style 'quick open' palette listing pages with optional notification-count badges.",
    file: "variants/v-command-15.tsx",
    keywords: [
      "quick open palette",
      "page list with badges",
      "footer key hints",
    ],
    name: "v-command-15",
  },

  // --- context-menu ---
  {
    category: "context menu",
    description:
      "Full-featured browser-style context menu: right-click/long-press area opens a menu with Back/Forward(disabled)/Reload items with shortcuts, a 'More Tools' nested submenu, checkbox items (Show Bookmarks/Full URLs), and a radio group ('People') for selecting a person. Use as the default kitchen-sink reference showing every context-menu primitive together (groups, shortcuts, submenu, checkboxes, radio group).",
    file: "variants/v-context-menu-1.tsx",
    keywords: ["right click menu", "browser context menu", "kitchen sink"],
    name: "v-context-menu-1",
  },
  {
    category: "context menu",
    description:
      "Context menu with Copy/Cut items plus a nested 'More Tools' submenu (Save Page, Create Shortcut, Name Window, Developer Tools, destructive Delete). Use as the reference pattern for a right-click menu with a nested submenu.",
    file: "variants/v-context-menu-2.tsx",
    keywords: ["nested submenu", "more tools submenu"],
    name: "v-context-menu-2",
  },
  {
    category: "context menu",
    description:
      "Context menu focused on keyboard-shortcut display: Back/Forward(disabled)/Reload group with shortcuts, separator, then Save/Save As group with shortcuts. Use as a reference for showing keyboard shortcuts next to each context-menu item.",
    file: "variants/v-context-menu-3.tsx",
    keywords: ["keyboard shortcuts", "shortcut hints"],
    name: "v-context-menu-3",
  },
  {
    category: "context menu",
    description:
      "Context menu organized into labeled groups (File: New/Open/Save; Edit: Undo/Redo; then Cut/Copy/Paste; then destructive Delete), each group separated by a divider. Use as a reference for a classic desktop-app-style context menu with multiple labeled sections.",
    file: "variants/v-context-menu-4.tsx",
    keywords: ["grouped menu items", "file edit menu", "labeled sections"],
    name: "v-context-menu-4",
  },
  {
    category: "context menu",
    description:
      "Simple context menu where every item (Copy, Cut, Paste, destructive Delete) has a leading icon instead of a keyboard shortcut. Use as a reference for icon-led context-menu items without shortcuts.",
    file: "variants/v-context-menu-5.tsx",
    keywords: ["icons in menu", "copy cut paste icons"],
    name: "v-context-menu-5",
  },
  {
    category: "context menu",
    description:
      "Context menu with three ContextMenuCheckboxItems (Show Bookmarks Bar, Show Full URLs, Show Developer Tools), two pre-checked via `defaultChecked`. Use as a reference for a context menu whose items are independent toggle checkboxes rather than actions.",
    file: "variants/v-context-menu-6.tsx",
    keywords: ["checkbox items", "toggle options in menu"],
    name: "v-context-menu-6",
  },
  {
    category: "context menu",
    description:
      "Context menu with two independent controlled radio groups (People: Pedro/Colm; Theme: Light/Dark/System), each with its own label and separated by a divider. Use as a reference for multiple mutually-exclusive option groups within one context menu.",
    file: "variants/v-context-menu-7.tsx",
    keywords: [
      "radio group menu",
      "multiple radio groups",
      "mutually exclusive options",
    ],
    name: "v-context-menu-7",
  },
  {
    category: "context menu",
    description:
      "Context menu with Edit/Share items and a separated destructive Delete item, each with a leading icon. Use as the minimal reference for a context menu that ends in a clearly-separated destructive action.",
    file: "variants/v-context-menu-8.tsx",
    keywords: ["destructive action separated", "edit share delete"],
    name: "v-context-menu-8",
  },
  {
    category: "context menu",
    description:
      "Four side-by-side context-menu trigger boxes demonstrating the `side` prop (top/right/bottom/left) controlling which direction the menu opens relative to the trigger. Use as a reference for context-menu placement/positioning options.",
    file: "variants/v-context-menu-9.tsx",
    keywords: ["placement", "side positioning", "menu direction"],
    name: "v-context-menu-9",
  },
  {
    category: "context menu",
    description:
      "Context menu triggered inside an open Dialog: a Dialog with a description prompting the user to right-click an area inside it, which opens a context menu with Copy/Cut/Paste, a 'More Options' submenu, and destructive Delete. Use as a reference for right-click menus that need to function correctly layered inside a modal dialog.",
    file: "variants/v-context-menu-10.tsx",
    keywords: ["context menu inside dialog", "menu in modal"],
    name: "v-context-menu-10",
  },
  {
    category: "context menu",
    description:
      "Bookmark-list rows each with their own context menu: Open/Copy link group, Rename/Star-toggle(with live star icon state)/Share/Duplicate group, and destructive Delete. Use for a bookmarks/saved-links list where each row needs its own right-click actions including a toggleable star/favorite state.",
    file: "variants/v-context-menu-11.tsx",
    keywords: ["bookmark list", "star toggle", "per item context menu"],
    name: "v-context-menu-11",
  },
  {
    category: "context menu",
    description:
      "Rich-text-editor-style context menu: a live-formatted text sample above, with Bold/Italic/Underline as controlled checkbox items (toggling actual text styling), an 'Alignment' submenu (Left/Center/Right radio-like selection updating state), and an 'Insert link' item. Use for a text-formatting right-click menu in an editor.",
    file: "variants/v-context-menu-12.tsx",
    keywords: [
      "rich text editor menu",
      "formatting checkboxes",
      "alignment submenu",
    ],
    name: "v-context-menu-12",
  },
  {
    category: "context menu",
    description:
      "File-explorer rows each with a colored file-extension badge, name, and last-modified time, and a per-file context menu (Open/Rename/Download, Get Info showing file size, Refresh, destructive Delete); clicking a row also sets a local 'selected' highlight state. Use for a file-manager list needing per-file right-click actions and extension-color-coding.",
    file: "variants/v-context-menu-13.tsx",
    keywords: [
      "file explorer rows",
      "extension badge",
      "file manager context menu",
    ],
    name: "v-context-menu-13",
  },
  {
    category: "context menu",
    description:
      "Social-feed post cards each with author, time, body text, and an upvote/reply footer row; per-post context menu has Upvote/Downvote (both updating a live vote count) and Reply, a 'Report' submenu (Spam/Misinformation/Harassment/Off-topic), and a destructive 'Mute author' item. Use for a social/forum feed needing per-post moderation and voting actions via right-click.",
    file: "variants/v-context-menu-14.tsx",
    keywords: ["social feed context menu", "upvote downvote", "report submenu"],
    name: "v-context-menu-14",
  },
  {
    category: "context menu",
    description:
      "Task-board rows (status icon, title, priority Badge, assignee initials circle) each with a per-task context menu: a Status radio group (To Do/In Progress/Done) updating the row's icon live, a nested 'Priority' submenu with its own radio group (High/Medium/Low updating the badge), Reassign/Archive items, and a destructive Delete that removes the task from local state. Use for a kanban/task-list needing inline status and priority changes plus destructive actions via right-click.",
    file: "variants/v-context-menu-15.tsx",
    keywords: [
      "task board context menu",
      "inline status radio",
      "priority submenu",
      "reassign delete",
    ],
    name: "v-context-menu-15",
  },

  // --- date-picker ---
  {
    category: "date picker",
    description:
      "Baseline date picker: outline Button trigger showing 'Pick a date' or the formatted selected date, opening a Popover containing a single-select Calendar. Use as the default popover-based date picker.",
    file: "variants/v-date-picker-1.tsx",
    name: "v-date-picker-1",
  },
  {
    category: "date picker",
    description:
      "Date-range picker: outline Button trigger showing 'Pick a date range' or the formatted from–to range, opening a Popover containing a range-mode Calendar. Use for selecting a start/end date range via a popover trigger.",
    file: "variants/v-date-picker-2.tsx",
    keywords: ["date range", "range picker popover"],
    name: "v-date-picker-2",
  },
  {
    category: "date picker",
    description:
      "Date picker with `captionLayout='dropdown'` month/year navigation using a custom Combobox-based dropdown (react-day-picker `components.Dropdown` override), wrapped in a Field with a 'Start date' label, bounded 1900–today. Use for long-range date fields (e.g. historical dates) needing fast dropdown month/year navigation inside a popover.",
    file: "variants/v-date-picker-3.tsx",
    keywords: ["dropdown navigation", "combobox month year", "field label"],
    name: "v-date-picker-3",
  },
  {
    category: "date picker",
    description:
      "Date picker popup split into two panels: a left sidebar of quick-preset buttons (Today, Tomorrow, In 3 days, In a week) that jump the calendar's displayed month and selected date, plus the Calendar itself on the right (stacks vertically on mobile). Use for a date picker needing common relative-date shortcuts alongside the full calendar.",
    file: "variants/v-date-picker-4.tsx",
    keywords: ["quick presets sidebar", "today tomorrow shortcuts"],
    name: "v-date-picker-4",
  },
  {
    category: "date picker",
    description:
      "Date picker combining a native typed date Input (masked to hide the native calendar icon) with an InputGroupAddon calendar-icon button that opens a Popover calendar; typing a valid 'yyyy-MM-dd' value syncs the calendar, and picking a calendar date syncs the text input. Use when users should be able to type a date directly as well as pick it from a calendar.",
    file: "variants/v-date-picker-5.tsx",
    keywords: ["with input", "typed date entry", "sync input and calendar"],
    name: "v-date-picker-5",
  },
  {
    category: "date picker",
    description:
      "Date picker where selecting a day in the calendar automatically closes the popover (`handleSelect` calls `setOpen(false)`) instead of requiring a manual close. Use when the picker should auto-dismiss immediately after a single-date selection.",
    file: "variants/v-date-picker-6.tsx",
    keywords: ["auto close on select", "single click select and close"],
    name: "v-date-picker-6",
  },
  {
    category: "date picker",
    description:
      "Appointment-booking widget: doctor profile header (avatar, name, specialty, 'Available' badge), a date-picker popover restricted to weekdays and future dates, and once a date is chosen, a grid of time-slot buttons (some pre-marked booked/disabled per day-of-week) followed by a 'Book Appointment' button reflecting the chosen date+slot. Use for a full doctor/service appointment booking card combining date and time-slot selection.",
    file: "variants/v-date-picker-7.tsx",
    keywords: ["appointment booking", "doctor profile", "time slot grid"],
    name: "v-date-picker-7",
  },
  {
    category: "date picker",
    description:
      "Team-meeting-scheduler widget: a date-picker popover restricted to weekdays/future dates; once a date is picked, shows each team member's avatar, role, and a Free/Busy Badge computed from a hardcoded weekly busy schedule, plus a free-count summary and a 'Send Invite' button disabled when nobody's free. Use for scheduling a meeting against team member availability.",
    file: "variants/v-date-picker-8.tsx",
    keywords: [
      "team meeting scheduler",
      "availability check",
      "free busy badges",
    ],
    name: "v-date-picker-8",
  },
  {
    category: "date picker",
    description:
      "Delivery-date-selector widget: a Standard vs Express shipping-method toggle (price/description cards) that changes the earliest selectable delivery date and whether weekends are disabled, a date-picker popover for choosing the delivery day, and an estimated-delivery-range summary line plus 'Confirm Delivery' button. Use for e-commerce checkout delivery-date selection tied to a shipping-method choice.",
    file: "variants/v-date-picker-9.tsx",
    keywords: [
      "delivery date selector",
      "shipping method",
      "earliest delivery date",
    ],
    name: "v-date-picker-9",
  },
  {
    category: "date picker",
    description:
      "Task-deadline-reschedule widget: shows a task card with assignees and a 'Rescheduled' badge that appears once the due date changes; the date popover has its own internal Cancel/Apply footer buttons (staging a pending date before committing), and a 'Save Changes' button that's disabled until a reschedule is applied. Use for reassigning/rescheduling a task deadline with an explicit apply/cancel step inside the picker.",
    file: "variants/v-date-picker-10.tsx",
    keywords: [
      "task deadline reschedule",
      "apply cancel footer",
      "rescheduled badge",
    ],
    name: "v-date-picker-10",
  },
  {
    category: "date picker",
    description:
      "Report-period range picker: quick-select pill buttons (This month, Next month, Next 3/6 months) instantly set a two-month-view range Calendar's selection, the popover shows the range plus a computed day-count Badge, and has its own Clear/Apply footer buttons. Use for reporting/analytics date-range selection with common period presets.",
    file: "variants/v-date-picker-11.tsx",
    keywords: ["report period range", "presets", "day count badge"],
    name: "v-date-picker-11",
  },
  {
    category: "date picker",
    description:
      "Recurring-event date picker: a single-date popover (auto-closes on select, future dates only) paired with a row of recurrence pill buttons (Does not repeat / Daily / Weekly / Monthly) and a summary line combining the chosen date and recurrence pattern. Use for scheduling recurring events/reminders needing both a start date and a repeat frequency.",
    file: "variants/v-date-picker-12.tsx",
    keywords: [
      "recurring event picker",
      "repeat frequency",
      "daily weekly monthly",
    ],
    name: "v-date-picker-12",
  },
  {
    category: "date picker",
    description:
      "Hotel-stay range picker with duration-shortcut buttons (1 week, 2 weeks, 1 month) that instantly set a check-in/check-out range from today, a two-month range Calendar in the popover with a nights-count Badge in the trigger, and Clear/Done footer buttons. Use for hotel/rental booking date-range selection with common stay-length shortcuts.",
    file: "variants/v-date-picker-13.tsx",
    keywords: ["hotel stay range", "duration shortcuts", "nights badge"],
    name: "v-date-picker-13",
  },
  {
    category: "date picker",
    description:
      "Birthday picker with age validation: dropdown month/year Calendar navigation bounded to ages 18–100 (dates outside that window disabled), auto-closes on selection, and shows a computed 'Age: N years old' line below once a date is chosen. Use for signup/registration birthdate fields that must enforce a minimum/maximum age.",
    file: "variants/v-date-picker-14.tsx",
    keywords: [
      "birthday picker",
      "age validation",
      "min max age",
      "date of birth",
    ],
    name: "v-date-picker-14",
  },
  {
    category: "date picker",
    description:
      "Multi-date availability selector: a multiple-selection Calendar in a popover (future dates only) with a live count Badge in the trigger and Clear/Done footer buttons; selected dates also render below as removable pill chips with an X button per date. Use for picking several independent available days (e.g. availability for meetings) with a chip-based summary of the selection.",
    file: "variants/v-date-picker-15.tsx",
    keywords: [
      "multi date availability",
      "removable date chips",
      "multiple day selection",
    ],
    name: "v-date-picker-15",
  },

  // --- dialog ---
  {
    category: "dialog",
    description:
      "Baseline 'Edit profile' dialog: form with Name/Username fields inside DialogPanel, Cancel/Save footer buttons. Use as the default modal edit-form dialog.",
    file: "variants/v-dialog-1.tsx",
    keywords: ["edit profile form", "default dialog"],
    name: "v-dialog-1",
  },
  {
    category: "dialog",
    description:
      "A Menu whose item ('Open dialog') opens a separate controlled Dialog (Settings, with just Title/Description and a Close button). Use when a dialog needs to be triggered from a menu item rather than directly from a visible button.",
    file: "variants/v-dialog-2.tsx",
    keywords: ["open from menu", "menu triggers dialog"],
    name: "v-dialog-2",
  },
  {
    category: "dialog",
    description:
      "Same 'Edit profile' form dialog as v-dialog-1 but its DialogFooter uses `variant='bare'` (no top border/background styling). Use when the footer should blend into the panel rather than being visually separated.",
    file: "variants/v-dialog-3.tsx",
    keywords: ["bare footer", "no footer border"],
    name: "v-dialog-3",
  },
  {
    category: "dialog",
    description:
      "'Terms & Conditions' dialog with no close (X) button and a long multi-section legal text body that scrolls inside the dialog panel, ending in Cancel/'I agree' footer buttons. Use for lengthy legal/ToS content that needs internal scroll rather than resizing the whole dialog.",
    file: "variants/v-dialog-4.tsx",
    keywords: [
      "scroll inside dialog",
      "terms and conditions",
      "long content dialog",
    ],
    name: "v-dialog-4",
  },
  {
    category: "dialog",
    description:
      "Nested dialogs: an outer 'Manage team member' dialog (view-only name/email, no close button) whose footer contains a button that opens a second, inner 'Edit details' dialog with editable Name/Email fields and its own Cancel/Save footer. Use when an editing step needs to be a separate dialog layered on top of a read-only detail dialog.",
    file: "variants/v-dialog-5.tsx",
    keywords: ["nested dialogs", "dialog inside dialog", "manage team member"],
    name: "v-dialog-5",
  },
  {
    category: "dialog",
    description:
      "'Delete Item' confirmation dialog with a destructive circular AlertTriangleIcon badge next to the title/description, and Cancel/destructive-'Delete' footer buttons. Use for a destructive-action confirmation dialog (as opposed to AlertDialog) using the plain Dialog primitives.",
    file: "variants/v-dialog-6.tsx",
    keywords: ["destructive action dialog", "delete confirmation"],
    name: "v-dialog-6",
  },
  {
    category: "dialog",
    description:
      "'Cookie Preferences' dialog: three toggle rows (Essential — locked on and disabled, Analytics, Marketing) each with a Label/description and a Switch, plus 'Save Preferences'/'Accept All' footer buttons. Use for a cookie-consent preferences dialog with per-category toggles.",
    file: "variants/v-dialog-7.tsx",
    keywords: [
      "cookie preferences",
      "consent toggles",
      "switch settings dialog",
    ],
    name: "v-dialog-7",
  },
  {
    category: "dialog",
    description:
      "'Session Expired' dialog with no close button, a description explaining the timeout, and a single full-width 'Sign In Again' button (no cancel option). Use for forced re-authentication dialogs that shouldn't be dismissible without action.",
    file: "variants/v-dialog-8.tsx",
    keywords: ["session expired", "forced reauth", "no dismiss dialog"],
    name: "v-dialog-8",
  },
  {
    category: "dialog",
    description:
      "User row (avatar, name, email) with a trailing ellipsis icon-button that opens an 'Edit profile' dialog pre-filled with Name/Email/Bio fields (including the same avatar in the dialog header) and Cancel/Save footer. Use for inline user-list rows that open a rich profile-edit dialog with an avatar, matching the pattern of editing a specific list row.",
    file: "variants/v-dialog-9.tsx",
    keywords: [
      "edit profile with avatar",
      "user row edit",
      "inline list edit dialog",
    ],
    name: "v-dialog-9",
  },
  {
    category: "dialog",
    description:
      "'Invite to project' dialog: an email input plus a role Select (Viewer/Editor/Admin) side by side, and a 'Members with access' list showing existing members' avatars, names, emails, and roles; Cancel/'Send invite' footer. Use for a team/project invite dialog that also shows current membership.",
    file: "variants/v-dialog-10.tsx",
    keywords: ["invite team members", "role select", "current members list"],
    name: "v-dialog-10",
  },
  {
    category: "dialog",
    description:
      "'Share document' dialog: a read-only share-link Input with a copy button (swaps to a checkmark briefly on copy), and a 3-option link-access picker (View only / Can comment / Can edit) styled as segmented buttons, with a single 'Done' footer button. Use for document/file sharing dialogs needing a copyable link and access-level selection.",
    file: "variants/v-dialog-11.tsx",
    keywords: ["share document", "copy link", "link access level"],
    name: "v-dialog-11",
  },
  {
    category: "dialog",
    description:
      "'Two-factor authentication' setup dialog: a mock QR-code placeholder, a 6-digit code input rendered as individual boxed digits (hidden real input capturing numeric-only typing), a 'Verify code' button that flips to a green success message once verified, and state resets whenever the dialog reopens. Use for a 2FA/TOTP setup flow with a QR code and 6-digit verification.",
    file: "variants/v-dialog-12.tsx",
    keywords: ["two factor authentication", "otp code entry", "qr code setup"],
    name: "v-dialog-12",
  },
  {
    category: "dialog",
    description:
      "'Cancel your plan' subscription-cancellation dialog: a destructive warning icon, a required single-select list of cancellation reasons (radio-style buttons), and Cancel(Keep plan)/destructive-'Confirm cancellation' footer, the confirm button disabled until a reason is chosen. Use for subscription/account cancellation flows that require capturing a reason before confirming.",
    file: "variants/v-dialog-13.tsx",
    keywords: [
      "subscription cancellation",
      "cancellation reason",
      "required reason select",
    ],
    name: "v-dialog-13",
  },
  {
    category: "dialog",
    description:
      "'Generate API key' dialog: a freshly generated masked API key shown in a code block, with Copy/Reveal(eye toggle)/Regenerate icon buttons, a warning note about one-time visibility, and state resets (hides/uncopies) whenever the dialog reopens; single 'Done' footer button. Use for API-key generation/rotation dialogs needing reveal, copy, and regenerate actions.",
    file: "variants/v-dialog-14.tsx",
    keywords: ["api key generation", "reveal key", "copy regenerate key"],
    name: "v-dialog-14",
  },
  {
    category: "dialog",
    description:
      "'Rate your experience' product-feedback dialog: independent 5-star ratings per aspect (Ease of use, Performance, Design, Support) with hover preview, an optional comment Textarea, a 'Submit feedback' button disabled until every aspect is rated, and submitting swaps the whole dialog body to a 'Thank you!' confirmation screen with a single Close button. Use for a multi-aspect star-rating feedback dialog with a post-submit thank-you state.",
    file: "variants/v-dialog-15.tsx",
    keywords: [
      "product feedback",
      "star rating dialog",
      "thank you confirmation",
    ],
    name: "v-dialog-15",
  },

  // --- drawer ---
  {
    category: "drawer",
    description:
      "Baseline bottom drawer ('Notifications') with a drag handle bar (`showBar`), centered header text, and a bare centered 'Close' footer button. Use as the default mobile-style bottom sheet.",
    file: "variants/v-drawer-1.tsx",
    keywords: ["bottom sheet", "drag handle"],
    name: "v-drawer-1",
  },
  {
    category: "drawer",
    description:
      "Four separate drawers opening from each side (right/left/top/bottom) using the `variant='inset'` style (drawer appears slightly inset from the viewport edge with rounded corners), each with a simple header and one line of content. Use as a reference for the 'inset' drawer style across all four positions.",
    file: "variants/v-drawer-2.tsx",
    keywords: ["multiple positions", "inset variant", "side drawers"],
    name: "v-drawer-2",
  },
  {
    category: "drawer",
    description:
      "Same four-position (right/left/top/bottom) drawer reference as v-drawer-2, but using `variant='straight'` (drawer is flush against the viewport edge with square corners, no inset gap). Use as a reference for the 'straight' drawer style across all four positions.",
    file: "variants/v-drawer-3.tsx",
    keywords: ["multiple positions", "straight variant", "flush edge drawer"],
    name: "v-drawer-3",
  },
  {
    category: "drawer",
    description:
      "Multi-step nested drawers: opening the first bottom drawer's footer button opens a second drawer (Second step, with a placeholder square), whose footer opens a third (Third step, with a placeholder circle) — each with Back/Continue navigation via nested Drawer components. Use for a linear multi-step wizard implemented as drawers stacked on top of each other.",
    file: "variants/v-drawer-4.tsx",
    keywords: ["multi step nested drawers", "wizard drawers", "step by step"],
    name: "v-drawer-4",
  },
  {
    category: "drawer",
    description:
      "Left-side navigation-menu drawer: a straight-variant drawer with a close button, containing a vertical nav list (Home, Profile, Settings, Sign out) where each item is a ghost ButtonLink that also closes the drawer on click (via DrawerClose wrapping a Link). Use for a mobile hamburger-menu-style navigation drawer.",
    file: "variants/v-drawer-5.tsx",
    keywords: ["navigation menu drawer", "mobile nav", "hamburger menu"],
    name: "v-drawer-5",
  },
  {
    category: "drawer",
    description:
      "Filter & sort right-side drawer using DrawerMenu primitives: grouped checkbox filters (Category, Status) and a radio group (Sort by: Newest/Oldest/Name/Popular), with Reset/'Apply filters' footer buttons. Use for a mobile-friendly filter/sort panel implemented as a drawer with built-in menu-style controls.",
    file: "variants/v-drawer-6.tsx",
    keywords: [
      "filter and sort panel",
      "drawer menu checkboxes",
      "radio group sort",
    ],
    name: "v-drawer-6",
  },
  {
    category: "drawer",
    description:
      "Shopping-cart right-side drawer: a list of cart items with quantity +/- steppers, and a footer showing a computed subtotal plus a full-width 'Checkout' button. Use for an e-commerce cart drawer.",
    file: "variants/v-drawer-7.tsx",
    keywords: ["shopping cart drawer", "quantity stepper", "checkout button"],
    name: "v-drawer-7",
  },
  {
    category: "drawer",
    description:
      "Notification-center drawer (icon-only bell trigger): header with a 'Mark all as read' action, a list of notifications each with avatar, name, message, timestamp, and an unread-dot indicator, and a bare centered 'Close' footer. Use for an app-wide notification center opened from a bell icon.",
    file: "variants/v-drawer-8.tsx",
    keywords: ["notification center", "bell icon trigger", "unread indicator"],
    name: "v-drawer-8",
  },
  {
    category: "drawer",
    description:
      "'Delete account?' destructive confirmation drawer: destructive-variant trigger button, warning description, a destructive 'Yes, delete my account' button and outline Cancel, and confirming swaps the trigger area's content to a 'Account deleted.' message with an 'Undo' button. Use for account-deletion confirmation flows implemented as a drawer with an inline undo state.",
    file: "variants/v-drawer-9.tsx",
    keywords: [
      "delete account confirmation",
      "destructive drawer",
      "undo action",
    ],
    name: "v-drawer-9",
  },
  {
    category: "drawer",
    description:
      "Bottom-position 'Edit profile' drawer (inset variant, drag bar) with First/Last name, Email (with description), and Bio fields, and a 'Save changes' button that briefly shows 'Saved!' before resetting. Use for a mobile-style bottom-sheet profile-edit form.",
    file: "variants/v-drawer-10.tsx",
    keywords: ["edit profile drawer", "bottom sheet form", "saved feedback"],
    name: "v-drawer-10",
  },
  {
    category: "drawer",
    description:
      "User-preferences right-side drawer (icon-only settings trigger): appearance picker (Light/Dark/System icon buttons), a native language <select>, and a push-notifications toggle switch, with a full-width 'Close' footer. Use for an app settings/preferences drawer combining several distinct control types.",
    file: "variants/v-drawer-11.tsx",
    keywords: [
      "user preferences drawer",
      "theme settings",
      "language select",
      "notification toggle",
    ],
    name: "v-drawer-11",
  },
  {
    category: "drawer",
    description:
      "File-attachments drawer: a dashed drop-zone/upload area (hidden file input) above a removable list of already-attached files (icon by type, name, size, delete button), with Cancel/'Attach N files' footer buttons. Use for a file-upload-and-manage drawer, e.g. attaching files to a task or message.",
    file: "variants/v-drawer-12.tsx",
    keywords: [
      "file attachments drawer",
      "upload dropzone",
      "attached files list",
    ],
    name: "v-drawer-12",
  },
  {
    category: "drawer",
    description:
      "Activity-log right-side drawer: a vertical timeline of events (deploys, test runs, PR merges) each with a status icon (completed/in-progress/pending, color-coded), actor, relative time, and a status pill on the right, ending in a centered bare 'Close' footer. Use for an audit/activity-log drawer showing a chronological event timeline.",
    file: "variants/v-drawer-13.tsx",
    keywords: ["activity log", "status timeline", "audit log drawer"],
    name: "v-drawer-13",
  },
  {
    category: "drawer",
    description:
      "Help-center drawer: a search input filtering a FAQ list live, each result an expandable question/answer accordion-style row (chevron toggle), showing a 'No results' message when nothing matches, plus Close/'Contact support' footer buttons. Use for an in-app help center drawer with searchable FAQ.",
    file: "variants/v-drawer-14.tsx",
    keywords: ["help center drawer", "searchable faq", "contact support"],
    name: "v-drawer-14",
  },
  {
    category: "drawer",
    description:
      "Quick-actions grid drawer (icon-only ellipsis trigger): a 4-column grid of action tiles (Edit, Comment, Share, Bookmark, Download, Archive, Report, destructive Delete), each tile closing the drawer and recording the chosen action in the trigger area's status line, plus a bare centered 'Cancel' footer. Use for a mobile-style quick-actions bottom sheet with icon+label tiles.",
    file: "variants/v-drawer-15.tsx",
    keywords: ["quick actions grid", "action tiles", "icon grid drawer"],
    name: "v-drawer-15",
  },

  // --- empty ---
  {
    category: "empty state",
    description:
      "Baseline empty state: icon media (RouteIcon), title 'No upcoming meetings', description, and two action buttons ('Create meeting', outline 'View docs'). Use as the default empty-state pattern with icon + title + description + actions.",
    file: "variants/v-empty-1.tsx",
    keywords: ["default empty state", "icon title description actions"],
    name: "v-empty-1",
  },
  {
    category: "empty state",
    description:
      "'No results found' search-empty-state on a muted background: title/description explaining no search matches, a 'Try again' button and a 'Learn more' link with trailing arrow. Use for search results pages that return zero matches.",
    file: "variants/v-empty-2.tsx",
    keywords: ["search empty state", "no results found"],
    name: "v-empty-2",
  },
  {
    category: "empty state",
    description:
      "'404 — Not Found' empty state bordered box with a search InputGroup (icon + '/' Kbd shortcut hint) inviting the user to search for a page, plus a 'Contact support' link below. Use for 404/not-found pages that want to redirect users into a search flow.",
    file: "variants/v-empty-3.tsx",
    keywords: [
      "404 not found",
      "empty state with search input",
      "page not found",
    ],
    name: "v-empty-3",
  },
  {
    category: "empty state",
    description:
      "'Nothing to see here' bordered empty state (FolderIcon) for an empty posts list, with an inline link inviting the user to create their first post, plus an outline 'New Post' button with a leading plus icon. Use for empty content lists (posts, articles, etc.) needing a clear 'add first item' CTA.",
    file: "variants/v-empty-4.tsx",
    keywords: ["empty state with add button", "no posts", "create first item"],
    name: "v-empty-4",
  },
  {
    category: "empty state",
    description:
      "Dashed-border 'Upload files' empty state (CloudUploadIcon) describing drag-and-drop or click-to-browse upload, an outline 'Browse Files' button, and a small file-type/size hint line. Use as a file-upload dropzone empty state.",
    file: "variants/v-empty-5.tsx",
    keywords: [
      "dashed upload empty state",
      "drag and drop",
      "file upload placeholder",
    ],
    name: "v-empty-5",
  },
  {
    category: "empty state",
    description:
      "'No automations yet' empty state with a custom hand-drawn SVG illustration of a connected toggle switch (representing an automation flow), title/description, and a 'Create new automation' button. Use for empty automation/workflow lists needing a distinctive custom illustration.",
    file: "variants/v-empty-6.tsx",
    keywords: ["no automations", "custom illustration", "toggle illustration"],
    name: "v-empty-6",
  },
  {
    category: "empty state",
    description:
      "'No products' empty state with a custom SVG illustration of three stacked/blurred card rows fading toward the bottom (suggesting content that hasn't loaded), title/description, no action buttons. Use for empty product/data lists with a stacked-card placeholder illustration and no explicit CTA.",
    file: "variants/v-empty-7.tsx",
    keywords: ["no products", "stacked cards illustration", "blur effect"],
    name: "v-empty-7",
  },
  {
    category: "empty state",
    description:
      "'No payment methods' empty state with a custom SVG credit-card illustration (chip, contactless icon, masked digits), title/description, and an 'Add payment method' button. Use for empty billing/payment-method lists needing a card-themed illustration.",
    file: "variants/v-empty-8.tsx",
    keywords: [
      "no payment methods",
      "credit card illustration",
      "billing empty state",
    ],
    name: "v-empty-8",
  },
  {
    category: "empty state",
    description:
      "'No upcoming events' empty state with a custom SVG calendar illustration (day-dot grid with one highlighted day), title/description, and a 'Create event' button. Use for empty calendar/schedule views needing a calendar-themed illustration.",
    file: "variants/v-empty-9.tsx",
    keywords: ["no events", "calendar illustration", "empty schedule"],
    name: "v-empty-9",
  },
  {
    category: "empty state",
    description:
      "'No recent activity' empty state (ActivityIcon), simple title/description, and an outline 'View all activity' button. Use for empty activity-feed/audit-log sections.",
    file: "variants/v-empty-10.tsx",
    keywords: ["no recent activity", "activity feed empty"],
    name: "v-empty-10",
  },
  {
    category: "empty state",
    description:
      "'All caught up' notifications empty state (BellIcon) reassuring the user there's nothing new, with an outline 'Manage preferences' button. Use as the zero-notifications empty state for a notification center/inbox.",
    file: "variants/v-empty-11.tsx",
    keywords: ["all caught up", "no new notifications", "notifications empty"],
    name: "v-empty-11",
  },
  {
    category: "empty state",
    description:
      "'No team members yet' bordered empty state (UserPlusIcon) with an inline email InputGroup plus an 'Invite' ghost button embedded at the end. Use for empty team/member lists that want an inline invite form directly in the empty state rather than a separate dialog.",
    file: "variants/v-empty-12.tsx",
    keywords: ["no team members", "invite form empty state", "inline invite"],
    name: "v-empty-12",
  },
  {
    category: "empty state",
    description:
      "'No matching results' bordered empty state (FilterXIcon) for a filtered list that returned nothing, with 'Clear filters' and outline 'Edit filters' buttons side by side. Use when active filters produce zero results and the user needs quick actions to clear or adjust them.",
    file: "variants/v-empty-13.tsx",
    keywords: ["no matching results", "clear filters", "filtered empty state"],
    name: "v-empty-13",
  },
  {
    category: "empty state",
    description:
      "'Inbox zero' empty state with a custom SVG illustration of an inbox tray with envelopes, title/description celebrating an empty inbox, and an outline 'Compose message' button. Use for email/messaging inbox empty states with a positive, celebratory tone.",
    file: "variants/v-empty-14.tsx",
    keywords: ["inbox zero", "mail illustration", "compose action"],
    name: "v-empty-14",
  },
  {
    category: "empty state",
    description:
      "'Access restricted' empty state (LockIcon) on a muted bordered background, explaining a permissions issue, with 'Request access' and outline 'Go back' buttons side by side. Use for permission-denied/restricted-content states needing a request-access flow.",
    file: "variants/v-empty-15.tsx",
    keywords: [
      "access restricted",
      "permission denied",
      "request access empty state",
    ],
    name: "v-empty-15",
  },

  // --- field ---
  {
    category: "field",
    description:
      "Baseline Field: label, text Input, and a description line below. Use as the default field wrapper for a single labeled input with helper text.",
    file: "variants/v-field-1.tsx",
    keywords: ["field with label and description", "basic field"],
    name: "v-field-1",
  },
  {
    category: "field",
    description:
      "Required password Field: label with a required-asterisk marker, a required password Input, and a FieldError message shown on invalid submission. Use as the pattern for a required field with native validation error display.",
    file: "variants/v-field-2.tsx",
    keywords: ["required field", "password field", "field error"],
    name: "v-field-2",
  },
  {
    category: "field",
    description:
      "Field rendered fully `disabled` (label, disabled Input, description) showing the greyed-out non-interactive state. Use to represent a disabled/locked form field.",
    file: "variants/v-field-3.tsx",
    keywords: ["disabled field"],
    name: "v-field-3",
  },
  {
    category: "field",
    description:
      "Field with a FieldError shown for an invalid email (no description). Use as a minimal example of a field with just a validation error message.",
    file: "variants/v-field-4.tsx",
    keywords: ["validation error", "field with error"],
    name: "v-field-4",
  },
  {
    category: "field",
    description:
      "Field using FieldValidity's render-prop to inspect and display the live native validity state object (error message plus full JSON dump of the ValidityState) for a required email input. Use as a debugging/reference pattern for building custom validation UI off the input's validity state.",
    file: "variants/v-field-5.tsx",
    keywords: [
      "validity state inspector",
      "custom validation ui",
      "debug validity",
    ],
    name: "v-field-5",
  },
  {
    category: "field",
    description:
      "Field wrapping an InputGroup (email input plus an inline 'Subscribe' icon-button) with a FieldError below. Use for a field whose input is a composite InputGroup rather than a plain Input.",
    file: "variants/v-field-6.tsx",
    keywords: [
      "field wrapping input group",
      "subscribe field",
      "compound input",
    ],
    name: "v-field-6",
  },
  {
    category: "field",
    description:
      "Field wrapping an Autocomplete component (type-to-filter fruit list) with a description below. Use when a field's control should be a searchable autocomplete rather than a plain input.",
    file: "variants/v-field-7.tsx",
    keywords: ["field with autocomplete", "searchable field"],
    name: "v-field-7",
  },
  {
    category: "field",
    description:
      "Field wrapping a single-select Combobox (fruit list) with a description below. Use when a field's control should be a searchable combobox dropdown.",
    file: "variants/v-field-8.tsx",
    keywords: ["field with combobox", "single select combobox field"],
    name: "v-field-8",
  },
  {
    category: "field",
    description:
      "Field wrapping a multi-select Combobox with removable chip pills (two pre-selected) with a description below. Use for a field whose value is multiple chip-selected items rather than a single value.",
    file: "variants/v-field-9.tsx",
    keywords: ["field with multi-select chips", "combobox chips field"],
    name: "v-field-9",
  },
  {
    category: "field",
    description:
      "Field wrapping a Textarea (bio) with a description mentioning a character limit. Use for multi-line text fields with a max-length hint.",
    file: "variants/v-field-10.tsx",
    keywords: ["field with textarea", "bio field"],
    name: "v-field-10",
  },
  {
    category: "field",
    description:
      "Field wrapping a country Select dropdown with a description noting the field is optional. Use for a field whose control is a native-style Select rather than an Input.",
    file: "variants/v-field-11.tsx",
    keywords: ["field with select dropdown", "optional field"],
    name: "v-field-11",
  },
  {
    category: "field",
    description:
      "Field whose FieldLabel wraps a single Checkbox and its label text directly (no separate description), for a plain 'Accept terms' checkbox field. Use for the simplest checkbox-inside-a-field pattern.",
    file: "variants/v-field-12.tsx",
    keywords: ["field with checkbox", "single checkbox field"],
    name: "v-field-12",
  },
  {
    category: "field",
    description:
      "Field rendered as a Fieldset (via the `render` prop) wrapping a CheckboxGroup of framework options (React/Vue/Svelte), each option as a FieldItem+FieldLabel+Checkbox. Use when a field represents a whole group of checkboxes under one fieldset legend.",
    file: "variants/v-field-13.tsx",
    keywords: ["field with checkbox group", "fieldset checkboxes"],
    name: "v-field-13",
  },
  {
    category: "field",
    description:
      "Field rendered as a Fieldset wrapping a RadioGroup of plan options (Free/Pro/Enterprise), each option as a FieldItem+FieldLabel+Radio, with a description below. Use when a field represents a mutually-exclusive radio-group choice under one fieldset legend.",
    file: "variants/v-field-14.tsx",
    keywords: [
      "field with radio group",
      "fieldset radio",
      "plan selector field",
    ],
    name: "v-field-14",
  },
  {
    category: "field",
    description:
      "Field wrapping a Slider control with a description noting the field is optional. Use for a field whose control is a numeric slider rather than a text input.",
    file: "variants/v-field-15.tsx",
    keywords: ["field with slider", "slider field"],
    name: "v-field-15",
  },
  {
    category: "field",
    description:
      "Field wrapping a NumberField (with scrub-area label, decrement/increment buttons, and a bounded 1–100 input) with a description below. Use for a field whose control is a stepped/scrubbable numeric input.",
    file: "variants/v-field-16.tsx",
    keywords: ["field with number input", "stepper field", "scrub area"],
    name: "v-field-16",
  },
  {
    category: "field",
    description:
      "Complete multi-field form: required Full Name and Email fields (with FieldError), an optional Role Select field (with FieldDescription), and a newsletter Checkbox field, submitted via FormData with a loading Button and a summary alert. Use as the reference pattern for a full form combining multiple field types (text, select, checkbox) with validation and submit handling.",
    file: "variants/v-field-17.tsx",
    keywords: ["complete form", "multi field form", "form submission"],
    name: "v-field-17",
  },
  {
    category: "field",
    description:
      "Field laid out as a horizontal bordered row (label+description on the left, a Switch toggle on the right) for a 'Marketing emails' preference. Use for settings-style toggle fields where the Switch sits opposite the label rather than stacked beneath it.",
    file: "variants/v-field-18.tsx",
    keywords: ["field with switch toggle", "settings toggle row"],
    name: "v-field-18",
  },
  {
    category: "field",
    description:
      "Field wrapping a native `type='date'` Input, with both a description and a FieldError for invalid dates. Use for date-of-birth or other simple native date-entry fields.",
    file: "variants/v-field-19.tsx",
    keywords: ["field with date input", "date of birth field"],
    name: "v-field-19",
  },
  {
    category: "field",
    description:
      "Field wrapping an OTPField (6-digit code split into two groups of three with a separator) with both a description and a FieldError for invalid codes. Use for verification-code entry fields (SMS/email OTP).",
    file: "variants/v-field-20.tsx",
    keywords: ["field with otp input", "verification code field"],
    name: "v-field-20",
  },
  {
    category: "field",
    description:
      "Field with an icon-prefixed label ('Upload resume' with an upload icon), a native file Input restricted to PDF/Word docs, a description noting the size limit, and a FieldError for invalid files. Use for resume/document upload fields needing an icon label and file-type constraints.",
    file: "variants/v-field-21.tsx",
    keywords: ["field with file upload", "resume upload", "icon label field"],
    name: "v-field-21",
  },
  {
    category: "field",
    description:
      "Required 'New password' Field using FieldValidity to compute and render a live password-strength indicator: a 4-segment color-coded bar (red/yellow/blue/green) and a 'Weak/Fair/Good/Strong' label that update as the user types, based on password length. Use for signup/password-change fields needing an inline strength meter.",
    file: "variants/v-field-22.tsx",
    keywords: ["password strength indicator", "field validity strength meter"],
    name: "v-field-22",
  },

  // --- fieldset ---
  {
    category: "fieldset",
    description:
      "'Billing Details' fieldset: Company and Tax ID fields, each with a description. Use for a simple billing/invoice-info form section.",
    file: "variants/v-fieldset-1.tsx",
    keywords: ["billing details form", "company tax id"],
    name: "v-fieldset-1",
  },
  {
    category: "fieldset",
    description:
      "'Personal Information' fieldset: First/Last name in a 2-column grid, plus Email and Phone fields each with a description (phone marked optional). Use for a personal-details form section combining a name row with contact fields.",
    file: "variants/v-fieldset-2.tsx",
    keywords: ["personal information form", "name email phone"],
    name: "v-fieldset-2",
  },
  {
    category: "fieldset",
    description:
      "'Shipping Address' fieldset: required Street address field (FieldError), a City/ZIP 2-column row (both required, both with FieldError), and an optional Country Select. Use for a shipping/mailing-address form section with required-field validation.",
    file: "variants/v-fieldset-3.tsx",
    keywords: ["shipping address form", "required address fields"],
    name: "v-fieldset-3",
  },
  {
    category: "fieldset",
    description:
      "'Notification Preferences' fieldset: three bordered rows (Email/Push/Marketing notifications), each with a label+description on the left and a Switch on the right (Email defaults on). Use for a notification-settings form section with per-channel toggle rows.",
    file: "variants/v-fieldset-4.tsx",
    keywords: ["notification preferences fieldset", "switch toggle rows"],
    name: "v-fieldset-4",
  },
  {
    category: "fieldset",
    description:
      "'Change Password' fieldset: Current password, New password (with min-length description), and Confirm new password fields, each with a FieldError. Use for an account password-change form section.",
    file: "variants/v-fieldset-5.tsx",
    keywords: ["change password form", "current new confirm password"],
    name: "v-fieldset-5",
  },
  {
    category: "fieldset",
    description:
      "'Payment Information' fieldset: Cardholder name, Card number, and an Expiry/CVC 2-column row, all required with FieldError messages and appropriate autoComplete/inputMode attributes. Use for a credit-card payment-details form section.",
    file: "variants/v-fieldset-6.tsx",
    keywords: ["payment information form", "credit card fields"],
    name: "v-fieldset-6",
  },
  {
    category: "fieldset",
    description:
      "'Account Settings' fieldset: Display name Input, a Username field with a fixed '@' prefix rendered as a custom bordered input group, a Timezone Select, and a 'Save changes' Button that briefly shows 'Saved!' on click. Use for a general account-settings form section with a custom-prefixed username field.",
    file: "variants/v-fieldset-7.tsx",
    keywords: [
      "account settings form",
      "username prefix field",
      "save changes feedback",
    ],
    name: "v-fieldset-7",
  },
  {
    category: "fieldset",
    description:
      "'Team Member' fieldset: First/Last name 2-column row, Work email (with invite description), and Job title fields. Use for an add/invite-team-member form section.",
    file: "variants/v-fieldset-8.tsx",
    keywords: ["team member form", "invite member fields"],
    name: "v-fieldset-8",
  },
  {
    category: "fieldset",
    description:
      "'Support Request' fieldset: Subject Input, Description Textarea (with a hint about including error messages/screenshots), and a reply-to Email field. Use for a customer-support/contact-form section.",
    file: "variants/v-fieldset-9.tsx",
    keywords: ["support request form", "contact form fields"],
    name: "v-fieldset-9",
  },
  {
    category: "fieldset",
    description:
      "'Social Links' fieldset: GitHub and X/Twitter fields each with a fixed domain prefix ('github.com/', 'x.com/') rendered as custom bordered input groups, plus a Website URL field with a FieldError for invalid URLs. Use for a profile social-links form section with prefixed username inputs.",
    file: "variants/v-fieldset-10.tsx",
    keywords: [
      "social links form",
      "prefixed username input",
      "github twitter website",
    ],
    name: "v-fieldset-10",
  },

  // --- form ---
  {
    category: "form",
    description:
      "Baseline Form: a single required Email field with FieldError, submitted via FormData with a loading Button and a result alert. Use as the default minimal form submission pattern.",
    file: "variants/v-form-1.tsx",
    keywords: ["default form", "single field form"],
    name: "v-form-1",
  },
  {
    category: "form",
    description:
      "Form with Zod schema validation: Name and Age fields validated via `schema.safeParse` on submit, errors passed into the Form's `errors` prop and rendered by bare `<FieldError />` components per field. Use as the reference pattern for schema-based (Zod) form validation with server/client-side error mapping.",
    file: "variants/v-form-2.tsx",
    keywords: [
      "zod validation",
      "schema validation form",
      "multi-field validation",
    ],
    name: "v-form-2",
  },
  {
    category: "form",
    description:
      "'Welcome back' sign-in form: Email and Password fields (password has a show/hide eye-icon toggle and a 'Forgot password?' link), a 'Remember me' checkbox, a full-width 'Sign in' submit button, and a divider leading to an outline 'Create account' button. Use as a complete standalone sign-in page/form.",
    file: "variants/v-form-3.tsx",
    keywords: ["sign in form", "password visibility toggle", "remember me"],
    name: "v-form-3",
  },
  {
    category: "form",
    description:
      "'Profile' settings form embedded in a Card: First/Last name row, Username (with description), Role Select, Bio Textarea, and Website URL fields, with Reset/'Save changes' footer buttons where the submit label flips to 'Saved!' briefly after submit. Use for a full profile-settings form inside a card layout.",
    file: "variants/v-form-4.tsx",
    keywords: ["profile settings form", "save changes card form"],
    name: "v-form-4",
  },
  {
    category: "form",
    description:
      "Contact form: First/Last name row, Email, a Topic Select, a Priority RadioGroup (low/normal/high), and a required Message Textarea; submitting swaps the whole form to a 'Message sent!' success screen with a 'Send another' reset button. Use for a general contact-us form with a post-submit confirmation state.",
    file: "variants/v-form-5.tsx",
    keywords: ["contact form", "message sent confirmation", "priority radio"],
    name: "v-form-5",
  },
  {
    category: "form",
    description:
      "'Change password' form in a Card: Current/New/Confirm password fields with client-side validation (min length, matching confirmation) computed in the submit handler and passed via the Form's `errors` prop; submit button flips to 'Password updated!' briefly on success. Use for account password-change forms with custom (non-schema-library) validation logic.",
    file: "variants/v-form-6.tsx",
    keywords: [
      "change password form",
      "custom validation",
      "password match check",
    ],
    name: "v-form-6",
  },
  {
    category: "form",
    description:
      "Newsletter-signup card form: First/Last name row, Email field, a 'weekly digest' checkbox (pre-checked), and a 'Subscribe' button; submitting swaps the card to a 'You're on the list!' confirmation showing the submitted email. Use for a newsletter/email-list signup widget.",
    file: "variants/v-form-7.tsx",
    keywords: ["newsletter signup", "subscribe form", "confirmation state"],
    name: "v-form-7",
  },
  {
    category: "form",
    description:
      "3-step onboarding wizard with a step-progress indicator (Account → Plan → Confirm, numbered circles connected by lines): step 1 collects name/email, step 2 picks a plan (radio cards) and a newsletter checkbox, step 3 shows a read-only summary with Back/'Create account' buttons, ending in an 'Account created!' success screen. Use for multi-step signup/onboarding flows that need a visible step tracker.",
    file: "variants/v-form-8.tsx",
    keywords: [
      "3 step onboarding wizard",
      "step progress indicator",
      "account creation flow",
    ],
    name: "v-form-8",
  },
  {
    category: "form",
    description:
      "'Create an account' sign-up form: Email, Password (min length), Confirm password fields, and a required Terms-of-Service/Privacy-Policy agreement checkbox with inline links, plus a full-width 'Create account' submit button. Use for a standard sign-up/register form page.",
    file: "variants/v-form-9.tsx",
    keywords: ["sign up form", "register form", "terms agreement checkbox"],
    name: "v-form-9",
  },
  {
    category: "form",
    description:
      "Feedback form with a star-rating Select (⭐ to ⭐⭐⭐⭐⭐ options) and a required comment Textarea; submitting swaps the form to a 'Thanks for your feedback!' confirmation. Use for a product-feedback form combining a rating scale with free-text comments.",
    file: "variants/v-form-10.tsx",
    keywords: [
      "feedback form with rating",
      "star rating select",
      "thank you confirmation",
    ],
    name: "v-form-10",
  },
  {
    category: "form",
    description:
      "'Forgot your password?' form: a single required Email field and a 'Send reset link' button; submitting swaps the form to a 'Check your inbox' confirmation naming the submitted email, with a 'Resend email' button to go back. Use for password-reset request pages.",
    file: "variants/v-form-11.tsx",
    keywords: ["forgot password form", "reset email confirmation"],
    name: "v-form-11",
  },
  {
    category: "form",
    description:
      "Danger-zone account-deletion form on a destructive-tinted bordered card: a warning icon/message, a text field requiring the user to type an exact confirmation phrase ('delete my account') before the destructive 'Permanently delete account' submit button becomes enabled. Use for the highest-risk destructive account actions needing typed confirmation (compare with v-alert-dialog-13's dialog version of the same pattern).",
    file: "variants/v-form-12.tsx",
    keywords: [
      "delete account danger zone",
      "typed confirmation phrase",
      "destructive form",
    ],
    name: "v-form-12",
  },
  {
    category: "form",
    description:
      "'Invite team member' form: required Email field, a Role Select (Admin/Member/Viewer) with a description explaining admin permissions, and Cancel(reset)/'Send invitation' buttons where the submit label briefly flips to 'Invitation sent!' on success. Use for a team/workspace member-invite form.",
    file: "variants/v-form-13.tsx",
    keywords: [
      "invite team member form",
      "role select with description",
      "invitation sent feedback",
    ],
    name: "v-form-13",
  },

  // --- frame ---
  {
    category: "frame",
    description:
      "Baseline Frame: header (title + description), one panel with a sub-title/description, and a footer text line. Use as the default bordered card-like section container with header/panel/footer regions.",
    file: "variants/v-frame-1.tsx",
    keywords: ["default frame", "header panel footer"],
    name: "v-frame-1",
  },
  {
    category: "frame",
    description:
      "Frame with a header followed by two separate FramePanels stacked with dividers between them (no footer). Use when a frame needs multiple independently-divided content panels rather than one combined panel.",
    file: "variants/v-frame-2.tsx",
    keywords: ["separated panels", "multiple panels", "divided sections"],
    name: "v-frame-2",
  },
  {
    category: "frame",
    description:
      "Frame whose header is itself a Collapsible trigger (chevron rotates, defaults open) revealing a single panel of content underneath. Use when a Frame's content section should be collapsible/expandable rather than always visible.",
    file: "variants/v-frame-3.tsx",
    keywords: ["with collapsible panel", "collapsible frame header"],
    name: "v-frame-3",
  },
  {
    category: "frame",
    description:
      "Frame demonstrating a 'dense' compact panel style (less internal padding) for an 'Inventory Check' warehouse-stock panel. Use when a Frame's content needs a tighter, denser layout than the default panel padding.",
    file: "variants/v-frame-4.tsx",
    keywords: ["dense layout", "compact panel"],
    name: "v-frame-4",
  },
  {
    category: "frame",
    description:
      "'Workspace settings' Frame with a header row containing the title/description on the left and a ghost settings-icon button on the right. Use when a Frame's header needs an inline action button alongside the title.",
    file: "variants/v-frame-5.tsx",
    keywords: ["action button in header", "settings icon button"],
    name: "v-frame-5",
  },
  {
    category: "frame",
    description:
      "'Overview' stats Frame: header ('Last 30 days') followed by one FramePanel per metric (Total revenue, Active users, Conversion rate), each showing a label, a color-coded +/- trend percentage, and the large value. Use for a stacked KPI/metrics display inside a Frame.",
    file: "variants/v-frame-6.tsx",
    keywords: ["stats metrics display", "kpi panels", "trend percentage"],
    name: "v-frame-6",
  },
  {
    category: "frame",
    description:
      "'API Status' Frame with a header showing a status Badge ('Operational') next to the title, and a panel listing individual services (Authentication API, Storage API, Webhooks) each with a colored status dot (green=operational, amber=degraded). Use for a system-status/uptime dashboard panel.",
    file: "variants/v-frame-7.tsx",
    keywords: [
      "badge status indicator",
      "system status panel",
      "service health dots",
    ],
    name: "v-frame-7",
  },
  {
    category: "frame",
    description:
      "'Subscription details' Frame with a read-only key-value definition list (Plan, Billing cycle, Next renewal, Seats used) in the panel. Use for displaying static account/subscription info as label-value rows inside a Frame.",
    file: "variants/v-frame-8.tsx",
    keywords: [
      "read only key value info",
      "subscription details",
      "definition list",
    ],
    name: "v-frame-8",
  },
  {
    category: "frame",
    description:
      "'Display name' settings Frame: header, a panel with a labeled name Input, and a footer with Cancel/'Save changes' buttons. Use for a single-field settings-update Frame with header/panel/footer CTA buttons.",
    file: "variants/v-frame-9.tsx",
    keywords: [
      "footer cta buttons",
      "settings update frame",
      "save changes footer",
    ],
    name: "v-frame-9",
  },
  {
    category: "frame",
    description:
      "Destructive 'Delete account' Frame (destructive-tinted border): warning header/description, a panel with a 'type DELETE to confirm' text input, and a footer with Cancel/destructive 'Delete account' buttons; clicking delete swaps the whole Frame to a checkmark 'Account deleted' confirmation panel. Use for account-deletion confirmation built as a Frame rather than a Dialog/AlertDialog.",
    file: "variants/v-frame-10.tsx",
    keywords: ["delete account frame", "type to confirm", "destructive frame"],
    name: "v-frame-10",
  },

  // --- group ---
  {
    category: "group",
    description:
      "Baseline Group: 'Files' and 'Media' outline buttons joined by GroupSeparators, plus an ellipsis icon-button that opens a Menu (Edit/Archive/Share/destructive Delete). Use as the default joined-button toolbar with a trailing overflow menu.",
    file: "variants/v-group-1.tsx",
    keywords: ["file actions group", "joined buttons with menu"],
    name: "v-group-1",
  },
  {
    category: "group",
    description:
      "Group combining a text Input (URL) with a trailing icon Button wrapped in a Tooltip that copies the input's value to clipboard (swaps icon to a checkmark on copy). Use for a URL/text field with an attached copy-to-clipboard action joined into one control.",
    file: "variants/v-group-2.tsx",
    keywords: ["with input", "copy to clipboard group", "url input group"],
    name: "v-group-2",
  },
  {
    category: "group",
    description:
      "Same Files/Media/overflow-menu Group as v-group-1 but using `size='sm'` buttons throughout. Use as the small-size reference for a joined button toolbar.",
    file: "variants/v-group-3.tsx",
    keywords: ["small size", "compact group toolbar"],
    name: "v-group-3",
  },
  {
    category: "group",
    description:
      "Same Files/Media/overflow-menu Group as v-group-1 but with the 'Media' button rendered `disabled`. Use as a reference for showing a disabled button within a joined Group.",
    file: "variants/v-group-4.tsx",
    keywords: ["with disabled button", "disabled group item"],
    name: "v-group-4",
  },
  {
    category: "group",
    description:
      "Same Files/Media/overflow-menu Group as v-group-1 but using default (filled/primary) buttons instead of outline, with tinted primary-colored GroupSeparators. Use as a reference for a Group built from solid/default-variant buttons rather than outline.",
    file: "variants/v-group-5.tsx",
    keywords: ["with default buttons", "primary variant group"],
    name: "v-group-5",
  },
  {
    category: "group",
    description:
      "Domain-input Group with a fixed 'https://' GroupText label (rendered as a Label) on the left of the Input. Use for a URL/domain field needing a fixed protocol prefix joined to the input.",
    file: "variants/v-group-6.tsx",
    keywords: ["with start labeled text", "protocol prefix input"],
    name: "v-group-6",
  },
  {
    category: "group",
    description:
      "Domain-suffix Group with the Input first and a fixed '.com' GroupText label after it. Use for a domain field needing a fixed TLD/suffix joined to the end of the input.",
    file: "variants/v-group-7.tsx",
    keywords: ["with end text", "domain suffix input"],
    name: "v-group-7",
  },
  {
    category: "group",
    description:
      "Vertical-orientation Group: zoom-in/zoom-out icon buttons stacked vertically with a horizontal GroupSeparator between them. Use for a vertical control cluster (e.g. map/image zoom controls).",
    file: "variants/v-group-8.tsx",
    keywords: ["vertical group", "zoom controls", "stacked buttons"],
    name: "v-group-8",
  },
  {
    category: "group",
    description:
      "Nested Groups: an outer pagination Group containing two inner Groups — numbered page buttons (1–5) and Previous/Next icon-button navigation — visually separated as two clusters within one pagination control. Use for pagination controls that need distinct numbered and prev/next sub-groups.",
    file: "variants/v-group-9.tsx",
    keywords: [
      "nested groups",
      "pagination group",
      "numbered pages and navigation",
    ],
    name: "v-group-9",
  },
  {
    category: "group",
    description:
      "Repository-actions Group: a 'Fork' outline button with a star-count Badge, joined to a chevron-down icon button that opens a Popover showing 'Existing forks' info. Use for a GitHub-style action button with an attached popover/dropdown for related info.",
    file: "variants/v-group-10.tsx",
    keywords: ["with popup", "fork button with popover", "count badge button"],
    name: "v-group-10",
  },
  {
    category: "group",
    description:
      "Chat-message-composer Group combining an attach-file icon Button with an InputGroup (message text input plus an inline mic/voice-mode icon button in a tooltip), all styled with a fully-rounded pill radius via a custom CSS variable override. Use for a chat/message composer bar combining an attachment button and a rich input field into one pill-shaped control.",
    file: "variants/v-group-11.tsx",
    keywords: ["with input group", "chat composer", "pill shaped group"],
    name: "v-group-11",
  },
  {
    category: "group",
    description:
      "'Subscribe' split-button Group: a primary 'Subscribe' button joined to a chevron-down icon button opening a Menu (Share link/Download/Duplicate). Use for a primary action plus a menu of secondary related actions joined into one control (compare with v-button-29's near-identical deploy-button pattern).",
    file: "variants/v-group-12.tsx",
    keywords: [
      "with menu",
      "split button subscribe",
      "primary action with menu",
    ],
    name: "v-group-12",
  },
  {
    category: "group",
    description:
      "Payment-amount Group: a nested Group combining a currency Select (showing just the symbol in the trigger) with a NumberField amount input, plus a separate 'Send' icon-button Group. Use for a currency-selector-plus-amount input joined with a submit action (compare with v-input-group-17's currency-select-prefix pattern).",
    file: "variants/v-group-13.tsx",
    keywords: ["with select", "currency amount input", "payment group"],
    name: "v-group-13",
  },
  {
    category: "group",
    description:
      "Text-formatting toolbar Group: Bold/Italic/Underline/Strikethrough icon buttons, each independently toggleable (pressed state switches to secondary variant), separated by GroupSeparators. Use for a rich-text-editor formatting toolbar with independent toggle buttons.",
    file: "variants/v-group-14.tsx",
    keywords: [
      "text formatting toolbar",
      "toggle buttons group",
      "rich text controls",
    ],
    name: "v-group-14",
  },
  {
    category: "group",
    description:
      "Helpfulness-vote Group: 'Helpful'/'Not helpful' buttons each with a thumbs icon and a live vote-count Badge, mutually exclusive selection (voting one un-votes the other), separated by a GroupSeparator. Use for a thumbs up/down feedback-voting control on articles or answers.",
    file: "variants/v-group-15.tsx",
    keywords: [
      "thumbs up down vote",
      "helpfulness voting",
      "mutually exclusive vote buttons",
    ],
    name: "v-group-15",
  },
  {
    category: "group",
    description:
      "Media-player-controls Group: previous-track / play-pause (toggles icon) / next-track icon buttons, separated by GroupSeparators. Use for audio/video player transport controls.",
    file: "variants/v-group-16.tsx",
    keywords: ["media player controls", "play pause skip buttons"],
    name: "v-group-16",
  },
  {
    category: "group",
    description:
      "Price-range Group: a '$' GroupText, a min-price Input, a '–' GroupText separator label, a max-price Input, and an 'Apply' button, all joined into one control with GroupSeparators between every element. Use for a min/max numeric range filter with a fixed currency symbol and an apply action.",
    file: "variants/v-group-17.tsx",
    keywords: ["price range input", "min max filter", "apply button group"],
    name: "v-group-17",
  },
  {
    category: "group",
    description:
      "Search-with-category-filter Group: a category Select (All/Articles/People/Files) joined to a search Input and a trailing search icon-button. Use for a faceted search bar combining a category filter dropdown with the search field itself.",
    file: "variants/v-group-18.tsx",
    keywords: ["search with category filter", "faceted search bar"],
    name: "v-group-18",
  },

  // --- input ---
  {
    category: "input",
    description:
      "Baseline standalone Input (text type) with no Field wrapper, just a placeholder and aria-label. Use as the plainest possible text input.",
    file: "variants/v-input-1.tsx",
    keywords: ["default input", "bare input"],
    name: "v-input-1",
  },
  {
    category: "input",
    description:
      "Email Input wrapped in a Field with a FieldLabel. Use as the standard labeled-input pattern for an email field.",
    file: "variants/v-input-2.tsx",
    keywords: ["with label", "email input"],
    name: "v-input-2",
  },
  {
    category: "input",
    description:
      "Username Input wrapped in a Field with label and a FieldDescription hint below. Use for a field needing both a label and helper text.",
    file: "variants/v-input-3.tsx",
    keywords: ["with description", "username field"],
    name: "v-input-3",
  },
  {
    category: "input",
    description:
      "Email Input wrapped in a Field with a FieldError message shown below. Use as a minimal validation-error example.",
    file: "variants/v-input-4.tsx",
    keywords: ["with error message", "validation error"],
    name: "v-input-4",
  },
  {
    category: "input",
    description:
      "Controlled Input with a live character counter ('N/50') shown next to the label, capped via `maxLength`. Use for description/bio-style fields that need to show remaining/used characters.",
    file: "variants/v-input-5.tsx",
    keywords: ["with character counter", "max length input"],
    name: "v-input-5",
  },
  {
    category: "input",
    description:
      "Password-type Input wrapped in a labeled Field (no visibility toggle). Use as the baseline password field reference.",
    file: "variants/v-input-6.tsx",
    keywords: ["with password type", "password field"],
    name: "v-input-6",
  },
  {
    category: "input",
    description:
      "Phone (`type='tel'`) Input wrapped in a labeled Field with a formatted placeholder. Use for phone-number entry fields.",
    file: "variants/v-input-7.tsx",
    keywords: ["with phone type", "tel input"],
    name: "v-input-7",
  },
  {
    category: "input",
    description:
      "URL-type Input wrapped in a labeled Field with a placeholder URL. Use for website/link entry fields with native URL validation.",
    file: "variants/v-input-8.tsx",
    keywords: ["with url type", "website input"],
    name: "v-input-8",
  },
  {
    category: "input",
    description:
      "Number-type Input wrapped in a labeled Field. Use for simple numeric entry fields (native number input, not the stepper NumberField component).",
    file: "variants/v-input-9.tsx",
    keywords: ["with number type", "numeric input"],
    name: "v-input-9",
  },
  {
    category: "input",
    description:
      "Native `type='date'` Input wrapped in a labeled Field. Use for simple date-entry fields using the browser's native date picker UI.",
    file: "variants/v-input-10.tsx",
    keywords: ["with date type", "native date input"],
    name: "v-input-10",
  },
  {
    category: "input",
    description:
      "Native `type='file'` Input wrapped in a labeled Field. Use for the simplest file-upload field using the browser's native file picker.",
    file: "variants/v-input-11.tsx",
    keywords: ["with file type", "native file upload"],
    name: "v-input-11",
  },
  {
    category: "input",
    description:
      "Company-name Input with a required-asterisk marker in its FieldLabel. Use as the pattern for visually marking a field required via the label rather than only the native `required` attribute.",
    file: "variants/v-input-12.tsx",
    keywords: ["with required indicator", "required asterisk"],
    name: "v-input-12",
  },
  {
    category: "input",
    description:
      "Native `type='time'` Input wrapped in a labeled Field. Use for time-of-day entry fields using the browser's native time picker.",
    file: "variants/v-input-13.tsx",
    keywords: ["with time type", "native time input"],
    name: "v-input-13",
  },
  {
    category: "input",
    description:
      "Plain `<form>` (not the Form component) with Phone/Country/Address fields (Country using a Select) laid out in a 2-column grid plus one full-width field, and Cancel/Submit buttons. Use as a reference for a small multi-field contact-details form using native form semantics.",
    file: "variants/v-input-14.tsx",
    keywords: ["with multiple fields", "native form multi field"],
    name: "v-input-14",
  },
  {
    category: "input",
    description:
      "Username field whose FieldLabel includes an inline help-circle icon wrapped in a Tooltip explaining the field, in addition to a FieldDescription repeating the same hint. Use when a label needs a hover-triggered tooltip explanation alongside static description text.",
    file: "variants/v-input-15.tsx",
    keywords: ["label with tooltip", "help icon tooltip"],
    name: "v-input-15",
  },
  {
    category: "input",
    description:
      "'API Key' field whose FieldLabel row includes a small success-variant 'New' Badge next to the label text. Use when a field's label needs an attention-grabbing status badge (e.g. flagging a newly available field).",
    file: "variants/v-input-16.tsx",
    keywords: ["with badge", "new badge label"],
    name: "v-input-16",
  },
  {
    category: "input",
    description:
      "'Middle Name' field whose FieldLabel row includes a small warning-variant 'Optional' Badge aligned to the right via a justify-between row. Use for marking a field as optional with a badge instead of text like '(optional)'.",
    file: "variants/v-input-17.tsx",
    keywords: ["with optional badge", "optional field indicator"],
    name: "v-input-17",
  },
  {
    category: "input",
    description:
      "Password field with a 'Forgot password?' link in the label row, plus an eye/eye-off icon button positioned inside the input to toggle text/password visibility. Use for login-style password fields needing both a forgot-password link and a visibility toggle.",
    file: "variants/v-input-18.tsx",
    keywords: [
      "with link and visibility toggle",
      "forgot password link",
      "show hide password",
    ],
    name: "v-input-18",
  },
  {
    category: "input",
    description:
      "'Security Code' field marked `aria-invalid`, with a FieldError listing three separate validation rules (length, uppercase letter, no common patterns), each with its own alert-circle icon. Use for fields needing a multi-rule validation checklist as the error message rather than a single line.",
    file: "variants/v-input-19.tsx",
    keywords: ["with multiple error messages", "validation rule checklist"],
    name: "v-input-19",
  },
  {
    category: "input",
    description:
      "Live password-strength hint field: as the user types, computes how many of 3 requirements (8+ chars, a number, a special character) are met and shows a color-coded (muted/red/amber/green) icon+message below the input reflecting current strength, with no visible score bar (compare with v-field-22's bar-based strength meter). Use for a password field with a dynamic textual strength hint.",
    file: "variants/v-input-20.tsx",
    keywords: ["password strength dynamic hint", "requirement checklist icons"],
    name: "v-input-20",
  },
  {
    category: "input",
    description:
      "'API token' Input rendered `disabled` with a masked default value ('sk-•••...') and a description pointing to security settings to regenerate it. Use for a read-only, masked secret/token display field.",
    file: "variants/v-input-21.tsx",
    keywords: ["disabled input with masked value", "masked secret field"],
    name: "v-input-21",
  },
  {
    category: "input",
    description:
      "'Referral link' Input rendered `readOnly` with an adjacent copy-to-clipboard icon Button (swaps to a checkmark briefly on copy) and a description explaining the link's purpose. Use for a read-only shareable-link field with a copy action.",
    file: "variants/v-input-22.tsx",
    keywords: [
      "readonly with copy button",
      "referral link field",
      "copy to clipboard",
    ],
    name: "v-input-22",
  },
  {
    category: "input",
    description:
      "Search Input with an inline leading SearchIcon absolutely positioned inside the field (input padding offset to make room). Use for a search field styled with a start icon without using the InputGroup component.",
    file: "variants/v-input-23.tsx",
    keywords: ["inline start icon", "search input with icon"],
    name: "v-input-23",
  },
  {
    category: "input",
    description:
      "Native `type='color'` Input ('Brand color') with a hex default value and a description explaining its use (workspace theme color). Use for a simple color-picker field using the browser's native color input.",
    file: "variants/v-input-24.tsx",
    keywords: ["color picker input", "native color type"],
    name: "v-input-24",
  },
  {
    category: "input",
    description:
      "Controlled 'Full name' Input with an inline clear (X) button that appears inside the field once it has a value, clicking it empties the input. Use for text fields needing a quick inline clear action without a separate Button component.",
    file: "variants/v-input-25.tsx",
    keywords: ["inline clear button", "clearable text input"],
    name: "v-input-25",
  },

  // --- input-group ---
  {
    category: "input group",
    description:
      "Baseline InputGroup: a search Input with a leading SearchIcon addon. Use as the default icon-decorated input group.",
    file: "variants/v-input-group-1.tsx",
    keywords: ["default input group", "search with icon"],
    name: "v-input-group-1",
  },
  {
    category: "input group",
    description:
      "Email InputGroup with a trailing (inline-end) MailIcon addon. Use for a field needing an end-aligned icon instead of a leading one.",
    file: "variants/v-input-group-2.tsx",
    keywords: ["with end icon", "trailing icon"],
    name: "v-input-group-2",
  },
  {
    category: "input group",
    description:
      "Custom-URL InputGroup with a fixed 'i.cal.com/' text prefix (InputGroupText) before the editable slug input. Use for handle/slug fields needing a fixed domain/path prefix at the start.",
    file: "variants/v-input-group-3.tsx",
    keywords: ["with start text", "domain prefix"],
    name: "v-input-group-3",
  },
  {
    category: "input group",
    description:
      "Username InputGroup with a fixed '@ui.cnippet.dev' text suffix (InputGroupText) after the editable username input. Use for username/email fields needing a fixed domain suffix at the end.",
    file: "variants/v-input-group-4.tsx",
    keywords: ["with end text", "domain suffix"],
    name: "v-input-group-4",
  },
  {
    category: "input group",
    description:
      "Domain InputGroup with both a fixed 'https://' prefix and a fixed '.com' suffix surrounding the editable input. Use for domain-entry fields needing both a protocol prefix and TLD suffix.",
    file: "variants/v-input-group-5.tsx",
    keywords: ["with start and end text", "protocol and tld"],
    name: "v-input-group-5",
  },
  {
    category: "input group",
    description:
      "Password InputGroup with a trailing info-icon button that opens a hover-triggered tooltip-styled Popover showing 'Min. 8 characters'. Use for a field needing a hover tooltip explaining requirements, attached inline to the input.",
    file: "variants/v-input-group-6.tsx",
    keywords: ["with tooltip", "password requirements hint"],
    name: "v-input-group-6",
  },
  {
    category: "input group",
    description:
      "URL InputGroup with a trailing ghost icon-button wrapped in a Tooltip that copies the input's value to clipboard (swaps to a checkmark on copy). Use for a read-or-copy URL field with an inline copy action.",
    file: "variants/v-input-group-7.tsx",
    keywords: ["with icon button", "copy url", "tooltip icon button"],
    name: "v-input-group-7",
  },
  {
    category: "input group",
    description:
      "Search InputGroup with a trailing secondary-variant 'Search' text Button instead of an icon. Use when the trailing addon should be a labeled action button rather than an icon-only control.",
    file: "variants/v-input-group-8.tsx",
    keywords: ["with button", "search button addon"],
    name: "v-input-group-8",
  },
  {
    category: "input group",
    description:
      "Search InputGroup with a trailing info-variant Badge ('Badge') as the addon. Use as a reference for embedding a Badge inside an input group's addon slot.",
    file: "variants/v-input-group-9.tsx",
    keywords: ["with badge", "badge addon"],
    name: "v-input-group-9",
  },
  {
    category: "input group",
    description:
      "Search InputGroup with a trailing Kbd showing the '⌘K' keyboard-shortcut hint. Use for search fields that also serve as a command-palette trigger and need to advertise the shortcut inline.",
    file: "variants/v-input-group-10.tsx",
    keywords: ["with keyboard shortcut", "command k hint"],
    name: "v-input-group-10",
  },
  {
    category: "input group",
    description:
      "Email InputGroup with a block-start addon containing an inner Label ('Email') plus a hover info-icon Popover explaining the field's use, positioned above the input inside the same bordered group. Use when a field's label and a help tooltip need to be visually merged into the input group itself rather than a separate FieldLabel.",
    file: "variants/v-input-group-11.tsx",
    keywords: [
      "with inner label",
      "label inside input group",
      "block start addon",
    ],
    name: "v-input-group-11",
  },
  {
    category: "input group",
    description:
      "Two search InputGroups side by side comparing `sm` and `lg` input sizes. Use as a size reference for input groups.",
    file: "variants/v-input-group-12.tsx",
    keywords: ["sizes", "small large input group"],
    name: "v-input-group-12",
  },
  {
    category: "input group",
    description:
      "Newsletter-subscribe InputGroup rendered fully `disabled` (input and the trailing arrow icon button both disabled). Use to show a disabled/locked input-group state.",
    file: "variants/v-input-group-13.tsx",
    keywords: ["disabled input group"],
    name: "v-input-group-13",
  },
  {
    category: "input group",
    description:
      "Search InputGroup showing a loading Spinner as the trailing addon while the input itself is disabled, simulating an in-progress search. Use for a search field's loading state while results are being fetched.",
    file: "variants/v-input-group-14.tsx",
    keywords: ["loading spinner addon", "searching state"],
    name: "v-input-group-14",
  },
  {
    category: "input group",
    description:
      "Currency-amount InputGroup combining a NumberField with a leading '€' symbol addon and a trailing 'EUR' code addon. Use for monetary amount fields needing both a currency symbol and code displayed around a numeric stepper input.",
    file: "variants/v-input-group-15.tsx",
    keywords: [
      "with number field",
      "currency amount",
      "symbol and code addons",
    ],
    name: "v-input-group-15",
  },
  {
    category: "input group",
    description:
      "Chat-composer InputGroupTextarea (ChatGPT-style): a multi-line growable textarea with a block-end addon row containing a '+' Menu button (Add photos/Create image/Thinking/Deep research) wrapped in a tooltip, a '78% used' quota text, and a round primary 'Send' icon button. Use for an AI chat/prompt composer combining a textarea with an attachment menu and send button.",
    file: "variants/v-input-group-16.tsx",
    keywords: [
      "with textarea",
      "chat composer",
      "ai prompt input",
      "attachment menu",
    ],
    name: "v-input-group-16",
  },
  {
    category: "input group",
    description:
      "Price-per-unit InputGroup: a leading currency Select (USD/EUR/GBP) styled flush into the group, a decimal amount input, and a trailing 'per unit' text addon. Use for pricing fields needing a currency selector prefix rather than a fixed symbol.",
    file: "variants/v-input-group-17.tsx",
    keywords: ["currency select prefix", "price per unit", "pricing input"],
    name: "v-input-group-17",
  },
  {
    category: "input group",
    description:
      "Newsletter-subscribe InputGroup with a title/description above it and a trailing ghost arrow-icon 'Subscribe' button. Use for a compact inline email-subscribe widget with an arrow-button call to action.",
    file: "variants/v-input-group-18.tsx",
    keywords: ["newsletter subscribe", "arrow button", "email signup widget"],
    name: "v-input-group-18",
  },
  {
    category: "input group",
    description:
      "Controlled tag-name InputGroup with an inline clear (X) button addon that only appears once the field has a value. Use for text/tag fields needing a quick inline-clear action built with InputGroup rather than manual absolute positioning.",
    file: "variants/v-input-group-19.tsx",
    keywords: ["inline clear button", "clearable tag input"],
    name: "v-input-group-19",
  },
  {
    category: "input group",
    description:
      "Chat-input InputGroup: a message text field with Enter-to-send support and a trailing send icon-button that shows a loading spinner (via the Button's `loading` prop) while an async send is simulated, clearing the input on completion. Use for a simple chat/message send input with async submit feedback.",
    file: "variants/v-input-group-20.tsx",
    keywords: ["chat input", "async send", "enter to send"],
    name: "v-input-group-20",
  },
  {
    category: "input group",
    description:
      "Social-post composer using InputGroupTextarea with a live remaining-character countdown addon (turns warning color near the limit, destructive color when over 280). Use for tweet/post-style composers needing a character-limit countdown display.",
    file: "variants/v-input-group-21.tsx",
    keywords: [
      "textarea character countdown",
      "post composer",
      "character limit",
    ],
    name: "v-input-group-21",
  },

  // --- kbd ---
  {
    category: "kbd",
    description:
      "Baseline Kbd reference: single keys (K, ⌘, ⌃, ⇧) and key-combination groups (⌘K, ⌘⇧P, Ctrl+Alt+Delete) via KbdGroup. Use as the default keyboard-shortcut display reference.",
    file: "variants/v-kbd-1.tsx",
    keywords: ["default kbd", "single keys and combinations"],
    name: "v-kbd-1",
  },
  {
    category: "kbd",
    description:
      "Search InputGroup with a trailing Kbd showing '⌘K'. Use for a search field advertising its keyboard shortcut inline (identical pattern to v-input-group-10).",
    file: "variants/v-kbd-2.tsx",
    keywords: ["input group", "search shortcut hint"],
    name: "v-kbd-2",
  },
  {
    category: "kbd",
    description:
      "Standalone centered KbdGroup showing a 3-key combo (Ctrl+Shift+P). Use as a minimal isolated keyboard-shortcut display.",
    file: "variants/v-kbd-3.tsx",
    keywords: ["keys grouped together", "three key combo"],
    name: "v-kbd-3",
  },
  {
    category: "kbd",
    description:
      "KbdGroup where each Kbd contains an icon plus a text label (ArrowLeftIcon+'Left', CircleDashedIcon+'Voice Enabled') instead of just plain text. Use for keyboard-hint pills that need an icon alongside the label text.",
    file: "variants/v-kbd-4.tsx",
    keywords: ["with icons", "icon plus label kbd"],
    name: "v-kbd-4",
  },
  {
    category: "kbd",
    description:
      "Icon-only outline Button wrapped in a Tooltip whose content combines text ('Save Changes') with a trailing Kbd ('S'). Use for icon-button tooltips that need to show the associated keyboard shortcut.",
    file: "variants/v-kbd-5.tsx",
    keywords: ["in a tooltip", "tooltip with shortcut"],
    name: "v-kbd-5",
  },
  {
    category: "kbd",
    description:
      "'Keyboard Shortcuts' reference list: a divided list of action labels each paired with a right-aligned KbdGroup (e.g. Search=⌘K, New File=⌘N, Redo=⌘⇧Z). Use for a settings/help page's keyboard-shortcuts reference table.",
    file: "variants/v-kbd-6.tsx",
    keywords: ["reference list", "shortcuts settings page"],
    name: "v-kbd-6",
  },
  {
    category: "kbd",
    description:
      "Two outline Buttons (Save, Print) each with an icon, label, and a trailing KbdGroup showing their shortcut (⌘S, ⌘P) embedded inside the button itself. Use when a button needs to display its own keyboard shortcut inline.",
    file: "variants/v-kbd-7.tsx",
    keywords: ["shortcut in button", "button with kbd"],
    name: "v-kbd-7",
  },
  {
    category: "kbd",
    description:
      "Arrow-key navigation diagram: a D-pad-style layout of Up/Left/Down/Right Kbd elements, plus a labeled legend row repeating each arrow with its name below. Use for onboarding/help content explaining directional keyboard navigation.",
    file: "variants/v-kbd-8.tsx",
    keywords: ["arrow key navigation display", "d-pad diagram"],
    name: "v-kbd-8",
  },
  {
    category: "kbd",
    description:
      "Cross-platform shortcut table: a 3-column grid (Action / Mac / Win-Linux) listing shortcuts (command palette, find & replace, undo) with icon-labeled actions and separate KbdGroups for Mac (⌘) vs Windows (Ctrl) key combos. Use for documentation/help pages needing platform-specific keyboard shortcut tables.",
    file: "variants/v-kbd-9.tsx",
    keywords: ["cross-platform shortcut table", "mac vs windows shortcuts"],
    name: "v-kbd-9",
  },
  {
    category: "kbd",
    description:
      "'Edit document' dropdown Menu where each item (Rename, Duplicate, Export, destructive Delete) shows its keyboard shortcut as a right-aligned KbdGroup/Kbd. Use for menu items needing shortcut hints (compare with the plain CommandShortcut used in Command/ContextMenu components).",
    file: "variants/v-kbd-10.tsx",
    keywords: ["shortcuts in menu items", "menu item kbd"],
    name: "v-kbd-10",
  },
  {
    category: "kbd",
    description:
      "Command-palette-style result list: a 'Recent' section with icon-labeled result rows (Getting started guide, Design resources, Account settings) each showing an Enter (↵) Kbd, and a footer row with Up/Down 'navigate', Enter 'open', and Esc 'close' hints. Use for a search/command-palette results panel needing per-row and global keyboard-navigation hints.",
    file: "variants/v-kbd-11.tsx",
    keywords: ["command palette result rows", "navigation hints footer"],
    name: "v-kbd-11",
  },

  // --- label ---
  {
    category: "label",
    description:
      "Baseline Label paired with an Input via matching `htmlFor`/`id` (generated with `useId`). Use as the default standalone label+input pairing (not using the Field wrapper).",
    file: "variants/v-label-1.tsx",
    keywords: ["default label", "label input pairing"],
    name: "v-label-1",
  },
  {
    category: "label",
    description:
      "Label paired with a Checkbox in a horizontal Field row ('Accept terms and conditions'). Use for a checkbox+label pairing rather than a text-input label.",
    file: "variants/v-label-2.tsx",
    keywords: ["with checkbox", "checkbox label pairing"],
    name: "v-label-2",
  },
  {
    category: "label",
    description:
      "Label paired with a Textarea field ('Message'). Use for labeling multi-line text areas.",
    file: "variants/v-label-3.tsx",
    keywords: ["with textarea field", "message label"],
    name: "v-label-3",
  },
  {
    category: "label",
    description:
      "Label with a required-asterisk marker ('Email address *') paired with a required email Input. Use for visually marking a labeled field as required.",
    file: "variants/v-label-4.tsx",
    keywords: ["with required indicator", "required asterisk"],
    name: "v-label-4",
  },
  {
    category: "label",
    description:
      "Label with an '(optional)' muted-text marker paired with a phone Input. Use for visually marking a labeled field as optional.",
    file: "variants/v-label-5.tsx",
    keywords: ["with optional indicator", "optional marker"],
    name: "v-label-5",
  },
  {
    category: "label",
    description:
      "Label with an inline hover-triggered info-icon Tooltip ('API Key' + info icon explaining where to find it) paired with a monospace Input. Use when a label needs a hover tooltip explanation rather than always-visible helper text.",
    file: "variants/v-label-6.tsx",
    keywords: ["with tooltip info icon", "label help tooltip"],
    name: "v-label-6",
  },
  {
    category: "label",
    description:
      "Label with a small success-variant 'Active' Badge next to the text ('Webhook URL') paired with a monospace URL Input. Use when a label needs an inline status badge indicating the field's current state.",
    file: "variants/v-label-7.tsx",
    keywords: ["with badge indicator", "status badge label"],
    name: "v-label-7",
  },
  {
    category: "label",
    description:
      "Label laid out with `justify-between` showing 'Bio' on the left and a live 'N/200' character counter on the right, paired with a max-length Textarea. Use when the label row itself should host a live character-count indicator.",
    file: "variants/v-label-8.tsx",
    keywords: ["with character counter", "label character count"],
    name: "v-label-8",
  },
  {
    category: "label",
    description:
      "Label ('API Key') stacked above a separate FieldDescription helper line, both above a monospace Input. Use when label and description need to be grouped tightly together as one unit above the input (compare with v-input-3/v-field-1 where description sits below the input).",
    file: "variants/v-label-9.tsx",
    keywords: ["with helper description text", "label above description"],
    name: "v-label-9",
  },
  {
    category: "label",
    description:
      "Label ('Server Status') with an inline animated pulsing green status dot next to the text, paired with a disabled Input showing 'Online'. Use for a read-only status field whose label carries a live-looking presence indicator.",
    file: "variants/v-label-10.tsx",
    keywords: ["with status indicator dot", "animated presence dot"],
    name: "v-label-10",
  },
  {
    category: "label",
    description:
      "Label laid out `justify-between` showing 'Quick search' on the left and a muted '⌘K' Kbd on the right, paired with a search Input. Use when a label needs to display its field's keyboard shortcut inline.",
    file: "variants/v-label-11.tsx",
    keywords: ["with keyboard shortcut", "label kbd hint"],
    name: "v-label-11",
  },
  {
    category: "label",
    description:
      "Label laid out `justify-between` showing 'Password' on the left and a 'Forgot password?' Next.js Link on the right, paired with a password Input. Use for password fields needing an inline forgot-password link in the label row.",
    file: "variants/v-label-12.tsx",
    keywords: ["with inline link", "forgot password label"],
    name: "v-label-12",
  },
  {
    category: "label",
    description:
      "Label with a leading MailIcon prefix ('Email address') paired with an email Input. Use when a label needs a small icon before its text rather than after.",
    file: "variants/v-label-13.tsx",
    keywords: ["with icon prefix", "icon before label text"],
    name: "v-label-13",
  },
  {
    category: "label",
    description:
      "Horizontal-layout labeled fields: First name/Last name/Email each rendered via a shared HorizontalField helper using a `grid-cols-[100px_1fr]` Field so the right-aligned label sits beside (not above) its input. Use for form layouts needing side-by-side label+input rows instead of the default stacked layout.",
    file: "variants/v-label-14.tsx",
    keywords: [
      "horizontal layout",
      "side by side label input",
      "grid form layout",
    ],
    name: "v-label-14",
  },
  {
    category: "label",
    description:
      "Required email Label+Input where typing a value containing 'taken' triggers a live error state: red border, `aria-invalid`, and a destructive-colored FieldDescription ('This email is already registered.') linked via `aria-describedby`. Use for a labeled field demonstrating live client-side error styling tied accessibly to the input.",
    file: "variants/v-label-15.tsx",
    keywords: [
      "with error state",
      "live validation error",
      "aria invalid label",
    ],
    name: "v-label-15",
  },

  // --- menu ---
  {
    category: "menu",
    description:
      "Full-featured kitchen-sink Menu: grouped playback items with shortcuts (one disabled), checkbox items, a radio group ('Sort by'), a switch-style checkbox item, a nested 'Add to Playlist' submenu with a further-nested 'Rock' sub-submenu, and a destructive 'Delete' item. Use as the reference showing every Menu primitive combined (groups, shortcuts, checkboxes, radio group, switch item, nested submenus, destructive item).",
    file: "variants/v-menu-1.tsx",
    keywords: ["kitchen sink menu", "nested submenu", "media player menu"],
    name: "v-menu-1",
  },
  {
    category: "menu",
    description:
      "Menu that opens on hover (`openOnHover` on the trigger) instead of click, with two plain items. Use when a menu should reveal itself on mouse hover rather than requiring a click.",
    file: "variants/v-menu-2.tsx",
    keywords: ["open on hover", "hover trigger menu"],
    name: "v-menu-2",
  },
  {
    category: "menu",
    description:
      "Menu with two independent MenuCheckboxItems (Auto save pre-checked, Notifications). Use for a menu whose items are togglable checkboxes rather than one-shot actions.",
    file: "variants/v-menu-3.tsx",
    keywords: ["with checkbox", "checkbox menu items"],
    name: "v-menu-3",
  },
  {
    category: "menu",
    description:
      "Menu with three MenuCheckboxItems rendered as `variant='switch'` (toggle-switch style instead of checkbox style): Auto save and Dark mode pre-checked, Notifications off. Use when toggle-style switches read better in a menu than checkmarks.",
    file: "variants/v-menu-4.tsx",
    keywords: ["with switch", "switch style menu items"],
    name: "v-menu-4",
  },
  {
    category: "menu",
    description:
      "Menu with a single MenuRadioGroup (Light/Dark/System theme options, System selected by default). Use for a mutually-exclusive option menu (e.g. theme picker).",
    file: "variants/v-menu-5.tsx",
    keywords: ["with radio group", "theme picker menu"],
    name: "v-menu-5",
  },
  {
    category: "menu",
    description:
      "Menu whose items are rendered as Next.js Links (Docs, Particles) via the `render` prop rather than click handlers. Use for navigation menus where each item should be a real link.",
    file: "variants/v-menu-6.tsx",
    keywords: ["with link", "navigation menu links"],
    name: "v-menu-6",
  },
  {
    category: "menu",
    description:
      "Menu organized into two labeled groups (Account: Profile/Billing; Support: Docs/Contact) separated by a MenuSeparator. Use for menus needing categorized sections with group labels.",
    file: "variants/v-menu-7.tsx",
    keywords: ["with group label", "categorized menu sections"],
    name: "v-menu-7",
  },
  {
    category: "menu",
    description:
      "Menu with a 'More' MenuSub containing a nested submenu popup (Sub item A, Sub item B). Use as the minimal reference for a single-level nested submenu.",
    file: "variants/v-menu-8.tsx",
    keywords: ["nested menu", "submenu"],
    name: "v-menu-8",
  },
  {
    category: "menu",
    description:
      "Menu whose single item ('Open dialog') opens a separate controlled Dialog (Settings, with Title/Description and Close button) via an onClick handler. Use when a menu item's action should open a dialog rather than perform an inline action.",
    file: "variants/v-menu-9.tsx",
    keywords: ["open a dialog", "menu item opens dialog"],
    name: "v-menu-9",
  },
  {
    category: "menu",
    description:
      "'Notification settings' Menu with two switch-style checkbox groups (Channels: Desktop/Mobile push/Email digest; Activity: Mentions/Comments/Assignments), all controlled via local state. Use for a notification-preferences menu with grouped switch toggles.",
    file: "variants/v-menu-10.tsx",
    keywords: ["notification settings menu", "switch toggles grouped"],
    name: "v-menu-10",
  },
  {
    category: "menu",
    description:
      "Account-menu Menu: a circular avatar-initials Button trigger ('JS'), a group label showing the user's full name and email as a two-line block, then Profile/Billing/Settings items and a destructive 'Sign out' item. Use for a user-account dropdown menu triggered from an avatar button.",
    file: "variants/v-menu-11.tsx",
    keywords: ["account menu", "user avatar dropdown", "sign out"],
    name: "v-menu-11",
  },
  {
    category: "menu",
    description:
      "'File actions' Menu: Rename/Duplicate/Move to/Download items (with keyboard shortcuts on most) and a separated destructive 'Delete' item. Use for a file-row context/actions menu.",
    file: "variants/v-menu-12.tsx",
    keywords: ["file actions menu", "rename duplicate download delete"],
    name: "v-menu-12",
  },
  {
    category: "menu",
    description:
      "Icon-only ellipsis-vertical ghost Button trigger opening a Menu with Add to favourites/Share/Archive items and a separated destructive 'Report' item. Use for a compact overflow-actions menu triggered by a small icon button (e.g. in a list row or card).",
    file: "variants/v-menu-13.tsx",
    keywords: ["icon button trigger", "overflow menu", "ellipsis menu"],
    name: "v-menu-13",
  },
  {
    category: "menu",
    description:
      "Icon-only bell Button trigger opening a 'Notification settings' Menu with a switch-style Channels group (Email/Push/SMS) and a checkbox-style Activity group (Mentions/Comments/Reactions). Use for a compact notification-preferences menu triggered by a bell icon button.",
    file: "variants/v-menu-14.tsx",
    keywords: ["notification bell menu", "channels and activity groups"],
    name: "v-menu-14",
  },
  {
    category: "menu",
    description:
      "'Share' Menu: a 'Copy link' item plus an 'Export as' MenuSub containing format options (PDF/PNG/SVG, separated from 'CSV (data only)'). Use for a share/export action menu with a nested export-format submenu.",
    file: "variants/v-menu-15.tsx",
    keywords: ["share with export sub-menu", "export format submenu"],
    name: "v-menu-15",
  },

  // --- meter ---
  {
    category: "meter",
    description:
      "Baseline Meter: 'Storage usage' label with a live value on the right, and a track+indicator bar at 75%. Use as the default single labeled meter/progress-style indicator.",
    file: "variants/v-meter-1.tsx",
    keywords: ["default meter", "storage usage bar"],
    name: "v-meter-1",
  },
  {
    category: "meter",
    description:
      "Meter with only a label ('Rating') and track/indicator, no MeterValue shown. Use for the plainest labeled meter without a numeric readout.",
    file: "variants/v-meter-2.tsx",
    keywords: ["with label", "no value display"],
    name: "v-meter-2",
  },
  {
    category: "meter",
    description:
      "Meter with a custom-formatted MeterValue render function showing 'value / 5' (max=5, value=3) instead of a raw number/percentage. Use when the meter's value needs custom formatting (e.g. 'X out of Y').",
    file: "variants/v-meter-3.tsx",
    keywords: ["with formatted value", "custom value format"],
    name: "v-meter-3",
  },
  {
    category: "meter",
    description:
      "Meter using a non-zero `min` (500) and custom `max` (1000) for a 'Bandwidth (Mbps)' reading at 700. Use when the meter's scale doesn't start at zero (e.g. bandwidth, temperature ranges).",
    file: "variants/v-meter-4.tsx",
    keywords: ["with range", "custom min max"],
    name: "v-meter-4",
  },
  {
    category: "meter",
    description:
      "'Deploying…' meter that animates from 12 to 100 via a repeating randomized interval, stopping automatically at 100 and offering a 'Restart' button once done. Use for simulating a live deploy/build progress meter that completes and can be replayed.",
    file: "variants/v-meter-5.tsx",
    keywords: [
      "multi-step progress indicator",
      "simulated deploy progress",
      "restart button",
    ],
    name: "v-meter-5",
  },
  {
    category: "meter",
    description:
      "Stack of skill-level meters (TypeScript, React, Node.js, Python, Go) each with a label, value, and a thinner (h-1.5) track. Use for a skills/proficiency meter list.",
    file: "variants/v-meter-6.tsx",
    keywords: ["skills meter", "proficiency list", "stacked meters"],
    name: "v-meter-6",
  },
  {
    category: "meter",
    description:
      "Live password-strength meter: typing into a password Input computes a score (length, uppercase, digit, symbol) that drives both the meter's value and a color-coded indicator (red/orange/yellow/blue/green) plus a text label (Weak/Fair/Good/Strong/Very strong). Use for a password-strength meter tied directly to a password input (compare with v-field-22 and v-input-20's bar/text-only variants).",
    file: "variants/v-meter-7.tsx",
    keywords: [
      "password strength meter",
      "color coded strength",
      "live input driven meter",
    ],
    name: "v-meter-7",
  },
  {
    category: "meter",
    description:
      "API-usage-by-member meter list: each team member's usage shown as a Meter against a shared plan limit (10,000), with values formatted as 'X.Xk / 10.0k'. Use for per-user resource/quota usage dashboards.",
    file: "variants/v-meter-8.tsx",
    keywords: ["api usage by member", "quota per user", "usage dashboard"],
    name: "v-meter-8",
  },
  {
    category: "meter",
    description:
      "'Q2 Budget' breakdown: an overall spend-vs-budget Meter (thicker track) followed by per-category meters (Engineering/Marketing/Design/Operations) each with a colored dot matching its indicator color and dollar-formatted values. Use for a budget/spend breakdown combining a total meter with categorized sub-meters.",
    file: "variants/v-meter-9.tsx",
    keywords: [
      "budget breakdown",
      "spend by category",
      "color coded categories",
    ],
    name: "v-meter-9",
  },
  {
    category: "meter",
    description:
      "Score-card meter: a large centered score number ('72/100') with a computed letter grade (A–F, color-coded), a rounded pill-style Meter track/indicator matching the grade color, and 0/100 range labels flanking the value. Use for a test/quiz/health-score card combining a big number, letter grade, and a range-labeled meter.",
    file: "variants/v-meter-10.tsx",
    keywords: ["score card", "letter grade meter", "range labels"],
    name: "v-meter-10",
  },
  {
    category: "meter",
    description:
      "Stack of system-resource meters (CPU, Memory, Disk) each with label and value, default indicator color throughout. Use for a basic system-monitoring resource-usage list (compare with v-meter-12's severity-colored version).",
    file: "variants/v-meter-11.tsx",
    keywords: ["resource meters", "cpu memory disk", "system monitoring"],
    name: "v-meter-11",
  },
  {
    category: "meter",
    description:
      "Stack of monitoring metrics (Error rate, Latency, Memory) whose indicator color changes based on severity thresholds (green under 50, amber 50-79, red 80+). Use for an alerting/monitoring dashboard where meter color should reflect how concerning each value is.",
    file: "variants/v-meter-12.tsx",
    keywords: [
      "color-coded by severity",
      "monitoring thresholds",
      "alert colors",
    ],
    name: "v-meter-12",
  },
  {
    category: "meter",
    description:
      "Storage-breakdown meter list (Photos/Documents/Backups) each with a leading icon in the label and a 'X / Y GB' formatted value. Use for a storage-usage-by-category breakdown with icons per category.",
    file: "variants/v-meter-13.tsx",
    keywords: ["storage breakdown with icons", "storage by category"],
    name: "v-meter-13",
  },
  {
    category: "meter",
    description:
      "'Uploading files…' card: an upload-cloud icon header, a Meter showing '3 of 5 files complete' as the label with a live percentage value. Use for a file-upload-progress card widget.",
    file: "variants/v-meter-14.tsx",
    keywords: ["upload progress card", "file upload meter"],
    name: "v-meter-14",
  },
  {
    category: "meter",
    description:
      "'Profile strength' card: a Meter showing completed/total onboarding steps (e.g. '3/5') plus a checklist below listing each step with a colored dot (green=done, muted=pending) and strikethrough styling for completed items. Use for an account/profile-completeness widget combining a meter with a task checklist.",
    file: "variants/v-meter-15.tsx",
    keywords: [
      "profile strength checklist",
      "onboarding completeness",
      "completed steps list",
    ],
    name: "v-meter-15",
  },

  // --- number-field ---
  {
    category: "number field",
    description:
      "Baseline NumberField: decrement/input/increment stepper starting at 0. Use as the default numeric stepper input.",
    file: "variants/v-number-field-1.tsx",
    keywords: ["default stepper", "numeric stepper"],
    name: "v-number-field-1",
  },
  {
    category: "number field",
    description:
      "Two NumberFields side by side comparing `sm` and `lg` sizes. Use as a size reference for the stepper input.",
    file: "variants/v-number-field-2.tsx",
    keywords: ["sizes", "small large stepper"],
    name: "v-number-field-2",
  },
  {
    category: "number field",
    description:
      "NumberField rendered fully `disabled` with a preset value (42). Use to show a disabled/locked numeric stepper.",
    file: "variants/v-number-field-3.tsx",
    keywords: ["disabled stepper"],
    name: "v-number-field-3",
  },
  {
    category: "number field",
    description:
      "NumberField paired with an external Label ('Quantity') above it via matching id. Use for a labeled numeric stepper (not wrapped in Field).",
    file: "variants/v-number-field-4.tsx",
    keywords: ["with external label", "labeled stepper"],
    name: "v-number-field-4",
  },
  {
    category: "number field",
    description:
      "NumberField with a NumberFieldScrubArea label ('Quantity') enabling click-and-drag scrubbing to change the value, in addition to the stepper buttons. Use when users should be able to drag horizontally to adjust the number (common in design tools).",
    file: "variants/v-number-field-5.tsx",
    keywords: ["with scrub", "drag to change value"],
    name: "v-number-field-5",
  },
  {
    category: "number field",
    description:
      "NumberField constrained to a 0–10 range (`min`/`max`) starting at 5. Use for bounded numeric inputs where the stepper should clamp at both ends.",
    file: "variants/v-number-field-6.tsx",
    keywords: ["with range", "min max bounded stepper"],
    name: "v-number-field-6",
  },
  {
    category: "number field",
    description:
      "NumberField with `format={{ style: 'currency', currency: 'USD' }}` so the displayed value renders as formatted USD currency. Use for monetary stepper inputs needing native currency formatting.",
    file: "variants/v-number-field-7.tsx",
    keywords: ["with formatted value", "currency stepper"],
    name: "v-number-field-7",
  },
  {
    category: "number field",
    description:
      "Two NumberFields with scrub areas demonstrating different `step` increments (10 and 0.1). Use as a reference for configuring the stepper's increment/decrement granularity.",
    file: "variants/v-number-field-8.tsx",
    keywords: ["with step", "custom increment"],
    name: "v-number-field-8",
  },
  {
    category: "number field",
    description:
      "NumberField (1–100, scrub area) integrated into a Field + Form with Zod schema validation, submitted via FormData with a loading Button and result alert. Use as the pattern for a validated numeric-quantity form field.",
    file: "variants/v-number-field-9.tsx",
    keywords: ["form integration", "zod validation stepper"],
    name: "v-number-field-9",
  },
  {
    category: "number field",
    description:
      "'Font size (px)' NumberField (controlled, 8–48, scrub area) with a live preview paragraph below that renders text at the currently selected font size. Use for a live-preview numeric control (e.g. typography/design settings).",
    file: "variants/v-number-field-10.tsx",
    keywords: [
      "percentage with scrub",
      "live preview stepper",
      "font size control",
    ],
    name: "v-number-field-10",
  },
  {
    category: "number field",
    description:
      "'Opacity' NumberField formatted as a percentage (`format={{style:'percent'}}`), bounded 0–1 with a 0.05 step and scrub area. Use for opacity/percentage-based numeric controls with a scrub-and-percent display.",
    file: "variants/v-number-field-11.tsx",
    keywords: ["percentage stepper", "opacity control", "percent format"],
    name: "v-number-field-11",
  },
  {
    category: "number field",
    description:
      "Shopping-cart quantity row: a product thumbnail, name, and price on the left, with a compact NumberField (1–99, narrow centered input) as the quantity stepper on the right. Use for cart/checkout line-item quantity controls.",
    file: "variants/v-number-field-12.tsx",
    keywords: ["shopping cart quantity row", "product line item stepper"],
    name: "v-number-field-12",
  },
  {
    category: "number field",
    description:
      "Typography-settings panel: three aligned NumberFields (Font size px, Line height rem, Letter spacing em) each with a scrub area, label, and unit suffix in a consistent row layout. Use for a design/typography settings panel with multiple related numeric controls.",
    file: "variants/v-number-field-13.tsx",
    keywords: ["typography settings", "font size line height letter spacing"],
    name: "v-number-field-13",
  },
  {
    category: "number field",
    description:
      "Min/Max budget-range pair: two currency-formatted NumberFields (Min defaulting to $100, Max to $1000, step 50) labeled and separated by a dash. Use for a numeric min/max range filter (e.g. price range) built from two NumberFields rather than a dual slider.",
    file: "variants/v-number-field-14.tsx",
    keywords: ["min max budget range", "price range steppers"],
    name: "v-number-field-14",
  },
  {
    category: "number field",
    description:
      "Controlled 'Volume' NumberField (scrub area) with an adjacent reset icon-Button that restores the value to its default (50). Use for a numeric control that needs an explicit reset-to-default action.",
    file: "variants/v-number-field-15.tsx",
    keywords: [
      "controlled with reset",
      "volume control",
      "reset to default button",
    ],
    name: "v-number-field-15",
  },

  // --- otp-field ---
  {
    category: "input otp",
    description:
      "Baseline OTPField: 6 individual input slots for a one-time password. Use as the default OTP/verification-code input.",
    file: "variants/v-otp-field-1.tsx",
    keywords: ["default otp", "verification code slots"],
    name: "v-otp-field-1",
  },
  {
    category: "input otp",
    description:
      "OTPField with 4 slots rendered at `size='lg'`. Use as a large-size reference for shorter OTP codes.",
    file: "variants/v-otp-field-2.tsx",
    keywords: ["large size otp", "4 digit code"],
    name: "v-otp-field-2",
  },
  {
    category: "input otp",
    description:
      "6-slot OTPField split into two groups of 3 with an OTPFieldSeparator between them. Use for OTP codes that read better visually grouped (e.g. XXX-XXX).",
    file: "variants/v-otp-field-3.tsx",
    keywords: ["with separator", "grouped otp slots"],
    name: "v-otp-field-3",
  },
  {
    category: "input otp",
    description:
      "4-slot OTPField wrapped in a Field with a 'Verification code' label and a description naming the delivery channel (email). Use for a labeled OTP field with explanatory helper text.",
    file: "variants/v-otp-field-4.tsx",
    keywords: ["with label", "labeled otp field"],
    name: "v-otp-field-4",
  },
  {
    category: "input otp",
    description:
      "'Tier code' OTPField using `validationType='none'` with custom sanitization feedback: entering unsupported characters triggers a brief invalid-pulse highlight on the focused slot and an sr-only live-region status message. Use as a reference for custom input sanitization/invalid-character handling beyond the built-in validation types.",
    file: "variants/v-otp-field-5.tsx",
    keywords: [
      "custom sanitization",
      "invalid character feedback",
      "aria live status",
    ],
    name: "v-otp-field-5",
  },
  {
    category: "input otp",
    description:
      "Controlled OTPField that auto-validates against a hardcoded correct code ('123456') as soon as all 6 digits are entered, showing either a 'Code verified' description, an error state, or a hint to enter the test code. Use for an OTP field with automatic full-code validation feedback (no separate submit step).",
    file: "variants/v-otp-field-6.tsx",
    keywords: [
      "auto validation",
      "instant code check",
      "otp verified feedback",
    ],
    name: "v-otp-field-6",
  },
  {
    category: "input otp",
    description:
      "'Recovery code' OTPField using `validationType='alphanumeric'` to accept both letters and numbers, with a description showing an example backup-code format. Use for backup/recovery codes that mix letters and digits rather than digits-only OTPs.",
    file: "variants/v-otp-field-7.tsx",
    keywords: ["alphanumeric otp", "recovery backup code"],
    name: "v-otp-field-7",
  },
  {
    category: "input otp",
    description:
      "OTPField where each slot shows a bullet ('•') placeholder hint that disappears only when that specific slot is focused. Use when empty OTP slots should show a placeholder character rather than being blank.",
    file: "variants/v-otp-field-8.tsx",
    keywords: ["placeholder hints", "bullet placeholder per slot"],
    name: "v-otp-field-8",
  },
  {
    category: "input otp",
    description:
      "'Access code' OTPField with the `mask` prop enabled so entered digits are obscured (like a password) rather than shown in plain text. Use for sensitive codes that shouldn't be visible on shared screens.",
    file: "variants/v-otp-field-9.tsx",
    keywords: ["masked entry", "obscured otp", "hidden digits"],
    name: "v-otp-field-9",
  },
  {
    category: "input otp",
    description:
      "4-digit masked PIN entry with a 'Confirm' button: entering the correct PIN ('1234') shows a checkmark 'PIN accepted' success screen with a Reset button, an incorrect PIN shows an inline error and clears the field. Use for a PIN-entry-and-confirm flow (e.g. app lock screen) rather than a continuously-validating OTP.",
    file: "variants/v-otp-field-10.tsx",
    keywords: ["pin entry confirm", "masked pin", "success state otp"],
    name: "v-otp-field-10",
  },
  {
    category: "input otp",
    description:
      "'Check your email' verification card: a mail icon, heading, description naming the recipient email, a 6-slot OTPField, and a 'Resend code' text-button below. Use for an email-verification card combining context copy with the OTP input.",
    file: "variants/v-otp-field-11.tsx",
    keywords: ["email verification card", "resend code link"],
    name: "v-otp-field-11",
  },
  {
    category: "input otp",
    description:
      "'Authenticator app' 2FA card: a smartphone icon, heading/description instructing the user to enter the code from their authenticator app, a 6-slot numeric OTPField, and a full-width 'Verify' button. Use for TOTP/authenticator-app-based 2FA verification cards.",
    file: "variants/v-otp-field-12.tsx",
    keywords: ["2fa authenticator app", "totp verification", "verify button"],
    name: "v-otp-field-12",
  },
  {
    category: "input otp",
    description:
      "8-character alphanumeric 'Invite code' OTPField split into two groups of 4 with a separator, formatted as XXXX-XXXX per the description. Use for longer alphanumeric invite/redemption codes needing grouped display.",
    file: "variants/v-otp-field-13.tsx",
    keywords: ["8-char invite code", "alphanumeric grouped code"],
    name: "v-otp-field-13",
  },
  {
    category: "input otp",
    description:
      "Controlled OTPField that swaps to a green checkmark 'Identity verified' message once the correct 6-digit code ('246810') is entered, otherwise shows an error or hint describing the test code. Use for an OTP field whose success state replaces the input entirely with a confirmation message (compare with v-otp-field-6's inline-description-only success state).",
    file: "variants/v-otp-field-14.tsx",
    keywords: [
      "success state replaces input",
      "identity verified",
      "completion swap",
    ],
    name: "v-otp-field-14",
  },
  {
    category: "input otp",
    description:
      "OTPField with a live 30-second resend countdown below it ('Resend code in Ns'), which becomes a clickable 'Resend code' button once the timer reaches zero (and can be restarted). Use for OTP/verification fields needing a resend-cooldown timer.",
    file: "variants/v-otp-field-15.tsx",
    keywords: ["resend countdown timer", "cooldown resend button"],
    name: "v-otp-field-15",
  },

  // --- pagination ---
  {
    category: "pagination",
    description:
      "Baseline pagination: Previous/Next links, numbered pages (1, active 2, 3), and an ellipsis for truncated pages. Use as the default numbered-page pagination control.",
    file: "variants/v-pagination-1.tsx",
    keywords: ["default pagination", "numbered pages with ellipsis"],
    name: "v-pagination-1",
  },
  {
    category: "pagination",
    description:
      "Numbered pagination using icon-only chevron-left/right PaginationLinks instead of the text 'Previous'/'Next' components. Use when prev/next controls should be compact icon buttons rather than labeled links.",
    file: "variants/v-pagination-2.tsx",
    keywords: ["without labels", "icon only prev next"],
    name: "v-pagination-2",
  },
  {
    category: "pagination",
    description:
      "Same numbered pagination as v-pagination-1 but with an explicit hover-border style applied to inactive page links. Use as a reference for a subtle hover-border affordance on pagination links.",
    file: "variants/v-pagination-3.tsx",
    keywords: ["with hover effect", "hover border pagination"],
    name: "v-pagination-3",
  },
  {
    category: "pagination",
    description:
      "Numbered pagination where every link (Previous, numbers, Next) is styled fully rounded (`rounded-full`) instead of the default square/rounded-md shape. Use for a pill-style circular pagination control.",
    file: "variants/v-pagination-4.tsx",
    keywords: ["with circle buttons", "rounded pagination"],
    name: "v-pagination-4",
  },
  {
    category: "pagination",
    description:
      "Pagination with numbered links plus ellipsis on the left, and a 'Go to page' numeric Input (bounded 1-10) on the right of the same row. Use when users should be able to jump directly to a page number via a text input alongside the standard controls.",
    file: "variants/v-pagination-5.tsx",
    keywords: ["go-to-page input", "jump to page"],
    name: "v-pagination-5",
  },
  {
    category: "pagination",
    description:
      "Pagination embedded inside a Card: circular prev/next icon buttons, active-page 1 highlighted with a solid primary background, an ellipsis, and a trailing block of pages (10, 11, 12). Use for a card-wrapped pagination bar with a highlighted current page and a jump to distant pages.",
    file: "variants/v-pagination-6.tsx",
    keywords: ["numbered pagination in card", "card wrapped pagination"],
    name: "v-pagination-6",
  },
  {
    category: "pagination",
    description:
      "Simple two-button pagination: 'Previous' (leading arrow) and 'Next' (trailing arrow) links spaced apart with `justify-between`, no page numbers. Use for a minimal prev/next-only pagination bar (e.g. blog post navigation).",
    file: "variants/v-pagination-7.tsx",
    keywords: ["with arrows buttons", "prev next only"],
    name: "v-pagination-7",
  },
  {
    category: "pagination",
    description:
      "Pagination with icon-only prev/next buttons and a centered 'Page 1 of 10' text label between them (no individual page number links). Use for a compact pagination bar showing just current/total page count in the middle.",
    file: "variants/v-pagination-8.tsx",
    keywords: ["with page info on center", "page x of y centered"],
    name: "v-pagination-8",
  },
  {
    category: "pagination",
    description:
      "Pagination with a 'Page 1 of 10' text label on the left and grouped Previous/Next links on the right. Use when the page-count text should be left-aligned rather than centered between the nav controls.",
    file: "variants/v-pagination-9.tsx",
    keywords: ["with page info on left", "left aligned page count"],
    name: "v-pagination-9",
  },
  {
    category: "pagination",
    description:
      "Pagination rendered as one continuous bordered pill (no gaps between items, internal dividers) with icon-only prev/next and 4 numbered pages plus an ellipsis, active page highlighted with a muted background. Use for a segmented/joined pagination control styled like a single bordered strip.",
    file: "variants/v-pagination-10.tsx",
    keywords: ["with outline style buttons", "joined segmented pagination"],
    name: "v-pagination-10",
  },
  {
    category: "pagination",
    description:
      "Pagination combining a 'Rows per page' native select (10/25/50/100) on the left with a '1-25 of 100' count and first/prev/next/last icon buttons on the right. Use for a data-table-style pagination footer needing a page-size selector alongside navigation.",
    file: "variants/v-pagination-11.tsx",
    keywords: [
      "page select dropdown",
      "first last navigation",
      "rows per page",
    ],
    name: "v-pagination-11",
  },
  {
    category: "pagination",
    description:
      "Pagination with first/prev/next/last icon buttons flanking a native 'Page N' select dropdown (1 through 10) in the middle instead of individual numbered links. Use when jumping to any page should be done via a select dropdown rather than tapping numbered links.",
    file: "variants/v-pagination-12.tsx",
    keywords: [
      "numbered pagination with go-to-page input",
      "page select dropdown",
    ],
    name: "v-pagination-12",
  },
  {
    category: "pagination",
    description:
      "Pagination with numbered links (1-4 plus ellipsis) and prev/next icon buttons on the left, and a 'Go to page' numeric Input on the right of the same row. Use as a variant combining numbered links with a direct page-jump input (compare with v-pagination-5's narrower input).",
    file: "variants/v-pagination-13.tsx",
    keywords: ["numbered pages with go to input", "jump to page number"],
    name: "v-pagination-13",
  },
  {
    category: "pagination",
    description:
      "Full-featured pagination row: 'Page 1 of 10' text on the left, numbered links with prev/next and ellipsis in the middle, and a page-size select (10/20/50/100 per page) on the right — combining all three common pagination elements in one bar. Use for the most complete data-table pagination footer (page info + numbered nav + page-size select).",
    file: "variants/v-pagination-14.tsx",
    keywords: [
      "page info numbered pages ellipsis per-page select",
      "complete pagination bar",
    ],
    name: "v-pagination-14",
  },
  {
    category: "pagination",
    description:
      "Compact pill pagination: prev/next icon buttons flanking a '3 of 12' text label inside one continuous rounded-full bordered strip. Use for a minimal space-constrained pagination indicator (e.g. image carousels, mobile UIs).",
    file: "variants/v-pagination-16.tsx",
    keywords: ["mini pill", "compact pagination indicator"],
    name: "v-pagination-16",
  },
  {
    category: "pagination",
    description:
      "'Newer posts' / 'Older posts' text links with directional arrow icons, no page numbers. Use for blog/article cursor-based navigation between adjacent posts rather than numbered pages.",
    file: "variants/v-pagination-17.tsx",
    keywords: ["older newer cursor navigation", "blog post navigation"],
    name: "v-pagination-17",
  },
  {
    category: "pagination",
    description:
      "Controlled numbered pagination (20 total pages) with a smart sliding window algorithm showing first/last page plus an ellipsis and a window of pages around the current one, updating on click; prev/next disable at the boundaries. Use as the reference implementation for real client-side controlled pagination with intelligent ellipsis placement.",
    file: "variants/v-pagination-18.tsx",
    keywords: [
      "controlled with smart ellipsis",
      "sliding window pagination",
      "client side state",
    ],
    name: "v-pagination-18",
  },
  {
    category: "pagination",
    description:
      "Pagination bar with a 'Showing 41-60 of 230 results' summary on the left and a compact '3 / 12' page indicator with prev/next icon buttons on the right. Use for a results-summary-plus-compact-nav pagination footer (e.g. search results, admin tables).",
    file: "variants/v-pagination-19.tsx",
    keywords: ["results summary with compact nav", "showing x of y results"],
    name: "v-pagination-19",
  },
  {
    category: "pagination",
    description:
      "Numbered pagination rendered dimmed and non-interactive (`pointer-events-none opacity-40`) with a centered spinning loader icon overlaid on top. Use to show a pagination control's loading/disabled state while new page results are being fetched.",
    file: "variants/v-pagination-20.tsx",
    keywords: ["loading disabled state", "pagination loading overlay"],
    name: "v-pagination-20",
  },

  // --- popover ---
  {
    category: "popover",
    description:
      "Baseline feedback popover: title/description header and a Form with a Textarea and 'Send feedback' submit button. Use as the default popover pattern for a small feedback/contact form triggered from a button.",
    file: "variants/v-popover-1.tsx",
    keywords: ["feedback form popover", "default popover"],
    name: "v-popover-1",
  },
  {
    category: "popover",
    description:
      "Notifications popover with an explicit PopoverClose (X) icon button in the top-right corner in addition to a full 'Close' button at the bottom. Use when a popover needs both a corner dismiss icon and an explicit close action.",
    file: "variants/v-popover-2.tsx",
    keywords: ["with close button", "corner dismiss icon"],
    name: "v-popover-2",
  },
  {
    category: "popover",
    description:
      "Password-field info icon-button whose Popover is styled `tooltipStyle` and opens on hover (`openOnHover`), showing 'Min. 8 characters'. Use for a hover-triggered tooltip-like popover attached to a form field (identical pattern to v-input-group-6).",
    file: "variants/v-popover-3.tsx",
    keywords: ["tooltip style popover", "hover triggered", "password hint"],
    name: "v-popover-3",
  },
  {
    category: "popover",
    description:
      "Two icon-button triggers (Notifications bell, Profile user) sharing a single Popover instance via `PopoverCreateHandle`/`handle`/`payload`, so only one popover element renders its content dynamically based on which trigger was clicked. Use as an advanced pattern for multiple triggers sharing one popover instance rather than rendering a separate Popover per trigger.",
    file: "variants/v-popover-4.tsx",
    keywords: ["shared popover multiple triggers", "popover handle payload"],
    name: "v-popover-4",
  },
  {
    category: "popover",
    description:
      "Grid of 6 popover triggers demonstrating every `side` placement option (inline-start, left, top, bottom, right, inline-end). Use as a reference for popover placement/positioning options.",
    file: "variants/v-popover-5.tsx",
    keywords: ["placement", "side positioning reference"],
    name: "v-popover-5",
  },
  {
    category: "popover",
    description:
      "User-profile-card popover: trigger is a button showing avatar+name+handle; the popup shows a larger avatar, a 'Follow' button, name/handle, bio, and follower/following counts. Use for a social profile-preview card revealed on hover/click of a user chip.",
    file: "variants/v-popover-6.tsx",
    keywords: ["user profile card", "social profile preview", "follow button"],
    name: "v-popover-6",
  },
  {
    category: "popover",
    description:
      "'Last deployed' timestamp popover: trigger is a dashed-underlined relative-time text ('2 hours ago') that live-updates; popup shows a table with UTC and local time rows (date + time), both ticking live via a 1-second interval. Use for timestamp/tooltip-detail popovers that show absolute time on demand for a relative-time display.",
    file: "variants/v-popover-7.tsx",
    keywords: [
      "timestamp detail",
      "relative time popover",
      "utc local time table",
    ],
    name: "v-popover-7",
  },
  {
    category: "popover",
    description:
      "'Quick Settings' popover: a settings icon-button trigger opening a panel with Dark Mode and Notifications Switches and a Volume Slider with live percentage. Use for a compact quick-settings panel triggered from a toolbar icon.",
    file: "variants/v-popover-8.tsx",
    keywords: ["quick settings panel", "switches and slider popover"],
    name: "v-popover-8",
  },
  {
    category: "popover",
    description:
      "'Feature Tour' popover: a multi-step onboarding tour (4 steps: Invite Team, Create Project, Connect Integrations, Set Up Notifications) with step counter and Prev/Next icon buttons inside one popover, advancing through content without closing. Use for an in-app product-tour/walkthrough popover.",
    file: "variants/v-popover-9.tsx",
    keywords: ["feature tour", "onboarding walkthrough", "multi step popover"],
    name: "v-popover-9",
  },
  {
    category: "popover",
    description:
      "'Share this page' popover: a copyable URL row with copy-to-clipboard feedback, a 'Share via' list of channel buttons (Email, Direct Message, 'Publish to Web' with a Pro badge), and a footer noting link expiry. Use for a share-dialog-style popover with copy link and channel options.",
    file: "variants/v-popover-10.tsx",
    keywords: ["share link popover", "share via channels", "copy link"],
    name: "v-popover-10",
  },
  {
    category: "popover",
    description:
      "'Accent Color' popover: trigger shows the currently selected color as a small dot; popup shows a 5-column grid of color swatch buttons with a checkmark on the selected one and a 'Selected: X' footer line. Use for a theme/accent-color picker popover.",
    file: "variants/v-popover-11.tsx",
    keywords: ["accent color picker", "color swatch grid"],
    name: "v-popover-11",
  },
  {
    category: "popover",
    description:
      "'Keyboard Shortcuts' reference popover grouped into Navigation and Actions sections, each shortcut showing a description and Kbd key combo, with a footer hint to reopen via ⌘/. Use for an in-app keyboard-shortcuts reference popover.",
    file: "variants/v-popover-12.tsx",
    keywords: ["keyboard shortcuts popover", "shortcut reference panel"],
    name: "v-popover-12",
  },
  {
    category: "popover",
    description:
      "'Filter' popover with a live active-filter-count Badge on the trigger: checkbox groups for Status and Type filters, plus 'Clear all'/'Apply' footer buttons. Use for a data-table/list filter panel triggered from a button with a visible active-filter count.",
    file: "variants/v-popover-13.tsx",
    keywords: ["filter panel popover", "active filter count badge"],
    name: "v-popover-13",
  },
  {
    category: "popover",
    description:
      "'Set a Reminder' popover: a list of quick reminder-time options (30 min, 1 hour, tomorrow morning, next week) each selectable (highlighted when active), plus a 'Pick a custom date & time' link at the bottom and a count badge on the trigger once one is chosen. Use for a reminder/snooze-time picker popover.",
    file: "variants/v-popover-14.tsx",
    keywords: ["set a reminder", "quick time options", "snooze picker"],
    name: "v-popover-14",
  },
  {
    category: "popover",
    description:
      "'System Status' popover: a pulsing status-dot trigger reflecting overall health, popup lists individual services with per-service status dot, latency, and status label, plus an overall status Badge and 'last checked' footer. Use for a live system-status/uptime popover widget.",
    file: "variants/v-popover-15.tsx",
    keywords: ["system status popover", "service health list", "uptime widget"],
    name: "v-popover-15",
  },
  {
    category: "popover",
    description:
      "Emoji-picker popover: an icon-button trigger opens a 5-column grid of emoji buttons; selecting one closes the grid interaction and shows the chosen emoji plus a count pill next to the trigger. Use for a reaction/emoji picker (e.g. reacting to a message or post).",
    file: "variants/v-popover-16.tsx",
    keywords: ["emoji picker", "reaction picker popover"],
    name: "v-popover-16",
  },
  {
    category: "popover",
    description:
      "'Delete item' confirmation popover: warning text plus Cancel(PopoverClose)/destructive 'Delete' buttons; confirming replaces the whole trigger area with an 'Item deleted.' message. Use as a lightweight, non-modal alternative to AlertDialog for destructive-action confirmation.",
    file: "variants/v-popover-17.tsx",
    keywords: ["confirmation delete popover", "non-modal delete confirm"],
    name: "v-popover-17",
  },
  {
    category: "popover",
    description:
      "Inline tag editor: existing tags render as removable Badge pills, and a '+' icon-button opens a popover with a text Input (Enter to add) plus a short list of suggested tags not already applied. Use for an inline tag/label editor pattern (e.g. tagging an issue or document).",
    file: "variants/v-popover-18.tsx",
    keywords: ["inline tag editor", "add tag popover", "tag suggestions"],
    name: "v-popover-18",
  },
  {
    category: "popover",
    description:
      "Notification-bell popover with an unread-count badge overlaid on the trigger icon: header with 'Mark all read' action, a list of notifications each clickable to mark as individually read (dimmed once read). Use for a notification-center popover with per-item and bulk read-state management.",
    file: "variants/v-popover-19.tsx",
    keywords: ["notification panel", "unread badge", "mark as read"],
    name: "v-popover-19",
  },
  {
    category: "popover",
    description:
      "Inline text-edit popover: a small pencil icon-button next to a displayed team name opens a popover with an Input pre-filled with the current value (reset to current value each time it opens) and Cancel/Save buttons that close the popover via PopoverClose. Use for a compact 'click pencil to rename inline' editing pattern.",
    file: "variants/v-popover-20.tsx",
    keywords: ["inline text edit", "rename popover", "edit in place"],
    name: "v-popover-20",
  },

  // --- preview-card ---
  {
    category: "preview card",
    description:
      "Baseline PreviewCard: a ghost-button trigger ('cnippet.dev/ui') that reveals a hover/focus popup card with a site name, description, and language/star/fork stats. Use as the default hover-preview card for a link (e.g. GitHub-style repo hover card).",
    file: "variants/v-preview-card-1.tsx",
    keywords: ["default preview card", "link hover card"],
    name: "v-preview-card-1",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a venue mention: underlined trigger text within a sentence reveals a popup with an image placeholder, venue name/type, and address with a map-pin icon. Use for mentioning a place/venue inline in prose with a rich hover preview.",
    file: "variants/v-preview-card-2.tsx",
    keywords: ["venue mention", "location preview card", "inline text trigger"],
    name: "v-preview-card-2",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for an npm package mention ('@base-ui/react'): reveals a popup with package icon, name, description, star count, version, and license. Use for referencing an npm/package name in documentation with a rich preview (compare with v-preview-card-14's download-stats variant).",
    file: "variants/v-preview-card-3.tsx",
    keywords: [
      "npm package preview",
      "package mention",
      "install instructions",
    ],
    name: "v-preview-card-3",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for an event mention (dashed-underline trigger): reveals a popup with event name, description, date range, and expected attendee count. Use for mentioning a conference/event inline with a rich preview of its details.",
    file: "variants/v-preview-card-4.tsx",
    keywords: ["event preview card", "conference mention"],
    name: "v-preview-card-4",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a company/investor mention ('Acme Ventures'): reveals a popup with a building icon, company name, funding stage, description, and portfolio-company count. Use for mentioning an investor/company inline with a rich business-profile preview.",
    file: "variants/v-preview-card-5.tsx",
    keywords: ["company mention preview", "investor profile card"],
    name: "v-preview-card-5",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a GitHub repo mention ('GitHub'): reveals a popup with repo name, description, language/star/fork stats, and a 'View repository' button. Use for referencing a GitHub repository inline with a rich preview and a direct action button (compare with v-preview-card-1's simpler stats-only version).",
    file: "variants/v-preview-card-6.tsx",
    keywords: [
      "github repository preview",
      "issue style preview",
      "view repository button",
    ],
    name: "v-preview-card-6",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a video mention: reveals a popup with a video-thumbnail placeholder (play icon overlay), title, and duration/event metadata. Use for referencing a talk/video recording inline with a rich thumbnail preview.",
    file: "variants/v-preview-card-7.tsx",
    keywords: ["video preview card", "talk recording mention"],
    name: "v-preview-card-7",
  },
  {
    category: "preview card",
    description:
      "Row of hashtag-pill PreviewCard triggers (#design-systems, #tailwindcss, etc.), each revealing a popup with the tag name and randomized post/follower counts. Use for a blog/forum tag list where each tag shows a quick stats preview on hover.",
    file: "variants/v-preview-card-8.tsx",
    keywords: ["hashtag preview", "tag stats popup", "multiple tag triggers"],
    name: "v-preview-card-8",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a product recommendation ('Arc Flow Pro Headphones'): reveals a popup with a product-image placeholder, name, price, star rating with review count, and an 'Add to cart' button. Use for recommending a product inline in prose with a rich shopping preview and purchase action.",
    file: "variants/v-preview-card-9.tsx",
    keywords: ["product card", "shopping preview", "add to cart button"],
    name: "v-preview-card-9",
  },
  {
    category: "preview card",
    description:
      "'References' list of link PreviewCards, each trigger showing a link icon, truncated URL label, and external-link icon; the popup shows the URL and a short description of what the link is. Use for a documentation/citation reference list where each external link gets a hover preview of its purpose.",
    file: "variants/v-preview-card-10.tsx",
    keywords: [
      "reference links list",
      "citation preview",
      "external link hover",
    ],
    name: "v-preview-card-10",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a person mention (dashed-underline '@sarah_designs'): reveals a popup with an avatar placeholder, name/handle, bio, and follower/following counts. Use for a user-mention-profile card (compare with v-avatar-*/v-popover-6's similar profile-card patterns, but built on PreviewCard for hover-based reveal).",
    file: "variants/v-preview-card-11.tsx",
    keywords: ["user mention profile card", "person hover preview"],
    name: "v-preview-card-11",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a blog-post mention: reveals a popup with an image placeholder, article title, a 3-line-clamped excerpt, and estimated read time. Use for an article/blog-post inline mention with a rich content preview.",
    file: "variants/v-preview-card-12.tsx",
    keywords: ["article blog post preview", "read time", "excerpt preview"],
    name: "v-preview-card-12",
  },
  {
    category: "preview card",
    description:
      "Inline-text PreviewCard for a product recommendation ('Pro Wireless Headphones', dashed underline): reveals a popup with an image placeholder, a 'New' Badge, star rating with review count, and price. Use as an alternate product-preview card without a direct purchase button (compare with v-preview-card-9's cart-button version).",
    file: "variants/v-preview-card-13.tsx",
    keywords: ["product card", "new badge", "star rating price"],
    name: "v-preview-card-13",
  },
  {
    category: "preview card",
    description:
      "Inline monospace PreviewCard for a GitHub issue reference ('#1842'): reveals a popup with a status icon (resolved/green), issue title, opener/age metadata, label badges (bug, accessibility, popover), and repo/label/comment counts. Use for referencing a specific GitHub issue inline with a rich status-and-metadata preview.",
    file: "variants/v-preview-card-14.tsx",
    keywords: ["github issue preview", "issue status badges", "issue metadata"],
    name: "v-preview-card-14",
  },
  {
    category: "preview card",
    description:
      "Inline monospace PreviewCard for an npm package mention ('@base-ui/react'): reveals a popup with package icon, name/version, description, weekly download count, and language dot. Use as an alternate npm-package preview emphasizing download stats (compare with v-preview-card-3's star/license-focused version).",
    file: "variants/v-preview-card-15.tsx",
    keywords: [
      "npm package preview",
      "weekly downloads",
      "package install mention",
    ],
    name: "v-preview-card-15",
  },

  // --- progress ---
  {
    category: "progress",
    description:
      "Baseline Progress: label ('Export data') with a live value on the right, track+indicator at 60%. Use as the default labeled progress bar.",
    file: "variants/v-progress-1.tsx",
    keywords: ["default progress bar", "labeled progress"],
    name: "v-progress-1",
  },
  {
    category: "progress",
    description:
      "Progress with a custom-formatted ProgressValue showing 'value / 512' (custom max) instead of a percentage. Use when the progress value should read as a raw count against a custom max rather than a percent.",
    file: "variants/v-progress-2.tsx",
    keywords: ["with formatted value", "custom max count"],
    name: "v-progress-2",
  },
  {
    category: "progress",
    description:
      "'Workspace Setup' progress bar with a dynamic status-message line beneath it that changes text based on the current percentage (Initializing → Connecting → Downloading → Finalizing → Complete), looping via a randomized interval. Use for install/setup progress bars needing contextual status messages tied to progress ranges.",
    file: "variants/v-progress-3.tsx",
    keywords: [
      "with status messages",
      "dynamic status text",
      "install progress",
    ],
    name: "v-progress-3",
  },
  {
    category: "progress",
    description:
      "Progress bar (no label) paired with a Slider below it that controls the same value live. Use as a reference/demo pairing a progress bar with a slider for manually testing progress-bar appearance at any value.",
    file: "variants/v-progress-4.tsx",
    keywords: ["with slider", "interactive progress demo"],
    name: "v-progress-4",
  },
  {
    category: "progress",
    description:
      "Multi-step setup progress: a 'Setup Progress' bar computed from completed/total steps, plus a checklist below (Account/Profile/Preferences/Review) each with a checkmark or empty-circle icon reflecting completion. Use for an onboarding/wizard progress indicator combining a bar with a step checklist.",
    file: "variants/v-progress-5.tsx",
    keywords: [
      "multi-step progress indicator",
      "step checklist",
      "onboarding progress",
    ],
    name: "v-progress-5",
  },
  {
    category: "progress",
    description:
      "Five stacked Progress bars at the same value, each with a different custom indicator color (green/yellow/fuchsia/indigo/violet) via a `data-slot` class override. Use as a color-customization reference for the progress indicator.",
    file: "variants/v-progress-6.tsx",
    keywords: ["with custom colors", "colored progress bars"],
    name: "v-progress-6",
  },
  {
    category: "progress",
    description:
      "'Skills' proficiency list: a stack of thin (h-1.5) progress bars (TypeScript, React, Node.js, PostgreSQL, Docker, Rust) each with a label and percentage. Use for a skills/proficiency meter list (equivalent pattern to v-meter-6 but built on Progress).",
    file: "variants/v-progress-7.tsx",
    keywords: ["skills meter", "proficiency list progress"],
    name: "v-progress-7",
  },
  {
    category: "progress",
    description:
      "Multi-file upload queue: each file row shows an icon, filename, a status icon (spinner/check/X), a progress bar color-coded by status (default/success/destructive), and a size + percentage/'Failed' line; uploading files animate forward via a randomized interval. Use for a file-upload manager UI tracking multiple simultaneous uploads with per-file status.",
    file: "variants/v-progress-8.tsx",
    keywords: ["multi-file upload queue", "per file status", "upload manager"],
    name: "v-progress-8",
  },
  {
    category: "progress",
    description:
      "'May Budget' breakdown Card: header shows remaining/over-budget summary and total spent, then one progress bar per category (Housing, Groceries, Transport, Dining out, Entertainment, Health) each with its own color, spent/budget values, and an 'over limit' warning line when exceeded. Use for a monthly budget-breakdown dashboard combining a header summary with per-category progress bars.",
    file: "variants/v-progress-9.tsx",
    keywords: [
      "monthly budget breakdown",
      "per category spend",
      "over budget warning",
    ],
    name: "v-progress-9",
  },
  {
    category: "progress",
    description:
      "'API Usage' Card: a current-tier Badge, a progress bar with tick-mark milestones for Free/Pro/Team plan thresholds overlaid on the track, labeled milestone values below, and a note on how many requests remain until the next tier. Use for a usage-based billing dashboard showing progress toward plan-tier limits with visual milestones.",
    file: "variants/v-progress-10.tsx",
    keywords: [
      "api usage with tier milestones",
      "plan threshold markers",
      "usage billing",
    ],
    name: "v-progress-10",
  },
  {
    category: "progress",
    description:
      "'Survey progress' bar with a custom ProgressValue showing 'N of Total' (4 of 10) instead of a percentage. Use for a survey/questionnaire progress indicator counting completed questions.",
    file: "variants/v-progress-11.tsx",
    keywords: ["survey completion counter", "n of total progress"],
    name: "v-progress-11",
  },
  {
    category: "progress",
    description:
      "'Downloading update…' progress bar with a download icon, live percentage, and a footer row showing simulated download speed ('2.4 MB/s') and estimated time remaining, animating via a randomized interval. Use for a download-progress widget with speed and ETA stats.",
    file: "variants/v-progress-12.tsx",
    keywords: ["download with speed stats", "eta remaining time"],
    name: "v-progress-12",
  },
  {
    category: "progress",
    description:
      "'Community Fund Drive' fundraiser progress bar (heart icon, red indicator) showing dollars raised vs. goal and the percentage, in a bordered card. Use for a crowdfunding/donation-goal progress widget.",
    file: "variants/v-progress-13.tsx",
    keywords: [
      "fundraiser goal tracker",
      "donation progress",
      "raised of goal",
    ],
    name: "v-progress-13",
  },
  {
    category: "progress",
    description:
      "'Reading Progress' bar: a thin, transition-less progress bar pinned above a scrollable article content area, updating live as the user scrolls the content div (tracked via a scroll event listener computing percentage). Use for an article/blog reading-progress indicator tied to scroll position.",
    file: "variants/v-progress-14.tsx",
    keywords: [
      "reading progress bar",
      "scroll tracked progress",
      "article scroll indicator",
    ],
    name: "v-progress-14",
  },
  {
    category: "progress",
    description:
      "'Build pipeline' progress: an overall bar computed from completed stages, plus a list of pipeline stages (Checkout, Install, Build, Test, Deploy) each with a status icon (done checkmark, active pulsing dot, pending clock) and elapsed time. Use for a CI/CD build-pipeline progress widget with per-stage status and timing.",
    file: "variants/v-progress-15.tsx",
    keywords: ["build pipeline stages", "ci cd progress", "stage status icons"],
    name: "v-progress-15",
  },

  // --- radio-group ---
  {
    category: "radio group",
    description:
      "Baseline RadioGroup: three plain framework options (Next.js/Vite/Astro), one pre-selected. Use as the default single-select radio group.",
    file: "variants/v-radio-group-1.tsx",
    keywords: ["default radio group"],
    name: "v-radio-group-1",
  },
  {
    category: "radio group",
    description:
      "Same three-item RadioGroup with the 'Vite' option individually `disabled`. Use when a specific radio option should be non-selectable while others remain active.",
    file: "variants/v-radio-group-2.tsx",
    keywords: ["disabled option", "mixed enabled disabled radio"],
    name: "v-radio-group-2",
  },
  {
    category: "radio group",
    description:
      "RadioGroup with each option showing a label plus a description line beneath (Free/Pro plan choice). Use for radio options needing explanatory subtext.",
    file: "variants/v-radio-group-3.tsx",
    keywords: ["with description", "plan choice radio"],
    name: "v-radio-group-3",
  },
  {
    category: "radio group",
    description:
      "RadioGroup styled as clickable bordered cards (Email/SMS notification choice) that highlight border/background when selected via `has-data-checked` variants. Use for radio options that should look like selectable cards rather than plain radio rows.",
    file: "variants/v-radio-group-4.tsx",
    keywords: ["card style radio", "selectable option cards"],
    name: "v-radio-group-4",
  },
  {
    category: "radio group",
    description:
      "RadioGroup using RadioGroupItem with per-option custom colors (Blue/Green/Yellow), each radio's border and indicator tinted to match its label. Use when radio buttons need distinct brand/status colors rather than the default single accent color.",
    file: "variants/v-radio-group-5.tsx",
    keywords: ["colored variants", "custom color per radio"],
    name: "v-radio-group-5",
  },
  {
    category: "radio group",
    description:
      "RadioGroup wrapped in a Fieldset with a legend ('Battery Level') and Field/FieldLabel rows for High/Medium/Low options. Use for a radio group with a fieldset legend and consistent Field-based row layout.",
    file: "variants/v-radio-group-6.tsx",
    keywords: ["with legend", "fieldset radio group"],
    name: "v-radio-group-6",
  },
  {
    category: "radio group",
    description:
      "Controlled RadioGroup where each option (Free/Pro) is a full Card that highlights with a tinted background when selected. Use for plan-selection radio cards where the entire card area reflects the selected state (compare with v-radio-group-4's simpler label-based cards).",
    file: "variants/v-radio-group-7.tsx",
    keywords: ["in card with description", "plan selection cards"],
    name: "v-radio-group-7",
  },
  {
    category: "radio group",
    description:
      "Controlled RadioGroup where each option (Email/Phone/Message) is a Card with a leading icon and the label on the left, radio button on the right, highlighting when selected. Use for contact-method selection cards with icons.",
    file: "variants/v-radio-group-8.tsx",
    keywords: ["in card with icons", "contact method selector"],
    name: "v-radio-group-8",
  },
  {
    category: "radio group",
    description:
      "RadioGroup rendered as a Fieldset inside a Form (Next.js/Vite/Astro), submitted via FormData with a loading Button and result alert. Use as the pattern for a required/validated single-select radio field inside a real form.",
    file: "variants/v-radio-group-9.tsx",
    keywords: ["form integration", "fieldset form radio"],
    name: "v-radio-group-9",
  },
  {
    category: "radio group",
    description:
      "Pricing-plan RadioGroup rendered as bordered cards (Free/Pro/Team) with price shown on the right of each row, highlighting the selected plan with a tinted border/background. Use for a subscription-plan picker combining description and price per option (horizontal-layout variant compare with v-radio-group-7).",
    file: "variants/v-radio-group-10.tsx",
    keywords: ["horizontal layout", "pricing plan radio cards"],
    name: "v-radio-group-10",
  },
  {
    category: "radio group",
    description:
      "Horizontally-wrapping RadioGroup listing framework options (React/Vue/Angular/Svelte/Solid) inline in a single wrapping row rather than stacked. Use for a compact single-row/wrapping radio selector.",
    file: "variants/v-radio-group-11.tsx",
    keywords: ["shipping options style layout", "inline wrapping radio"],
    name: "v-radio-group-11",
  },
  {
    category: "radio group",
    description:
      "'Shipping Options' RadioGroup: bordered rows for Standard/Express/Overnight, each showing label, delivery-time description, and price, highlighted when selected. Use for a shipping-method selector in checkout flows.",
    file: "variants/v-radio-group-12.tsx",
    keywords: ["shipping options", "delivery method selector"],
    name: "v-radio-group-12",
  },
  {
    category: "radio group",
    description:
      "'Theme Selector' RadioGroup: three square card options (Light/Dark/System) each with a centered icon and label, with the radio control positioned in the top-right corner of each card. Use for a visual theme/appearance picker with icon-forward cards.",
    file: "variants/v-radio-group-13.tsx",
    keywords: ["theme selector", "icon card radio", "appearance picker"],
    name: "v-radio-group-13",
  },
  {
    category: "radio group",
    description:
      "'Availability Status' RadioGroup: Online/Away/Busy/Offline options each with a colored presence dot, label, and description of who can see it. Use for a user-presence/availability-status selector.",
    file: "variants/v-radio-group-14.tsx",
    keywords: [
      "availability status",
      "presence selector",
      "online away busy offline",
    ],
    name: "v-radio-group-14",
  },
  {
    category: "radio group",
    description:
      "'Billing Frequency' RadioGroup: Monthly/Quarterly/Annually options each with a description and a 'Save X%' Badge on the discounted tiers. Use for a billing-cycle selector highlighting savings on longer commitments.",
    file: "variants/v-radio-group-15.tsx",
    keywords: [
      "billing frequency",
      "save percent badge",
      "monthly quarterly annually",
    ],
    name: "v-radio-group-15",
  },

  // --- scroll-area ---
  {
    category: "scroll area",
    description:
      "Baseline vertical ScrollArea: a fixed-height bordered box scrolling a long list of 50 version tags. Use as the default scrollable container for a long vertical list.",
    file: "variants/v-scroll-area-1.tsx",
    keywords: ["default scroll area", "vertical list scroll"],
    name: "v-scroll-area-1",
  },
  {
    category: "scroll area",
    description:
      "Same 50-tag vertical list ScrollArea but with `scrollFade` enabled, adding a visual fade gradient at the scrollable edges to hint more content. Use when a scroll area should visually indicate overflow content via edge fading.",
    file: "variants/v-scroll-area-2.tsx",
    keywords: ["scroll fade effect", "edge fade gradient"],
    name: "v-scroll-area-2",
  },
  {
    category: "scroll area",
    description:
      "Horizontal ScrollArea: a row of 20 fixed-width item cards scrolling sideways within a max-width bordered box. Use for horizontally-scrolling card/carousel-like lists (e.g. category chips, thumbnails).",
    file: "variants/v-scroll-area-3.tsx",
    keywords: ["horizontal scroll", "scrolling card row"],
    name: "v-scroll-area-3",
  },
  {
    category: "scroll area",
    description:
      "Same horizontal item-row ScrollArea as v-scroll-area-3 but with `scrollbarGutter` reserving space for the scrollbar so content doesn't shift when it appears. Use when layout stability matters and the scrollbar shouldn't overlay/shift content.",
    file: "variants/v-scroll-area-4.tsx",
    keywords: ["scrollbar gutter", "reserved scrollbar space"],
    name: "v-scroll-area-4",
  },
  {
    category: "scroll area",
    description:
      "ScrollArea containing a large 2D grid (12 columns × 20 rows of numbered cells) that scrolls both directions within a fixed-size bordered box. Use for large grid/spreadsheet-like content needing both horizontal and vertical scrolling.",
    file: "variants/v-scroll-area-5.tsx",
    keywords: ["2d grid scroll", "both direction scrolling"],
    name: "v-scroll-area-5",
  },
  {
    category: "scroll area",
    description:
      "Alphabetically-grouped contact list inside a ScrollArea: contacts bucketed by first-letter of name, each letter group with a sticky header label. Use for a contacts/address-book list with alphabetical section headers.",
    file: "variants/v-scroll-area-6.tsx",
    keywords: ["alphabetical contact list", "sticky section headers"],
    name: "v-scroll-area-6",
  },
  {
    category: "scroll area",
    description:
      "Kanban 'Backlog' column inside a ScrollArea: a scrollable stack of task cards each with a title and a color-coded status tag (To Do/In Progress/Done). Use for a single scrollable kanban column of task cards.",
    file: "variants/v-scroll-area-7.tsx",
    keywords: ["kanban backlog column", "task cards scroll"],
    name: "v-scroll-area-7",
  },
  {
    category: "scroll area",
    description:
      "Data table (country/users/plan/MRR/status columns) wrapped in a ScrollArea so wide table content scrolls horizontally within a bordered box. Use for wide tables that need horizontal scroll containment rather than overflowing the page.",
    file: "variants/v-scroll-area-8.tsx",
    keywords: ["scrollable data table", "horizontal table scroll"],
    name: "v-scroll-area-8",
  },
  {
    category: "scroll area",
    description:
      "Grouped-by-date activity timeline (Today/Yesterday/Jun 12) inside a ScrollArea, each entry with a color-coded type dot (deploy/merge/build/error/etc.), action text, and timestamp. Use for a CI/CD or audit activity feed grouped by day.",
    file: "variants/v-scroll-area-9.tsx",
    keywords: ["activity timeline by date", "ci cd activity feed"],
    name: "v-scroll-area-9",
  },
  {
    category: "scroll area",
    description:
      "Syntax-highlighted-style code snippet (a `useFetch` React hook) inside a monospace ScrollArea with a muted background. Use for displaying a scrollable code block/snippet in documentation or a code preview panel.",
    file: "variants/v-scroll-area-10.tsx",
    keywords: ["code snippet scroll", "monospace code block"],
    name: "v-scroll-area-10",
  },
  {
    category: "scroll area",
    description:
      "Chat-message feed inside a ScrollArea: each message with an avatar, sender name, timestamp, and message text, stacked vertically. Use for a scrollable chat/conversation thread (compare with v-input-group-16's composer, which would pair with this feed).",
    file: "variants/v-scroll-area-11.tsx",
    keywords: ["chat feed", "message thread scroll"],
    name: "v-scroll-area-11",
  },
  {
    category: "scroll area",
    description:
      "Notification list inside a ScrollArea: each notification with an icon, message, timestamp, and an unread-state highlight/dot for unread items, divided by borders. Use for a scrollable notification list/panel.",
    file: "variants/v-scroll-area-12.tsx",
    keywords: ["notification list scroll", "unread highlight"],
    name: "v-scroll-area-12",
  },
  {
    category: "scroll area",
    description:
      "Sidebar navigation inside a ScrollArea: sections (Workspace, Settings, Resources) each with icon-labeled nav buttons, one item highlighted as active. Use for a scrollable app sidebar navigation menu with grouped sections.",
    file: "variants/v-scroll-area-13.tsx",
    keywords: ["sidebar navigation scroll", "grouped nav sections"],
    name: "v-scroll-area-13",
  },
  {
    category: "scroll area",
    description:
      "Server/application log viewer inside a monospace ScrollArea: each line shows a timestamp, color-coded level (info/warn/error), and message. Use for a scrollable terminal-style log output panel.",
    file: "variants/v-scroll-area-14.tsx",
    keywords: [
      "activity log viewer",
      "terminal log lines",
      "info warn error levels",
    ],
    name: "v-scroll-area-14",
  },
  {
    category: "scroll area",
    description:
      "File-explorer tree inside a ScrollArea with `scrollFade`: a flat list of files/folders (Next.js project structure) each with a folder/file icon, clickable rows. Use for a scrollable flat file-browser list (compare with v-collapsible-7's expandable nested-tree version).",
    file: "variants/v-scroll-area-15.tsx",
    keywords: ["file explorer list", "flat file browser", "project structure"],
    name: "v-scroll-area-15",
  },

  // --- select ---
  {
    category: "select",
    description:
      "Baseline timezone Select: trigger + popup listing plain timezone options. Use as the default single-select dropdown.",
    file: "variants/v-select-1.tsx",
    keywords: ["default select", "timezone dropdown"],
    name: "v-select-1",
  },
  {
    category: "select",
    description:
      "Three plan Selects side by side comparing `sm`/default/`lg` trigger sizes. Use as a size reference for the Select component.",
    file: "variants/v-select-2.tsx",
    keywords: ["sizes", "small default large select"],
    name: "v-select-2",
  },
  {
    category: "select",
    description:
      "Framework Select with items grouped into labeled sections (Frontend, Backend, Mobile) via SelectGroup/SelectGroupLabel. Use for a select needing categorized option groups.",
    file: "variants/v-select-3.tsx",
    keywords: ["grouped select", "categorized options"],
    name: "v-select-3",
  },
  {
    category: "select",
    description:
      "Multi-select permissions dropdown (`multiple` prop): selecting several permissions (Read/Write/Delete/etc.) shows a comma-joined summary line below. Use for a multi-value select where chosen items don't need to render as chips, just a summary.",
    file: "variants/v-select-4.tsx",
    keywords: ["multiple selection", "permissions multi select"],
    name: "v-select-4",
  },
  {
    category: "select",
    description:
      "'Go to settings' navigation Select where each option shows an icon plus label (Profile, Notifications, Privacy, etc.). Use for a settings-navigation dropdown combining icons with labels.",
    file: "variants/v-select-5.tsx",
    keywords: ["settings navigation select", "icon labeled options"],
    name: "v-select-5",
  },
  {
    category: "select",
    description:
      "Currency Select where each option shows a symbol, name, and trailing currency code aligned to the right. Use for currency-selection dropdowns needing symbol + code metadata per option.",
    file: "variants/v-select-6.tsx",
    keywords: ["currency select", "symbol and code"],
    name: "v-select-6",
  },
  {
    category: "select",
    description:
      "Notification-frequency Select integrated into a form: labeled Field with description, submitted via a native form `onSubmit` showing a 'Saved!' button state. Use for a settings form field using a native Select rather than the Combobox/Autocomplete form patterns.",
    file: "variants/v-select-7.tsx",
    keywords: ["form integration", "settings frequency select"],
    name: "v-select-7",
  },
  {
    category: "select",
    description:
      "Plan Select with a SelectSeparator dividing available plans (Free/Pro/Team) from disabled 'coming soon'/unavailable plans (Enterprise/Custom) that show a 'Contact us' hint. Use for a select with some options disabled and visually separated from the selectable ones.",
    file: "variants/v-select-8.tsx",
    keywords: ["with disabled options", "unavailable items separated"],
    name: "v-select-8",
  },
  {
    category: "select",
    description:
      "Country Select grouped by region (North America, Europe, Asia Pacific, Latin America) with flag-emoji-prefixed country names, popup capped at max-height with internal scroll. Use for a large country-selection dropdown needing regional grouping (compare with v-select-3's simpler grouped example).",
    file: "variants/v-select-9.tsx",
    keywords: [
      "country selector with groups",
      "flag emoji options",
      "scrollable popup",
    ],
    name: "v-select-9",
  },
  {
    category: "select",
    description:
      "Theme Select paired with an external display box below showing the selected theme's name and description live. Use when the selected value's details should be echoed outside the trigger itself (compare with v-select-13/14's inline description variants).",
    file: "variants/v-select-10.tsx",
    keywords: ["controlled with external display", "selected value detail box"],
    name: "v-select-10",
  },
  {
    category: "select",
    description:
      "Role Select with active roles (Owner/Admin/Editor/Viewer) above a separator and disabled 'coming soon' roles (Guest/Contractor) below, defaulting to 'Editor'. Use for a role-assignment select distinguishing currently-available roles from planned ones (similar pattern to v-select-8, role-themed).",
    file: "variants/v-select-11.tsx",
    keywords: ["role selector", "coming soon disabled roles"],
    name: "v-select-11",
  },
  {
    category: "select",
    description:
      "Region Select grouped into Americas/Europe/Asia Pacific sections without flag emojis (plain country names). Use as an alternate grouped-region select (compare with v-select-9's flag-emoji country version).",
    file: "variants/v-select-12.tsx",
    keywords: ["region select groups", "plain grouped countries"],
    name: "v-select-12",
  },
  {
    category: "select",
    description:
      "Priority Select paired with a status line below showing the selected priority as a color-coded Badge (Critical/High=destructive, Medium=secondary, Low=outline) or 'not set'. Use for an issue/task priority picker that echoes the selection as a colored badge outside the trigger.",
    file: "variants/v-select-13.tsx",
    keywords: ["priority selector with badge", "colored priority display"],
    name: "v-select-13",
  },
  {
    category: "select",
    description:
      "Deploy-environment Select where each option shows a title plus a description line beneath it (Production/Staging/Development/Preview), defaulting to Development. Use for a deployment-target picker needing per-option explanatory subtext.",
    file: "variants/v-select-14.tsx",
    keywords: ["items with description", "deploy environment picker"],
    name: "v-select-14",
  },
  {
    category: "select",
    description:
      "'Sort by' Select where each option shows a relevant icon (sparkles for Relevance, A-Z/Z-A arrows, calendar arrows for date), defaulting to Relevance. Use for a results-sorting dropdown with icon-labeled sort options.",
    file: "variants/v-select-15.tsx",
    keywords: ["sort order with icons", "sort by dropdown"],
    name: "v-select-15",
  },

  // --- separator ---
  {
    category: "separator",
    description:
      "Baseline separator reference: a horizontal Separator dividing a title/description block from a row of nav-like items, with vertical Separators between each item in that row. Use as the default horizontal + vertical separator reference.",
    file: "variants/v-separator-1.tsx",
    keywords: ["default separator", "horizontal and vertical"],
    name: "v-separator-1",
  },
  {
    category: "separator",
    description:
      "Row of three text items (Blog, Docs, Source) divided by vertical Separators, no horizontal separator. Use for an inline nav-link list needing vertical dividers between items.",
    file: "variants/v-separator-2.tsx",
    keywords: ["vertical separator list", "inline nav dividers"],
    name: "v-separator-2",
  },
  {
    category: "separator",
    description:
      "Three label+description column groups (Settings, Account, Help) divided by taller vertical Separators. Use for a horizontal group of labeled sections needing clear vertical dividers.",
    file: "variants/v-separator-3.tsx",
    keywords: ["section dividers", "labeled column groups"],
    name: "v-separator-3",
  },
  {
    category: "separator",
    description:
      "Simple key-value rows (Item 1/2/3 with values) each divided by a horizontal Separator. Use for a definition-list-style layout needing dividers between rows.",
    file: "variants/v-separator-4.tsx",
    keywords: ["key value rows", "list item dividers"],
    name: "v-separator-4",
  },
  {
    category: "separator",
    description:
      "Horizontal Separator with centered overlaid text ('or continue with') — the classic 'divider with label' pattern used above social-login buttons. Use for a labeled divider splitting two sections of a form (e.g. auth methods).",
    file: "variants/v-separator-5.tsx",
    keywords: ["section heading with line", "or divider", "labeled separator"],
    name: "v-separator-5",
  },
  {
    category: "separator",
    description:
      "'Order Summary' receipt layout: Subtotal/Discount/Tax rows, a Separator, then a bold Total row — with a second Separator above the summary rows. Use for an order/checkout summary needing subtotal-vs-total visual separation.",
    file: "variants/v-separator-6.tsx",
    keywords: ["order summary", "receipt total separator", "checkout summary"],
    name: "v-separator-6",
  },
  {
    category: "separator",
    description:
      "Breadcrumb-style nav (Home / Products / Electronics / Headphones) using vertical Separators between links instead of chevron icons. Use as an alternate breadcrumb separator style (compare with the dedicated Breadcrumb component's icon separators).",
    file: "variants/v-separator-7.tsx",
    keywords: ["breadcrumb style separator", "nav link dividers"],
    name: "v-separator-7",
  },
  {
    category: "separator",
    description:
      "Numbered onboarding-step list (Email verified, Billing set up, Team preferences) each with a numbered circle, label, and description, separated by horizontal Separators between steps (not after the last). Use for a step-by-step onboarding checklist with dividers between steps.",
    file: "variants/v-separator-8.tsx",
    keywords: ["onboarding steps list", "numbered steps separator"],
    name: "v-separator-8",
  },
  {
    category: "separator",
    description:
      "Grouped settings-menu sections (Profile, Subscription, Support) each with an uppercase section label and clickable items, separated by a Separator between section groups (not within a group). Use for a settings/menu list with labeled groups divided by separators.",
    file: "variants/v-separator-9.tsx",
    keywords: ["settings menu sections", "grouped menu list"],
    name: "v-separator-9",
  },
  {
    category: "separator",
    description:
      "Profile card (avatar-initials, name/handle, bio, location/link) with Separators dividing the header from the bio and the bio from the footer meta row. Use for a compact profile card needing internal section dividers.",
    file: "variants/v-separator-10.tsx",
    keywords: ["profile card dividers", "bio section separator"],
    name: "v-separator-10",
  },
  {
    category: "separator",
    description:
      "Social-stats row (Followers/Following/Posts/Likes counts) divided by vertical Separators. Use for a compact inline stats bar (e.g. profile header stats).",
    file: "variants/v-separator-11.tsx",
    keywords: ["social stats bar", "profile stats row"],
    name: "v-separator-11",
  },
  {
    category: "separator",
    description:
      "Two labeled content blocks (Recent Activity, Repositories) each with a heading followed by a horizontal Separator that fills the remaining row width, then a list of items beneath. Use for section headings that need a trailing rule line rather than a full-width divider between blocks.",
    file: "variants/v-separator-12.tsx",
    keywords: ["heading with trailing line", "section title rule"],
    name: "v-separator-12",
  },
  {
    category: "separator",
    description:
      "Footer link row (Privacy, Terms, Cookies, Status, Contact) with small vertical Separators between each link, wrapping on small screens. Use for a website footer's legal/utility link row.",
    file: "variants/v-separator-13.tsx",
    keywords: ["footer links", "legal link row"],
    name: "v-separator-13",
  },
  {
    category: "separator",
    description:
      "Bordered card containing stacked settings sections (Profile, Security, Notifications), each with a title/description, separated by horizontal Separators between sections within the same card. Use for a settings-overview card with multiple stacked, divided sections.",
    file: "variants/v-separator-14.tsx",
    keywords: ["card section dividers", "settings overview card"],
    name: "v-separator-14",
  },
  {
    category: "separator",
    description:
      "Rich-text-editor toolbar: Bold/Italic/Underline icon buttons, a vertical Separator, Align left/center/right icon buttons, another vertical Separator, and an Insert-link button — grouped visually by separators. Use for a formatting toolbar needing separators between logical button clusters.",
    file: "variants/v-separator-15.tsx",
    keywords: ["toolbar with separator groups", "formatting toolbar dividers"],
    name: "v-separator-15",
  },

  // --- sheet ---
  {
    category: "sheet",
    description:
      "Baseline Sheet: 'Edit profile' form with Name/Username fields, Cancel/Save footer, sliding in from the default side. Use as the default side-panel sheet for an edit-form.",
    file: "variants/v-sheet-1.tsx",
    keywords: ["default sheet", "edit profile form"],
    name: "v-sheet-1",
  },
  {
    category: "sheet",
    description:
      "Same 'Edit profile' Sheet as v-sheet-1 but using `variant='inset'` (sheet appears slightly inset from the viewport edge with rounded corners). Use for the inset visual style of a sheet.",
    file: "variants/v-sheet-2.tsx",
    keywords: ["sheet with inset", "inset variant"],
    name: "v-sheet-2",
  },
  {
    category: "sheet",
    description:
      "Four separate Sheets opening from each side (right/left/top/bottom) with no close button, each showing placeholder Lorem ipsum text. Use as a reference for the `side` prop across all four sheet positions.",
    file: "variants/v-sheet-3.tsx",
    keywords: ["side sheets", "multiple positions reference"],
    name: "v-sheet-3",
  },
  {
    category: "sheet",
    description:
      "Sheet whose body content is wrapped in a ScrollArea (20 paragraphs) so long content scrolls within a fixed-height area between a static header and footer. Use for sheets with long form/content that needs internal scrolling rather than resizing the sheet.",
    file: "variants/v-sheet-4.tsx",
    keywords: ["scrollable content", "long content sheet"],
    name: "v-sheet-4",
  },
  {
    category: "sheet",
    description:
      "'Shopping Cart' Sheet: trigger shows an item-count Badge, panel lists cart items with quantity +/- controls (turns into a trash icon at qty 1) and an empty-cart state, footer shows subtotal and Continue-shopping/Checkout buttons. Use for an e-commerce cart drawer/sheet.",
    file: "variants/v-sheet-5.tsx",
    keywords: ["shopping cart sheet", "quantity stepper", "checkout footer"],
    name: "v-sheet-5",
  },
  {
    category: "sheet",
    description:
      "'Notifications' Sheet: trigger shows an unread-count Badge, header has a 'Mark all read' link, each notification row has an icon, title, body, time, and an unread dot; clicking a notification marks it read. Use for a notification-center sheet with per-item and bulk read-state.",
    file: "variants/v-sheet-6.tsx",
    keywords: ["notification center sheet", "mark all read", "unread badge"],
    name: "v-sheet-6",
  },
  {
    category: "sheet",
    description:
      "'Invite Team Members' Sheet: email input with Enter-to-send, a role picker (Admin/Editor/Viewer segmented buttons), a 'Send Invitation' button, and a live 'Pending (N)' list of sent invites each with avatar, email, role badge, and a remove button. Use for a team-invite sheet with an inline pending-invites list.",
    file: "variants/v-sheet-7.tsx",
    keywords: [
      "invite team members sheet",
      "pending invites list",
      "role picker",
    ],
    name: "v-sheet-7",
  },
  {
    category: "sheet",
    description:
      "'Activity Log' Sheet: a vertical timeline of events (deploy/merge/comment/invite/update) each with a user avatar, action text, color-coded type badge, target description, and timestamp, connected by a vertical line. Use for a project/team activity-log sheet with a rich event timeline.",
    file: "variants/v-sheet-8.tsx",
    keywords: ["activity log sheet", "event timeline", "type badges"],
    name: "v-sheet-8",
  },
  {
    category: "sheet",
    description:
      "Left-side navigation-menu Sheet (hamburger icon trigger, no close button): a brand header, grouped nav sections (Main, General) with icon-labeled items (one with a notification-count Badge) each closing the sheet on click via SheetClose, and a footer user-profile row with a settings button. Use for a full mobile app navigation drawer.",
    file: "variants/v-sheet-9.tsx",
    keywords: [
      "navigation menu sheet",
      "mobile nav drawer",
      "grouped nav sections",
    ],
    name: "v-sheet-9",
  },
  {
    category: "sheet",
    description:
      "'View Issue' Sheet: issue title/number header, a bordered meta table (Status/Priority/Due date/Labels each with icon and badge/value), a description block, a comment thread (avatar+name+time+body per comment), a new-comment Textarea, and a footer with an attach button plus Close/'Comment' actions. Use for a GitHub/Jira-style issue-detail sheet with comments.",
    file: "variants/v-sheet-10.tsx",
    keywords: ["issue detail sheet", "comment thread", "issue metadata table"],
    name: "v-sheet-10",
  },
  {
    category: "sheet",
    description:
      "'Export Data' Sheet: a 3-option file-format picker (CSV/JSON/TXT icon buttons), a filename input with a live `.ext` suffix reflecting the chosen format, an 'Export includes' bullet-point summary box, and Cancel/Download footer buttons. Use for a data-export configuration sheet.",
    file: "variants/v-sheet-11.tsx",
    keywords: [
      "export data panel",
      "file format picker",
      "filename with extension",
    ],
    name: "v-sheet-11",
  },
  {
    category: "sheet",
    description:
      "'View Profile' Sheet (no header, custom footer): large avatar, name/handle, role/tag badges, bio, a stats row (Repos/Followers/Stars) divided by Separators, a links list (website/socials), and Follow/Close footer buttons. Use for a user-profile-viewer sheet (compare with v-popover-6's popover version of a similar profile card).",
    file: "variants/v-sheet-12.tsx",
    keywords: ["user profile viewer sheet", "profile stats and links"],
    name: "v-sheet-12",
  },
  {
    category: "sheet",
    description:
      "'Contact Support' Sheet: a category-tag picker (Bug report/Feature request/Question/Other), Subject and Message fields; submitting swaps the panel to a 'Message sent!' confirmation with an icon. Use for a support/contact-form sheet with a post-submit confirmation state.",
    file: "variants/v-sheet-13.tsx",
    keywords: [
      "support contact form sheet",
      "category picker",
      "message sent confirmation",
    ],
    name: "v-sheet-13",
  },
  {
    category: "sheet",
    description:
      "'Keyboard Shortcuts' reference Sheet grouped into General/Editor/View sections, each shortcut showing a label and a row of key Badges, divided by Separators between sections. Use for an in-app keyboard-shortcuts reference sheet (compare with v-popover-12's popover version).",
    file: "variants/v-sheet-14.tsx",
    keywords: ["keyboard shortcuts reference sheet", "shortcut key badges"],
    name: "v-sheet-14",
  },
  {
    category: "sheet",
    description:
      "'API Keys' management Sheet: each key shown in a bordered row with label, Live/Test badge, masked key prefix, created/last-used metadata, and Rotate (spinning icon while rotating) / Revoke (delete) actions, plus a 'Create New Key' footer button. Use for an API-key management sheet with rotate/revoke actions per key.",
    file: "variants/v-sheet-15.tsx",
    keywords: [
      "api key manager sheet",
      "rotate revoke key",
      "masked key prefix",
    ],
    name: "v-sheet-15",
  },

  // --- skeleton ---
  {
    category: "skeleton",
    description:
      "Baseline user-card Skeleton: each of 3 user rows starts as a skeleton (avatar circle, name/role/follower lines, follow-button block) and swaps to the real Avatar/text/Button content after a staggered per-user delay via setTimeout. Use as the default pattern for a loading-to-loaded skeleton transition on a list of user cards.",
    file: "variants/v-skeleton-1.tsx",
    keywords: [
      "default skeleton",
      "loading to loaded transition",
      "user card skeleton",
    ],
    name: "v-skeleton-1",
  },
  {
    category: "skeleton",
    description:
      "Static skeleton-only version of the same user-card row (avatar circle, name/role/follower-count lines, follow-button block) with no loaded state or timers. Use as a pure placeholder skeleton for a user-row layout, without a loading-transition demo.",
    file: "variants/v-skeleton-2.tsx",
    keywords: ["skeleton only", "static placeholder"],
    name: "v-skeleton-2",
  },
  {
    category: "skeleton",
    description:
      "Card skeleton: CardHeader with two title-line skeletons and a CardContent with a full-width aspect-video image-placeholder skeleton. Use for a generic content-card loading placeholder (image + title lines).",
    file: "variants/v-skeleton-3.tsx",
    keywords: ["card component skeleton", "image and title placeholder"],
    name: "v-skeleton-3",
  },
  {
    category: "skeleton",
    description:
      "3-column grid of stat-card skeletons, each with a small label line and a large value line plus a caption line. Use for a dashboard stats-row loading placeholder.",
    file: "variants/v-skeleton-4.tsx",
    keywords: ["dashboard stats row skeleton", "metric card placeholders"],
    name: "v-skeleton-4",
  },
  {
    category: "skeleton",
    description:
      "List-with-actions skeleton: a header row (title + button placeholder), a separator, then 3 rows each with an avatar circle, two text lines, and a trailing action-button placeholder. Use for a settings/list page loading placeholder with per-row actions.",
    file: "variants/v-skeleton-5.tsx",
    keywords: [
      "list with actions skeleton",
      "row with action button placeholder",
    ],
    name: "v-skeleton-5",
  },
  {
    category: "skeleton",
    description:
      "Blog-article skeleton: a wide hero-image placeholder, tag-pill placeholders, title lines, an author row (avatar + two lines), and two paragraphs of body-text line placeholders. Use for a full blog/article-page loading placeholder.",
    file: "variants/v-skeleton-6.tsx",
    keywords: ["blog article skeleton", "hero image and body text placeholder"],
    name: "v-skeleton-6",
  },
  {
    category: "skeleton",
    description:
      "Data-table skeleton: a header row of column-label placeholders, 6 data rows each with an avatar+name, a pill-shaped badge placeholder, and two more column placeholders, plus a footer row with pagination-button placeholders. Use for a data-table loading placeholder matching row/column structure.",
    file: "variants/v-skeleton-7.tsx",
    keywords: ["data table skeleton", "table row column placeholders"],
    name: "v-skeleton-7",
  },
  {
    category: "skeleton",
    description:
      "Sidebar-dashboard-layout skeleton: a left sidebar column with nav-item placeholders (grouped, with a user-row footer) and a main content area with a header row, 3 stat-card placeholders, and a list of item-row placeholders. Use for a full app-shell (sidebar + main content) loading placeholder.",
    file: "variants/v-skeleton-8.tsx",
    keywords: ["sidebar dashboard layout skeleton", "app shell placeholder"],
    name: "v-skeleton-8",
  },
  {
    category: "skeleton",
    description:
      "Chat-thread skeleton: a header row (avatar + two lines), a sequence of message-bubble placeholders alternating left/right (self vs. other) with varying widths and rounded 'speech bubble' corners, and a footer composer-bar placeholder. Use for a chat/messaging thread loading placeholder.",
    file: "variants/v-skeleton-9.tsx",
    keywords: ["chat thread skeleton", "message bubble placeholders"],
    name: "v-skeleton-9",
  },
  {
    category: "skeleton",
    description:
      "Settings-page skeleton: a page header (title + action button), a row of tab-pill placeholders, and two SettingsSection blocks each with a title/description and several option rows (label lines + either a switch-shaped or button-shaped control placeholder). Use for a settings/preferences page loading placeholder with tabs and toggle rows.",
    file: "variants/v-skeleton-10.tsx",
    keywords: ["settings page skeleton", "tabs and toggle rows placeholder"],
    name: "v-skeleton-10",
  },
  {
    category: "skeleton",
    description:
      "Product-grid skeleton: a 2×2 grid of product-card placeholders, each with a square image placeholder, a title line, a 5-star rating row, and price/button placeholders. Use for an e-commerce product-listing loading placeholder.",
    file: "variants/v-skeleton-11.tsx",
    keywords: ["product grid skeleton", "star rating price placeholders"],
    name: "v-skeleton-11",
  },
  {
    category: "skeleton",
    description:
      "Form-fields skeleton: a title/description block, a 2-column grid of labeled input placeholders (some spanning both columns), a labeled textarea placeholder, and trailing Cancel/Submit button placeholders. Use for a generic form-page loading placeholder.",
    file: "variants/v-skeleton-12.tsx",
    keywords: ["form fields skeleton", "input and textarea placeholders"],
    name: "v-skeleton-12",
  },
  {
    category: "skeleton",
    description:
      "Email-inbox skeleton: a toolbar row (count + action buttons) and 6 message rows each with an avatar, sender/time line, subject line, and preview-text line of varying width, unread rows tinted. Use for an email/inbox-list loading placeholder.",
    file: "variants/v-skeleton-13.tsx",
    keywords: [
      "email inbox skeleton",
      "message list placeholder",
      "unread row tint",
    ],
    name: "v-skeleton-13",
  },
  {
    category: "skeleton",
    description:
      "Kanban-board skeleton: horizontally-scrolling columns (To Do/In Progress/Done) each with a column-header placeholder and several task-card placeholders (title/description lines, avatar-stack, and a tag-pill placeholder), plus an 'add card' button placeholder per column. Use for a kanban/project-board loading placeholder.",
    file: "variants/v-skeleton-14.tsx",
    keywords: ["kanban board skeleton", "task card placeholders", "columns"],
    name: "v-skeleton-14",
  },
  {
    category: "skeleton",
    description:
      "Profile-hero-page skeleton: a wide cover-image placeholder, an overlapping avatar-circle placeholder with an action-button placeholder, name/handle lines, a 3-line bio, a stats row (3 label+value pairs), and a 2×3 grid of media/gallery-tile placeholders. Use for a full profile-page loading placeholder with cover photo and gallery.",
    file: "variants/v-skeleton-15.tsx",
    keywords: [
      "profile hero page skeleton",
      "cover image and gallery placeholder",
    ],
    name: "v-skeleton-15",
  },

  // --- slider ---
  {
    category: "slider",
    description:
      "Baseline single-thumb Slider with a default value of 50, no label. Use as the plainest possible slider control.",
    file: "variants/v-slider-1.tsx",
    keywords: ["default slider"],
    name: "v-slider-1",
  },
  {
    category: "slider",
    description:
      "Slider with a label ('Opacity') and a live SliderValue shown on the right of the label row. Use for a labeled slider with its current value displayed inline.",
    file: "variants/v-slider-2.tsx",
    keywords: ["with label and value", "labeled slider"],
    name: "v-slider-2",
  },
  {
    category: "slider",
    description:
      "Slider rendered `disabled` at a fixed value. Use to show a disabled/locked slider state.",
    file: "variants/v-slider-3.tsx",
    keywords: ["disabled slider"],
    name: "v-slider-3",
  },
  {
    category: "slider",
    description:
      "'Storage size in GB' slider (5-35 range) with three reference labels (5 GB / 20 GB / 35 GB) evenly spaced beneath the track. Use for a bounded slider needing a few key reference-point labels rather than full tick marks.",
    file: "variants/v-slider-4.tsx",
    keywords: ["with reference labels", "storage size slider"],
    name: "v-slider-4",
  },
  {
    category: "slider",
    description:
      "Slider (0-12 range) with a full tick-mark scale beneath the track, showing every other number label to avoid crowding. Use for a slider needing a dense tick-mark ruler with alternating labels.",
    file: "variants/v-slider-5.tsx",
    keywords: ["with tick marks", "ruler scale slider"],
    name: "v-slider-5",
  },
  {
    category: "slider",
    description:
      "'Volume' slider with a floating tooltip-style bubble that follows the thumb horizontally, showing the current percentage value with a small triangle pointer. Use for a slider needing a dynamic floating value indicator above the thumb.",
    file: "variants/v-slider-6.tsx",
    keywords: ["with dynamic tooltip indicator", "floating value bubble"],
    name: "v-slider-6",
  },
  {
    category: "slider",
    description:
      "'Rate your experience' slider (1-5) paired with a live emoji (😡→😍) and a text label (Awful→Amazing) that update as the value changes. Use for a satisfaction/rating slider with emoji feedback.",
    file: "variants/v-slider-7.tsx",
    keywords: ["rating slider with emoji feedback", "satisfaction slider"],
    name: "v-slider-7",
  },
  {
    category: "slider",
    description:
      "'Price range' dual-thumb Slider ($0-$200k, $5k steps) with a formatted low—high value display and min/max labels beneath. Use for a numeric range filter (e.g. product price filter) with formatted currency values.",
    file: "variants/v-slider-8.tsx",
    keywords: ["dual-thumb price range", "range filter slider"],
    name: "v-slider-8",
  },
  {
    category: "slider",
    description:
      "'Equalizer' with three independent -12 to +12 sliders (Bass/Mid/Treble), each in a labeled row with a live +/- value on the right. Use for a multi-channel audio equalizer control.",
    file: "variants/v-slider-9.tsx",
    keywords: ["equalizer sliders", "bass mid treble", "audio channels"],
    name: "v-slider-9",
  },
  {
    category: "slider",
    description:
      "'Volume' slider with mute/unmute icon button (icon changes based on level: muted/low/high) on the left and a numeric value on the right. Use for a media-player volume control combining a mute toggle with a slider.",
    file: "variants/v-slider-10.tsx",
    keywords: ["volume control with mute toggle", "media player volume"],
    name: "v-slider-10",
  },
  {
    category: "slider",
    description:
      "'Price Range' dual-thumb slider ($0-$1000, $10 steps) with a live low–high dollar readout and min/max labels beneath. Use for a simpler price-range filter (compare with v-slider-8's larger-range formatted version).",
    file: "variants/v-slider-11.tsx",
    keywords: ["dual-thumb price range", "price filter"],
    name: "v-slider-11",
  },
  {
    category: "slider",
    description:
      "'Session timeout' slider (5-1440 minutes) with a formatted duration readout (e.g. '2h') and quick-select preset buttons (1h/4h/8h/24h) that jump the slider to common durations. Use for a duration/timeout picker combining a slider with quick preset shortcuts.",
    file: "variants/v-slider-12.tsx",
    keywords: [
      "display settings sliders",
      "session timeout",
      "duration presets",
    ],
    name: "v-slider-12",
  },
  {
    category: "slider",
    description:
      "'Accent Color' hue-picker slider: a rainbow gradient bar above a 0-360 hue Slider, with a live color swatch and the resulting `hsl(...)` string displayed. Use for a color-hue picker control.",
    file: "variants/v-slider-13.tsx",
    keywords: ["hue color picker", "rainbow gradient slider"],
    name: "v-slider-13",
  },
  {
    category: "slider",
    description:
      "'Room Temperature' slider (10-30°C) with a thermometer icon and value that change color based on range (blue=cold, green=comfortable, orange=warm), plus a status label ('Too cold'/'Comfortable'/'Too warm') between the min/max labels. Use for a thermostat/temperature-control slider with comfort-zone feedback.",
    file: "variants/v-slider-14.tsx",
    keywords: [
      "temperature control",
      "thermostat slider",
      "comfort zone feedback",
    ],
    name: "v-slider-14",
  },
  {
    category: "slider",
    description:
      "'Display Settings' panel with three sliders (Brightness/Contrast/Saturation) each with a label and live SliderValue, plus Reset/Apply buttons at the bottom. Use for an image/display-adjustment settings panel with multiple related sliders.",
    file: "variants/v-slider-15.tsx",
    keywords: [
      "display settings sliders",
      "brightness contrast saturation",
      "reset apply buttons",
    ],
    name: "v-slider-15",
  },

  // --- spinner ---
  {
    category: "spinner",
    description:
      "Bare, unstyled default Spinner rendered alone. Use as the plainest possible loading indicator with no context or sizing overrides.",
    file: "variants/v-spinner-1.tsx",
    keywords: ["default spinner", "bare spinner"],
    name: "v-spinner-1",
  },
  {
    category: "spinner",
    description:
      "Spinner used as an InputGroupAddon inside a disabled 'Processing…' search input group. Use for showing a busy state inside a text input while a search/lookup is running.",
    file: "variants/v-spinner-2.tsx",
    keywords: ["spinner in input group", "loading search input"],
    name: "v-spinner-2",
  },
  {
    category: "spinner",
    description:
      "Three buttons demonstrating spinners inside buttons: a default button with an inline-start Spinner and 'Processing…' label, a disabled outline button with an inline-start Spinner and 'Loading…' label, and a disabled icon-only button containing just a Spinner. Use as reference patterns for loading states on buttons.",
    file: "variants/v-spinner-3.tsx",
    keywords: [
      "spinner in buttons",
      "loading button states",
      "icon-only loading button",
    ],
    name: "v-spinner-3",
  },
  {
    category: "spinner",
    description:
      "Spinner placed inside an Empty component's EmptyMedia icon slot for a 'Loading projects' empty state, with a disabled 'Cancel' button below. Use for a full empty-state loading placeholder while a list/collection is being fetched.",
    file: "variants/v-spinner-4.tsx",
    keywords: ["empty state loading", "loading projects placeholder"],
    name: "v-spinner-4",
  },
  {
    category: "spinner",
    description:
      "'Overlay on card' pattern: a real Card with data (Monthly Report: Revenue/Growth/Users) sits behind an absolutely-positioned second Card overlay using bg-background/80 backdrop-blur-xs, containing a Spinner and 'Refreshing data...' text. Use to show a card is being refreshed while still displaying its stale content dimmed underneath.",
    file: "variants/v-spinner-5.tsx",
    keywords: [
      "refresh overlay on card",
      "backdrop blur loading overlay",
      "stale data refreshing",
    ],
    name: "v-spinner-5",
  },
  {
    category: "spinner",
    description:
      "Card with a centered Spinner (dimmed via opacity-50) above a 'Setting up your workspace' title and 'This may take a few seconds...' subtext. Use for a standalone loading card during a one-time setup/provisioning step.",
    file: "variants/v-spinner-6.tsx",
    keywords: ["setting up workspace", "provisioning loading card"],
    name: "v-spinner-6",
  },
  {
    category: "spinner",
    description:
      "Stacked list of three status rows, each pairing a small colored Spinner with a status message: neutral 'Checking availability...', success-colored 'Connected — syncing data', and warning-colored 'Reconnecting — attempt 3 of 5'. Use for showing multiple simultaneous async connection/status states with color-coded spinners.",
    file: "variants/v-spinner-7.tsx",
    keywords: [
      "connection status list",
      "color coded spinners",
      "reconnecting status",
    ],
    name: "v-spinner-7",
  },
  {
    category: "spinner",
    description:
      "Dashboard overview Card showing revenue/user stats behind a semi-transparent 'Overlay' Card (bg-background/80 backdrop-blur-xs) containing only a small dimmed Spinner with no text. Use for a minimal, text-free loading overlay on top of dashboard-style stat cards.",
    file: "variants/v-spinner-8.tsx",
    keywords: [
      "dashboard overlay spinner",
      "minimal loading overlay",
      "stat card refreshing",
    ],
    name: "v-spinner-8",
  },
  {
    category: "spinner",
    description:
      "Row of five Spinners each tinted a different Tailwind color (blue/green/red/yellow/purple) side by side. Use as a quick visual reference for applying custom colors to the Spinner via className.",
    file: "variants/v-spinner-9.tsx",
    keywords: [
      "colored spinners",
      "spinner color variants",
      "multi-color loading indicators",
    ],
    name: "v-spinner-9",
  },
  {
    category: "spinner",
    description:
      "Multi-step workspace launch sequence: clicking 'Launch workspace' starts a timed sequence cycling through step messages ('Connecting to server…', 'Authenticating…', 'Loading workspace…', 'Almost there…') shown next to a Spinner inside a bordered panel, with the trigger Button disabled and relabeled 'Starting…' while running, reverting to 'Workspace ready' text when done. Use for a multi-stage async process with sequential status messages.",
    file: "variants/v-spinner-10.tsx",
    keywords: [
      "multi step loading sequence",
      "workspace launch steps",
      "sequential status messages",
    ],
    name: "v-spinner-10",
  },
  {
    category: "spinner",
    description:
      "Simulated page-navigation loading overlay: clicking 'Navigate' shows a full-panel backdrop-blurred overlay with a large Spinner and 'Loading page…' text for 2 seconds over a 'Dashboard' placeholder panel, then reverts. Use to demonstrate a page-transition/route-change loading overlay.",
    file: "variants/v-spinner-11.tsx",
    keywords: [
      "page navigation loading",
      "route transition overlay",
      "simulated navigation",
    ],
    name: "v-spinner-11",
  },
  {
    category: "spinner",
    description:
      "File-upload status card: an icon tile swaps between an UploadCloud icon and a Spinner depending on upload status (idle/uploading/done), with matching status text ('Ready to upload' / 'Uploading report.pdf…' / 'Upload complete') and a submit Button that also shows an inline-start Spinner and changes label while uploading. Use for a file-upload widget with combined icon-tile and button loading states.",
    file: "variants/v-spinner-12.tsx",
    keywords: [
      "file upload spinner",
      "upload progress card",
      "upload status icon",
    ],
    name: "v-spinner-12",
  },
  {
    category: "spinner",
    description:
      "Invoices list panel with a header 'Refresh' Button (icon toggles between RefreshCw and Spinner while loading) that, when clicked, temporarily replaces the row list with three skeleton-like 'Loading…' rows (each with a small Spinner) before restoring the real invoice rows (customer, id, amount, paid/pending status). Use for a refreshable data table/list with a refresh-button spinner and per-row loading placeholders.",
    file: "variants/v-spinner-13.tsx",
    keywords: [
      "refreshable invoice list",
      "table refresh spinner",
      "loading rows",
    ],
    name: "v-spinner-13",
  },
  {
    category: "spinner",
    description:
      "Sign-in form: submitting shows an inline-start Spinner inside the submit Button with label 'Signing in…' (inputs and button disabled), then flips to a disabled 'Signed in!' state after a timed delay. Use for a login/sign-in form submit button with a loading-then-success sequence.",
    file: "variants/v-spinner-14.tsx",
    keywords: [
      "sign in form loading",
      "submit button spinner",
      "login success state",
    ],
    name: "v-spinner-14",
  },
  {
    category: "spinner",
    description:
      "Size comparison chart: six Spinners at increasing size classes (xs through 2xl) each labeled beneath with its size name, laid out in a wrapped row. Use as a quick visual reference for available Spinner size options.",
    file: "variants/v-spinner-15.tsx",
    keywords: ["spinner size scale", "spinner sizes xs to 2xl"],
    name: "v-spinner-15",
  },

  // --- switch ---
  {
    category: "switch",
    description:
      "Baseline Switch wrapped directly inside a Label with plain text ('Marketing emails') as sibling content. Use as the simplest possible label+switch pairing with no id wiring.",
    file: "variants/v-switch-1.tsx",
    keywords: ["default switch", "switch with label"],
    name: "v-switch-1",
  },
  {
    category: "switch",
    description:
      "Switch defaultChecked and paired via id/htmlFor with a Label above a small helper-text paragraph explaining the consequence of enabling it. Use for a single toggle with a title plus explanatory description beneath.",
    file: "variants/v-switch-2.tsx",
    keywords: ["switch with description", "labeled switch with helper text"],
    name: "v-switch-2",
  },
  {
    category: "switch",
    description:
      "Two Switch/Label rows stacked vertically comparing the 'sm' and 'default' size props side by side. Use as a quick visual reference for available Switch sizes.",
    file: "variants/v-switch-3.tsx",
    keywords: ["switch sizes", "small vs default switch"],
    name: "v-switch-3",
  },
  {
    category: "switch",
    description:
      "Notification Settings group: an outer Field with a group FieldLabel wrapping three row Fields, each a Switch+FieldLabel pair (Email/SMS/Push notifications), two defaultChecked. Use for a titled group of related on/off notification toggles.",
    file: "variants/v-switch-4.tsx",
    keywords: ["switch group", "notification settings toggles"],
    name: "v-switch-4",
  },
  {
    category: "switch",
    description:
      "Three defaultChecked Switches each recolored via data-checked:bg-{color} className (blue/green/yellow) paired with matching color-named labels. Use as a reference for customizing the Switch's checked-state color per instance.",
    file: "variants/v-switch-5.tsx",
    keywords: [
      "colored switches",
      "custom switch color",
      "data-checked styling",
    ],
    name: "v-switch-5",
  },
  {
    category: "switch",
    description:
      "Single destructive-styled Switch ('Delete all data on sign out') recolored via data-checked:bg-destructive, paired with a destructive-colored FieldLabel and a FieldDescription warning the action cannot be undone. Use for a dangerous/irreversible settings toggle that needs visual warning emphasis.",
    file: "variants/v-switch-6.tsx",
    keywords: [
      "destructive switch",
      "dangerous setting toggle",
      "delete data warning",
    ],
    name: "v-switch-6",
  },
  {
    category: "switch",
    description:
      "'Editor Preferences' list: a title, a Separator, then a column of label rows (Auto-save/Spell check/Line numbers) each with a title, description text, and a small Switch on the right, separated by border-b except the last. Use for a settings list of labeled preference toggles with divider lines.",
    file: "variants/v-switch-7.tsx",
    keywords: [
      "settings list switches",
      "editor preferences toggles",
      "divided list",
    ],
    name: "v-switch-7",
  },
  {
    category: "switch",
    description:
      "2-column grid of four feature-toggle cards (Analytics/Error Logging/CDN Caching/Auto Backup), each a clickable FieldLabel card with an icon tile, title, description, and a controlled Switch, with the card's border/background changing color when checked. Use for a feature-flag/settings grid where each card visually highlights its active state.",
    file: "variants/v-switch-8.tsx",
    keywords: [
      "feature toggle cards",
      "settings grid switches",
      "highlighted active card",
    ],
    name: "v-switch-8",
  },
  {
    category: "switch",
    description:
      "Cookie-consent Card: a header with icon, title, and a live 'N of M categories enabled' count, then a CardPanel list of four cookie-category rows (Strictly Necessary disabled/always-on, Analytics, Marketing, Personalization) each with a status Badge (Always On/Active/Off) and a controlled small Switch, separated by Separators, with a footer note. Use for a full cookie/consent-preferences panel with per-category status badges.",
    file: "variants/v-switch-9.tsx",
    keywords: [
      "cookie consent panel",
      "cookie preferences card",
      "consent categories with badges",
    ],
    name: "v-switch-9",
  },
  {
    category: "switch",
    description:
      "Notifications Card with a master Switch in the header (icon and description change between Bell/BellOff and 'Receiving alerts'/'All alerts paused') that, when off, visually dims and disables a CardPanel list of four delivery-channel rows (Email/SMS/In-app/Push), each with its own icon, label, description, and small Switch. Use for a master-toggle-with-dependent-sub-toggles notification settings panel.",
    file: "variants/v-switch-10.tsx",
    keywords: [
      "master switch with sub toggles",
      "notification channels panel",
      "dependent disabled switches",
    ],
    name: "v-switch-10",
  },
  {
    category: "switch",
    description:
      "Compact list of six pricing-tier feature rows (Advanced Analytics, API Access, Data Export, SSO, Audit Logs, Priority Support), each with a controlled Switch that is disabled (and shows an 'Enterprise' Badge) for non-pro features. Use for a plan/feature-gating list where some toggles are locked behind a higher tier.",
    file: "variants/v-switch-11.tsx",
    keywords: [
      "plan gated switches",
      "enterprise feature toggle",
      "locked switch with badge",
    ],
    name: "v-switch-11",
  },
  {
    category: "switch",
    description:
      "'Privacy Settings' bordered panel with a header and a divided list of five icon-labeled rows (Location Services, Camera & Microphone, Microphone Only, Activity Tracking, Personalised Ads), each with a description and a small controlled Switch, with an extra Separator inserted after the third row. Use for a privacy/permissions settings list with icon-tile rows.",
    file: "variants/v-switch-12.tsx",
    keywords: [
      "privacy settings list",
      "permission toggles",
      "icon labeled switch rows",
    ],
    name: "v-switch-12",
  },
  {
    category: "switch",
    description:
      "Standalone light/dark mode preview card: background, text color, icon (Sun/Moon), title, and description all transition together based on a single Switch's checked state, with a Sun/Moon icon pair flanking the indigo-tinted Switch. Use for a live theme-preview toggle demonstrating an immediate visual mode switch.",
    file: "variants/v-switch-13.tsx",
    keywords: [
      "dark mode toggle preview",
      "theme switch demo",
      "light dark mode card",
    ],
    name: "v-switch-13",
  },
  {
    category: "switch",
    description:
      "'Create Account' form with name/email Inputs and a required agree-to-terms row combining a Switch with a Terms & Conditions FieldLabel/FieldDescription; the submit Button stays disabled until the Switch is checked. Use for a signup form gating submission on a terms-acceptance switch.",
    file: "variants/v-switch-14.tsx",
    keywords: [
      "terms acceptance switch",
      "signup form toggle",
      "required switch gating submit",
    ],
    name: "v-switch-14",
  },
  {
    category: "switch",
    description:
      "'Do Not Disturb' card: a header row with icon (BellOff/Moon), title, live status text, and a master Switch; when enabled, a 'Duration' section with a 2×2 grid of preset duration buttons (1 hour/2 hours/4 hours/Until tomorrow) appears for picking how long DND stays active. Use for a do-not-disturb/snooze toggle with a conditional duration picker.",
    file: "variants/v-switch-15.tsx",
    keywords: [
      "do not disturb toggle",
      "snooze switch with duration picker",
      "conditional options on toggle",
    ],
    name: "v-switch-15",
  },

  // --- table ---
  {
    category: "table",
    description:
      "Baseline data Table with a TableCaption, a 4-column header (Project/Status/Team/Budget), six project rows each with a dot-badge status (Paid/Unpaid/Pending/Failed), and a TableFooter row showing colSpan-merged 'Total Budget' with the summed amount. Use as the plainest full-featured table with caption, badges, and a footer total.",
    file: "variants/v-table-1.tsx",
    keywords: [
      "default table with footer total",
      "table caption",
      "status badge table",
    ],
    name: "v-table-1",
  },
  {
    category: "table",
    description:
      'Same project/status/team/budget data as v-table-1 but rendered with Table variant="card" (no caption) for a card-styled bordered table look. Use when you want the same tabular data with a card-like visual container instead of a plain table.',
    file: "variants/v-table-2.tsx",
    keywords: ["card variant table", "bordered table style"],
    name: "v-table-2",
  },
  {
    category: "table",
    description:
      'Same project/status/team/budget table wrapped inside a CardFrame with Table variant="card". Use when you want the table nested inside an explicit CardFrame wrapper component rather than relying on the table\'s own card variant styling alone.',
    file: "variants/v-table-3.tsx",
    keywords: ["table inside card frame", "CardFrame wrapped table"],
    name: "v-table-3",
  },
  {
    category: "table",
    description:
      'Same project/status/team/budget table wrapped inside a Frame component with Table variant="card". Use when you want the table nested inside the generic Frame primitive rather than CardFrame.',
    file: "variants/v-table-4.tsx",
    keywords: ["table inside frame", "Frame wrapped table"],
    name: "v-table-4",
  },
  {
    category: "table",
    description:
      "Recent-orders table: 4-column header (Order/Customer/Status/Amount), each row combining a monospace order id, an Avatar+name+date customer cell, a colored status Badge (Paid/Pending/Refunded), and a right-aligned amount. Use for an orders/transactions list with avatar customer identity and status badges.",
    file: "variants/v-table-5.tsx",
    keywords: [
      "orders table with avatars",
      "transaction list table",
      "customer order history",
    ],
    name: "v-table-5",
  },
  {
    category: "table",
    description:
      "Team-members table (Member/Role/Status columns) with Avatar+name+email cells and Role/Status Badges, wrapped in a Frame+FramePanel with padding removed so the table fills the panel edge-to-edge. Use for a members/roster table cleanly inset inside a Frame container.",
    file: "variants/v-table-6.tsx",
    keywords: [
      "team members table",
      "roster table in frame",
      "role and status badges",
    ],
    name: "v-table-6",
  },
  {
    category: "table",
    description:
      "Subscriptions table (Service/Plan/Billing/Status/Actions columns) listing five SaaS subscriptions each with a plan Badge, billing text with next-billing-date subtext, status Badge (Active/Cancelled/Trial), and a per-row 'Manage' ghost Button with a settings icon. Use for a billing/subscriptions management table with per-row action buttons.",
    file: "variants/v-table-7.tsx",
    keywords: [
      "subscriptions management table",
      "billing table with actions",
      "manage button per row",
    ],
    name: "v-table-7",
  },
  {
    category: "table",
    description:
      "Client-side sortable API-metrics table: clickable column headers (Endpoint/Avg latency/Req per day/Error %) toggle sort direction with animated up/down/neutral icons, HTTP Method shown as a colored Badge, and error-rate text colored by severity threshold. Use for an interactive, sortable API/analytics metrics table.",
    file: "variants/v-table-8.tsx",
    keywords: [
      "sortable table",
      "interactive column sort",
      "API metrics dashboard table",
    ],
    name: "v-table-8",
  },
  {
    category: "table",
    description:
      "Storage-usage table inside a Card with a header title and live 'X GB of Y GB used' description; each row shows Avatar+name+email, a plan Badge, and a custom inline StorageBar (colored by usage percentage) with a 'Storage almost full' warning label when usage is ≥90%. Use for an account/team storage-quota table with visual usage bars.",
    file: "variants/v-table-9.tsx",
    keywords: [
      "storage usage table",
      "usage progress bar in table",
      "quota warning table",
    ],
    name: "v-table-9",
  },
  {
    category: "table",
    description:
      "Audit-log table (Actor/Action/Resource/IP Address/Time columns) wrapped in a Frame+FramePanel, with a header row showing 'Audit Log' title and event count; each row has Avatar+name/email actor, a colored action-type Badge (login/export/delete/invite/update/create), monospace IP, and relative time. Use for a security/audit-log activity table.",
    file: "variants/v-table-10.tsx",
    keywords: [
      "audit log table",
      "activity log with actor avatars",
      "security events table",
    ],
    name: "v-table-10",
  },
  {
    category: "table",
    description:
      "Product-inventory table (Product/SKU/Category/Price/Qty/Status columns) with monospace SKU codes and a stock-status Badge (In Stock/Low Stock/Out of Stock) color-mapped per row. Use for an e-commerce/inventory management table.",
    file: "variants/v-table-11.tsx",
    keywords: ["inventory table", "product stock status", "SKU table"],
    name: "v-table-11",
  },
  {
    category: "table",
    description:
      "Invoices table (Invoice/Client/Issued/Due/Status/Amount/blank-actions columns) with a status Badge (Paid/Overdue/Pending/Draft) per row, a per-row ghost 'View' Button in an unlabeled trailing column, and a TableFooter summing 'Total outstanding'. Use for an invoicing/billing table with per-row view actions and a totals footer.",
    file: "variants/v-table-12.tsx",
    keywords: [
      "invoices table with footer total",
      "billing table view action",
      "outstanding balance table",
    ],
    name: "v-table-12",
  },
  {
    category: "table",
    description:
      "Pricing/feature-comparison table (Feature row-header plus Free/Pro/Enterprise centered columns); each cell renders either a checkmark/dash icon for booleans or plain text for string values (e.g. 'Unlimited', '1 TB'). Use for a plans/feature-comparison matrix table.",
    file: "variants/v-table-13.tsx",
    keywords: [
      "pricing comparison table",
      "feature matrix table",
      "plan comparison checkmarks",
    ],
    name: "v-table-13",
  },
  {
    category: "table",
    description:
      "Server-fleet monitoring table (Server/Region/Status/CPU/Memory/Uptime columns) with a health status Badge (Healthy/Warning/Critical) and inline Progress bars with percentage labels for CPU and Memory usage per row. Use for an infrastructure/server-monitoring dashboard table with embedded progress bars.",
    file: "variants/v-table-14.tsx",
    keywords: [
      "server monitoring table",
      "infrastructure dashboard",
      "cpu memory progress bars",
    ],
    name: "v-table-14",
  },
  {
    category: "table",
    description:
      "Contributor-leaderboard table (Rank/Contributor/Commits/PRs/Reviews/Change columns) with numbered rank, Avatar+name+optional 'Top Contributor' Badge, tabular-nums stat columns, and a trend indicator (up/down arrow icon, colored, or an em-dash) showing rank change. Use for a leaderboard/ranking table with trend-change indicators.",
    file: "variants/v-table-15.tsx",
    keywords: [
      "leaderboard table",
      "contributor ranking",
      "trend change indicator",
    ],
    name: "v-table-15",
  },

  // --- tabs ---
  {
    category: "tabs",
    description:
      "Baseline three-tab Tabs (Tab 1/2/3) using the TabsList/TabsTab/TabsPanel API with plain centered placeholder text panels. Use as the simplest possible tabs component with no extra styling.",
    file: "variants/v-tabs-1.tsx",
    keywords: ["default tabs", "basic tabs component"],
    name: "v-tabs-1",
  },
  {
    category: "tabs",
    description:
      'Same three-tab structure as v-tabs-1 but with TabsList variant="underline" wrapped in a bordered-bottom div, giving an underline-indicator tab style instead of the default pill/box style. Use when you want an underline-style tab bar.',
    file: "variants/v-tabs-2.tsx",
    keywords: ["underline tabs", "underline variant tab bar"],
    name: "v-tabs-2",
  },
  {
    category: "tabs",
    description:
      'Same three-tab structure as v-tabs-1 but with orientation="vertical", stacking the TabsList above/beside panels vertically instead of horizontally. Use for a vertical tab layout with the default (non-underline) tab style.',
    file: "variants/v-tabs-3.tsx",
    keywords: ["vertical tabs", "vertical orientation default style"],
    name: "v-tabs-3",
  },
  {
    category: "tabs",
    description:
      'Vertical-orientation Tabs combining flex-row layout with TabsList variant="underline" (bordered on the start/left side) so tab labels sit in a vertical underline-style sidebar next to the content panels. Use for a vertical underline-style tab sidebar.',
    file: "variants/v-tabs-4.tsx",
    keywords: ["vertical underline tabs", "sidebar tab navigation"],
    name: "v-tabs-4",
  },
  {
    category: "tabs",
    description:
      "'Account'/'Password' settings tabs (TabsTrigger/TabsContent API) where each tab's content is a full Card with header (title+description), form Inputs with Labels, and a footer Save/Update Button. Use for a classic two-tab account-settings panel pattern.",
    file: "variants/v-tabs-5.tsx",
    keywords: [
      "account settings tabs",
      "two tab settings panel",
      "card content per tab",
    ],
    name: "v-tabs-5",
  },
  {
    category: "tabs",
    description:
      "Three-tab ('Account'/'Password'/'Settings') full-width underline-variant TabsList, each tab again showing a Card with form fields and a save Button (a three-tab, underline-styled expansion of v-tabs-5). Use for a wider settings panel with an underline tab bar and three settings sections.",
    file: "variants/v-tabs-6.tsx",
    keywords: ["three tab settings underline", "wide settings tabs panel"],
    name: "v-tabs-6",
  },
  {
    category: "tabs",
    description:
      "Vertical three-tab ('Account'/'Password'/'Settings') settings panel with a fixed-width TabsList sidebar and Card-based content per tab (default, non-underline tab style). Use for a vertical settings-page layout with a narrow tab sidebar.",
    file: "variants/v-tabs-7.tsx",
    keywords: ["vertical settings tabs", "sidebar settings panel"],
    name: "v-tabs-7",
  },
  {
    category: "tabs",
    description:
      'Same vertical three-tab settings panel as v-tabs-7 but with TabsList variant="underline" for the sidebar tabs instead of the default style. Use for a vertical settings sidebar with underline-style tab indicators.',
    file: "variants/v-tabs-8.tsx",
    keywords: ["vertical underline settings tabs", "sidebar underline tabs"],
    name: "v-tabs-8",
  },
  {
    category: "tabs",
    description:
      "'Overview'/'Analytics'/'Settings' full-width Tabs where each TabsTrigger pairs an icon (LayoutDashboard/BarChart3/Settings) with its label, and each panel is a simple Card with a one-line description. Use for a dashboard-style tab bar with icon+label triggers.",
    file: "variants/v-tabs-9.tsx",
    keywords: [
      "icon tabs",
      "dashboard tabs with icons",
      "labeled icon tab triggers",
    ],
    name: "v-tabs-9",
  },
  {
    category: "tabs",
    description:
      "Vertical sidebar Tabs (Projects/Tasks/Team/Reports) with left-aligned icon+label TabsTriggers, some carrying a trailing count Badge (8, 24), each panel a Card with a heading and descriptive paragraph. Use for a vertical navigation-style tab sidebar with icons and count badges.",
    file: "variants/v-tabs-10.tsx",
    keywords: [
      "sidebar navigation tabs",
      "tabs with count badges",
      "icon label vertical tabs",
    ],
    name: "v-tabs-10",
  },
  {
    category: "tabs",
    description:
      "'Inbox'/'Drafts'/'Sent'/'Spam' full-width underline TabsList where triggers carry trailing count Badges (12, 3, none, 24 in varying colors), each panel a Card with a one-line summary. Use for an email/mailbox-style tab bar with unread-count badges.",
    file: "variants/v-tabs-11.tsx",
    keywords: [
      "mailbox tabs",
      "inbox tabs with unread count",
      "email folder tabs",
    ],
    name: "v-tabs-11",
  },
  {
    category: "tabs",
    description:
      "Controlled Daily/Weekly/Monthly/Yearly analytics period-selector Tabs (value/onValueChange, icon+label triggers) where each panel is a Card showing a large stat number and 'Visitors this X' caption. Use for a time-period switcher driving a single changing stat display.",
    file: "variants/v-tabs-12.tsx",
    keywords: [
      "period selector tabs",
      "analytics time range tabs",
      "controlled tabs stat display",
    ],
    name: "v-tabs-12",
  },
  {
    category: "tabs",
    description:
      "Full account-settings page using vertical underline TabsList (Profile/Security/Notifications/Integrations, each icon-labeled) where each TabsPanel renders a distinct detailed content block: profile fields, password+2FA status, notification preference rows with fake switches, and integration connection statuses, separated by Separators. Use for a comprehensive multi-section settings page with a vertical icon tab sidebar.",
    file: "variants/v-tabs-13.tsx",
    keywords: [
      "full settings page tabs",
      "profile security notifications integrations",
      "multi section vertical tabs",
    ],
    name: "v-tabs-13",
  },
  {
    category: "tabs",
    description:
      "Code-editor-style file tabs: a controlled Tabs (value/onValueChange) with underline TabsList showing file names (index.tsx/package.json/styles.css) as flat top-rounded tabs in a toolbar row alongside a 'Copy' Button (with copied-state feedback), each panel rendering the file's content in a <pre><code> block. Use for a multi-file code-snippet viewer with copy-to-clipboard.",
    file: "variants/v-tabs-14.tsx",
    keywords: [
      "code file tabs",
      "code snippet viewer with copy",
      "multi file tab viewer",
    ],
    name: "v-tabs-14",
  },
  {
    category: "tabs",
    description:
      "GitHub-profile-style underline Tabs (Overview/Repositories with count Badge/Stars with count Badge/Activity) where the Repositories panel lists repos with name, Public Badge, description, language dot+name, and star count. Use for a profile/repository-browsing tab interface.",
    file: "variants/v-tabs-15.tsx",
    keywords: [
      "profile repository tabs",
      "github style tabs",
      "repo list with stars",
    ],
    name: "v-tabs-15",
  },
  {
    category: "tabs",
    description:
      "Pricing-page billing-toggle Tabs (Monthly/Yearly, the Yearly tab carrying a 'Save 20%' success Badge, empty content panels used only as a controlled toggle) paired with a 3-column pricing grid below that reads the tab's value to switch each plan's displayed price and highlights the 'Pro' plan. Use for a monthly/yearly pricing toggle implemented via Tabs used purely as a segmented control.",
    file: "variants/v-tabs-16.tsx",
    keywords: [
      "pricing toggle tabs",
      "monthly yearly billing switch",
      "tabs as segmented control",
    ],
    name: "v-tabs-16",
  },
  {
    category: "tabs",
    description:
      "Analytics-dashboard Tabs (Analytics/Reports/Exports/Activity, each icon+label) where the Analytics panel shows a 2×2 grid of metric Cards (value + trend change), Reports panel lists downloadable report rows, and Exports/Activity panels show simple descriptive Cards. Use for a full analytics/reporting dashboard tab interface.",
    file: "variants/v-tabs-17.tsx",
    keywords: [
      "analytics dashboard tabs",
      "reports and exports tabs",
      "metric grid tab panel",
    ],
    name: "v-tabs-17",
  },

  // --- textarea ---
  {
    category: "textarea",
    description:
      "Baseline Textarea with a placeholder ('Type your message here') and no other props. Use as the plainest possible multi-line text input.",
    file: "variants/v-textarea-1.tsx",
    keywords: ["default textarea", "basic textarea"],
    name: "v-textarea-1",
  },
  {
    category: "textarea",
    description:
      "Two Textareas labeled 'Small' and 'Large' stacked vertically, demonstrating the size=\"sm\" and size=\"lg\" props. Use as a quick visual reference for available Textarea sizes.",
    file: "variants/v-textarea-2.tsx",
    keywords: ["textarea sizes", "small large textarea"],
    name: "v-textarea-2",
  },
  {
    category: "textarea",
    description:
      'Single disabled Textarea with placeholder "Can\'t type here". Use to show a non-editable/disabled textarea state.',
    file: "variants/v-textarea-3.tsx",
    keywords: ["disabled textarea"],
    name: "v-textarea-3",
  },
  {
    category: "textarea",
    description:
      "Textarea paired with a Label ('Message') via matching id/htmlFor, stacked vertically. Use for the simplest labeled textarea field.",
    file: "variants/v-textarea-4.tsx",
    keywords: ["labeled textarea", "textarea with label"],
    name: "v-textarea-4",
  },
  {
    category: "textarea",
    description:
      "Field-wrapped 'Feedback' Textarea (6 rows) with a FieldLabel above and a FieldDescription ('Type your message and press enter to send.') below. Use for a textarea field with title and helper description text using the Field primitives.",
    file: "variants/v-textarea-5.tsx",
    keywords: ["textarea with description", "field textarea helper text"],
    name: "v-textarea-5",
  },
  {
    category: "textarea",
    description:
      "'Bio' Field with a live character counter (0/280) in the label row that turns warning-colored near the limit and destructive-colored at the limit, paired with a controlled Textarea that auto-resizes its height to fit content via a ref and enforces the max-length by truncating input. Use for a character-limited, auto-growing bio/comment field with live count feedback.",
    file: "variants/v-textarea-6.tsx",
    keywords: [
      "character counter textarea",
      "auto resize textarea",
      "bio field with limit",
    ],
    name: "v-textarea-6",
  },
  {
    category: "textarea",
    description:
      "Form-validated 'Message' Textarea (required, name=\"message\") inside a Form with a FieldError shown ('This field is required.') and a submit Button showing a loading state during a simulated async submit that alerts the entered message. Use for a required-field textarea form with validation error and loading submit.",
    file: "variants/v-textarea-7.tsx",
    keywords: [
      "required textarea form",
      "textarea validation error",
      "loading submit button",
    ],
    name: "v-textarea-7",
  },
  {
    category: "textarea",
    description:
      "Controlled Textarea with a live word-count and character-count row displayed beneath it, updating as the user types. Use for a writing/editor field that shows word and character counts.",
    file: "variants/v-textarea-8.tsx",
    keywords: [
      "word count textarea",
      "character count display",
      "writing stats",
    ],
    name: "v-textarea-8",
  },
  {
    category: "textarea",
    description:
      "Markdown editor with 'Write'/'Preview' underline Tabs: the Write panel is a tall Textarea bound to markdown source, the Preview panel renders the raw text (as plain whitespace-preserved text, not actually parsed markdown) inside a bordered box. Use for a simple write/preview markdown-editing pattern combining Tabs and Textarea.",
    file: "variants/v-textarea-9.tsx",
    keywords: [
      "markdown editor write preview",
      "tabs with textarea",
      "content editor preview toggle",
    ],
    name: "v-textarea-9",
  },
  {
    category: "textarea",
    description:
      "Support-ticket form: a 'Category' Field of selectable pill buttons (Bug Report/Feature Request/Billing/Account/Other) plus a required, min-length 'Message' Textarea with a live 'N / 500' character counter, a submit Button disabled until a category is chosen, and a success confirmation screen (checkmark, message, 'Submit another' reset Button) shown after simulated submission. Use for a full support/contact-ticket form with category selection and post-submit success state.",
    file: "variants/v-textarea-10.tsx",
    keywords: [
      "support ticket form",
      "contact form with category pills",
      "success state after submit",
    ],
    name: "v-textarea-10",
  },
  {
    category: "textarea",
    description:
      "Chat-message composer inside a mock messaging UI: a header showing the contact's name and online status, a scrollable message-bubble history (own vs. other messages styled differently, each with a timestamp), and a bottom input row with a small non-resizable Textarea (Enter-to-send, Shift+Enter for newline) plus attachment/emoji/send icon Buttons. Use for a chat/messenger-style composer with message history.",
    file: "variants/v-textarea-11.tsx",
    keywords: [
      "chat message composer",
      "messenger textarea input",
      "enter to send chat",
    ],
    name: "v-textarea-11",
  },
  {
    category: "textarea",
    description:
      "'Release Notes' editor panel: a status Badge (Draft/Published) in the header, a 'Version title' Input, a markdown 'Release notes' Textarea with maxLength and a live 'N / 2000' character counter (turning amber near the limit) plus a 'Markdown supported' hint, and Save Draft / Publish Buttons that toggle the status Badge. Use for a changelog/release-notes authoring panel with draft/publish workflow.",
    file: "variants/v-textarea-12.tsx",
    keywords: [
      "release notes editor",
      "changelog authoring panel",
      "draft publish workflow",
    ],
    name: "v-textarea-12",
  },

  // --- toast ---
  {
    category: "toast",
    description:
      "Single Button that calls toastManager.add() with a title ('Event has been created') and description on click, showing the plainest default toast notification. Use as the simplest possible toast trigger.",
    file: "variants/v-toast-1.tsx",
    keywords: ["default toast", "basic toast trigger"],
    name: "v-toast-1",
  },
  {
    category: "toast",
    description:
      "Four Buttons each triggering a differently-typed toast (success/error/info/warning) via toastManager.add({ type: ... }). Use as a reference for the available toast type/severity variants.",
    file: "variants/v-toast-2.tsx",
    keywords: ["toast types", "success error info warning toast"],
    name: "v-toast-2",
  },
  {
    category: "toast",
    description:
      "Single Button triggering a toastManager.add({ type: \"loading\" }) toast showing a 'Loading…' title with description. Use for a standalone loading-type toast notification.",
    file: "variants/v-toast-3.tsx",
    keywords: ["loading toast"],
    name: "v-toast-3",
  },
  {
    category: "toast",
    description:
      "Button triggering a success toast with a very long timeout and an actionProps 'Undo' button that closes the toast and fires a follow-up info toast confirming the undo. Use for an actionable toast supporting an undo interaction.",
    file: "variants/v-toast-4.tsx",
    keywords: ["undo toast", "toast with action button", "actionable toast"],
    name: "v-toast-4",
  },
  {
    category: "toast",
    description:
      "Button that calls toastManager.promise() on a randomly succeeding/failing Promise, automatically showing a loading toast that morphs into a success or error toast depending on the outcome. Use for wiring toast state directly to an async operation's lifecycle.",
    file: "variants/v-toast-5.tsx",
    keywords: [
      "promise toast",
      "async loading success error toast",
      "toastManager.promise",
    ],
    name: "v-toast-5",
  },
  {
    category: "toast",
    description:
      "Button that on each click adds a new toast with a randomly-selected description of varying length (short to very long), incrementing a counter in the title. Use for testing/demonstrating toast stacking behavior with mixed content heights.",
    file: "variants/v-toast-6.tsx",
    keywords: [
      "stacked toasts varying height",
      "multiple toasts test",
      "toast stack demo",
    ],
    name: "v-toast-6",
  },
  {
    category: "toast",
    description:
      "Submit Button using anchoredToastManager (not the default global manager) to show an error toast anchored directly to the button itself (positionerProps.anchor) after a simulated failed async submit, with a Spinner shown in the button while pending. Use for a toast that appears attached to its triggering element rather than a fixed corner.",
    file: "variants/v-toast-7.tsx",
    keywords: [
      "anchored toast",
      "toast attached to button",
      "inline error toast",
    ],
    name: "v-toast-7",
  },
  {
    category: "toast",
    description:
      "Button that fires a sequence of four different social-style notification toasts (new follower, post liked, new reply, mentioned) at staggered delays, disabling itself while 'Incoming…' is in progress. Use to simulate a burst of real-time notification toasts.",
    file: "variants/v-toast-8.tsx",
    keywords: [
      "notification burst simulation",
      "social notifications toast sequence",
    ],
    name: "v-toast-8",
  },
  {
    category: "toast",
    description:
      "Three Buttons demonstrating toast timeout control: a 3-second auto-dismiss toast, an 8-second auto-dismiss toast, and a persistent (timeout: 0) toast with a manual 'Dismiss' action button that clears a ref-tracked id. Use as a reference for controlling toast auto-dismiss duration versus persistent toasts.",
    file: "variants/v-toast-9.tsx",
    keywords: [
      "toast timeout duration",
      "persistent toast",
      "auto dismiss toast",
    ],
    name: "v-toast-9",
  },
  {
    category: "toast",
    description:
      "'Deploy to production' Button that fires a sequence of three toasts representing pipeline stages (Building/loading, Tests passed/success, Deployed to production/success), each replacing the previous one, with a Spinner shown on the button while running. Use for a CI/CD-style multi-stage deployment progress toast flow.",
    file: "variants/v-toast-10.tsx",
    keywords: [
      "deployment progress toast",
      "ci cd pipeline toast",
      "multi stage toast sequence",
    ],
    name: "v-toast-10",
  },
  {
    category: "toast",
    description:
      "A copy-command UI (monospace snippet in a bordered pill with a 'Copy' ghost Button) that on click copies to clipboard and shows a minimal anchoredToastManager toast (data: { tooltipStyle: true }) anchored to the button, styled like a tooltip rather than a standard toast card. Use for a lightweight 'Copied!' tooltip-style confirmation anchored to a copy button.",
    file: "variants/v-toast-11.tsx",
    keywords: [
      "copy to clipboard toast",
      "tooltip style toast",
      "copied confirmation",
    ],
    name: "v-toast-11",
  },
  {
    category: "toast",
    description:
      "'Invite team members' card listing three members with Invite Buttons; clicking Invite disables that row's button and shows a success toast with an 'Undo' action that reverts the invited state and shows a follow-up 'Invite revoked' info toast. Use for a list-driven invite workflow with undoable toast confirmations.",
    file: "variants/v-toast-12.tsx",
    keywords: [
      "invite team members toast",
      "undoable invite action",
      "member list with toast feedback",
    ],
    name: "v-toast-12",
  },
  {
    category: "toast",
    description:
      "'Export to CSV' Button that shows a persistent loading toast, then after a delay closes it and shows a success toast with a 'Download' action button that itself triggers a final 'File saved' success toast. Use for a multi-step export workflow chaining loading → success → download-action toasts.",
    file: "variants/v-toast-13.tsx",
    keywords: [
      "export csv toast flow",
      "chained toast actions",
      "download action toast",
    ],
    name: "v-toast-13",
  },
  {
    category: "toast",
    description:
      "Session-expiry simulation: a Button starts a persistent countdown warning toast with a 'Renew session' action and a live 'expires in Ns' countdown both in the toast description and the trigger button label, ending in an error toast ('Session expired') if not renewed in time, or a success toast if renewed. Use for a session-timeout warning/renewal UX built entirely on toasts with a live countdown.",
    file: "variants/v-toast-14.tsx",
    keywords: [
      "session expiry toast",
      "countdown warning toast",
      "renew session action",
    ],
    name: "v-toast-14",
  },
  {
    category: "toast",
    description:
      "Document-editor mock: an 'Edit document' Button dirties the content and shows a persistent 'Unsaved changes' warning toast with a 'Save now' action; a separate 'Save' Button (loading-aware) closes that toast and shows a 'Document saved' success toast after a delay. Use for an unsaved-changes/save-workflow pattern driven by toast state.",
    file: "variants/v-toast-15.tsx",
    keywords: [
      "unsaved changes toast",
      "save document workflow",
      "dirty state toast warning",
    ],
    name: "v-toast-15",
  },

  // --- toggle ---
  {
    category: "toggle",
    description:
      "Three icon-only Toggles (Bold/Italic/Underline) in a row, the Bold one defaultPressed. Use as the simplest text-formatting toggle-button reference.",
    file: "variants/v-toggle-1.tsx",
    keywords: ["default toggle", "text formatting icon toggles"],
    name: "v-toggle-1",
  },
  {
    category: "toggle",
    description:
      "Two outline-variant Toggles with icon+label content (Italic, Bold). Use for the outline visual variant of Toggle combined with icon+text.",
    file: "variants/v-toggle-2.tsx",
    keywords: ["outline toggle variant", "icon label toggle"],
    name: "v-toggle-2",
  },
  {
    category: "toggle",
    description:
      'Three outline Toggles (Small/Default/Large) demonstrating the size="sm"/"default"/"lg" props side by side. Use as a quick visual reference for Toggle sizes.',
    file: "variants/v-toggle-3.tsx",
    keywords: ["toggle sizes", "small default large toggle"],
    name: "v-toggle-3",
  },
  {
    category: "toggle",
    description:
      "Side-by-side comparison rows pairing a regular Button with a Toggle of the same size/content (text 'Button'/'Toggle' and an icon-only Bold pair) to visually contrast their styling. Use as a reference for how Toggle's appearance compares to Button at equivalent sizes.",
    file: "variants/v-toggle-4.tsx",
    keywords: ["toggle vs button comparison", "toggle button visual diff"],
    name: "v-toggle-4",
  },
  {
    category: "toggle",
    description:
      "Single outline 'Bookmark' Toggle with icon+label where the Bookmark icon fills in via a group-data-[state=on] Tailwind selector when pressed. Use for a labeled bookmark toggle with a fill-on-press icon effect using CSS group state selectors.",
    file: "variants/v-toggle-5.tsx",
    keywords: ["bookmark toggle fill effect", "css group state icon toggle"],
    name: "v-toggle-5",
  },
  {
    category: "toggle",
    description:
      "Controlled bell-icon Toggle for notifications where an unread-count Badge (3) overlays the bell only while the toggle is unpressed (i.e. notifications not yet 'cleared'), disappearing once pressed. Use for a notification-bell toggle with a dismissible unread-count badge.",
    file: "variants/v-toggle-6.tsx",
    keywords: [
      "notification bell toggle",
      "unread count badge toggle",
      "dismissible badge",
    ],
    name: "v-toggle-6",
  },
  {
    category: "toggle",
    description:
      "Controlled heart-icon 'favorite' Toggle that fills the heart icon (fill-current) when pressed. Use for the classic like/favorite heart-icon toggle pattern.",
    file: "variants/v-toggle-7.tsx",
    keywords: ["favorite heart toggle", "like button icon fill"],
    name: "v-toggle-7",
  },
  {
    category: "toggle",
    description:
      "Controlled outline 'Bookmark'/'Bookmarked' Toggle that swaps both its icon (Bookmark ↔ BookmarkCheck, filled when pressed) and its text label based on pressed state. Use for a bookmark toggle with icon and label both reflecting the current state.",
    file: "variants/v-toggle-8.tsx",
    keywords: [
      "bookmark toggle with label swap",
      "stateful icon and text toggle",
    ],
    name: "v-toggle-8",
  },
  {
    category: "toggle",
    description:
      "Video-call control bar: a bordered card showing a live 'In call' pulsing-dot indicator and timer, with large outline Toggles for microphone (mute, destructive-styled when muted), camera (video on/off, destructive-styled when off), and screen-share (icon swap only), plus a separate non-toggle red 'Leave' round button. Use for a video-conferencing control toolbar with mute/camera/share toggles.",
    file: "variants/v-toggle-9.tsx",
    keywords: [
      "video call controls",
      "mute camera screen share toggle",
      "conferencing toolbar",
    ],
    name: "v-toggle-9",
  },
  {
    category: "toggle",
    description:
      "Multi-select 'Filter by role' toggle chips (Design/Engineering/Product/Marketing/Leadership/Research), each a rounded-full outline Toggle with a trailing count Badge that recolors when active; a live 'N results' summary updates based on selected filters' summed counts, with a 'Clear' link appearing once any filter is active. Use for a multi-select filter-chip bar with live result-count aggregation.",
    file: "variants/v-toggle-10.tsx",
    keywords: [
      "filter chips multi select",
      "toggle filter with count badge",
      "clear filters",
    ],
    name: "v-toggle-10",
  },
  {
    category: "toggle",
    description:
      "List of article rows each with title/author and a per-row small outline bookmark Toggle (icon fills when active) tracked in a Set state, with a 'N of M saved' summary footer. Use for a bookmarkable article/reading-list pattern with a saved-count summary.",
    file: "variants/v-toggle-11.tsx",
    keywords: [
      "bookmark article list",
      "saved items toggle list",
      "reading list toggle",
    ],
    name: "v-toggle-11",
  },
  {
    category: "toggle",
    description:
      "Mini rich-text toolbar of four icon Toggles (Strikethrough/Inline code/Blockquote/Link) tracked in a Set, live-transforming a preview line of text ('The quick brown fox') by wrapping it in the corresponding markdown syntax for each active toggle, with an 'Active: ...' status line. Use for a live markdown-formatting toolbar with a text preview.",
    file: "variants/v-toggle-12.tsx",
    keywords: [
      "markdown formatting toolbar",
      "live text preview toggle",
      "rich text toggle group",
    ],
    name: "v-toggle-12",
  },
  {
    category: "toggle",
    description:
      "Social-post action bar (reply/repost/like/share) built from Toggles: reply and share are non-interactive count displays, while repost and like are pressed-state Toggles that recolor (emerald/rose) and increment their displayed count when active, with the like heart also filling in. Use for a Twitter/X-style post-engagement action row.",
    file: "variants/v-toggle-13.tsx",
    keywords: [
      "social post action bar",
      "like repost toggle counts",
      "twitter style engagement",
    ],
    name: "v-toggle-13",
  },
  {
    category: "toggle",
    description:
      "'Server settings' list of three security-style toggles (Secure mode/Insecure, Network access/Offline, Debug visible/hidden), each row swapping its label, description-adjacent icon (Lock/Unlock, Wifi/WifiOff, Eye/EyeOff), and toggle color (emerald when 'on') based on pressed state. Use for a server/security settings panel with icon-and-label-swapping toggles.",
    file: "variants/v-toggle-14.tsx",
    keywords: [
      "server security settings toggle",
      "icon label swap settings",
      "secure network debug toggle",
    ],
    name: "v-toggle-14",
  },
  {
    category: "toggle",
    description:
      "Task-list panel where each task has a checkmark-icon 'mark complete' Toggle (strikes through and dims the task when done) plus a row of four priority Toggles (Low/Medium/High/Urgent, each with a Flag icon and its own active color) allowing exactly one priority to be selected per task. Use for a task manager combining a completion toggle with an exclusive priority-selector toggle group per row.",
    file: "variants/v-toggle-15.tsx",
    keywords: [
      "task list completion toggle",
      "priority selector toggles",
      "task manager pattern",
    ],
    name: "v-toggle-15",
  },

  // --- toggle-group ---
  {
    category: "toggle-group",
    description:
      "Baseline single-select ToggleGroup with three icon items (Bold/Italic/Underline), defaultValue=['bold']. Use as the simplest possible exclusive-selection icon toggle group.",
    file: "variants/v-toggle-group-1.tsx",
    keywords: ["default toggle group", "single select icon group"],
    name: "v-toggle-group-1",
  },
  {
    category: "toggle-group",
    description:
      'Two stacked outline ToggleGroups (Top/Bottom text items) comparing size="sm" vs default size. Use as a quick visual reference for ToggleGroup sizes.',
    file: "variants/v-toggle-group-2.tsx",
    keywords: ["toggle group sizes", "small default size comparison"],
    name: "v-toggle-group-2",
  },
  {
    category: "toggle-group",
    description:
      "Outline-variant Bold/Italic/Underline ToggleGroup with a ToggleGroupSeparator inserted between each item. Use for a formatting toggle group with visible dividers between buttons.",
    file: "variants/v-toggle-group-3.tsx",
    keywords: ["toggle group with separators", "divided formatting toggles"],
    name: "v-toggle-group-3",
  },
  {
    category: "toggle-group",
    description:
      'Same Bold/Italic/Underline outline ToggleGroup as v-toggle-group-3 but with orientation="vertical" and horizontal ToggleGroupSeparators between items, stacking the buttons top-to-bottom. Use for a vertically-stacked formatting toggle group with dividers.',
    file: "variants/v-toggle-group-4.tsx",
    keywords: [
      "vertical toggle group",
      "stacked formatting toggles with separators",
    ],
    name: "v-toggle-group-4",
  },
  {
    category: "toggle-group",
    description:
      "Bold/Italic/Underline ToggleGroup with the `multiple` prop enabled, allowing more than one formatting item to be pressed simultaneously (unlike the default single-select behavior). Use for a multi-select text-formatting toggle group.",
    file: "variants/v-toggle-group-5.tsx",
    keywords: [
      "multi select toggle group",
      "multiple pressed formatting toggles",
    ],
    name: "v-toggle-group-5",
  },
  {
    category: "toggle-group",
    description:
      "Four-icon text-alignment ToggleGroup (Left/Center/Right/Justify), defaultValue left. Use for a paragraph/text-alignment control.",
    file: "variants/v-toggle-group-6.tsx",
    keywords: [
      "text alignment toggle group",
      "align left center right justify",
    ],
    name: "v-toggle-group-6",
  },
  {
    category: "toggle-group",
    description:
      "Outline three-icon view-switcher ToggleGroup (List/Grid/Kanban), defaultValue list. Use for a data-view mode switcher (list vs grid vs kanban).",
    file: "variants/v-toggle-group-7.tsx",
    keywords: ["view mode switcher", "list grid kanban toggle"],
    name: "v-toggle-group-7",
  },
  {
    category: "toggle-group",
    description:
      "Outline three-icon theme-switcher ToggleGroup (Light/Dark/System), defaultValue light. Use for a light/dark/system theme selector control.",
    file: "variants/v-toggle-group-8.tsx",
    keywords: ["theme switcher toggle group", "light dark system theme"],
    name: "v-toggle-group-8",
  },
  {
    category: "toggle-group",
    description:
      "Large-size outline billing-period ToggleGroup with two items (Monthly/Yearly), the Yearly item carrying an inline 'Save 20%' pill badge. Use for a pricing monthly/yearly toggle with an embedded savings badge.",
    file: "variants/v-toggle-group-9.tsx",
    keywords: ["pricing period toggle", "monthly yearly save badge"],
    name: "v-toggle-group-9",
  },
  {
    category: "toggle-group",
    description:
      "Controlled single-select outline ToggleGroup for picking a programming language (TypeScript/JavaScript/Python/Rust) that drives which code snippet is shown in a <pre> block below. Use for a language-picker toggle group paired with a live code-snippet preview.",
    file: "variants/v-toggle-group-10.tsx",
    keywords: ["language picker toggle", "code snippet preview switcher"],
    name: "v-toggle-group-10",
  },
  {
    category: "toggle-group",
    description:
      "Per-column sort-direction control: four table-style rows (Name/Status/Date/Amount) each with its own small two-item ToggleGroup (ascending/descending arrow icons) whose value can also be deselected back to 'none'. Use for a multi-column, per-column ascending/descending sort-direction UI.",
    file: "variants/v-toggle-group-11.tsx",
    keywords: [
      "per column sort toggle",
      "table sort direction control",
      "deselectable toggle group",
    ],
    name: "v-toggle-group-11",
  },
  {
    category: "toggle-group",
    description:
      "Issue-tracker priority selector: a list of three issues each showing its id, a colored priority dot+label, title, and a controlled outline ToggleGroup (Low/Medium/High/Critical, each with a matching colored dot) for setting that issue's priority. Use for a per-row priority-selection control in an issue/ticket list.",
    file: "variants/v-toggle-group-12.tsx",
    keywords: [
      "issue priority selector",
      "ticket priority toggle group",
      "colored priority dots",
    ],
    name: "v-toggle-group-12",
  },
  {
    category: "toggle-group",
    description:
      "Full-width date-range ToggleGroup (Today/Week/Month/Quarter/Year, each item showing a label plus a sublabel date range) that drives a 3-stat summary grid (Revenue/Sessions/Conversions) below, updating values per selected range. Use for an analytics-dashboard date-range selector with live stat updates.",
    file: "variants/v-toggle-group-13.tsx",
    keywords: [
      "date range selector toggle",
      "analytics stats by range",
      "dashboard time period toggle",
    ],
    name: "v-toggle-group-13",
  },
  {
    category: "toggle-group",
    description:
      "Code-editor-toolbar-style multi-select ToggleGroup (word wrap/case-sensitive/filter/sort icons) inside a bordered panel with a file list below and a live 'N active' counter plus a status summary line describing which options are on. Use for a compact multi-toggle toolbar controlling view/search options over a file list.",
    file: "variants/v-toggle-group-14.tsx",
    keywords: [
      "editor toolbar toggle group",
      "multi select view options",
      "file list options toggle",
    ],
    name: "v-toggle-group-14",
  },
  {
    category: "toggle-group",
    description:
      "Zoom-level ToggleGroup (50/75/100/125/150%) driving a live CSS transform: scale() preview box showing 'Hello, world!' text at the selected zoom, with a status line showing current zoom percentage. Use for a zoom-level control with a live scaled preview.",
    file: "variants/v-toggle-group-15.tsx",
    keywords: [
      "zoom level toggle group",
      "scale preview control",
      "zoom percentage selector",
    ],
    name: "v-toggle-group-15",
  },

  // --- toolbar ---
  {
    category: "toolbar",
    description:
      "Rich text-formatting Toolbar combining an alignment ToggleGroup (left/center/right, each wrapped in a Tooltip via ToolbarButton render-prop), a currency/percent formatting ToolbarGroup, a font-family Select embedded as a ToolbarButton, and a trailing 'Save' ToolbarButton, separated by ToolbarSeparators, all within a TooltipProvider. Use as a comprehensive reference for composing Toolbar with ToggleGroup, Select, and tooltips together.",
    file: "variants/v-toolbar-1.tsx",
    keywords: [
      "rich toolbar with select and toggles",
      "toolbar tooltip composition",
      "font format toolbar",
    ],
    name: "v-toolbar-1",
  },
  {
    category: "toolbar",
    description:
      "Document-editor-style Toolbar: an Undo/Redo ToolbarGroup, a multi-select formatting ToggleGroup (Bold/Italic/Underline/Strikethrough with keyboard-shortcut tooltips), a single-select alignment ToggleGroup, and a bullet/numbered-list ToolbarGroup, all icon buttons with TooltipContent showing labels and shortcuts. Use for a full rich-text-editor formatting toolbar with keyboard shortcut hints.",
    file: "variants/v-toolbar-2.tsx",
    keywords: [
      "rich text editor toolbar",
      "undo redo format toolbar",
      "keyboard shortcut tooltips",
    ],
    name: "v-toolbar-2",
  },
  {
    category: "toolbar",
    description:
      "Image-editor Toolbar: a transform ToolbarGroup (Crop/Rotate left/Rotate right), a zoom ToolbarGroup (Zoom out/in/Fit to screen), an Adjustments icon button, and a trailing 'Export' text+icon ToolbarButton, each icon wrapped in a Tooltip. Use for an image-editing application's top toolbar.",
    file: "variants/v-toolbar-3.tsx",
    keywords: [
      "image editor toolbar",
      "crop rotate zoom toolbar",
      "export button toolbar",
    ],
    name: "v-toolbar-3",
  },
  {
    category: "toolbar",
    description:
      "Data-table Toolbar: a flexible search ToolbarInput with a leading search icon filling available space, a row-action icon ToolbarGroup (Filter/Manage columns/Export CSV/Delete selected), and a trailing 'Add row' ToolbarButton. Use for a table/grid management toolbar with search and row actions.",
    file: "variants/v-toolbar-4.tsx",
    keywords: [
      "table toolbar with search",
      "row actions toolbar",
      "add row export delete",
    ],
    name: "v-toolbar-4",
  },
  {
    category: "toolbar",
    description:
      "Code-snippet Toolbar: a language Select embedded as a ToolbarButton, a word-wrap ToggleGroup item, a copy-code icon button (with copied-state check icon and tooltip text swap), and a 'Run' ToolbarButton showing a loading state while a simulated run executes. Use for a code-playground/snippet-runner toolbar.",
    file: "variants/v-toolbar-5.tsx",
    keywords: [
      "code snippet toolbar",
      "run code button",
      "copy code toolbar with language select",
    ],
    name: "v-toolbar-5",
  },
  {
    category: "toolbar",
    description:
      "Document-header Toolbar with justify-between layout: a document title on the left, and on the right an Edit/Preview mode ToggleGroup (icon+label items), a Comments/Version history/More-options icon ToolbarGroup, and a trailing 'Share' ToolbarButton. Use for a Google-Docs-style document toolbar with a title and mode switcher.",
    file: "variants/v-toolbar-6.tsx",
    keywords: [
      "document header toolbar",
      "edit preview mode toggle",
      "share document toolbar",
    ],
    name: "v-toolbar-6",
  },
  {
    category: "toolbar",
    description:
      "File-browser Toolbar: a plain search input, a sort-order Select embedded as a ToolbarButton (with a sort icon), a Filter icon button, and a Grid/List view ToggleGroup, wrapped to a new line on small widths (flex-wrap). Use for a file-manager/gallery toolbar with search, sort, filter, and view-mode controls.",
    file: "variants/v-toolbar-7.tsx",
    keywords: [
      "file browser toolbar",
      "search sort filter view toggle",
      "gallery toolbar",
    ],
    name: "v-toolbar-7",
  },
  {
    category: "toolbar",
    description:
      "Canvas/design-tool Toolbar: a Light/Dark mode ToggleGroup, a zoom control ToolbarGroup (zoom out/live percentage label/zoom in/reset-to-100%, with min/max disabled states), and a 'Reset canvas' icon button. Use for a design-canvas toolbar with theme switching and stepped zoom controls.",
    file: "variants/v-toolbar-8.tsx",
    keywords: [
      "canvas zoom toolbar",
      "design tool toolbar",
      "stepped zoom control",
    ],
    name: "v-toolbar-8",
  },
  {
    category: "toolbar",
    description:
      "Video-call control Toolbar: microphone and camera ToolbarButtons that switch to destructive variant/icon when muted/off, a screen-share ToolbarButton switching to secondary variant when active, and a destructive 'Leave' text+icon ToolbarButton, each with state-aware tooltip labels. Use for a video-conferencing call-control bar built on the Toolbar primitive.",
    file: "variants/v-toolbar-9.tsx",
    keywords: [
      "video call toolbar controls",
      "mute camera share leave toolbar",
      "conferencing control bar",
    ],
    name: "v-toolbar-9",
  },
  {
    category: "toolbar",
    description:
      "Markdown/rich-text editor Toolbar: a block-type Select (Paragraph/Heading 1/Heading 2/Quote/Code block) embedded as a ToolbarButton, a multi-select inline-format ToggleGroup (Bold/Italic/Underline/Inline code), a block-format icon ToolbarGroup (H1/H2/bullet/numbered/blockquote), and an Insert-link icon button, wrapping to multiple lines on narrow widths. Use for a full markdown-style editor toolbar combining a block-type selector with inline and block formatting controls.",
    file: "variants/v-toolbar-10.tsx",
    keywords: [
      "markdown editor toolbar",
      "block type select toolbar",
      "inline and block formatting",
    ],
    name: "v-toolbar-10",
  },

  // --- tooltip ---
  {
    category: "tooltip",
    description:
      "Baseline Tooltip: a single outline Button trigger showing 'Helpful hint' in the TooltipPopup on hover/focus. Use as the simplest possible tooltip.",
    file: "variants/v-tooltip-1.tsx",
    keywords: ["default tooltip", "basic tooltip trigger"],
    name: "v-tooltip-1",
  },
  {
    category: "tooltip",
    description:
      "Three icon ToggleGroupItems (Bold/Italic/Underline) inside a TooltipProvider, each individually wrapped in its own Tooltip showing the formatting label via TooltipTrigger's render-prop composition with ToggleGroupItem. Use as a reference for composing Tooltip + TooltipTrigger render-prop with ToggleGroup items.",
    file: "variants/v-tooltip-2.tsx",
    keywords: [
      "tooltip with toggle group",
      "render prop tooltip composition",
      "icon toggle tooltips",
    ],
    name: "v-tooltip-2",
  },
  {
    category: "tooltip",
    description:
      "Advanced pattern using TooltipCreateHandle to share a single Tooltip instance across three ToggleGroupItems (Bold/Italic/Underline), where each trigger passes a different `payload` (a small content component) rendered by the shared Tooltip's render-function. Use for an optimized single-tooltip-instance pattern across many triggers with per-trigger dynamic content via a shared handle.",
    file: "variants/v-tooltip-3.tsx",
    keywords: [
      "shared tooltip handle",
      "tooltip payload pattern",
      "single instance multiple triggers",
    ],
    name: "v-tooltip-3",
  },
  {
    category: "tooltip",
    description:
      "3×2 grid of six outline Buttons demonstrating every TooltipContent `side` value (inline-start/left/top/bottom/right/inline-end), each showing 'Add to library'. Use as a visual reference for all available tooltip placement sides.",
    file: "variants/v-tooltip-4.tsx",
    keywords: [
      "tooltip placement sides",
      "tooltip side reference",
      "all tooltip directions",
    ],
    name: "v-tooltip-4",
  },
  {
    category: "tooltip",
    description:
      "Single icon-only ghost Button (InfoIcon) with a centered short-text TooltipContent ('Additional information and help context.'). Use for a simple info-icon help tooltip.",
    file: "variants/v-tooltip-5.tsx",
    keywords: ["info icon tooltip", "help tooltip"],
    name: "v-tooltip-5",
  },
  {
    category: "tooltip",
    description:
      "Notification-bell-style icon Button with an unread-count Badge overlay, whose TooltipContent expands into a rich mini-panel: a 'Notifications'/'3 new' header row, a short bulleted list of recent notifications, and a 'View all' link with an arrow icon. Use for a rich notifications-preview tooltip triggered from an icon button.",
    file: "variants/v-tooltip-6.tsx",
    keywords: [
      "notifications preview tooltip",
      "rich tooltip panel",
      "unread badge tooltip",
    ],
    name: "v-tooltip-6",
  },
  {
    category: "tooltip",
    description:
      "Compact formatting+alignment icon toolbar (Bold/Italic/Underline/Strikethrough plus Align left/center/right/justify) where each icon button's TooltipContent shows the label alongside its keyboard shortcut rendered with Kbd components, separated by a vertical divider between the two tool groups. Use for an icon toolbar with keyboard-shortcut tooltips using the Kbd component.",
    file: "variants/v-tooltip-7.tsx",
    keywords: [
      "toolbar tooltip with kbd shortcuts",
      "keyboard shortcut hint tooltip",
      "formatting icon toolbar",
    ],
    name: "v-tooltip-7",
  },
  {
    category: "tooltip",
    description:
      "Overlapping avatar-stack ('facepile') of team members with ring borders and hover-lift animation, each Avatar wrapped in a Tooltip showing name+role, plus a trailing '+N' overflow avatar whose tooltip lists the extra member names, and a final dashed 'add member' circle button with its own tooltip. Use for a team-member facepile/avatar-stack with per-avatar and overflow tooltips.",
    file: "variants/v-tooltip-8.tsx",
    keywords: [
      "avatar facepile tooltip",
      "team member stack",
      "overflow avatar tooltip",
    ],
    name: "v-tooltip-8",
  },
  {
    category: "tooltip",
    description:
      "Row of three analytics metric cards (Page Views/Bounce Rate/Conversions) each showing a trend icon+percentage as the trigger, with a detailed TooltipContent breaking down Current/Previous/period-change values. Use for compact stat cards that reveal a detailed comparison breakdown on hover.",
    file: "variants/v-tooltip-9.tsx",
    keywords: [
      "metric card tooltip breakdown",
      "stat comparison tooltip",
      "analytics tooltip detail",
    ],
    name: "v-tooltip-9",
  },
  {
    category: "tooltip",
    description:
      "Row of color swatches (a brand palette) each a small colored square trigger whose TooltipContent shows a color preview chip, the color's name, and its hex code in monospace. Use for a color-palette picker/inspector with per-swatch identification tooltips.",
    file: "variants/v-tooltip-10.tsx",
    keywords: ["color palette tooltip", "swatch inspector", "hex code tooltip"],
    name: "v-tooltip-10",
  },
  {
    category: "tooltip",
    description:
      "API-credentials panel: three labeled rows (API Key/Endpoint/Webhook) each showing a monospace value and a per-row copy icon button whose Tooltip text swaps between 'Copy to clipboard' and 'Copied!' (with a matching check icon) after clicking. Use for a credentials/secrets display panel with per-field copy-to-clipboard tooltips.",
    file: "variants/v-tooltip-11.tsx",
    keywords: [
      "copy to clipboard tooltip",
      "api credentials panel",
      "copied feedback tooltip",
    ],
    name: "v-tooltip-11",
  },
  {
    category: "tooltip",
    description:
      "Feature-icon toolbar where free features show a plain label tooltip, but Pro-gated features (dimmed icon) show a rich TooltipContent with the feature name, a 'Pro' crown Badge, a description, and an 'Upgrade to Pro' link with an arrow icon. Use for a feature toolbar that upsells locked Pro features via rich tooltips.",
    file: "variants/v-tooltip-12.tsx",
    keywords: [
      "pro feature upsell tooltip",
      "locked feature tooltip",
      "upgrade to pro link",
    ],
    name: "v-tooltip-12",
  },
  {
    category: "tooltip",
    description:
      "Form-field-hint pattern: three labeled Inputs (Username/Password/Email) each with a small info-icon Tooltip next to the label showing format/validation requirements text (max-width constrained). Use for inline field-level help tooltips explaining input format requirements.",
    file: "variants/v-tooltip-13.tsx",
    keywords: [
      "field hint tooltip",
      "input format requirements",
      "inline form help",
    ],
    name: "v-tooltip-13",
  },
  {
    category: "tooltip",
    description:
      "Compact status-dashboard strip ('Services' label plus a row of colored status dots for API Gateway/Auth/Image CDN/Database/Email Worker/Search Index), each dot a Tooltip trigger showing the service name, status label, uptime, and latency. Use for a system-status/uptime indicator row with per-service detail tooltips.",
    file: "variants/v-tooltip-14.tsx",
    keywords: [
      "service status dots tooltip",
      "uptime monitoring indicator",
      "system health dashboard",
    ],
    name: "v-tooltip-14",
  },
  {
    category: "tooltip",
    description:
      "Vertical icon sidebar navigation (Home/Analytics/Team/Docs/Settings, Home marked active) where each icon button's Tooltip appears on the right side and shows the nav label plus a short description. Use for an icon-only sidebar nav with right-side descriptive tooltips.",
    file: "variants/v-tooltip-15.tsx",
    keywords: [
      "icon sidebar navigation tooltip",
      "right side tooltip nav",
      "nav icon descriptions",
    ],
    name: "v-tooltip-15",
  },
  {
    category: "tooltip",
    description:
      "Permissions-matrix table (Resource rows × Admin/Editor/Viewer columns) where each access cell is an icon (full/read/none, color-coded) wrapped in a Tooltip revealing the access level name and a detailed explanation of what that permission covers. Use for a roles/permissions matrix with per-cell explanatory tooltips.",
    file: "variants/v-tooltip-16.tsx",
    keywords: [
      "permissions matrix tooltip",
      "roles table access icons",
      "access level explanation tooltip",
    ],
    name: "v-tooltip-16",
  },
  {
    category: "tooltip",
    description:
      "Horizontal CI/CD pipeline-stage tracker (Test → Build → Publish → Deploy → Verify) with connecting lines that color when a stage is done, each stage showing a status icon (check/spinner/circle/x) and name, and a Tooltip revealing the stage name, status label, duration, and a detail sentence. Use for a build/deploy pipeline visualization with per-stage status tooltips.",
    file: "variants/v-tooltip-17.tsx",
    keywords: [
      "ci cd pipeline tooltip",
      "deploy stage tracker",
      "build status tooltip steps",
    ],
    name: "v-tooltip-17",
  },
];
