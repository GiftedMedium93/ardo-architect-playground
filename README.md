# 🏗️ ARDO: Architect Playground

**Advanced AI-Powered Architecture & Construction Management Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)](https://tailwindcss.com/)

## 🌟 Overview

ARDO (Architect Playground) is a state-of-the-art platform that combines AI-powered design tools, intelligent commerce optimization, real-time compliance checking, and comprehensive construction management into a unified ecosystem.

**Live Demo:** [https://ardo-architect-playground.manus.space](https://ardo-architect-playground.manus.space)

## ✨ Key Features

### 🛒 Intelligent Commerce Engine (ICE)
- **Similar Items Market Window**: ML-based product clustering with cheaper/similar/luxury alternatives
- **Availability Salve**: Real-time stock tracking across multiple suppliers with risk assessment
- **Price Volatility Analysis**: 7-day and 30-day price forecasting with buy/wait/monitor recommendations
- **What-If Scenario Sandbox**: Material substitution testing with instant BOM recalculation

### 🔐 Enhanced User Control
- **Manual Override Audit Trail**: Immutable logging of all human interventions (legal defense mechanism)
- **Supplier Management**: Mandatory inclusion/exclusion controls with reliability scoring
- **Audit Export**: CSV export for compliance and legal documentation

### ♿ Universal Accessibility
- **WCAG AA/AAA Compliance**: High contrast and ultra-high contrast modes
- **Color-Blindness Support**: Protanopia, Deuteranopia, Tritanopia, Achromatopsia filters
- **Font Scaling**: 100%, 125%, 150% scaling options
- **Reduced Motion**: Accessibility for vestibular disorders
- **Screen Reader Optimization**: Enhanced ARIA labels and keyboard navigation

### 🎨 Design Tools
- **64 AI Design Partners**: Specialized AI personalities for every design need
- **50+ Trade Specialists**: Expert guidance from electricians to HVAC specialists
- **Real-time Rendering**: Multiple rendering styles (Photorealistic, Sketch, Blueprint, Watercolor)
- **3D Viewport**: Interactive Three.js-powered 3D design environment
- **Material Library**: 6,000+ materials with realistic previews

### 🛡️ Compliance & Safety
- **Building Code Scanner**: Real-time IBC 2021 compliance checking
- **Acoustic Analysis**: Sound simulation and noise level prediction
- **Structural Validation**: AI-powered structural integrity analysis
- **Black Box Recorder**: Tamper-proof audit trail for liability protection

### 🏗️ Construction Management
- **Contractor Directory**: 110+ contractors across 32 cities
- **Project Scheduling**: Calendar and Gantt chart timeline management
- **Inventory Management**: Real-time material tracking
- **Marketplace**: Buy materials, rent equipment, hire services
- **Invoicing System**: Automated billing and payment tracking
- **Supply Chain Tracking**: Real-time delivery monitoring

### 🚀 Advanced Features
- **Digital Twin System**: Real-time IoT sensor integration and predictive analytics
- **Arbitrage Engine**: Automated price optimization across suppliers
- **AR/VR Preview**: Immersive design visualization
- **Voice Commands**: Hands-free operation
- **Collaboration**: Real-time multi-user editing with presence indicators
- **Cloud Sync**: Automatic project backup and synchronization

### 🎓 Beginner-Friendly
- **Simplified Design Mode**: Hide complex tools, show only basic room/wall manipulation
- **Interactive Tutorial**: Step-by-step onboarding
- **AI Design Suggestions**: Contextual recommendations
- **Quick Actions Toolbar**: One-click access to common tasks

## 🛠️ Tech Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling with @theme inline
- **shadcn/ui**: High-quality component library
- **Three.js**: 3D rendering and visualization
- **Wouter**: Lightweight client-side routing

### Backend (Optional - for full features)
- **tRPC**: End-to-end type-safe APIs
- **Drizzle ORM**: Type-safe database queries
- **PostgreSQL**: Relational database
- **S3**: File storage and asset management

### Development
- **Vite**: Lightning-fast build tool
- **ESLint**: Code quality
- **Prettier**: Code formatting

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/GiftedMedium93/ardo-architect-playground.git
cd ardo-architect-playground

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🚀 Quick Start

1. **Open the application** in your browser (default: http://localhost:3000)
2. **Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)** to open the Command Palette
3. **Search for any feature**: Type "ice", "commerce", "accessibility", "audit", etc.
4. **Start designing**: Add rooms, apply materials, or use AI design partners

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open Command Palette |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Cmd/Ctrl + S` | Save Project |
| `Cmd/Ctrl + E` | Export Project |
| `Cmd/Ctrl + /` | Toggle Keyboard Shortcuts Panel |

## 🎯 Command Palette Quick Access

Press `Cmd/Ctrl + K` and type:
- `ice` → Intelligent Commerce Engine
- `audit` → Manual Override Audit Trail
- `supplier` → Supplier Management
- `accessibility` → Accessibility Settings
- `simplified` → Simplified Design Mode
- `ai` → AI Design Partners
- `compliance` → Compliance Check
- `cost` → Cost Optimizer
- `materials` → Material Library

## 📊 Project Structure

```
ardo-architect-playground/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── advanced/          # ICE, Audit Trail, Accessibility
│   │   │   ├── ui/                # shadcn/ui components
│   │   │   └── ...                # Feature components
│   │   ├── data/                  # Static data and mock databases
│   │   ├── pages/                 # Page components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── contexts/              # React contexts
│   │   └── lib/                   # Utilities and helpers
│   └── public/                    # Static assets
├── server/                        # Backend API (optional)
├── shared/                        # Shared types and constants
└── db/                           # Database schema and migrations
```

## 🎨 Design System

ARDO uses a carefully crafted design system with:
- **Dark Mode First**: Optimized for long design sessions
- **OKLCH Color Space**: Perceptually uniform colors
- **Teal/Navy Accent**: Professional architectural aesthetic
- **Glassmorphism**: Modern frosted glass UI elements
- **Smooth Animations**: 60fps transitions and micro-interactions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database (optional - for full features)
DATABASE_URL=postgresql://user:password@localhost:5432/ardo

# S3 Storage (optional - for file uploads)
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1

# OAuth (optional - for authentication)
OAUTH_SERVER_URL=https://oauth.example.com

# Analytics (optional)
VITE_ANALYTICS_WEBSITE_ID=your-analytics-id
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run type checking
pnpm typecheck
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Three.js** for 3D rendering capabilities
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing framework

## 📞 Support

- **Documentation**: [docs.ardo.example.com](https://docs.ardo.example.com)
- **Issues**: [GitHub Issues](https://github.com/GiftedMedium93/ardo-architect-playground/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GiftedMedium93/ardo-architect-playground/discussions)

## 🗺️ Roadmap

- [ ] Universal Glossary with auto-translation
- [ ] Data Integrity & Curation Systems
- [ ] Metadata Enrichment Engine
- [ ] Autonomous Data Pruning
- [ ] Compliance Data Versioning
- [ ] Mobile App (iOS/Android)
- [ ] Desktop App (Electron)
- [ ] Plugin System for Extensions

---

**Built with ❤️ by the ARDO Team**
