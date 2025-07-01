# RFID Rabbit Shelter Tracking System

## Project Purpose
This is an RFID-based animal shelter management system with both hardware and web components:

1. **Hardware Component**: Raspberry Pi Pico W with RFID reader that scans staff cards for authentication
2. **Web Component**: SvelteKit dashboard for managing animal shelter records with real-time RFID integration
3. **Goal**: Enable staff to scan RFID cards to login, and display real-time animal additions via popup modals

## Current Capabilities
- Complete animal CRUD operations (Create, Read, Update, Delete)
- Filtering and searching animals by species, adoption status, date ranges
- Modal-based UI for animal management
- RFID hardware integration with Supabase
- Staff authentication via RFID cards

## Architecture
- **Frontend**: SvelteKit with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL) with local development via ngrok
- **Hardware**: Raspberry Pi Pico W with MFRC522 RFID reader
- **Real-time**: Supabase Realtime for live updates

## Development Environment
- Local Supabase setup using ngrok tunneling
- Custom fetch configuration to work with ngrok headers
- TypeScript throughout the codebase
- Svelte 5 with latest SvelteKit v2