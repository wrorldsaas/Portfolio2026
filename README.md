# Guilherme Rafael Portfolio

A professional portfolio website for a 3D Artist and Social Media Manager, featuring an interactive Three.js background, dark theme design, and modern animations.

## 🎯 Overview

This portfolio showcases the work and services of Guilherme Rafael de Souza, a 3D Artist and Social Media Manager. The website features:

- **Interactive 3D Background** - Three.js powered particle system and floating geometric shapes
- **Dark Theme** - Modern, sophisticated design optimized for showcasing visual work
- **Responsive Design** - Fully responsive across all devices
- **Smooth Animations** - CSS and JavaScript powered animations and transitions
- **Portfolio Filter** - Interactive project filtering by category
- **Contact Form** - Professional contact form with mailto integration

## 📁 File Structure

```
Portfolio2026/
├── index.html              # Main HTML file
├── README.md               # This file
└── assets/
    ├── css/
    │   └── styles.css      # All CSS styles
    ├── js/
    │   └── main.js         # JavaScript and Three.js code
    └── images/
        ├── logo.png        # Brand logo
        ├── profile.jpg     # Profile/about image
        ├── hero-bg.jpg     # Hero background
        └── project[1-8].jpg # Portfolio project images
```

## 🚀 GitHub Pages Deployment

Follow these steps to deploy your portfolio on GitHub Pages:

### Step 1: Create the Repository

1. Go to [GitHub](https://github.com) and sign in to your account (`wrorldsaas`)
2. Click the "+" icon in the top right corner and select "New repository"
3. Name the repository `Portfolio2026`
4. Keep it public (required for free GitHub Pages)
5. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**

1. In your new repository, click "uploading an existing file"
2. Drag and drop ALL files from this portfolio folder, maintaining the folder structure
3. Make sure `index.html` is at the root level
4. Add a commit message like "Initial portfolio upload"
5. Click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Clone the repository
git clone https://github.com/wrorldsaas/Portfolio2026.git

# Navigate to the folder
cd Portfolio2026

# Copy all portfolio files here (maintaining folder structure)
# Then commit and push
git add .
git commit -m "Initial portfolio upload"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Access Your Portfolio

Your portfolio will be live at:
```
https://wrorldsaas.github.io/Portfolio2026/
```

It may take a few minutes for the site to deploy initially.

## ✏️ Customization Guide

### Updating Personal Information

Edit `index.html` to update:
- Name and contact details
- About section text
- Services descriptions
- Social media links

### Replacing Images

Replace images in `assets/images/` with your own work:
- Keep the same filenames, or update references in `index.html`
- Recommended image sizes:
  - Logo: 1024x1024px
  - Profile: 1024x1024px
  - Projects: 1344x768px (landscape)

### Changing Colors

Edit the CSS variables in `assets/css/styles.css`:
```css
:root {
    --accent-primary: #6366f1;    /* Main accent color */
    --accent-secondary: #8b5cf6;  /* Secondary accent */
    --bg-primary: #0a0a0f;        /* Main background */
    /* ... more variables */
}
```

### Adding More Projects

Add new portfolio items in `index.html`:
```html
<div class="portfolio-item" data-category="3d">
    <div class="portfolio-image">
        <img src="assets/images/your-image.jpg" alt="Project Title">
        <div class="portfolio-overlay">
            <div class="portfolio-info">
                <h3 class="portfolio-title">Project Title</h3>
                <p class="portfolio-category">Category</p>
                <a href="#" class="portfolio-link">...</a>
            </div>
        </div>
    </div>
</div>
```

## 🔧 Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Interactive features
- **Three.js** - 3D graphics and WebGL
- **Google Fonts** - Inter and Space Grotesk typography

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Features

- Lazy loading for images
- Optimized animations using CSS transforms
- Debounced scroll handlers
- Efficient Three.js particle system

## 📧 Contact

**Guilherme Rafael de Souza**
- Email: guilhermerafaelmeister2019@gmail.com
- Phone: +55 61 992141310
- GitHub: [@wrorldsaas](https://github.com/wrorldsaas)

## 📄 License

This portfolio template is free to use for personal and commercial projects.

---

Built with ❤️ for creative professionals
