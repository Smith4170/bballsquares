# Deployment Guide: GitHub Actions + GitHub Pages

## Overview

This guide covers deploying the March Madness Squares app from a local project to GitHub Actions + GitHub Pages. The scraper runs on a scheduled GitHub Actions workflow every 5 minutes, commits the updated `scores.json` back to the repo, and the frontend is automatically rebuilt and deployed to GitHub Pages.

-----

## Prerequisites

- Git installed locally
- GitHub account
- Node.js + Python 3 installed locally
- Project built and working locally

-----

## Step 1: Create the GitHub Repository

1. Go to [github.com/new](https://github.com/new)
1. Create a new repository (public or private)
1. Do **not** initialize with a README — you will push your local project
1. From your local project root:

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add .
git commit -m "initial commit"
git push -u origin main
```

-----

## Step 2: Configure Vite for GitHub Pages

GitHub Pages serves your site from a subpath by default (e.g. `https://username.github.io/repo-name`), so Vite needs to know the base path.

In `vite.config.js`:

```js
export default defineConfig({
  base: '/YOUR_REPO_NAME/',  // e.g. '/march-madness-squares/'
  // ... rest of config
})
```

> **Note:** If you later move to a custom domain, change this to `base: '/'`.

-----

## Step 3: Create a `.gitignore`

Make sure the following are ignored:

```
node_modules/
dist/
__pycache__/
scraper/*.log
.env
```

> **Important:** `public/scores.json` should **not** be gitignored — it needs to be committed by the Actions workflow on each scrape run.

-----

## Step 4: Set Up the GitHub Actions Workflow

Create the following file in your project:

**`.github/workflows/scrape-and-deploy.yml`**

```yaml
name: Scrape Scores and Deploy

on:
  schedule:
    - cron: '*/5 * * * *'   # every 5 minutes
  workflow_dispatch:          # allows manual trigger from GitHub UI
  push:
    branches:
      - main                  # deploy on every push to main

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install Python dependencies
        run: pip install requests beautifulsoup4

      - name: Run scraper
        run: python scraper/scraper.py

      - name: Commit updated scores.json
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add public/scores.json
          git diff --cached --quiet || git commit -m "chore: update scores.json [skip ci]"
          git push

  deploy:
    runs-on: ubuntu-latest
    needs: scrape              # wait for scrape job to finish first
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Key Notes

- `[skip ci]` in the commit message prevents the `scores.json` push from triggering another full workflow run infinitely.
- `needs: scrape` ensures the frontend always deploys with the freshest data.
- `GITHUB_TOKEN` is automatically provided by GitHub — no manual secret setup needed.

-----

## Step 5: Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
1. Under **Source**, select **Deploy from a branch**
1. Select branch: `gh-pages`, folder: `/ (root)`
1. Click **Save**

> The `peaceiris/actions-gh-pages` action automatically creates and manages the `gh-pages` branch for you.

-----

## Step 6: Grant Actions Write Permission

By default, Actions may not have permission to push commits back to your repo.

1. Go to **Settings** → **Actions** → **General**
1. Scroll to **Workflow permissions**
1. Select **Read and write permissions**
1. Click **Save**

-----

## Step 7: Verify the Deployment

1. Go to the **Actions** tab in your repo to watch the first workflow run
1. Once complete, your site will be live at:
   
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```
1. You can manually trigger a scrape at any time via **Actions** → **Scrape Scores and Deploy** → **Run workflow**

-----

## Ongoing Workflow (Day-to-Day)

|Trigger                     |What Happens                                        |
|----------------------------|----------------------------------------------------|
|Push code changes to `main` |Triggers a full build + deploy                      |
|Every 5 minutes (automated) |Scraper runs, `scores.json` updated, site redeployed|
|Manual trigger via GitHub UI|Useful for testing or forcing a refresh             |

-----

## Future Optimization: Split Scrape and Deploy

During the tournament, the scrape + deploy cycle runs every 5 minutes. Since each run rebuilds the entire Vue app, consider **splitting the scrape and deploy into two separate workflow files** once the app is stable:

- **`scrape.yml`** — runs every 5 minutes, updates `scores.json` only
- **`deploy.yml`** — runs only on pushes to `main` (i.e. code changes)

The frontend can fetch `scores.json` directly from the repo’s raw public URL, meaning score updates are reflected without a full frontend rebuild. This reduces Actions minutes usage and speeds up score refresh times.

-----

## Custom Domain (Optional)

If you want to serve the app from your own domain instead of `github.io`:

1. Add a `CNAME` file to your `public/` folder containing your domain, e.g.:
   
   ```
   marchmadness.yourdomain.com
   ```
1. Go to **Settings** → **Pages** → **Custom domain** and enter your domain
1. Update your DNS provider to point to GitHub Pages
1. Update `vite.config.js` to use `base: '/'`