# Permanent UI Design System — IDDO Restaurant

This document defines the permanent default UI design system and brand guidelines for this application. All future modifications, features, and components must adhere strictly to these design standards.

## Brand Identity & Theme
- **Brand**: IDDO Restaurant & Coffee Bar
- **Location**: Semay Tower, Bole Wollo Sefer (next to Garad Mall), Addis Ababa, Ethiopia
- **Essence**: Premium 24/7 kitchen, specialty coffee bar, fresh shawarma station, lunch buffet, Thursday live jazz, and celebratory artisanal pastry.
- **Tone & Aesthetic**: Sophisticated editorial hospitality, generous spacing, high typographical contrast, warm ambient lighting.

---

## 1. Color Chemistry (Strict Palette)
Always use these exact color codes across all components:
- **Primary Canvas / Deep Forest Green**: `#0B281B` (Hero backdrop, find us section, footer, modal bodies)
- **Brand Mustard Gold / Warm Accent**: `#F4B838` (Emblem fill, primary CTA buttons, italicized headline emphasis, star ratings, price tags)
- **Hover Gold**: `#E4A82B`
- **Warm Alabaster / Ivory Section**: `#FBF8F2` (Contrast background for "Every hour has a table" section)
- **Tobacco Ochre / Warm Celebration**: `#7E5229` (Enkutatash New Year posters, celebration banners, promotional cards)
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
  - Heading Accent Pattern: Headings pair Roman serif with one italicized golden word (e.g., *moment*, *table*, *we did*, *Wollo Sefer*).
- **Body Sans**: Plus Jakarta Sans / system sans-serif.
  - Used for descriptive copy, body text, buttons, and navigation.
- **Monospace & Metadata**: `font-mono`
  - Used for prices (e.g., `450 ETB`), timestamps, hours (e.g., `05:00 — 11:00`), and live ticker badges.
- **Micro-labels & Eyebrows**: Uppercase with wide tracking (`tracking-[0.22em]` or `tracking-[0.24em]`), bold weight, golden accent (`text-[#F4B838]`).

---

## 3. Structural Layout & Components
1. **Navigation Bar**:
   - Custom SVG IDDO circular emblem + gold wordmark.
   - Uppercase subtitle "TASTE THE MOMENT".
   - Links: Food menu, Drinks, Desserts, Buffet, What's On, Catering, Visit.
   - Quick Info toggle button (`#B0C32E`).
2. **Hero**:
   - Location eyebrow badge ("SEMAY TOWER · BOLE WOLLO SEFER · ADDIS ABABA").
   - Large display title ("Taste the moment.").
   - Primary gold CTA ("EXPLORE MENU") + Secondary pill ("EVERY HOUR").
3. **Live Status Ticker**:
   - Continuous real-time 24-hour status indicator synchronized with local time.
   - Active status badges (Shawarma station, Buffet, Live Jazz, 24/7 open).
4. **Day-Part Table Grid ("Every hour has a table")**:
   - Ivory canvas (`#FBF8F2`) with dark cards.
   - 5 time blocks: Morning (05:00-11:00), Midday (11:00-15:00), Afternoon (15:00-17:00), Evening (17:00-23:00, marked with `● NOW` if active), Late (23:00-05:00).
5. **Promotional Carousel**:
   - Tobacco brown cards (`#7E5229`).
   - Seasonal items (Enkutatash Torta Cake pre-order, weekly free dessert feedback draw).
6. **Location & Find Us**:
   - Semay Tower, Bole Wollo Sefer address and directions CTA.
   - 4 feature cards: 24/7 Hours, Mon-Fri Buffet, 5pm Shawarma, Thursday Jazz.
7. **Footer**:
   - 4 bento contact cards (Call Us, Email Us, Find Us, Open 24h).
   - 4-column navigation (Eat, Visit, Catering, Follow).
8. **Interactive Modals & Drawers**:
   - Menu Modal with category filters and search.
   - Cake Pre-order Modal for Enkutatash celebrations.
   - Feedback Modal with 5-star rating and weekly giveaway draw.
   - Table Reservation & Booking Modal.
   - Directions & Map Modal.
9. **Floating Feedback Button**:
   - Fixed bottom-right pill with star icon and gold border.
