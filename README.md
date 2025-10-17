# Ultimate Adventure Monorepo

This is a Turborepo-managed monorepo for the Ultimate Adventure project.

## Project Structure

```
/ultimate-adventure
├── apps/
│   ├── web/                    # Ultimate Adventure Guides (frontend)
│   ├── admin/                  # Ultimate Adventure Guides Admin (frontend)
│   ├── web-api/                # Future: Backend API for web
│   └── admin-api/              # Future: Backend API for admin
├── packages/
│   ├── shared-models/          # Shared data models and types (using Zod)
│   ├── backend-utils/          # Backend-specific utilities
│   └── tsconfig/               # Shared TypeScript configurations
├── turbo.json                  # Turborepo configuration
└── package.json                # Root package.json with workspaces
```

## Quick Start

### Install Dependencies

```bash
npm install
```

### Development

Run all apps in development mode:

```bash
npm run dev
```

Run a specific app:

```bash
# Run web app only
npm run dev --filter=@ultimate-adventure/web

# Run admin app only
npm run dev --filter=@ultimate-adventure/admin
```

### Build

Build all apps:

```bash
npm run build
```

Build a specific app:

```bash
# Build web app
npm run build --filter=@ultimate-adventure/web

# Build admin app
npm run build --filter=@ultimate-adventure/admin
```

### Lint

Lint all packages:

```bash
npm run lint
```

## Packages

### `@ultimate-adventure/shared-models`

Shared data models and types used across all apps. Built with Zod for runtime validation.

**Usage in apps:**

1. Add to package.json dependencies:
```json
{
  "dependencies": {
    "@ultimate-adventure/shared-models": "*"
  }
}
```

2. Import in your code:
```typescript
import { YourModel } from '@ultimate-adventure/shared-models';
```

### `@ultimate-adventure/backend-utils`

Backend-specific utilities shared between backend services.

**Usage:**

1. Add to package.json dependencies (backend apps only):
```json
{
  "dependencies": {
    "@ultimate-adventure/backend-utils": "*"
  }
}
```

2. Import in your code:
```typescript
import { yourUtil } from '@ultimate-adventure/backend-utils';
```

### `@ultimate-adventure/tsconfig`

Shared TypeScript configurations to ensure consistency across the monorepo.

Available configs:
- `base.json` - Base configuration for all packages
- `react.json` - React-specific configuration for frontend apps
- `node.json` - Node-specific configuration for build tools (Vite, etc.)

**Usage:**

```json
{
  "extends": "@ultimate-adventure/tsconfig/react.json",
  "compilerOptions": {
    // Your app-specific overrides
  }
}
```

## Adding New Apps

1. Create a new directory in `apps/`:
```bash
mkdir apps/your-new-app
```

2. Create a `package.json` with the naming convention:
```json
{
  "name": "@ultimate-adventure/your-new-app",
  "version": "0.0.0",
  "private": true
}
```

3. Install dependencies from the root:
```bash
npm install
```

## Adding New Packages

1. Create a new directory in `packages/`:
```bash
mkdir packages/your-package
```

2. Create a `package.json`:
```json
{
  "name": "@ultimate-adventure/your-package",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

3. Install dependencies from the root:
```bash
npm install
```

## Turborepo Features

- **Caching**: Turborepo caches build outputs to speed up subsequent builds
- **Parallel Execution**: Runs tasks across packages in parallel when possible
- **Dependency Graph**: Automatically understands dependencies between packages
- **Remote Caching**: Can be configured for team-wide cache sharing (optional)

## Environment Variables

Each app manages its own `.env` file. Environment variables are not shared across apps by default.

- `apps/web/.env` - Web app environment variables
- `apps/admin/.env` - Admin app environment variables

## Future Roadmap

- [ ] Split frontend apps into separate frontend and backend
- [ ] Add `apps/web-api` - Backend API for the web app
- [ ] Add `apps/admin-api` - Backend API for the admin app
- [ ] Set up shared authentication package
- [ ] Add E2E testing setup
- [ ] Configure remote caching for CI/CD

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
