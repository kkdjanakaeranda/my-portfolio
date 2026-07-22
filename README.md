# 🌌 Janaka Eranda - Personal Portfolio Website

A modern, high-performance, and visually stunning personal portfolio website built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. This portfolio showcases the projects, skills, education, and professional experience of Janaka Eranda, a Software Engineering undergraduate at the University of Kelaniya.

✨ **Live Site:** [janakaeranda-portfolio.vercel.app](https://janakaeranda-portfolio.vercel.app/)

---

## 🚀 Features

- 📱 **Fully Responsive Design:** Crafted with a mobile-first approach, ensuring seamless rendering across all devices (mobiles, tablets, and desktops).
- 🎨 **Premium Modern Aesthetics:** Sleek dark-mode theme utilizing glassmorphism, glowing radial gradients, custom typography (Geist), and a violet color palette.
- ⚡ **Dynamic Micro-Animations:** Driven by Framer Motion, featuring smooth viewport-triggered scroll entrance transitions, hover effects, and responsive cards.
- 📂 **Categorized Project Showcase:** Highlights selected works spanning Artificial Intelligence, Full-Stack Web Applications, IoT projects, and mobile dashboards.
- 🛠️ **Technical Toolkit Breakdown:** Clear categorization of programming languages, frontend systems, backend frameworks, and database architectures.
- 📨 **Direct Email Contact Form:** An interactive contact form integrated with the **Resend API** for fast, reliable message delivery.

---

## 🛠️ Tech Stack & Dependencies

### Core
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)

### Libraries & Integration
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Counters:** [React CountUp](https://github.com/inorganik/countUp.js)
- **Email Delivery:** [Resend SDK](https://resend.com/)

---

## 📂 Project Structure

```text
my-portfolio/
├── src/
│   ├── app/                 # Next.js App Router (Layouts, Pages, APIs)
│   │   ├── api/             # API routes (e.g., Contact Form integration)
│   │   ├── globals.css      # Core styles & Tailwind CSS directives
│   │   ├── layout.tsx       # Root layout defining HTML structure
│   │   └── page.tsx         # Main entry point importing component sections
│   └── components/          # Reusable UI component sections
│       ├── About.tsx        # Journey statement & education timeline
│       ├── Contact.tsx      # Contact form with real-time feedback
│       ├── Footer.tsx       # Copyright & secondary links
│       ├── Hero.tsx         # Catchy introduction with CountUp metrics
│       ├── Navbar.tsx       # Navigation header with scroll actions
│       ├── Projects.tsx     # Categorized cards for individual/group projects
│       └── Skills.tsx       # Grid of technical skills grouped by category
├── public/                  # Static assets (images, icons, resumes)
├── next.config.ts           # Next.js configuration
├── tailwind.config.js       # Tailwind setup (if any)
└── package.json             # Scripts and dependency declarations
```

---

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/kkdjanakaeranda/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies
Ensure you have Node.js (v18+ recommended) installed, then run:
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env.local` in the root directory of the project and add the following keys:
```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your_inbox_email_here@example.com
```
*Note: Make sure to replace `your_resend_api_key_here` with a valid API key from your [Resend Dashboard](https://resend.com/).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 5. Build for Production
To create an optimized production build of the project, run:
```bash
npm run build
npm run start
```

---

## 🚀 Deployment

The easiest way to deploy this Next.js project is on the [Vercel Platform](https://vercel.com/):

1. Connect your GitHub repository to Vercel.
2. In the Vercel Project Settings, add the Environment Variables:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
3. Click **Deploy**. Vercel will automatically build the site and provide a production-ready link.
