# 🚀 DevPortfolio - Interactive Full-Stack Developer Portfolio

A modern, responsive, and accessible developer portfolio built with pure **HTML5**, **Vanilla CSS3**, and **JavaScript (ES6+)**. This project serves as **Project 1 (Days 1 - 2)** of the **TCS Technical Interview Preparation Curriculum**.

---

## 🌟 Key Features

- 🎨 **Dynamic Theme Switcher**: Instant Dark & Light mode toggle with state saved in `localStorage`.
- 📱 **Mobile-First Responsive Design**: Fluid Flexbox layout & CSS Grid cards supporting mobile (375px), tablet (768px), and desktop (1200px+).
- 🏷️ **Project Filtering via Event Delegation**: Single event listener on parent container (`#projectFilters`) efficiently filters cards with clean UI transitions.
- 📝 **Client-Side Form Validation**: Real-time validation for Name, Email format regex, and Message length with feedback alerts.
- 🧭 **Scroll Spy Navigation**: Smooth scrolling with `IntersectionObserver` auto-highlighting active nav links.
- ⚡ **Zero External Heavy Frameworks**: High-performance pure Vanilla web architecture.

---

## 📁 File Structure

```text
dev-portfolio/
├── index.html       # Semantic HTML5 page structure
├── styles.css       # Custom CSS3 design system (Tokens, Flexbox, Grid, Glassmorphic UI)
├── script.js        # ES6+ JavaScript logic (Theme Toggle, Event Delegation, Validation)
└── README.md        # Project overview and TCS learning guide
```

---

## 🎓 Key TCS Concepts Mastered

1. **Semantic HTML5 Elements**: Using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` for accessibility, screen readers, and SEO optimization.
2. **CSS Box Model**: Understanding `content`, `padding`, `border`, and `margin` behavior (`box-sizing: border-box`).
3. **CSS Flexbox vs CSS Grid**: 1D layout alignment (navigation & header) vs 2D responsive card arrays (`grid-template-columns: repeat(auto-fit, minmax(...))`).
4. **DOM Event Delegation**: Attaching a single event listener to a common ancestor (`#projectFilters`) instead of multiple child buttons for memory performance.
5. **Git CLI Hygiene**: Standard repository initialization, staging (`git add`), committing (`git commit`), and pushing (`git push`) to GitHub Pages.

---

## 🛠️ Local Setup & Git Workflow

### 1. View Locally
Open `index.html` directly in any web browser or use VS Code Live Server.

### 2. Git CLI Workflow Commands
```bash
# Initialize Git repository
git init

# Stage all project files
git add .

# Create initial commit
git commit -m "feat: complete Project 1 DevPortfolio with HTML5, CSS3, JS, and responsive layout"

# Link remote GitHub repository
git remote set-url origin https://github.com/adityasen23453-droid/Dev-portfolio.git

# Push to GitHub main branch
git branch -M main
git push -u origin main
```
