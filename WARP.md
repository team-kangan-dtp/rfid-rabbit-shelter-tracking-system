# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The RFID Rabbit Shelter Tracking System is a comprehensive solution for managing animal shelters with RFID tracking capabilities. The system consists of three main components:

1. **Frontend**: SvelteKit web application with real-time RFID scan tracking
2. **Backend**: Supabase database with comprehensive shelter management schema
3. **Hardware**: MicroPython-based handheld RFID scanner firmware

## Architecture

### Technology Stack
- **Frontend**: SvelteKit 5 with TypeScript, TailwindCSS 4.0, shadcn-svelte components
- **Database**: PostgreSQL (via Supabase) with real-time subscriptions
- **Authentication**: Supabase Auth
- **Hardware**: MicroPython firmware for ESP32 with RFID/NFC capabilities
- **UI Components**: shadcn-svelte with bits-ui, lucide-svelte icons

### Database Schema Structure
The system uses a comprehensive PostgreSQL schema with the following core entities:
- **Users**: Volunteer/staff management with RFID access cards
- **Animals**: Complete animal tracking with RFID tags, health status, adoption status
- **RFID Logs**: Real-time tracking of RFID scans (user authentication + animal interactions)
- **Shifts**: Volunteer shift management and tracking
- **Health Checks**: Veterinary care tracking
- **Adoptions**: Complete adoption process management

### Key Architecture Patterns
- **Real-time Communication**: Uses Supabase real-time subscriptions for instant RFID scan updates
- **Custom Supabase Client**: Modified fetch implementation for local development compatibility
- **Responsive Design**: Mobile-first with bottom navigation tabs for mobile, sidebar for desktop
- **Component-based UI**: Modular Svelte components with shadcn-svelte design system

## Development Commands

### Frontend Development

Navigate to the frontend directory for all frontend commands:
```bash
cd frontend
```

#### Development Server
```bash
npm run dev                 # Start development server
npm run dev -- --open     # Start dev server and open in browser
```

#### Building & Preview
```bash
npm run build              # Build production version
npm run preview           # Preview production build locally
```

#### Code Quality
```bash
npm run check             # Run svelte-check for TypeScript/Svelte validation
npm run check:watch       # Run svelte-check in watch mode
npm run prepare           # Sync SvelteKit (auto-runs on install)
```

### Database Management

#### Schema Setup
```bash
# Apply the complete schema (from project root)
psql -h localhost -p 54322 -U postgres -d postgres -f Supabase/rabbit_shelter_schema.sql
```

#### Supabase Local Development
```bash
# Start local Supabase (if using local instance)
supabase start

# Generate types for TypeScript
supabase gen types typescript --local > frontend/src/lib/types/supabase.ts
```

### Hardware Development

#### RFID Scanner Firmware
```bash
# Upload firmware to ESP32 (requires ampy or similar)
cd RFID
ampy --port COM3 put handheld-rfid-scanner-firmware.py main.py

# Or use mpremote
mpremote connect COM3 cp handheld-rfid-scanner-firmware.py :main.py
```

## Project Structure

```
/
├── frontend/                    # SvelteKit web application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/      # Reusable Svelte components
│   │   │   │   ├── ui/         # shadcn-svelte UI components
│   │   │   │   └── *.svelte    # Custom components (modals, tables, etc.)
│   │   │   ├── config/         # Application configuration
│   │   │   └── hooks/          # Svelte state management utilities
│   │   ├── routes/             # SvelteKit file-based routing
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── animals/        # Animal management
│   │   │   ├── scan-logs/      # RFID scan history
│   │   │   └── private/        # User profile/settings
│   │   └── app.html            # Main HTML template
│   ├── package.json            # Dependencies and scripts
│   └── *.config.*              # Build/tool configurations
├── Supabase/
│   └── rabbit_shelter_schema.sql   # Complete database schema
├── RFID/
│   └── handheld-rfid-scanner-firmware.py  # ESP32 RFID scanner code
└── README.md
```

## Environment Setup

### Frontend Environment Variables
Create `frontend/.env.local` with:
```env
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database Configuration
The schema includes:
- Automatic user profile creation on auth signup
- Real-time subscriptions enabled on `rfid_log` table
- Comprehensive indexes for performance
- Views for common queries (active_volunteers, volunteer_shifts_summary)

## Key Components

### Real-time RFID Scanning
- `RFIDScanModal.svelte`: Displays real-time scan notifications
- `rfid-scan-table/`: Data table components for scan log display
- Real-time subscription in `+layout.svelte` listens for new RFID scans

### Authentication Flow
- Custom Supabase client configuration for local development
- User profiles automatically created on auth signup
- RFID tag association for volunteer access cards

### Data Management
- Animal management with comprehensive tracking (health, adoption status, bonding)
- Volunteer shift scheduling and tracking
- Complete audit trail through RFID scanning

## Hardware Integration

### RFID Scanner Features
- Dual-mode scanning: User authentication + animal tracking
- OLED display with scan feedback
- Audio/LED feedback for scan results
- Automatic session timeout for security
- Real-time data sync with web application

### Scanner Workflow
1. User scans their RFID access card to authenticate
2. Scanner validates user against database
3. User can then scan animal RFID tags
4. Each scan is logged with timestamp and user attribution
5. Automatic logout after configurable timeout

## Testing & Development

### Running Tests
The project currently doesn't have test scripts configured. To add testing:
```bash
cd frontend
npm install -D @playwright/test vitest jsdom @testing-library/svelte
```

### Development Database
- Use local Supabase instance for development
- Schema includes comprehensive seed data (commented out)
- Real-time features require proper Supabase configuration

## Common Development Patterns

### Adding New Pages
1. Create route in `frontend/src/routes/[page-name]/+page.svelte`
2. Add server-side data loading with `+page.server.ts` if needed
3. Update navigation in `src/lib/config/navigation.ts`
4. Add breadcrumb logic in `+layout.svelte` if needed

### Database Changes
1. Modify `Supabase/rabbit_shelter_schema.sql`
2. Test schema changes on local instance
3. Regenerate TypeScript types if using typed queries
4. Update relevant components that use modified tables

### Custom Components
- Follow shadcn-svelte patterns for UI components
- Place reusable components in `src/lib/components/`
- Use TypeScript for all component props and state
- Leverage Svelte 5's new reactivity system (`$state`, `$derived`)
