# QR Neo-Brutalist Web App

A production-ready QR code utility with a bold Neo-Brutalism design system.

## Features

- **QR Generator**: Create QR codes from text or URLs.
- **QR Scanner**: Scan QR codes using your device's camera.
- **Neo-Brutalism UI**: High contrast, bold borders, and hard shadows.
- **Modular Architecture**: Clean separation between frontend (React) and backend (Express).
- **Responsive**: Works on desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Motion.
- **Backend**: Node.js, Express.
- **Libraries**: `qrcode` for generation, `html5-qr-code` for scanning.

## Project Structure

```text
qr-webapp
├── server.ts           # Express server entry point
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (Home, Generator, Scanner)
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main application & routing
│   ├── index.css       # Global styles & Neo-Brutalism theme
│   └── main.tsx        # React entry point
├── public/             # Static assets
└── package.json        # Dependencies & scripts
```

## Setup & Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

## Design Principles

- **Bold Borders**: 4px black borders on all interactive elements.
- **Hard Shadows**: 8px offset shadows for cards, 4px for buttons.
- **High Contrast**: Vibrant accent colors (Yellow, Blue, Pink, Green) against white and black.
- **Typography**: Space Grotesk for headings, Inter for body text.
