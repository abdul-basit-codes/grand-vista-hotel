# Grand Vista Hotel Management System

A full-stack hotel front desk system with a premium dark UI, built as a single-page application with Vercel serverless API backend.

## Features

- **100 Rooms** across 5 floors (Single, Double, Family, Elite, Meeting Hall)
- **Check-in / Check-out** with date tracking and multi-day billing
- **Restaurant Ordering** — Food, Desserts, Drinks with item-level pricing
- **Formatted Receipt** — Print-ready checkout receipt with room + restaurant charges
- **Room Detail Modal** — Click any room to see guest info, charges, and orders
- **Search & Filter** — Find rooms by number, guest, or category
- **Rental History** — Full log of past and active rentals with revenue stats
- **Cloud + Local** — Works online (Vercel API) and offline (localStorage fallback)
- **Connection Badge** — Real-time Cloud/Local mode indicator
- **Toast Notifications** — Non-intrusive success/error messages
- **Keyboard Support** — Escape to close modals

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js (Vercel Serverless Functions) |
| Storage | In-memory API + localStorage fallback |

## Project Structure

```
├── index.html          # Single-page application
├── api/
│   └── server.js       # Vercel serverless API
└── vercel.json         # Vercel routing configuration
```

## Deploy on Vercel

1. Fork or clone this repository
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**
3. Import this repository
4. Framework: **Other** → Deploy

## Room Categories

| Category | Rooms | Rate/Day |
|----------|-------|----------|
| Single | 20 | Rs.100 |
| Double | 20 | Rs.180 |
| Family | 20 | Rs.300 |
| Elite | 36 | Rs.600 |
| Meeting | 4 | Rs.500 |
