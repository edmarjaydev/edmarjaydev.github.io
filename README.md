# Edmarjay Web Development

A responsive, single-page freelance web development portfolio for Australian small businesses. Built with semantic HTML5, CSS3 and vanilla JavaScript; ready for static hosting on GitHub Pages.

## Project structure

```text
edmarjay-web-development/
├── index.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile-placeholder.svg
│   │   └── og-preview.svg
│   ├── icons/
│   │   └── favicon.svg
│   └── projects/
│       ├── sparklepro.svg
│       ├── aussieflow.svg
│       └── greenedge.svg
├── README.md
├── robots.txt
└── sitemap.xml
```

## Before publishing — personalise these items

Search the project for the following values and replace them with your real details:

1. `YOUR-EMAIL@example.com` — your business email address.
2. `YOUR-WHATSAPP-NUMBER` — international format digits only, e.g. `61412345678` (do not include `+`, spaces or dashes in the `wa.me` URL).
3. `YOUR_FORM_ID` — your Formspree form ID.
4. `YOUR-USERNAME` and `YOUR-REPOSITORY` — your GitHub Pages URL in canonical, Open Graph, sitemap and robots metadata.
5. `YOUR-GITHUB-USERNAME` — your GitHub profile URL.
6. Replace `assets/images/profile-placeholder.svg` with a professional photo. Keep the same filename or update the image path in `index.html`.
7. Update the project preview SVGs or links as real work becomes available. The current SparklePro, AussieFlow and GreenEdge examples are clearly marked as fictional concept projects.

Do not publish until contact details, canonical URL and form endpoint have been updated.

## Enquiry form setup (Formspree)

GitHub Pages serves static files and does not process form submissions by itself. This project uses a standard HTML POST form compatible with Formspree:

1. Create an account at [Formspree](https://formspree.io/) and create a new form.
2. Copy the form endpoint provided by Formspree (it looks like `https://formspree.io/f/xxxxxxxx`).
3. In `index.html`, replace `https://formspree.io/f/YOUR_FORM_ID` in the form's `action` with your real endpoint.
4. Submit a test enquiry from the deployed site and complete any email verification Formspree requires.
5. Check your Formspree dashboard for submissions and configure spam protection/notification settings.

Until `YOUR_FORM_ID` is replaced, the JavaScript deliberately blocks submission and displays a setup warning. Once configured, the browser performs a normal POST to Formspree; the service handles the response. No private API key is stored in this repository. Check Formspree's current plan limits and privacy terms before choosing a plan.

## Test locally

No build tools or package installation are needed. Open `index.html` in a browser, or run a simple local static server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Test the mobile navigation, keyboard focus, FAQ accordion, all anchor links, pricing-to-form behaviour and form endpoint after configuration. Browser dev tools can be used to check for console errors and responsive overflow.

## Deploy to GitHub Pages

1. Sign in to GitHub and create a new repository, for example `edmarjay-web-development`.
2. Upload the contents of this folder to the repository root. `index.html` must be at the root, not inside an extra nested folder.
3. Commit the files to the `main` branch.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to publish. The site URL is usually `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/` for a project site.

### Custom domain

1. Register a domain through a domain registrar.
2. In repository **Settings → Pages → Custom domain**, enter your domain (for example `www.example.com`) and save.
3. At your registrar, add the DNS records GitHub currently specifies for your chosen apex or `www` domain. Common configurations use A records for an apex domain and a CNAME for `www`; use GitHub's current documentation for the exact values.
4. Allow DNS time to propagate. Once GitHub verifies the domain, enable **Enforce HTTPS** in Pages settings.
5. Update the canonical URL, Open Graph URL/image URL, `robots.txt` and `sitemap.xml` to use the final domain.

Official guide: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Updating the website

- Edit copy and page sections in `index.html`.
- Change colours, spacing and responsive styles in `css/style.css` (CSS custom properties are at the top).
- Change navigation, FAQ, reveal and form setup behaviour in `js/script.js`.
- Add project previews to `assets/projects/` and add project cards in the portfolio section. Keep concept/demo work clearly labelled until it is genuine client work.
- Replace the profile placeholder in `assets/images/`.
- Commit and push changes to `main`; GitHub Pages republishes the site automatically.

## Important notes

- Pricing is shown as starting estimates in AUD. Confirm scope, payment terms, tax obligations and any third-party costs in a written proposal.
- The business is represented accurately as Philippines-based and serving Australian clients remotely.
- No testimonials, client counts, awards or experience claims have been invented.
- Google Fonts is loaded from Google's CDN. The site falls back to system sans-serif if unavailable.
- The contact form needs a configured external form provider; GitHub Pages alone cannot receive or email submissions.
