# FlexSession — Professional Music Sessions On Demand

**Move your music forward — one professional session at a time.**

FlexSession is a web-first platform connecting artists with professional mix engineers, producers, and mastering specialists for flexible 1–4 hour micro-sessions. Book instantly or request specific time slots from vetted professionals.

## ✨ Features

### Core Features (MVP)
- **Browse Engineers** - Search and filter by skill, genre, rate, and availability
- **Profile Pages** - View engineer credentials, credits, audio samples, and rates
- **Tape Strip Availability** - Visual time slots showing task type and booking mode
- **Instant Book** - Pay and book available slots immediately via Stripe Checkout
- **Request to Book** - Submit requests for specific times; engineer approves before payment
- **Messaging** - Thread-based messaging within each session
- **File Exchange** - Upload/download stems, references, mixes, masters via S3
- **Calendar Sync** - Engineers connect Google Calendar to auto-block busy times
- **Stripe Connect** - Engineers receive payouts with platform fee deduction

### Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, TailwindCSS
- **UI Components:** shadcn/ui, Radix primitives
- **State Management:** TanStack Query (React Query)
- **Backend:** Next.js Route Handlers (REST API)
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth (Email magic link + Google OAuth)
- **Payments:** Stripe (Checkout + Connect for payouts)
- **File Storage:** S3-compatible (AWS S3, DigitalOcean Spaces, MinIO for local)
- **Calendar Integration:** Google Calendar API (read free/busy)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Docker** and Docker Compose (for local PostgreSQL + MinIO)
- **Stripe Account** (test mode keys)
- **Google OAuth Credentials** (for calendar sync)

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials (see `.env.example` for all required variables).

### 3. Start Local Services

Start PostgreSQL and MinIO (S3-compatible storage) with Docker Compose:

```bash
docker compose up -d
```

This starts:
- **PostgreSQL** on `localhost:5432`
- **MinIO** (S3) on `localhost:9000` (API) and `localhost:9001` (Web UI)

### 4. Initialize Database

Generate Prisma Client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

Seed the database with demo engineers and artists:

```bash
npm run db:seed
```

This creates:
- **5 Engineers** with profiles, credits, samples, and 2–4 availability slots per day for the next 7 days
- **5 Artists** for testing bookings

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
flexsession/
├── prisma/
│   ├── schema.prisma          # Database schema (all models)
│   └── seed.ts                # Seed script for demo data
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── browse/            # Browse engineers page
│   │   ├── api/               # REST API routes
│   │   │   ├── auth/          # NextAuth handlers
│   │   │   ├── profiles/      # Profile endpoints
│   │   │   ├── availability/  # Availability slots CRUD
│   │   │   ├── sessions/      # Booking & session management
│   │   │   └── ...
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles + Tailwind
│   ├── components/
│   │   ├── ui/                # UI components
│   │   │   ├── tape-strip.tsx # Signature TapeStrip component
│   │   │   └── ...
│   │   └── providers.tsx      # Client providers
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       ├── auth.ts            # NextAuth config
│       ├── stripe.ts          # Stripe helpers
│       ├── s3.ts              # S3 helpers
│       └── utils.ts           # Utilities
├── docker-compose.yml
└── package.json
```

---

## 🎨 Key Components

### TapeStrip Component

The signature UI element displaying availability slots with time, task type, and booking mode.

---

## 🔌 API Endpoints

### Profiles
- `GET /api/profiles` - List engineers with filters
- `GET /api/profiles/:id` - Engineer profile detail

### Availability
- `GET /api/availability` - List available slots
- `POST /api/availability` - Create slot (engineer only)

### Sessions (Bookings)
- `POST /api/sessions` - Create booking
- `GET /api/sessions/:id` - Session detail

All endpoints enforce role-based access control.

---

## 💳 Payments

### Instant Book Flow
1. Select slot → Pay via Stripe Checkout → Confirmed
2. Platform takes 15% fee

### Request to Book Flow
1. Submit request → Engineer approves → Pay → Confirmed

---

## 🧪 Testing

**Test Engineers:**
- marcus@flexsession.demo
- sarah@flexsession.demo
- james@flexsession.demo
- priya@flexsession.demo
- david@flexsession.demo

**Test Stripe Card:**
- Success: `4242 4242 4242 4242`

---

## 🚢 Deployment

Deploy to Vercel, Netlify, Railway, or any platform supporting Next.js. Configure production environment variables.

---

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to DB |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |

---

**Built with ❤️ for the music community**