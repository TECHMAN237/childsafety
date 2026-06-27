---
name: Guardian Flow
colors:
  surface: '#fdf8ff'
  surface-dim: '#ddd8e6'
  surface-bright: '#fdf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f1ff'
  surface-container: '#f1ebfa'
  surface-container-high: '#ebe6f4'
  surface-container-highest: '#e5e0ef'
  on-surface: '#1c1a24'
  on-surface-variant: '#474556'
  inverse-surface: '#312f3a'
  inverse-on-surface: '#f4eefd'
  outline: '#787588'
  outline-variant: '#c9c4d9'
  surface-tint: '#5b38ee'
  primary: '#532ce6'
  on-primary: '#ffffff'
  primary-container: '#6c4dff'
  on-primary-container: '#f6f0ff'
  inverse-primary: '#c8bfff'
  secondary: '#5f5e60'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfe1'
  on-secondary-container: '#636264'
  tertiary: '#8f3e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55100'
  on-tertiary-container: '#ffefe9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c8bfff'
  on-primary-fixed: '#190064'
  on-primary-fixed-variant: '#4206d7'
  secondary-fixed: '#e4e2e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1b1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb68e'
  on-tertiary-fixed: '#331200'
  on-tertiary-fixed-variant: '#773300'
  background: '#fdf8ff'
  on-background: '#1c1a24'
  surface-variant: '#e5e0ef'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is engineered to evoke **unwavering trust, immediate clarity, and calm efficiency**. As a child safety platform, the visual language prioritizes psychological comfort through "soft" geometry while maintaining the "high-tech" precision required for emergency response.

The aesthetic follows a **Premium Minimalist** approach with a **Tactile** twist:
- **Calmness through Whitespace:** Generous breathing room between elements to prevent cognitive overload during stressful situations.
- **Organic Geometry:** Large, 32px radii create a "hug-like" softness, moving away from the cold, sharp edges of traditional security software.
- **Trust-Centered Depth:** Using subtle, colored shadows (tinted with the primary purple) to create a layered environment that feels physically safe and organized.

## Colors

The palette is anchored by **Guardian Purple**, a color that balances the authority of blue with the warmth of red.

- **Primary & Neutrals:** The UI uses a high-contrast white-on-gray foundation. The "Soft Black" is reserved for high-priority typography to ensure maximum legibility without the harshness of pure hex #000.
- **Functional Semantics:** 
    - **Emergency Red (#FF4D4F):** Reserved exclusively for "Urgent" badges and SOS actions.
    - **Success Green (#34C759):** Used for "Found" status and confirmation states.
    - **Warning Orange (#FFB020):** Used for low-priority alerts and tips.
- **Interactive States:** Use a 10% opacity overlay of the primary color for pressed states and 5% for hover/background tints.

## Typography

This design system utilizes **Plus Jakarta Sans** (as a high-quality alternative to Poppins) for headlines to provide a friendly, modern, and open geometric feel. **Inter** is used for body copy due to its exceptional legibility in data-heavy contexts.

- **Scale:** On mobile devices, avoid using sizes above 24px for standard content; reserve 32px exclusively for "Welcome" states or major dashboard stats.
- **Hierarchy:** Use FontWeight 700 for headlines to create a clear "anchor" for the eye. Secondary information should utilize `body-md` in a 60% opacity of Soft Black.

## Layout & Spacing

The layout follows a **Fluid Mobile-First** model with a focus on reachability.

- **The Grid:** A 4-column fluid grid for mobile with a 20px outside margin.
- **Touch Targets:** All interactive elements (buttons, chips) must maintain a minimum height of 48px to ensure accessibility for stressed users.
- **Vertical Rhythm:** Use the 8px-based system. Most cards should use `xl` (32px) padding to align with the large corner radii, creating a cohesive visual weight.

## Elevation & Depth

This design system uses **Tonal Elevation** combined with **Soft Diffusion Shadows**.

- **Level 0 (Background):** Light Gray (#F7F7FA).
- **Level 1 (Cards/Surfaces):** Pure White (#FFFFFF) with a very soft shadow: `0px 4px 20px rgba(108, 77, 255, 0.06)`. Note the subtle purple tint in the shadow.
- **Level 2 (Urgent Alerts):** These use a stronger shadow and a 1px inner stroke of the primary color at 10% opacity to "lift" them further.
- **Level 3 (FAB/Modals):** High-contrast depth with `0px 12px 32px rgba(0, 0, 0, 0.12)`.

## Shapes

The "Ultra-Rounded" characteristic is a core pillar of the design system.
- **Containers & Cards:** 32px (`rounded-xl` in this system) is the standard for all primary containers and profile images.
- **Buttons:** Fully pill-shaped (half-height radius) to differentiate them from cards.
- **Input Fields:** 16px radius to provide enough structure for text alignment while remaining consistent with the soft language.

## Components

### Urgent Alert Cards
Large-format cards with a 32px radius. They must feature a 4px left-accent border in Emergency Red (#FF4D4F). Headlines within these cards should be set to `headline-md` for immediate impact.

### Smart Device FAB
A futuristic, floating circular button. It uses a Gradient Fill (Primary Purple to a slightly lighter violet) with a "Glassmorphism" ring around it. The icon should be a clean, 24px line-art representation of a shield or radar.

### Multi-Step Form Elements
- **Progress Trackers:** Minimalist dots. The active step is a 24px pill; inactive steps are 8px circles.
- **Inputs:** White background with a 1px Light Gray stroke. On focus, the stroke becomes Primary Purple with a 4px soft outer glow.

### Report Listings & Badges
- **Urgency Badges:** Small, pill-shaped labels with high-contrast backgrounds (Red for Urgent, Purple for New).
- **List Items:** Horizontal layout with a 64px rounded square for the child's photo. Use `body-md` for the name and `label-sm` for the timestamp/location.

### Buttons
- **Primary:** Purple background, white text, pill-shaped.
- **Secondary:** White background, Purple border, Purple text.
- **Destructive:** Red background, white text (reserved for SOS).