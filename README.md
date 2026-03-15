# FoxFire Security — Website

Single-page marketing site for FoxFire Security. Built with plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies beyond Google Fonts.

## Project structure

```
foxfirewebsite/
├── index.html   # All markup and content
├── style.css    # Design system + layout
├── script.js    # Nav scroll, fade-ins, mobile menu
└── README.md
```

## Before you deploy

Search for `CALENDLY_LINK_HERE` in `index.html` and replace all three occurrences with your actual Calendly URL:

```
https://calendly.com/your-username/30min
```

There are three instances:
1. Nav "Book a call" button
2. Mobile nav "Book a call" button
3. Contact section "Book a time →" button

## Deploy to Cloudflare Pages via GitHub

### Step 1 — Push to GitHub

```bash
cd foxfirewebsite
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/foxfirewebsite.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Pages** → **Create a project**
3. Select **Connect to Git** → authorize GitHub if prompted
4. Choose your `foxfirewebsite` repository
5. Configure the build settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | *(leave blank)* |
| Build output directory | `/` (or leave blank) |
| Root directory | *(leave blank)* |

6. Click **Save and Deploy**

Cloudflare Pages will detect the static site automatically — no build command needed.

### Step 3 — Custom domain (optional)

1. In your Pages project, go to **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g., `foxfiresecurity.com`)
3. Follow Cloudflare's DNS instructions (add a CNAME record, or transfer your domain to Cloudflare for automatic setup)

### Subsequent deploys

Every push to `main` triggers an automatic deploy. Preview deployments are created automatically for pull requests.

## Making updates

- **Content changes** — edit `index.html` directly; all copy is inline
- **Colors / spacing** — CSS custom properties are at the top of `style.css` under `:root`
- **Calendly link** — replace `CALENDLY_LINK_HERE` in `index.html` (three spots)
- **Email** — `calvin@foxfiresecurity.com` appears in the footer `<a href="mailto:...">` tag

## Local preview

No build step required. Open `index.html` directly in a browser, or use any static file server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8080`.
