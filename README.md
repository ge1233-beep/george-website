# George Fernando — Personal Website

Static portfolio site (HTML + CSS + JavaScript, no framework) for lead generation
and marketing automation clients. Built to show business owners clearly what George
can bring to their business: methods first, results second.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site: hero, services, method, results, experience, contact |
| `styles.css` | All styling (light grey + lime green, from the inspiration design) |
| `script.js` | Mobile menu, scroll reveal, parallax, depth cursor, proof lightbox |
| `assets/george-photo.jpg` | Hero photo |
| `assets/george-fernando-resume.pdf` | CV linked from the "Download CV" button |
| `assets/proof-*.png` / `assets/proof-*.jpg` | Case-study proof screenshots (open when a project card is clicked) |

## Preview it on your PC

```bash
cd george-website
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploy — GitHub + Vercel

1. **Create the repo on GitHub.** Go to github.com/new, name it `george-website`
   (or any name), make it Public, and create it with no README.
2. **Push these files.** On your PC, in the folder with these files:
   ```bash
   git init
   git add .
   git commit -m "George Fernando portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/george-website.git
   git push -u origin main
   ```
   Or use the GitHub website: open the new repo and use "uploading an existing file".
3. **Deploy on Vercel.** Go to vercel.com, sign in with GitHub, click
   **Add New → Project**, pick the `george-website` repo, and click **Deploy**.
   No build settings to change — it is a static site, Vercel serves it as-is.
4. **Your live link** will be something like `https://george-website.vercel.app`.
   You can add your own domain later in Vercel → Settings → Domains.

## Editing the content

- **Text, rates, links:** edit `index.html` directly.
- **Colors:** change the values at the top of `styles.css` (`--green`, `--ink`, `--bg`).
- **Photo:** replace `assets/george-photo.jpg` with a new photo of the same name.
- **CV:** replace `assets/george-fernando-resume.pdf` with a new resume of the same name.

## Facts used on the site (all verified)

- Rate: $6/hour. Location: Butuan City, Philippines.
- BrokerBlocks: 30,000 team records personally built; the CRM holds 49,981 contacts in total. Owners and decision-makers, US & Canada.
- Quality SIRvice: ~13,000 contacts, Ohio colleges and high schools, GoHighLevel automation. Up to 3 events booked in one month.
- LPS China: found employee emails for property developers via LinkedIn and RocketReach. Up to ~1,000 verified emails compiled per day.
- Intelligent.com: 1 year of backlink research for multiple clients.
- Upwork: 100% Job Success, $10K+ earned, 3,718 hours.
- SEO: Supreme Garage Door — built from scratch, then SEO'd; 544 clicks, 41.4K impressions; Pallet Guys — 4.78K clicks, 422K impressions.
- Contact: jezfernando1233@gmail.com, WhatsApp +63 976 356 3103, LinkedIn, Facebook (George Fern).
