# DocSift AI | Neural Contract Intelligence

**DocSift** is an enterprise-grade SaaS platform that leverages Artificial Intelligence to scan, analyze, and audit complex legal contracts. It detects "blind spots," unfavorable clauses, and compliance risks in seconds, replacing months of manual legal review.

---

## Technical Architecture

### Backend (The Engine)
- **Framework:** FastAPI (Asynchronous Python)
- **OCR Engine:** EasyOCR (Neural-based Optical Character Recognition)
- **AI Logic:** LLM-powered semantic analysis for risk scoring and clause extraction.
- **Task Management:** Async Background Tasks with `asyncio.Semaphore(2)` to handle high-concurrency without system exhaustion.
- **Storage:** Cloudflare R2 (S3-Compatible) for distributed, egress-free document storage.

### 💻 Frontend (The Interface)
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + ShadcnUI
- **Animations:** Framer Motion for high-fidelity UX.
- **State Management:** React Context + Supabase Auth.

### Infrastructure & DevOps
- **Database:** Supabase (PostgreSQL) with Row Level Security (RLS).
- **Payment Gateway:** Paddle (B2B & B2C Subscription Logic).
- **Deployment:** Dockerized Backend (Hugging Face Spaces) & Vercel (Frontend).

---

## Key Features
- **Neural Auditing:** Automated detection of indemnification traps and auto-renewal clauses.
- **B2B API Ecosystem:** RESTful API v1.0 for seamless enterprise integration.
- **Neural Credits System:** Tiered consumption-based pricing model.
- **SOC 2 Compliant Design:** AES-256 encryption for data-at-rest.

---

## Getting Started (For Engineers)

### Prerequisites
- Python 3.9+
- Node.js 18+
- Supabase Project URL & Service Key

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. Create a `.env` file with:
   - `SUPABASE_URL`, `SUPABASE_KEY`
   - `R2_ACCESS_KEY`, `R2_SECRET_KEY`
4. `uvicorn main:app --reload`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## Roadmap & Strategy
1. **Phase 1:** MVP Deployment & Paddle Integration (Current).
2. **Phase 2:** Multi-modal LLM integration for specialized legal niches (FinTech, HealthTech).
3. **Phase 3:** Scale to Celery/Redis cluster for global B2B throughput.

---

## Team & Collaboration
This project is architected with a **Security-First** and **Zero-Waste** resource strategy. Every tool used is selected for maximum free-tier utility and horizontal scalability.

**DocSift AI - Protecting Business through Intelligence.**