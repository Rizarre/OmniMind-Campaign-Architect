# OmniMind Campaign Architect

An AI-powered media strategy co-pilot that transforms business goals into executable programmatic advertising blueprints.

![OmniMind Campaign Architect](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-Latest-purple?style=for-the-badge)

## 🚀 Features

- **AI-Powered Media Plan Generation**: Transform natural language campaign goals into comprehensive media strategies
- **Funnel Strategy**: Automatic breakdown into Awareness, Consideration, and Conversion stages with KPIs
- **Audience Segmentation**: AI-generated high-potential audience groups with targeting details
- **Ad Format Recommendations**: Optimal creative types for each funnel stage
- **Targeting Tactics**: Strategic recommendations for geo-fencing, contextual targeting, and day-parting
- **Budget Allocation**: Intelligent budget distribution across funnel stages
- **Real-time Insights**: Mock data integration for local events, search trends, and CPM estimates
- **Multiple Export Formats**: JSON (DSP-ready), Markdown, and PDF exports

## 📋 Prerequisites

- Node.js 18+ and npm
- OpenAI API key (or Anthropic API key)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd c:\Users\seanr\Projects\budget-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Generating a Media Plan

1. Navigate to the **Campaign Builder** page (home)
2. Enter your campaign goal in the text area
   - Example: "Create a campaign for Mother's Day sales for a local flower shop in Seattle with $3,000 budget"
3. (Optional) Fill in structured fields:
   - Budget
   - Location
   - Objective (Awareness, Sales, App Installs, Leads)
   - Industry
4. Click **"Generate Media Plan"**
5. Wait for the AI to generate your comprehensive media strategy

### Exploring Your Media Plan

- **Funnel Strategy**: View KPIs and budget allocation for each funnel stage
- **Audience Segments**: Explore detailed audience targeting criteria
- **Ad Formats**: See recommended creative types for each stage
- **Targeting Tactics**: Review strategic targeting recommendations

### Exporting Your Plan

Navigate to the **Export Center** to download your media plan in:
- **JSON**: DSP-ready structured data
- **Markdown**: Documentation format
- **PDF**: Client presentation format

## 📁 Project Structure

```
budget-planner/
├── app/
│   ├── api/
│   │   ├── generate-plan/    # AI media plan generation endpoint
│   │   └── refine-plan/       # AI plan refinement endpoint
│   ├── audience-explorer/     # Audience segment details
│   ├── budget-studio/         # Budget allocation (placeholder)
│   ├── export-center/         # Export functionality
│   ├── insights/              # Market insights and trends
│   ├── scenario-lab/          # Scenario comparison (placeholder)
│   ├── tactics-board/         # Targeting tactics (placeholder)
│   ├── layout.tsx             # Root layout with sidebar
│   └── page.tsx               # Campaign Builder (home)
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── campaign-input.tsx     # Campaign input form
│   ├── media-plan-output.tsx  # Media plan display
│   └── sidebar.tsx            # Navigation sidebar
├── lib/
│   ├── export-utils.ts        # Export functions
│   ├── mock-data.ts           # Mock insights data
│   ├── prompts.ts             # AI prompt templates
│   ├── store.ts               # Zustand state management
│   └── types.ts               # TypeScript interfaces
└── README.md
```

## 🎨 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **AI**: Vercel AI SDK with OpenAI
- **State Management**: Zustand
- **Charts**: Recharts
- **PDF Export**: jsPDF
- **Icons**: Lucide React

## 🧪 Demo Scenario

Try this example campaign goal:

```
Create a campaign for Mother's Day sales for a local flower shop in Seattle with $3,000 budget
```

**Expected Output:**
- 3-stage funnel strategy (Awareness, Consideration, Conversion)
- Audience segments like "Urban Moms 25-45" and "Last-Minute Shoppers"
- Ad format recommendations (Video, Carousel, Retargeting)
- Targeting tactics (Geo-fencing, Day-parting, Contextual)
- Budget allocation across stages

## 🔮 Future Enhancements

- **Scenario Lab**: Save and compare multiple campaign variations
- **Budget Studio**: Interactive budget sliders with real-time impact visualization
- **Tactics Board**: Toggle targeting tactics with AI explanations
- **Chat Refinement**: Conversational AI to refine media plans
- **Real API Integration**: Connect to actual market data APIs
- **Presentation Export**: Auto-generate PowerPoint slides

## 📝 License

MIT

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 🙏 Acknowledgments

- Built for the OmniMind Campaign Architect Hackathon
- Powered by Vercel AI SDK and OpenAI
- UI components by shadcn/ui
