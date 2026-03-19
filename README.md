# AgriVani: AI-Powered Scheme Eligibility Assistant

AgriVani is a modern platform designed to bridge the gap between farmers and government schemes. By leveraging AI, voice input, and an intuitive dashboard, it helps farmers discover schemes they are eligible for in seconds, providing clear citations and document requirements.

## 🌟 Key Features

- **AI-Driven Eligibility**: Instantly check eligibility for various government schemes based on farmer profiles.
- **Voice-Powered Input**: Simple, accessible voice-to-text interface for farmers to provide their details easily.
- **AI Chatbot (AgriVani Assistant)**: A dedicated AI assistant to answer questions about specific schemes like PM-KISAN, PM-KUSUM, and more.
- **Comprehensive Scheme Database**: Deep integration with major agricultural schemes including insurance, subsidies, and loans.
- **Document Citations**: Every eligibility result comes with specific citations from official scheme documents to ensure transparency and trust.
- **Social Category & Landholding Awareness**: Tailored results based on specific criteria like caste categories and land holding sizes.

## 🛠️ Tech Stack

- **Frontend**: React (with TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or bun

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd scheme-buddy-main
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or if you prefer bun
   bun install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

## 🏗️ How It Works

1. **Farmer Profile**: Users enter details such as state, district, land size, and crop type through manual entry or voice commands.
2. **AI Analysis**: The platform matches the profile against a comprehensive set of eligibility rules and official documentation.
3. **Insights Dashboard**: Farmers receive a personalized dashboard showing "Eligible" and "Ineligible" schemes, along with the "Reason" and "Proof" for each.

## 📝 Supported Schemes (Partial List)

- **PM-KISAN**: Income support for small and marginal farmers.
- **PM-KUSUM**: Solar pump subsidies.
- **Pradhan Mantri Fasal Bima Yojana (PMFBY)**: Comprehensive crop insurance.
- **Kisan Credit Card (KCC)**: Easy credit for agricultural needs.
- **National Bamboo Mission**: Support for bamboo plantation.
- ...and many more!

---

*Built with ❤️ for the Indian Farming Community.*
