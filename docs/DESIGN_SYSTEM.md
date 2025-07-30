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
--ui-blue-50: #eff6ff
--ui-blue-100: #dbeafe
--ui-blue-600: #2563eb  /* Primary brand color */
--ui-blue-700: #1d4ed8  /* Hover states */
--ui-blue-800: #1e40af  /* Active states */
```

### Neutral Colors
```css
--ui-gray-50: #f9fafb   /* Light backgrounds */
--ui-gray-100: #f3f4f6  /* Card backgrounds */
--ui-gray-200: #e5e7eb  /* Borders */
--ui-gray-300: #d1d5db  /* Subtle borders */
--ui-gray-500: #6b7280  /* Muted text */
--ui-gray-600: #4b5563  /* Secondary text */
--ui-gray-700: #374151  /* Labels */
--ui-gray-900: #111827  /* Primary text */
```

### Accent Colors
```css
--ui-green-500: #10b981  /* Success/Live indicators */
--ui-red-600: #dc2626    /* Error states */
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
Based on Ubiquiti's product card design from store.ui.com:

```css
.device-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.device-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-4px);
  border-color: #93c5fd;
}

.device-card.selected {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.device-image-container {
  background: #f9fafb;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #f3f4f6;
}

.device-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.device-specs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.spec-value {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
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
  background: #f3f4f6;
  color: #374151;
}
```

### Search and Filters
Inspired by Ubiquiti's clean input design:

```css
.search-container {
  background: white;
  border-bottom: 1px solid #f3f4f6;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px 0;
}

.search-input {
  padding: 12px 16px 12px 48px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-select {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  min-width: 192px;
}

.filter-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Buttons
Following Ubiquiti's button patterns:

```css
.btn-primary {
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}
```

## Layout Guidelines

### Spacing System
Based on 8px grid system:
- **xs:** 4px
- **sm:** 8px  
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px
- **3xl:** 64px

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
- **Cards:** Subtle lift (4px translateY) + enhanced shadow
- **Buttons:** Darken by one shade
- **Inputs:** Border color change to primary blue

### Focus States
- **All interactive elements:** 3px blue ring with 25% opacity
- **High contrast:** Ensure 3:1 contrast ratio minimum

### Loading States
- **Spinner:** Blue primary color with white background
- **Skeleton:** Light gray placeholder with subtle animation

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
- [x] Search and filter controls
- [x] Device cards with modern design
- [x] Loading and error states
- [x] Responsive grid layout
- [x] Hover and focus states
- [x] Color scheme implementation

### 🔄 In Progress
- [ ] Device details modal styling
- [ ] Animation improvements
- [ ] Mobile responsive refinements

### 📋 Future Enhancements
- [ ] Dark mode support
- [ ] Advanced filtering UI
- [ ] Bulk actions interface
- [ ] Export functionality styling

## References

- **UI.com Homepage:** Clean modern layout, blue accent colors
- **UI.com Store:** Product card design, typography hierarchy
- **Ubiquiti Brand Guidelines:** Official color palette and logo usage
- **Tailwind CSS:** Utility-first framework for consistent styling

---

**Note:** This design system is continuously evolved based on user feedback and Ubiquiti brand updates. All components should be tested across browsers and devices before deployment.