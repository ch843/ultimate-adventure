# Deploying to Vercel

This guide walks through deploying all four services (2 frontends + 2 backends) to Vercel.

## Prerequisites

- A Vercel account (free tier works)
- GitHub repository connected to Vercel
- Your Ultimate Adventure Guides monorepo pushed to GitHub

## Architecture

All services will be deployed to Vercel:

1. **Web Frontend** → `ultimateadventureguides.com`
2. **Web Backend API** → `web-server.ultimateadventureguides.com`
3. **Admin Frontend** → `admin.ultimateadventureguides.com`
4. **Admin Backend API** → `admin-server.ultimateadventureguides.com`

## Step 1: Deploy Backend APIs

### Deploy Web Server

1. Go to [vercel.com](https://vercel.com) and click "Add New Project"
2. Import your GitHub repository
3. Configure the project:
   - **Project Name**: `ultimate-adventure-web-server`
   - **Framework Preset**: Other
   - **Root Directory**: `apps/web-server`
   - **Build Command**: `npm run build`
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

4. Add Environment Variables:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=http://localhost:5173,https://ultimateadventureguides.com
   SUPABASE_URL=https://ooelvqpdhbpsjsqbrljg.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZWx2cXBkaGJwc2pzcWJybGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDU0MTgsImV4cCI6MjA2MDQ4MTQxOH0.Hzrf9H-rMIT4Ljy367pCU4Ab5aIC6_kn24IeWhnMi7A
   ```

5. Click "Deploy"

6. Once deployed, go to **Settings** → **Domains** and add:
   - `web-server.ultimateadventureguides.com`

### Deploy Admin Server

1. Click "Add New Project" again
2. Import the same GitHub repository
3. Configure the project:
   - **Project Name**: `ultimate-adventure-admin-server`
   - **Framework Preset**: Other
   - **Root Directory**: `apps/admin-server`
   - **Build Command**: `npm run build`
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

4. Add Environment Variables:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=http://localhost:5174,http://localhost:5173,https://admin.ultimateadventureguides.com,https://ultimateadventureguides.com
   SUPABASE_URL=https://ooelvqpdhbpsjsqbrljg.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZWx2cXBkaGJwc2pzcWJybGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDU0MTgsImV4cCI6MjA2MDQ4MTQxOH0.Hzrf9H-rMIT4Ljy367pCU4Ab5aIC6_kn24IeWhnMi7A
   ```

5. Click "Deploy"

6. Once deployed, go to **Settings** → **Domains** and add:
   - `admin-server.ultimateadventureguides.com`

## Step 2: Deploy Frontends

### Deploy Web Frontend

1. Click "Add New Project"
2. Import the same GitHub repository
3. Configure the project:
   - **Project Name**: `ultimate-adventure-web`
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   ```
   VITE_SUPA_API_URL=https://ooelvqpdhbpsjsqbrljg.supabase.co
   VITE_SUPA_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZWx2cXBkaGJwc2pzcWJybGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDU0MTgsImV4cCI6MjA2MDQ4MTQxOH0.Hzrf9H-rMIT4Ljy367pCU4Ab5aIC6_kn24IeWhnMi7A
   ```

   **Note:** Don't set `VITE_API_URL` - the code will auto-detect production and use `https://web-server.ultimateadventureguides.com/trpc`

5. Click "Deploy"

6. Once deployed, go to **Settings** → **Domains** and add:
   - `ultimateadventureguides.com`

### Deploy Admin Frontend

1. Click "Add New Project"
2. Import the same GitHub repository
3. Configure the project:
   - **Project Name**: `ultimate-adventure-admin`
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   ```
   VITE_SUPA_API_URL=https://ooelvqpdhbpsjsqbrljg.supabase.co
   VITE_SUPA_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZWx2cXBkaGJwc2pzcWJybGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDU0MTgsImV4cCI6MjA2MDQ4MTQxOH0.Hzrf9H-rMIT4Ljy367pCU4Ab5aIC6_kn24IeWhnMi7A
   ```

   **Note:** Don't set `VITE_API_URL` - the code will auto-detect production and use `https://admin-server.ultimateadventureguides.com/trpc`

5. Click "Deploy"

6. Once deployed, go to **Settings** → **Domains** and add:
   - `admin.ultimateadventureguides.com`

## Step 3: Configure DNS

In your domain registrar (where you bought ultimateadventureguides.com), add these DNS records:

### For Root Domain
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP)
```

### For Subdomains
```
Type: CNAME
Name: web-server
Value: cname.vercel-dns.com

Type: CNAME
Name: admin
Value: cname.vercel-dns.com

Type: CNAME
Name: admin-server
Value: cname.vercel-dns.com
```

**Note:** Vercel will provide exact DNS instructions after you add each custom domain.

## Step 4: Verify Deployment

### Test Backend APIs

1. **Web Server Health Check:**
   ```
   https://web-server.ultimateadventureguides.com/health
   ```
   Should return: `{"status":"ok","service":"web-server"}`

2. **Admin Server Health Check:**
   ```
   https://admin-server.ultimateadventureguides.com/health
   ```
   Should return: `{"status":"ok","service":"admin-server"}`

### Test Frontends

1. Visit `https://ultimateadventureguides.com`
   - Open browser console
   - Should see API calls to `https://web-server.ultimateadventureguides.com/trpc`

2. Visit `https://admin.ultimateadventureguides.com`
   - Open browser console
   - Should see API calls to `https://admin-server.ultimateadventureguides.com/trpc`

## How It Works

### Local Development (NODE_ENV not set or = "development")
- Backend calls `app.listen()` and starts a server on the specified port
- Frontend uses localhost URLs

### Production (NODE_ENV = "production")
- Backend skips `app.listen()` and exports the Express app
- Vercel wraps the exported app in a serverless function
- Frontend auto-detects production mode and uses production URLs

## Automatic Deployments

Once set up, Vercel will automatically redeploy when you push to your GitHub repository. You can configure which branches trigger deployments in each project's settings.

## Troubleshooting

### CORS Errors
- Check that `ALLOWED_ORIGINS` in backend includes the frontend domain
- Verify the frontend is making requests to the correct backend URL

### 404 Errors on API Routes
- Verify `vercel.json` exists in the backend directories
- Check build logs to ensure TypeScript compiled successfully

### Frontend Can't Connect to Backend
- Check browser console for the API URL being used
- Verify DNS is properly configured
- Test the backend health endpoint directly

### Cold Starts
- First request to a serverless function may be slower (cold start)
- This is normal for Vercel's free tier
- Subsequent requests will be much faster

## Local Development Still Works!

Your local development setup is unchanged:
```bash
npm run services
```

This starts all 4 services locally. The code detects `NODE_ENV` is not "production" and runs normally with `app.listen()`.
