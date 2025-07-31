# UIDB Agent - Ubiquiti Design System

**Version:** 1.0  
**Date:** July 30, 2025  
**Status:** Implemented

## Overview

The UIDB Agent follows Ubiquiti's modern design language, incorporating their visual identity and user experience patterns observed from ui.com and store.ui.com. This document outlines the design principles, components, and styling guidelines.

## Design Principles

### 1. Brand Consistency
- Primary brand color: **Blue-600** (#2563eb)
- Clean, modern aesthetic with professional appeal
- Consistent spacing and typography hierarchy
- Focus on product imagery and technical specifications

### 2. Visual Hierarchy
- Bold typography for primary content
- Clear information architecture
- Progressive disclosure of details
- Emphasis on product names and key specifications

### 3. User Experience
- Intuitive navigation and search
- Responsive design for all screen sizes
- Smooth transitions and hover effects
- Accessible focus states and keyboard navigation

## Color Palette

### Primary Colors
```css
--ui-blue-primary: #006FFF    /* Primary brand color - Ubiquiti Blue */
--ui-blue-hover: #0059CC      /* Hover states */
--ui-blue-50: #eff6ff
--ui-blue-100: #dbeafe
--ui-blue-600: #2563eb        /* Secondary blue */
--ui-blue-700: #1d4ed8        /* Active states */
--ui-blue-800: #1e40af
```

### Neutral Colors
```css
--ui-white: #FFFFFF           /* Pure white backgrounds */
--ui-gray-50: #F9FAFA         /* Light backgrounds */
--ui-gray-100: #F4F5F6        /* Card backgrounds */
--ui-gray-200: #EDEDF0        /* Subtle borders */
--ui-gray-300: #B6B9C4        /* Form borders */
--ui-gray-500: #808893        /* Muted text */
--ui-gray-600: #50565E        /* Secondary text */
--ui-gray-700: #212327        /* Dark text */
--ui-gray-900: rgba(0, 0, 0, 0.85)  /* Primary text */
--ui-text-muted: rgba(0, 0, 0, 0.65) /* Muted labels */
--ui-text-subtle: rgba(0, 0, 0, 0.45) /* Subtle text */
```

### Accent Colors
```css
--ui-green-500: #10b981       /* Success/Live indicators */
--ui-red-primary: #F03A3E     /* Error states */
--ui-red-light: #F9B0B2       /* Light red for warnings */
```

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Scale
- **H1 (Page Title):** 48px, font-weight: 800
- **H2 (Section Headers):** 36px, font-weight: 700
- **H3 (Component Titles):** 24px, font-weight: 700
- **Body Large:** 18px, font-weight: 600
- **Body:** 16px, font-weight: 400
- **Body Small:** 14px, font-weight: 400
- **Caption:** 12px, font-weight: 600, text-transform: uppercase

## Component Library

### Header Component
```css
.header {
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #f3f4f6;
  height: 80px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #2563eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
}
```

### Device Cards
Based on Ubiquiti's official style guide and product design patterns:

```css
.device-card {
  background: #FFFFFF;
  border: 1px solid #EDEDF0;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0px 16px 32px 0px rgba(28, 30, 45, 0.2);
}

.device-card:hover {
  background: #F9FAFA;
  border-color: #006FFF;
  transform: translateY(-2px);
}

.device-card.selected {
  border-color: #006FFF;
  box-shadow: 0 0 0 1px #006FFF;
}

.device-card.focus {
  border-color: #006FFF;
  box-shadow: 0 0 0 1px #006FFF;
}

.device-image-container {
  background: #F9FAFA;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #EDEDF0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.device-title {
  font-size: 14px;
  font-weight: 400;
  color: #50565E;
  margin-bottom: 8px;
}

.device-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #808893;
  margin-bottom: 12px;
}

.device-specs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 8px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 82px;
  padding: 6px 0px;
}

.spec-label {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}

.spec-value {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  text-align: right;
}

.product-line-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #dbeafe;
  color: #1e40af;
}

.alias-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: #F4F5F6;
  color: #374151;
}
```

### Search and Filters
Based on Ubiquiti's official style guide components:

```css
.search-container {
  background: #FFFFFF;
  border-bottom: 1px solid #EDEDF0;
  box-shadow: 0px 16px 32px 0px rgba(28, 30, 45, 0.2);
  padding: 24px 0;
}

.search-input {
  width: 344px;
  padding: 12px 16px 12px 48px;
  border: 1px solid #EDEDF0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.search-input:hover {
  background: #F9FAFA;
}

.search-input:focus {
  outline: none;
  border-color: #006FFF;
  box-shadow: 0 0 0 1px #006FFF;
}

.search-input:active {
  border-color: #006FFF;
}

.filter-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  background: transparent;
  color: rgba(0, 0, 0, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background: #F9FAFA;
  color: #006FFF;
}

.filter-button:active {
  background: #F4F5F6;
  color: rgba(0, 0, 0, 0.45);
}

.filter-button:focus {
  outline: none;
  border: 1px solid #006FFF;
  color: #006FFF;
}

.filter-dropdown {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 16px 32px 0px rgba(28, 30, 45, 0.2);
  border: 1px solid #EDEDF0;
}

.filter-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0px;
  cursor: pointer;
}

.filter-reset {
  color: #F03A3E;
}

.filter-reset:hover {
  color: #F9B0B2;
}
```

### Buttons and CTAs
Based on Ubiquiti's official CTA design patterns:

```css
.btn-primary {
  background: #006FFF;
  color: #FFFFFF;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.btn-primary:hover {
  background: #0059CC;
}

.btn-primary:focus {
  outline: none;
  border: 1px solid #006FFF;
  box-shadow: 0 0 0 1px #006FFF;
}

.btn-secondary {
  background: transparent;
  color: #006FFF;
  padding: 6px 12px;
  border: 1px solid #006FFF;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.btn-secondary:hover {
  background: #F9FAFA;
}

.btn-secondary:focus {
  outline: none;
  border: 1px solid #006FFF;
}

.cta-link {
  color: #006FFF;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-link:hover {
  color: #0059CC;
}
```

## Layout Guidelines

### Spacing System
Based on Ubiquiti's design system spacing:
- **xs:** 2px
- **sm:** 6px  
- **md:** 8px
- **lg:** 16px
- **xl:** 24px
- **2xl:** 32px
- **3xl:** 48px
- **4xl:** 82px  /* Special gap for spec layouts */

### Border Radius
- **Small components:** 4px
- **Cards and containers:** 8px
- **Pills and badges:** 9999px (fully rounded)

### Container Widths
- **Maximum width:** 1280px (7xl)
- **Padding:** 16px on mobile, 24px on tablet, 32px on desktop
- **Content areas:** Use consistent horizontal padding

### Grid System
- **Device cards:** Responsive grid with consistent gaps
- **Minimum card width:** 320px
- **Card gaps:** 16px on mobile, 24px on desktop

## Interactive States

### Hover Effects
- **Cards:** Background change to #F9FAFA + subtle lift (2px translateY)
- **Buttons:** Darken primary color (#006FFF → #0059CC)
- **Inputs:** Background change to #F9FAFA
- **Icons/List items:** Background change to #F4F5F6

### Focus States
- **All interactive elements:** 1px solid #006FFF border
- **Input fields:** 1px solid #006FFF border + shadow
- **High contrast:** Ensure 3:1 contrast ratio minimum

### Active States
- **Buttons:** Background #F4F5F6 for secondary actions
- **Cards:** Border color #006FFF
- **Search:** Border color #006FFF

### Loading States
- **Spinner:** #006FFF primary color with white background
- **Skeleton:** #F4F5F6 placeholder with subtle animation
- **Backdrop blur:** rgba(255, 255, 255, 0.85) with 4px blur

## Responsive Behavior

### Breakpoints
```css
--mobile: 768px
--tablet: 1024px
--desktop: 1280px
```

### Adaptations
- **Mobile:** Single column layout, simplified navigation
- **Tablet:** 2-3 columns, condensed spacing
- **Desktop:** Full multi-column layout, expanded spacing

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard navigation:** All interactive elements accessible via tab
- **Screen readers:** Proper ARIA labels and semantic HTML
- **Focus indicators:** Clear visual focus rings

### Implementation Notes
- Use semantic HTML elements
- Provide alt text for all images
- Ensure form labels are properly associated
- Test with keyboard-only navigation

## Animation Guidelines

### Timing Functions
```css
--ease-ui: cubic-bezier(0.4, 0, 0.2, 1);
--ease-ui-out: cubic-bezier(0, 0, 0.2, 1);
--ease-ui-in: cubic-bezier(0.4, 0, 1, 1);
```

### Duration
- **Micro-interactions:** 150ms
- **Component transitions:** 200ms
- **Page transitions:** 300ms

### Principles
- **Meaningful motion:** Animations should provide feedback or guide attention
- **Performance:** Use transform and opacity for smooth 60fps animations
- **Reduced motion:** Respect user preferences for reduced motion

## Implementation Status

### ✅ Completed Components
- [x] Header with Ubiquiti logo and styling
- [x] Search and filter controls (updated to match style guide)
- [x] Device cards with official design patterns
- [x] Loading and error states
- [x] Responsive grid layout
- [x] Hover, focus, and active states
- [x] Official Ubiquiti color scheme implementation
- [x] Typography system matching UI Sans font family
- [x] Interactive states (hover, focus, active)
- [x] Checkbox and form control styling

### 🔄 In Progress
- [ ] Table scrolling behavior
- [ ] Search box list item interactions
- [ ] Filter dropdown animations
- [ ] Mobile responsive refinements

### 📋 Future Enhancements
- [ ] Dark mode support
- [ ] Advanced filtering UI with dropdown menus
- [ ] Bulk selection with checkboxes
- [ ] Table sorting and column management
- [ ] Export functionality styling
- [ ] Logo component variants (default, hover, focus)

## References

- **Ubiquiti Official Style Guide:** Primary reference for all design decisions
- **Figma Design System:** Comprehensive component library and specifications
- **UI.com Homepage:** Clean modern layout, blue accent colors
- **UI.com Store:** Product card design, typography hierarchy
- **Ubiquiti Brand Guidelines:** Official color palette (#006FFF) and logo usage
- **UI Sans Font Family:** Official Ubiquiti typography system
- **Component States:** Default, hover, focus, active, and search states

## Design Tokens

### Key Measurements
- **Card padding:** 8px
- **Input height:** Auto (with 12px vertical padding)
- **Button height:** Auto (with 6px vertical padding)
- **Icon size:** 20px standard, 16px for checkboxes
- **Border weight:** 1px standard
- **Box shadow:** 0px 16px 32px 0px rgba(28, 30, 45, 0.2)
- **Backdrop blur:** 4px for overlay elements

---

**Note:** This design system is continuously evolved based on user feedback and Ubiquiti brand updates. All components should be tested across browsers and devices before deployment.