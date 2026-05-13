# 🐾 Agility Planning App

A mobile-first web app for tracking dog agility training progress. Built with React and Tailwind CSS.

## ✨ Features

- **🐕 Dog Profile Card** - View your dog's info, breed, and category
- **📊 Weekly Progress** - Visual progress circle showing completion rate (80%)
- **🎯 Today's Goals** - Quick overview of daily training objectives
- **📅 Weekly Plan Table** - Track activities across the week with checkmarks
- **⏳ In Progress** - Monitor ongoing training sessions with progress bars
- **🎨 Color Variants** - Multiple branches with different color schemes (coral, purple, cyan)

## 🎨 Design

- Cyan color scheme (#06B6D4) with turquoise accents
- Custom SVG icons for paw, trophy, calendar, and profile
- Mobile-optimized responsive layout (max-width: 28rem)
- Smooth animations for progress indicators
- Chevron icons indicating tappable cards

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom SVG Icons** - Hand-crafted vector graphics

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/evanadrchalova/Agility-planning-app.git
cd Agility-planning-app

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📂 Project Structure

```
agility-planning-app/
├── src/
│   ├── assets/          # SVG icons and images
│   │   ├── tlapka.svg   # Paw icon (cyan)
│   │   ├── pohar.svg    # Trophy icon (cyan)
│   │   ├── kalendar.png # Calendar icon
│   │   └── profile.svg  # Profile icon
│   ├── AgilityApp.jsx   # Main component
│   ├── index.css        # Global styles & animations
│   └── main.jsx         # App entry point
├── package.json
└── README.md
```

## 🌿 Branches

- **main** - Production-ready cyan design
- **variant-1-coral** - Warm coral color scheme
- **variant-2-purple** - Lavender/purple theme
- **variant-3-ocean** - Cyan/turquoise (merged to main)
- **variant-4-gradient** - Gradient experiments
- **middle-version** - Mid-development snapshot
- **first-broken-version** - Initial development attempt

## 📱 Features Breakdown

### Weekly Progress Card
- Animated SVG progress circle (80%)
- Stroke animation on load
- Shows plan completion (5/7 days)

### Activity Table
- 7-day week view (Mon-Sun)
- 5 different training activities
- Checkmarks with glow effect for completed tasks
- Larger checkmark for current day (Monday)

### Design Patterns
- Cards use chevron icons to indicate clickable/tappable areas
- Consistent spacing (gap-4 between cards)
- Shadow-md for elevation
- Rounded-2xl for modern rounded corners

## 🎨 Color Palette

- **Primary**: #06B6D4 (Cyan)
- **Background**: #FFFCFA (Warm white)
- **Text**: #1F2937 (Gray-900)
- **Secondary Text**: #6B7280 (Gray-600)
- **Ring/Glow**: rgba(6, 182, 212, 0.3)

## 📄 License

Personal project - feel free to use as inspiration!

## 👩‍💻 Author

Eva Nadrchálová - [GitHub](https://github.com/evanadrchalova)

---

Built with ❤️ for dog training enthusiasts!
