# Ashfaque Rifaye — AI Product Manager & Technical BA 👋

Welcome to my personal portfolio! This repository showcases my journey as an **AI Technical Business Analyst & Product Manager** with 9+ years of experience building intelligent products, GenAI virtual assistants, conversational AI systems, and enterprise automation solutions.

## 🎯 About This Portfolio

This is a modern, interactive portfolio built with:
- **React 18** — Component-based UI with hooks
- **Vite** — Lightning-fast build tool and dev server
- **Tailwind CSS** — Utility-first styling with custom palette engine
- **Lucide React** — Beautiful, consistent icons

The site features a **dynamic color palette system** with multiple themes (Teal, Cyan, Aubergine, Emerald), **dark/light mode support**, and **smooth animations** for an engaging user experience.

## 🚀 Features

✨ **Interactive & Responsive**
- Fully responsive design optimized for mobile, tablet, and desktop
- Smooth scroll behavior and refined animations
- Accessibility-first with reduced motion support

🎨 **Multi-Palette Theme Engine**
- 4 distinct color palettes (Teal, Cyan, Aubergine, Emerald)
- Dark and light theme variants with carefully crafted color ramps
- Live palette switching with localStorage persistence
- Prevents flash of unstyled content with preload script

🔍 **Content Organization**
- Project showcase with filtering and details
- Professional experience timeline
- Skills and technologies breakdown
- Contact and social links
- Resume download (PDF)
- AI Twin chatbot integration

## 🛠️ Tech Stack

**Frontend:**
- ![React](https://img.shields.io/badge/-React_18-61DAFB?style=flat&logo=react&logoColor=black) Declarative UI components
- ![JavaScript](https://img.shields.io/badge/-JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black) Modern ECMAScript
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) Utility styling
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) Build tool

**Tools & Development:**
- ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)
- ![GitHub Pages](https://img.shields.io/badge/-GitHub_Pages-181717?style=flat&logo=github&logoColor=white) Deployment
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) Code quality
- ![PostCSS](https://img.shields.io/badge/-PostCSS-DD3735?style=flat&logo=postcss&logoColor=white) CSS transformations

## 📁 Project Structure

```
├── src/
│   ├── App.jsx           # Main component with full portfolio logic
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles + palette engine
├── public/               # Static assets (favicon, images)
├── index.html            # HTML entry with theme preload script
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind customization
├── postcss.config.js     # PostCSS plugins
└── README.md
```

## 🎬 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ashfaque-rifaye/ashfaque-rifaye.github.io.git
cd ashfaque-rifaye.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment

```bash
# Deploy to GitHub Pages
npm run deploy
```

The site is automatically built and deployed via `gh-pages` to https://ashfaque-rifaye.github.io

## 🎨 Customization

### Theme & Palette Engine

The portfolio uses a CSS custom properties (variables) system for theming:

**Light themes** defined in `:root[data-palette="..."]`  
**Dark themes** defined in `.dark[data-palette="..."]`

Edit `src/index.css` to customize colors or add new palettes.

### Content

All portfolio content (projects, experience, skills) is defined in `src/App.jsx`. Update the component state and data structures to reflect your own portfolio.

## 📊 Language Composition

- **JavaScript**: 92.5%
- **CSS**: 5.7%
- **HTML**: 1.8%

## 🔗 Links & Resources

📱 **Live Site:** https://ashfaque-rifaye.github.io  
🌐 **Portfolio (Vercel):** https://my-portfolio-chi-eight-30.vercel.app  
💼 **LinkedIn:** [linkedin.com/in/ashfaque-rifaye](https://linkedin.com/in/ashfaque-rifaye)  
📧 **Email:** Contact via portfolio site or GitHub

## 📚 Additional Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** — Detailed deployment & hosting setup
- **[API_SECURITY_GUIDE.md](./API_SECURITY_GUIDE.md)** — Security best practices (if using backend APIs)

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## Let's Connect! 🤝

I'm always interested in discussing AI, product management, technical leadership, and innovative solutions. Feel free to reach out through the portfolio site or connect on LinkedIn.

**Built with ❤️ using React, Tailwind CSS, and Vite**
