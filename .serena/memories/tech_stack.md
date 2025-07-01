# Tech Stack

## Frontend
- **Framework**: SvelteKit v2.16.0 (latest)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS v4.0 (latest)
- **Build Tool**: Vite 6.0
- **Svelte Version**: 5.0 (latest)

## Backend & Database
- **Database**: Supabase (PostgreSQL)
- **API**: Supabase REST API with auto-generated endpoints
- **Real-time**: Supabase Realtime for WebSocket connections
- **Client**: @supabase/supabase-js v2.50.0

## Hardware
- **Microcontroller**: Raspberry Pi Pico W
- **RFID Reader**: MFRC522 module
- **Language**: MicroPython
- **Libraries**: mfrc522, urequests, network

## Development Setup
- **Local Backend**: Supabase via ngrok tunneling
- **Custom Headers**: Modified fetch for ngrok compatibility
- **Environment**: Public environment variables for Supabase URL/keys

## Key Dependencies
```json
{
  "@supabase/supabase-js": "^2.50.0",
  "@sveltejs/kit": "^2.16.0", 
  "svelte": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "typescript": "^5.0.0"
}
```