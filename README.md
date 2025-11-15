# ShopHub (Voice Shopping)

This README includes only the essential information for local development, the product-matching algorithm, deploy steps, and a concise project approach summary.

## Live Demo
Open the app here:  
https://voice-showping-git-main-sumitkarde03s-projects.vercel.app?_vercel_share=w7qnLJxt0SwhmsDFTW5XzvjFhaiWrYtB

---

## How to run locally

1. Install dependencies

```sh
npm install
```

2. Create a `.env` in the project root with your Supabase values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. (Optional) Seed sample products

```sh
npm run seed
```

4. Start the dev server

```sh
npm run dev
```

The dev server will print the local URL (commonly `http://localhost:5173` or `http://localhost:8080`).

## How matching algorithm works

The product-matching algorithm converts a voice transcript into a scored set of candidate products. Key steps:
- Tokenize and normalize the transcript (lowercase, punctuation removal).
- Exact and prefix matches on product title and SKU receive the highest weight.
- Substring matches and partial word overlaps add moderate score.
- Tag/category matches (product tags like `mango`, `organic`) add a tag boost to relevance.
- Availability filters remove out-of-stock items unless explicitly requested.
- Price constraints from the transcript (e.g., “under 200”) apply a penalty to items above that threshold.
- Scores are combined with tunable weights to rank results; the top-ranked product(s) are used for actions (add to cart, show details). The algorithm favors exact-title and tag matches and falls back to fuzzy/substring when needed.

## Deploy steps

1. Build the app

```sh
npm run build
```

2. Set environment variables in your hosting provider:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

3. Run migrations / configure Supabase:
- Run SQL migrations in Supabase (found in `supabase/migrations/`).
- Seed product data if required (`npm run seed`).

4. Configure authentication redirect URLs in Supabase to your production domain (e.g., `https://yourdomain.com/auth/callback`).

5. Deploy the `dist` or platform-specific build folder to Vercel, Netlify, or any static host that supports the production build.

## 📝 Screenshots

> Upload your images inside a folder named **/screenshots** in your repo, then update the filenames below.

### 🖼️ Home Page  
![Home Page](<img width="1919" height="1068" alt="image" src="https://github.com/user-attachments/assets/d5242e11-d3c3-4867-831b-846e842d2666" />
)

### 🎤 Voice Input Enabled  
![Voice Input](<img width="1419" height="1076" alt="image" src="https://github.com/user-attachments/assets/e12531c4-41a4-47ab-8e1a-8da082b00690" />
)

### 🤖 AI Response Screen  
![AI Response](<img width="1898" height="997" alt="image" src="https://github.com/user-attachments/assets/a4c0d5df-ec0b-46c3-ad6d-f690fb78a685" />
)

---

## Approach summary

This project implements a voice-first shopping experience by combining Web Speech API-based recognition with a lightweight, relevance-driven product-matching algorithm. The UI is a standard React + Vite single-page app with a small, focused catalogue. On the voice side, the system captures a user transcript, normalizes text, and extracts constraints such as product names, tags, and optional price cues. Matching uses a multi-factor scoring model: exact title or SKU matches are prioritized, followed by prefix and substring matches; tag hits boost relevance significantly because tags encode high-level category and attribute information. Availability is treated as a hard filter by default to avoid adding out-of-stock items; users may override this by specifying availability intent. Scores are adjusted for inferred price constraints so that results under a spoken limit are favored. This mix of deterministic rules and tunable weights creates predictable behavior for common voice queries while still allowing fuzzy matching for partial phrases. The architecture keeps voice processing client-centric for responsive interactions, with the option to delegate heavy matching to a backend if scale or privacy needs evolve.

