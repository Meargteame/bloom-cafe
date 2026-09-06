# Permanent UI Design System — IDDO Restaurant / Bloom Cafe

This document defines the permanent default UI design system and brand guidelines for this application. All future modifications, features, and components must adhere strictly to these design standards.

## Brand Identity & Theme
- **Essence**: Premium specialty kitchen, artisan coffee roastery, celebratory pastry, and seamless digital table service.
- **Tone & Aesthetic**: Sophisticated editorial hospitality, generous spacing, high typographical contrast, warm ambient lighting.

---

## 1. Color Chemistry (Strict Palette)
Always use these exact color codes across all components:
- **Primary Canvas / Deep Forest Green**: `#0B281B` (Hero backdrop, find us section, footer, modal bodies)
- **Brand Mustard Gold / Warm Accent**: `#F4B838` (Emblem fill, primary CTA buttons, italicized headline emphasis, star ratings, price tags)
- **Hover Gold**: `#E4A82B`
- **Warm Alabaster / Ivory Section**: `#FBF8F2` (Contrast background for "Every hour has a table" and digital menu sections)
- **Tobacco Ochre / Warm Celebration**: `#7E5229` (Celebration banners, promotional cards)
- **Obsidian Dark Green**: `#071E13` / `#082015` (Status ticker bar, input fields, bento card backgrounds)
- **Olive Starburst**: `#B0C32E` (Top-right quick info badge)
- **Muted Forest Borders**: `#16422E`, `#1B4C36`, `#23503B`
- **Text Shades**:
  - Primary display on dark: `#FAF8F5` / `#FFFFFF`
  - Secondary text on dark: `#CAD4CD` / `#A8BAAE` / `#8FA597`
  - Display on light ivory: `#0B281B`
  - Secondary text on light ivory: `#4A5850`

---

## 2. Typography & Typographic Hierarchy
- **Display Serif (`font-editorial`)**: Cormorant Garamond / Playfair Display serif.
  - Used for all major headlines (H1, H2, H3), item titles, and card headers.
  - Heading Accent Pattern: Headings pair Roman serif with one italicized golden word (e.g., *moment*, *table*, *bloom*, *roastery*).
- **Body Sans**: Plus Jakarta Sans / system sans-serif.
  - Used for descriptive copy, body text, buttons, and navigation.
- **Monospace & Metadata**: `font-mono`
  - Used for prices, timestamps, hours, table tags, and live ticker badges.
- **Micro-labels & Eyebrows**: Uppercase with wide tracking (`tracking-[0.22em]` or `tracking-[0.24em]`), bold weight, golden accent (`text-[#F4B838]`).

---

## 3. Structural Layout & Components
1. **Navigation Bar**:
   - Custom SVG circular emblem + gold wordmark.
   - Uppercase subtitle.
   - Quick Info toggle & QR code trigger.
   - Admin & Public toggle.
2. **Hero**:
   - Location eyebrow badge.
   - Large display title with italicized gold word.
   - Primary gold CTA + Secondary outline pill.
3. **Live Status Ticker**:
   - Continuous real-time status indicator synchronized with local time.
   - Active status badges (Specialty Pour-over, Morning Brioche, Lunch Service, Free Guest WiFi).
4. **Digital Menu & Day-Part Table Grid**:
   - Ivory canvas (`#FBF8F2`) with dark and ivory cards.
   - Category filters (Specialty Coffee, Handcrafted Teas, Fresh Bakery, All-Day Brunch, Toasties & Paninis, Desserts).
   - In-stock availability badges, dietary tags, and table order tray.
5. **Promotional Carousel**:
   - Tobacco brown cards (`#7E5229`).
6. **Location & Find Us**:
   - Address, hours, wifi, and directions.
   - 4 bento feature cards.
7. **Footer**:
   - 4 bento contact cards and navigation columns.
8. **Interactive Modals & Drawers**:
   - Digital Menu Modal with category filters and search.
   - QR Code Table Stand Generator with print preview.
   - Order Tray Drawer for table orders.
   - Admin Management Portal for staff.
