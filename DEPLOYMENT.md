# Vercel Deployment Guide

Your project is now set up for **full-stack deployment on Vercel** with both frontend and backend in one project.

## Project Structure

```
├── api/                    # Vercel serverless API functions
│   ├── index.ts           # Test endpoint (GET /)
│   └── orders.ts          # Orders endpoint (/api/orders)
├── website/               # React frontend
│   ├── src/
│   │   ├── lib/api.ts    # API configuration (NEW)
│   │   └── pages/
│   └── package.json
├── vercel.json            # Vercel configuration (NEW)
├── .env.example           # Environment variables template (NEW)
└── package.json           # Root package (UPDATED)
```

## Key Changes Made

1. **`api/orders.ts`** - Serverless function handling POST/GET requests for orders
   - Connects to MongoDB using `MONGODB_URI` env variable
   - Replaces the old Express backend
   - Auto-converted to serverless functions by Vercel

2. **`api/index.ts`** - Simple test endpoint at `/api/`

3. **`vercel.json`** - Configuration file
   - Sets build command for the website
   - Configures serverless functions
   - Sets output directory to `website/dist`

4. **`website/src/lib/api.ts`** - API configuration utility (NEW)
   - Automatically uses `/api/orders` on production
   - Uses `http://localhost:5000` in development
   - Makes switching between local and deployed easy

5. **`CheckoutPage.tsx`** - Updated to use new API utility

## Deployment Steps

### 1. Set Up MongoDB

**Option A: Use Your Existing MongoDB Community Edition** (Recommended)
- Your local MongoDB is already running
- Connection: `mongodb://127.0.0.1:27017/eka-store`
- No additional setup needed!

**Option B: Use MongoDB Atlas (Cloud)** 
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and a cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/eka-store`
4. Add your IP to the whitelist (use `0.0.0.0/0` for all IPs)

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option B: Connect GitHub Repo (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Import Project"
3. Select your GitHub repo `ADT1123/EKA-NEW`
4. Click "Deploy"
5. Add environment variables in settings

### 3. Add Environment Variables

**For Local Development:**
Create a `.env.local` file in the root (not committed):
```
MONGODB_URI=mongodb://127.0.0.1:27017/eka-store
```

**For Vercel Production:**
In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add `MONGODB_URI`:
   - If using MongoDB Community (local, not accessible from Vercel): Use MongoDB Atlas instead
   - If using MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/eka-store`

⚠️ **Note:** Vercel serverless functions cannot reach your local MongoDB. You must use MongoDB Atlas for production.

### 4. Verify Deployment

Once deployed, test:
```bash
# Test API
curl https://your-site.vercel.app/api

# Test Orders endpoint
curl -X POST https://your-site.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items": [{"name": "test", "price": 100, "quantity": 1}], "customer": {"name": "Test"}, "shippingAddress": {}, "notes": ""}'
```

## Development Locally

### Prerequisites
- MongoDB Community Edition installed and running
- Node.js v16+

### Ensure MongoDB is Running
```bash
# Windows (if installed)
# MongoDB should auto-start as a service

# Check if running
netstat -ano | findstr :27017
```

### Option 1: Run Frontend Only (No Backend)
```bash
cd website
npm run dev
```
- Frontend runs on `http://localhost:5173`
- API calls will fail (no backend)

### Option 2: Run Full Stack (Frontend + Backend)
```bash
# Install dependencies first
npm install

# Terminal 1: Start local API server
npm run api:local

# Terminal 2: Start frontend
npm run dev
```

Or run both simultaneously:
```bash
npm run dev:full
```

The frontend will automatically detect it's in development and call `http://localhost:5000` API.

### Available npm Scripts

| Command | What it does |
|---------|------------|
| `npm run dev` | Frontend only (Vite dev server) |
| `npm run api:local` | Backend only (Express server with MongoDB) |
| `npm run dev:full` | Both frontend + backend together |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |

## Important Notes

⚠️ **Vercel Function Limitations:**
- Each function has a maximum execution time (60 seconds on free plan)
- Cold start delays (~1-2 seconds on first call)
- Cannot keep persistent connections open
- No long-running background jobs

✅ **What Works:**
- REST APIs ✓
- Serverless functions ✓
- Database queries ✓
- File uploads (via temp storage) ✓

## Next Steps

1. Set up MongoDB Atlas
2. Get your connection string
3. Push to Vercel
4. Add `MONGODB_URI` to environment variables
5. Test the API endpoints

## Troubleshooting

**Frontend won't call backend:**
- Check if `NODE_ENV` is set correctly
- Verify API URL in `website/src/lib/api.ts`
- Check browser console for network errors

**MongoDB connection fails:**
- Verify `MONGODB_URI` in Vercel environment variables
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

**Build fails:**
- Check Vercel logs in dashboard
- Ensure `website/package.json` has all dependencies
- Run `npm run build` locally to test

## Questions?

- Vercel Docs: https://vercel.com/docs
- Serverless Functions: https://vercel.com/docs/functions/serverless-functions
- MongoDB Atlas: https://www.mongodb.com/docs/atlas
