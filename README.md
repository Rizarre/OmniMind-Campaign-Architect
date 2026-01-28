# 🌌 OmniMind Campaign Architect

An elite, AI-powered media strategy co-pilot that transforms business objectives into execution-ready programmatic advertising blueprints. Featuring a stunning **Frosted Glass Dark Theme** with immersive glassmorphism aesthetics.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12+-ff69b4?style=for-the-badge)

## ✨ Core Features

- **🧠 Campaign Brain**: A centralized strategic command center providing daily AI-driven briefs, risk assessments, and neural growth vectors.
- **⚡ AI Media Plan Generation**: Convert natural language campaign intent into multi-funnel programmatic advertising strategies.
- **🎨 Creative Testing Lab**: Predict ad performance (Engagement, Persuasion, Backlash Risk) and platform fit using AI "Prognostic Engines."
- **🌊 Frosted Dark UI**: A premium, high-fidelity interface utilizing deep glassmorphism, mesh gradients, and ambient lighting effects.
- **🎯 Audience Intelligence**: Automated segmentation into high-potential groups with detailed targeting parameters.
- **📊 Operational Insights**: Real-time signal analysis including search trends, consumer behavior, and competitive landscape.
- **📥 Export Suite**: Professional exports of media blueprints in DSP-ready JSON, Markdown, and Client-ready PDF formats.

---

## 🚀 Quick Start Guide

### 📋 Prerequisites

- **Node.js**: 18.17.0 or later (Recommended: v20+)
- **NPM**: Latest stable version
- **OpenAI API Key**: Required for the AI-driven strategic components

### 🛠️ Installation

1. **Unzip the files**

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Add your OpenAI API Key here
   OPENAI_API_KEY=sk-your-api-key-here
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & QA

The platform includes a specialized End-to-End (E2E) testing suite powered by **Playwright** to ensure architectural integrity:

### Running Tests
*   **Headless Mode**: `npm run test:e2e` (Ideal for CI/CD)
*   **UI Mode**: `npm run test:e2e:ui` (Visual debugging)

### Coverage Areas
*   **Navigational Integrity**: Verifies sidebar transitions and route availability.
*   **Semantic Input**: Ensures the campaign brief engine correctly captures and persists intent.
*   **Visual Projections**: Validates the presence of real-time ROI and reach calculations.
*   **Generation Flow**: Tests the high-impact transition from prompt to finalized media plan.

---

## 📖 Deep Dive: Module Overview

### 🏡 Campaign Builder (Home)
The primary entry point. Type your campaign general intent (e.g., *"Launch a high-end moisturizer in the UK for Gen Z with £100k budget"*). The AI will architect a 3-stage funnel plan instantly.

### 🧠 Campaign Brain (`/campaign-brief`)
View the "Neural Growth Vectors" and "Command Intelligence Brief." This module provides the high-level strategic "why" behind your current campaign data.

### 🧪 Creative Testing (`/creative-testing`)
Upload or describe your creative concepts to receive a performance prediction. It analyzes tone, visual style, and script content to forecast impact before you spend a cent on production.

### 🎯 Targeting & Segments
- **Audience Segments**: Deep-dive into the demographics and behaviors identified by the AI.
- **Targeting Tactics**: View strategic levers like contextual bidding and geo-fencing.

---

## 📁 Project Architecture

```text
OmniMind-Campaign-Architect/
├── app/
│   ├── campaign-brief/      # Strategic command center
│   ├── creative-testing/    # AI performance prediction lab
│   ├── insights/            # Market intelligence data
│   ├── export-center/       # PDF/JSON/MD export engine
│   ├── layout.tsx           # Global frosted theme & ambient effects
│   └── page.tsx             # Main Campaign Architect entry
├── components/
│   ├── ui/                  # Frosted glassmorphism primitives
│   ├── sidebar.tsx          # Premium navigation system
│   ├── campaign-input.tsx   # Campaign intent engine
│   └── media-plan-output.tsx # Resultant blueprint visualization
├── lib/
│   ├── store.ts             # Zustand state management
│   ├── brain-service.ts     # AI strategy simulation
│   └── export-utils.ts      # Multi-format conversion logic
└── globals.css              # Core Design System (Frosted Theme)
```

---

## 🔬 Approach & Methodology

OmniMind utilizes a **Top-Down Strategic Orchestration** approach:

1.  **Intent Decomposition**: The platform uses AI to parse unstructured natural language (briefs) into specific campaign parameters (budget, duration, GEO).
2.  **Multi-Funnel Alignment**: Instead of a flat allocation, the AI architects a three-tiered funnel:
    *   **Awareness**: Reach-based tactics emphasizing scale and frequency.
    *   **Consideration**: Engagement-driven strategies focusing on intention.
    *   **Conversion**: Performance-heavy levers optimized for ROI.
3.  **Heuristic Validation**: Every AI-generated plan is passed through a secondary "Validation Agent" (simulated via `brain-service.ts`) to ensure CPM consistency and tactical feasibility within the given budget.

---

## 🤖 AI Tools & Techniques

*   **OpenAI GPT-4o / o1-preview**: The primary reasoning engine for strategic architectural plans.
*   **Vercel AI SDK**: Used for handling high-performance streaming and managing structured object output (e.g., the `generateObject` pattern).
*   **Zero-Shot Neural Extraction**: Used in the Campaign Builder to identify budget and duration within complex sentences without requiring rigid form fields.
*   **Prompt Chaining**: The Creative Testing module uses a chain-of-thought process to simulate consumer psychology (Engagement vs. Backlash).

---

## 🚀 Known Limitations & Future Improvements

### ⚠️ Current Limitations
*   **Heuristic Data**: Market signals and CPM estimates are currently simulated based on historical programmatic benchmarks, not live real-time bidding (RTB) data.
*   **Language Support**: Optimized primarily for English-language campaign briefs.
*   **Attribution Preview**: Projected ROI is an estimate based on industry averages and does not account for specific 1st-party CRM data.

### 🔮 Future Roadmap
*   **DSP Direct Integration**: API connectivity to The Trade Desk and DV360 for instant campaign pushing.
*   **Live Signal Intelligence**: Integration with live stock market and Google Trends APIs for truly real-time budget shifting.
*   **DCO Mockups**: Generating actual image/video ad previews based on AI-generated creative concepts.

---

## 📜 Prompt Logs (Documentation)

The core architecture relies on several highly-optimized system prompts. Below are the key instructional frameworks:

### 1. Media Plan Architect Prompt
> *"You are an elite programmatic media buyer. Analyze the user's intent and generate a JSON media plan including a 3-stage funnel, target audiences with demographic and behavioral markers, and specific tactics (Contextual, PMP, Geo-fencing). Ensure budget distribution follows a 40/40/20 awareness/consideration/conversion split unless specified otherwise."*

### 2. Creative Performance Engine Prompt
> *"Act as a panel of diverse consumer psychologists. Evaluate the following creative concept across three metrics: Engagement, Persuasion, and Backlash Risk. Provide high-fidelity reasoning for each score and identify 'Platform Fit' based on current social media consumption trends."*

### 3. Market Intelligence Simulation
> *"Analyze the campaign brief and generate a set of 'Neural Growth Vectors' that identify high-potential opportunistic shifts in strategy based on current market signals like CPM volatility and search momentum."*

---

## 🎨 Design System

The application uses a custom-built **Frosted Glass Design System** managed via Tailwind CSS and native CSS variables:

- **Base Background**: `#02040a` (Deep Midnight)
- **Glass Surfaces**: `rgba(255, 255, 255, 0.05)` with `backdrop-blur-xl`
- **Typography**: Inter (Modern Grotesk)
- **Accents**: 
  - Indigo/Blue (Primary/Strategy)
  - Emerald (Growth/Success)
  - Rose (Risk/Alerts)
  - Pink (Creative/Testing)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **State**: Zustand
- **Animations**: Framer Motion
- **AI Integration**: OpenAI / Vercel AI SDK
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **E2E Testing**: Playwright
- **Exporting**: jsPDF / html2canvas

---

## 🙏 Credits

Engineered with precision for the next generation of programmatic advertisers. Utilizing the power of OpenAI and the Google Deepmind team's Advanced Agentic Coding paradigms.