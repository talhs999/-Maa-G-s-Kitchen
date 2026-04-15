# 🛠️ Supabase Configuration Guide for Vercel

If you are seeing the error **"Database connection is not configured"** on your live website, you need to add your Supabase credentials to the Vercel Dashboard. This is required for the Login, Signup, and Database functions to work.

### 1. Get your Supabase Credentials
1. Go to your [Supabase Dashboard](https://app.supabase.com/).
2. Select your project: **Maa G's Kitchen**.
3. Go to **Project Settings** (Gear icon) -> **API**.
4. Copy the following two values:
   - **Project URL**
   - **anon public key**

### 2. Add to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Open your project: **Maa G's Kitchen**.
3. Go to **Settings** -> **Environment Variables**.
4. Add the following two variables:

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | (Paste your Project URL here) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Paste your anon public key here) |

### 3. Redeploy
1. Go to the **Deployments** tab in Vercel.
2. Select the latest deployment and click **Redeploy**.
3. Once the build is finished, your login and products will start working!

---
*Note: This is a security measure. Environment variables should never be committed to GitHub directly.*
