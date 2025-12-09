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

### 1. Set Up MongoDB Atlas (Cloud Database)

Since Vercel serverless functions are ephemeral, you need a cloud MongoDB:

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

In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add:
   - `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/eka-store`

Alternatively, create a `.env.local` file (not committed):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eka-store
```

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

### Run Frontend Only
```bash
cd website
npm run dev
```
Runs on `http://localhost:5173`

### Run Full Stack Locally
You need the old backend running:
```bash
# Terminal 1: Backend
cd backend
npm start
# Runs on http://localhost:5000

# Terminal 2: Frontend
cd website
npm run dev
# Runs on http://localhost:5173
```

The frontend will automatically detect it's in development and call `http://localhost:5000`.

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
