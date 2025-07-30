# UIDB Agent

Internal Product Knowledge Explorer for Ubiquiti devices.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment on Coolify

### Build Settings
- **Build Command:** `npm run build`
- **Start Command:** `npm run start` 
- **Port:** `3000`
- **Output Directory:** `dist`

### Environment Variables
- `VITE_UIDB_URL` (optional): Override default UIDB endpoint (see `src/config/constants.ts` for default)

### Example Coolify Configuration
1. Connect your Git repository
2. Set build command: `npm install && npm run build`
3. Set start command: `npm run start`
4. Set port: `3000`
5. Add environment variable `VITE_UIDB_URL` if needed

## Features

- 🔍 **Multi-field Search** - Search across SKU, names, aliases, triplets
- 🏷️ **Product Line Filtering** - Filter by UniFi, airMAX, etc.
- 🖼️ **Image Display** - Full fallback chain with size controls
- 📱 **Responsive Design** - Works on mobile and desktop
- 🔗 **Shareable Links** - URL state persistence
- ⚡ **Performance** - Virtualized list handles 10k+ devices
- 🛡️ **Error Resilience** - Graceful handling of schema changes
- ♿ **Accessibility** - WCAG 2.1 AA compliant

## Architecture

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Data:** Zod-based parsing with runtime adaptation
- **Virtualization:** react-window for large lists
- **State:** URL-based state management

## Bundle Size

- JavaScript: 264KB (80KB gzipped)
- CSS: 7KB (2KB gzipped)
- Total: < 82KB gzipped ✅

See `docs/PRD.md` for complete technical documentation.