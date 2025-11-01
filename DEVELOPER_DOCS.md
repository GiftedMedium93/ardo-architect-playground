# ARDO Developer Documentation
**Architecture Reimagined, Design Optimized - Technical Reference**

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Development Workflow](#development-workflow)
6. [API Reference](#api-reference)
7. [Database Schema](#database-schema)
8. [Component Library](#component-library)
9. [State Management](#state-management)
10. [Authentication](#authentication)
11. [3D Rendering System](#3d-rendering-system)
12. [AI Integration](#ai-integration)
13. [Testing](#testing)
14. [Deployment](#deployment)
15. [Contributing](#contributing)

---

## Architecture Overview

ARDO is a full-stack web application built with modern technologies and best practices.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Components  │  │  Three.js 3D │  │   tRPC Client│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   tRPC Router   │
                    └────────┬────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      Server (Node.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  API Routes  │  │  Auth System │  │  AI Services │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Drizzle ORM   │
                    └────────┬────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│         Projects │ Users │ Materials │ Sessions             │
└──────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Type Safety**: End-to-end TypeScript with tRPC for type-safe APIs
2. **Component Modularity**: Reusable, composable React components
3. **Performance**: Optimized 3D rendering with Three.js
4. **Accessibility**: WCAG 2.1 AA compliant with ARIA labels
5. **Scalability**: Stateless server design for horizontal scaling

---

## Technology Stack

### Frontend
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Three.js**: 3D graphics and visualization
- **Wouter**: Lightweight client-side routing
- **tRPC Client**: Type-safe API calls

### Backend
- **Node.js**: JavaScript runtime
- **tRPC**: End-to-end type-safe APIs
- **Drizzle ORM**: Type-safe database queries
- **PostgreSQL**: Relational database
- **JWT**: Authentication tokens

### AI & External Services
- **OpenRouter API**: AI chat integration
- **14 AI Models**: Specialized architectural design partners

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript Compiler**: Type checking

---

## Project Structure

```
ardo-architect-playground/
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── AIDesignPartnersPanel.tsx
│   │   │   ├── ThreeViewport.tsx
│   │   │   ├── ProjectManager.tsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   └── Home.tsx
│   │   ├── lib/             # Utilities and helpers
│   │   │   ├── trpc.ts
│   │   │   ├── animations.ts
│   │   │   └── utils.ts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   └── package.json
├── server/                   # Backend application
│   ├── routers.ts           # tRPC routers
│   ├── projectDb.ts         # Database helpers
│   ├── aiChatRouter.ts      # AI chat endpoints
│   └── index.ts             # Server entry
├── drizzle/                 # Database
│   └── schema.ts            # Database schema
├── shared/                  # Shared types
│   └── const.ts            # Constants
├── ARDO_User_Guide.md      # User documentation
├── DEVELOPER_DOCS.md       # This file
└── package.json            # Root dependencies
```

---

## Setup & Installation

### Prerequisites

- Node.js 22.x or higher
- PostgreSQL 14.x or higher
- pnpm (recommended) or npm

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ardo-architect-playground
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/ardo
   OPENROUTER_API_KEY=your_openrouter_api_key
   JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations**
   ```bash
   pnpm db:push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Access the application**
   Open http://localhost:3000 in your browser

---

## Development Workflow

### Running the Development Server

```bash
pnpm dev
```

This starts:
- Vite dev server on port 3000 (frontend)
- Node.js server with hot reload (backend)
- TypeScript compiler in watch mode

### Building for Production

```bash
pnpm build
```

### Linting and Type Checking

```bash
pnpm lint        # ESLint
pnpm type-check  # TypeScript
```

### Database Operations

```bash
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Drizzle Studio
pnpm db:generate  # Generate migrations
```

---

## API Reference

### tRPC Routers

ARDO uses tRPC for type-safe API communication.

#### Projects Router

**`projects.list`**
- **Type**: Query
- **Returns**: `Project[]`
- **Description**: List all projects for the current user

**`projects.create`**
- **Type**: Mutation
- **Input**: `{ name: string, description?: string }`
- **Returns**: `Project`
- **Description**: Create a new project

**`projects.update`**
- **Type**: Mutation
- **Input**: `{ id: string, name?: string, description?: string, data?: any }`
- **Returns**: `Project`
- **Description**: Update an existing project

**`projects.delete`**
- **Type**: Mutation
- **Input**: `{ id: string }`
- **Returns**: `void`
- **Description**: Delete a project

#### AI Chat Router

**`aiChat.sendMessage`**
- **Type**: Mutation
- **Input**: `{ partnerId: string, message: string, conversationHistory: Message[] }`
- **Returns**: `{ response: string }`
- **Description**: Send a message to an AI design partner

### Example Usage

```typescript
import { trpc } from "@/lib/trpc";

function MyComponent() {
  // Query
  const { data: projects } = trpc.projects.list.useQuery();
  
  // Mutation
  const createProject = trpc.projects.create.useMutation({
    onSuccess: (project) => {
      console.log("Created:", project);
    },
  });
  
  const handleCreate = () => {
    createProject.mutate({
      name: "New Project",
      description: "My description",
    });
  };
  
  return <div>{/* ... */}</div>;
}
```

---

## Database Schema

### Projects Table

```typescript
export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  data: jsonb("data"),  // Stores project state
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### Users Table

```typescript
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

---

## Component Library

### Core Components

#### ThreeViewport
3D rendering viewport using Three.js

```typescript
interface ThreeViewportProps {
  loadedModel?: { url: string; name: string; type: string } | null;
}

<ThreeViewport loadedModel={model} />
```

#### AIDesignPartnersPanel
Panel for selecting and chatting with AI partners

```typescript
interface AIDesignPartnersPanelProps {
  onBack: () => void;
  onSelectPartner: (partner: { id: string; name: string; icon: string }) => void;
}

<AIDesignPartnersPanel onBack={handleBack} onSelectPartner={handleSelect} />
```

#### ProjectManager
Modal for managing projects

```typescript
interface ProjectManagerProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

<ProjectManager open={isOpen} onClose={handleClose} onSelectProject={handleSelect} />
```

#### SpaceArchitecturePanel
Panel for designing extraterrestrial habitats and space structures

```typescript
interface SpaceArchitecturePanelProps {
  onClose: () => void;
}

<SpaceArchitecturePanel onClose={handleClose} />
```

**Features:**
- 8 space environments (Moon, Mars, LEO, asteroids, deep space)
- 12 specialized space materials
- Habitat design templates
- Radiation shielding calculator
- Life support systems calculator
- Environmental conditions analysis

#### TransportationInfrastructurePanel
Panel for designing comprehensive transportation systems

```typescript
interface TransportationInfrastructurePanelProps {
  onClose: () => void;
}

<TransportationInfrastructurePanel onClose={handleClose} />
```

**Features:**
- Rail systems database (freight, passenger, high-speed)
- Light rail and metro systems
- Road design database (freeways to local streets)
- Bridge design templates (5 major types)
- Tunnel design database (3 construction methods)
- Intersection and roundabout designs
- Pedestrian and bicycle infrastructure
- Traffic flow calculator
- Infrastructure cost estimator

#### MeasurementToolsPanel
Panel for precision measurement instruments

```typescript
interface MeasurementToolsPanelProps {
  onClose: () => void;
}

<MeasurementToolsPanel onClose={handleClose} />
```

**Features:**
- Distance, area, volume, and angle measurement tools
- Metric and Imperial unit systems
- Adjustable decimal precision
- Grid snap settings
- Active measurements list
- Quick shape templates

#### SmartMaterialSelectionPanel
Panel for AI-powered material recommendations

```typescript
interface SmartMaterialSelectionPanelProps {
  onClose: () => void;
}

<SmartMaterialSelectionPanel onClose={handleClose} />
```

**Features:**
- Budget range selection
- Climate zone configuration
- Priority settings (sustainability, durability, aesthetics)
- AI-generated material recommendations with scores
- Detailed material metrics and comparisons
- Application suggestions

### UI Components (shadcn/ui)

All UI components are from shadcn/ui and can be found in `client/src/components/ui/`:

- `Button`
- `Card`
- `Dialog`
- `Input`
- `Textarea`
- `Dropdown`
- `Tooltip`
- And more...

---

## State Management

### Local State (useState)

Used for component-level state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [selectedTool, setSelectedTool] = useState("select");
```

### Server State (tRPC)

Used for data fetching and mutations:

```typescript
const { data, isLoading } = trpc.projects.list.useQuery();
const mutation = trpc.projects.create.useMutation();
```

### Global State (Context)

Used for app-wide state like authentication:

```typescript
const { user, isAuthenticated } = useAuth();
```

---

## Authentication

ARDO uses JWT-based authentication.

### Login Flow

1. User submits credentials
2. Server validates and issues JWT
3. Client stores JWT in localStorage
4. JWT included in all API requests

### Protected Routes

```typescript
function ProtectedComponent() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <div>Protected content</div>;
}
```

---

## 3D Rendering System

### Three.js Integration

ARDO uses Three.js for 3D visualization.

#### Scene Setup

```typescript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
```

#### Loading 3D Models

```typescript
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
loader.load(url, (gltf) => {
  scene.add(gltf.scene);
});
```

#### Material Application

Custom event system for drag-and-drop materials:

```typescript
window.dispatchEvent(new CustomEvent("applyMaterial", {
  detail: { materialData }
}));
```

---

## AI Integration

### OpenRouter API

ARDO uses OpenRouter for AI chat functionality.

#### Configuration

```typescript
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
```

#### Making AI Requests

```typescript
const response = await fetch(OPENROUTER_URL, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "anthropic/claude-3.5-sonnet",
    messages: conversationHistory,
  }),
});
```

### AI Design Partners

14 specialized AI personalities with unique system prompts:

- Zaha Hadid (Parametric)
- Norman Foster (Sustainable)
- Frank Lloyd Wright (Organic)
- And 11 more...

---

## Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests

```bash
pnpm test:e2e
```

### Type Checking

```bash
pnpm type-check
```

---

## Deployment

### Production Build

```bash
pnpm build
```

### Environment Variables

Required for production:

```env
DATABASE_URL=<production_database_url>
OPENROUTER_API_KEY=<your_api_key>
JWT_SECRET=<secure_random_string>
NODE_ENV=production
```

### Deployment Platforms

ARDO can be deployed to:
- Vercel
- Railway
- Render
- AWS
- Google Cloud Platform

---

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Commit Message Format

```
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
style: Format code
refactor: Refactor component
test: Add tests
chore: Update dependencies
```

---

## Performance Optimization

### 3D Rendering

- Use LOD (Level of Detail) for complex models
- Implement frustum culling
- Optimize geometry and textures
- Use instancing for repeated objects

### Code Splitting

```typescript
const LazyComponent = lazy(() => import("./Component"));
```

### Memoization

```typescript
const MemoizedComponent = memo(Component);
const memoizedValue = useMemo(() => compute(), [deps]);
const memoizedCallback = useCallback(() => {}, [deps]);
```

---

## Troubleshooting

### Common Issues

**Issue**: 3D models not loading
- **Solution**: Check file format (GLTF, GLB, OBJ, FBX)
- **Solution**: Verify file size (< 50MB recommended)

**Issue**: AI chat not responding
- **Solution**: Check OPENROUTER_API_KEY environment variable
- **Solution**: Verify internet connection

**Issue**: Database connection errors
- **Solution**: Check DATABASE_URL format
- **Solution**: Ensure PostgreSQL is running

---

## API Rate Limits

### OpenRouter API
- Free tier: 10 requests/minute
- Pro tier: 100 requests/minute

### Database
- Connection pool: 20 connections
- Query timeout: 30 seconds

---

## Security Best Practices

1. **Never commit secrets** to version control
2. **Use environment variables** for sensitive data
3. **Validate all user input** on the server
4. **Sanitize database queries** using Drizzle ORM
5. **Implement rate limiting** for API endpoints
6. **Use HTTPS** in production
7. **Keep dependencies updated** regularly

---

## Resources

- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs/)
- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

## License

[Your License Here]

---

## Support

For technical support or questions:
- GitHub Issues: [Your Repo URL]
- Email: support@ardo.app
- Documentation: https://docs.ardo.app

---

*Last Updated: 2025*
*Version: 1.0.0*

