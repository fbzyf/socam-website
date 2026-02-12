# SOCAM INTERNATIONAL LIMITED - Official Website

## Project Overview

This is the official website for **SOCAM INTERNATIONAL LIMITED**, a Hong Kong-based professional electronic components distributor. The website is a single-page scrolling site designed to introduce the company and make it easy for customers to get in touch.

**Live URL**: [https://socam.com.hk](https://socam.com.hk) (after domain configuration)

## Tech Stack

- **Pure HTML5 + CSS3 + JavaScript** (no frameworks)
- **Google Fonts**: Inter (body text) + Poppins (headings)
- **Hosting**: GitHub Pages (free static hosting)
- **Domain**: Custom domain via Namecheap → GitHub Pages CNAME

## File Structure

```
socam/
├── index.html          # Main page (all sections in one file)
├── css/
│   └── style.css       # All styles (responsive design included)
├── js/
│   └── main.js         # Navigation, scroll animations, mobile menu
├── images/             # Image assets (brand logos, etc.)
├── CNAME               # GitHub Pages custom domain config
└── readme.md           # This file
```

## Website Sections

| Section       | Description                                           |
|---------------|-------------------------------------------------------|
| **Navigation**| Fixed top bar with logo + links (About, Brands, Contact) |
| **Hero**      | Full-screen banner with company tagline and CTA button |
| **About Us**  | Company introduction + 3 highlight cards              |
| **Our Brands**| 3 brand cards: SGMC, FULLHAN, Nations Technologies    |
| **Contact Us**| Phone, email, address + embedded Google Map            |
| **Footer**    | Copyright notice with auto-updating year              |

## How to Maintain & Update

### Updating Company Information

All company info is in `index.html`. Search for these sections:

- **Phone number**: Search for `18017287575`
- **Email**: Search for `josh@linposh.com.cn`
- **Address**: Search for `RM06, 13A/F`
- **Company name**: Search for `SOCAM INTERNATIONAL LIMITED`

### Adding or Changing Brand Cards

In `index.html`, find the `<!-- Brand Card: ... -->` comments. Each brand card follows this structure:

```html
<div class="brand-card">
    <div class="brand-logo-placeholder">
        <span class="brand-logo-text">BRAND NAME</span>
    </div>
    <h3 class="brand-name">English Name</h3>
    <p class="brand-name-cn">中文名称</p>
    <p class="brand-description">Description text here.</p>
    <div class="brand-tags">
        <span class="tag">Tag 1</span>
        <span class="tag">Tag 2</span>
    </div>
</div>
```

To add a new brand, copy a brand card block and modify the content.

### Replacing Brand Logo Placeholders with Real Logos

1. Save logo image files to the `images/` folder (e.g., `images/sgmc-logo.png`)
2. Replace the `<div class="brand-logo-placeholder">` block with:
   ```html
   <img src="images/sgmc-logo.png" alt="SGMC Logo" class="brand-logo-img">
   ```
3. Add this CSS to `css/style.css`:
   ```css
   .brand-logo-img {
       width: 100px;
       height: 100px;
       object-fit: contain;
       margin: 0 auto 24px;
   }
   ```

### Changing Colors

The main color variables are at the top of `css/style.css`:

- **Primary Blue**: `#0056b3` — Main brand color
- **Accent Blue**: `#0078d4` — Buttons, highlights
- **Dark Background**: `#1a1a2e` — Navbar, footer
- **Light Background**: `#f7f8fc` — Alternating section background

### Changing the Custom Domain

Edit the `CNAME` file with your new domain (one domain per line, no `https://`).

## Deployment

### GitHub Pages Setup

1. Push code to GitHub repository `FBZYF/socam-website`
2. Go to repository **Settings** → **Pages**
3. Set **Source** to `Deploy from a branch`
4. Select **Branch**: `main`, folder: `/ (root)`
5. Save — site will be live at `https://fbzyf.github.io/socam-website/`

### Custom Domain (Namecheap)

1. In Namecheap, add these DNS records:
   - **A Record** → `185.199.108.153`
   - **A Record** → `185.199.109.153`
   - **A Record** → `185.199.110.153`
   - **A Record** → `185.199.111.153`
   - **CNAME Record** `www` → `fbzyf.github.io`
2. In GitHub Pages settings, enter your custom domain
3. Enable **Enforce HTTPS**

## Browser Support

- Chrome, Edge, Firefox, Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)
- Responsive layout: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

## Known Considerations

- Brand logos are currently using text placeholders — replace with actual logo images when available
- Google Map embed uses a generic Harbour City location — update the embed URL with the exact office coordinates if needed
- The `CNAME` file contains a placeholder domain (`socam.com.hk`) — update with the actual purchased domain before deployment
