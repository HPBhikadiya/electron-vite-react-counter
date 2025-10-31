# Simple Counter - Electron App

A simple counter application built with React, Vite, Electron, and Material-UI (MUI).

## Features

- ✅ React 19 with TypeScript
- ✅ Vite for fast development and building
- ✅ Electron for desktop app functionality
- ✅ Material-UI (MUI) for beautiful UI components
- ✅ Simple counter with increment, decrement, and reset functionality

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Electron** - Desktop application framework
- **Material-UI (MUI)** - React component library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

To run the app in development mode:

```bash
npm run electron:dev
```

This command will:
1. Start the Vite dev server
2. Launch Electron and connect it to the dev server

### Building

To build the app for production:

```bash
npm run build
```

This will:
1. Compile TypeScript files
2. Build the React app with Vite
3. Compile Electron main process files

### Building Distributable Executables

#### For macOS (.dmg file)

```bash
npm run build:mac
```

This will create a `.dmg` file in the `release` folder that can be installed on macOS. The DMG file supports both Intel (x64) and Apple Silicon (arm64) architectures.

#### For Windows (.exe installer)

```bash
npm run build:win
```

This will create:
- **NSIS Installer** (`.exe` installer) in the `release` folder - allows users to choose installation directory
- **Portable** (`.exe` portable) in the `release` folder - a standalone executable that doesn't require installation

#### For Linux

```bash
npm run build:linux
```

This will create AppImage and `.deb` packages in the `release` folder.

#### Build for All Platforms

```bash
npm run build:all
```

**Note:** Building for different platforms:
- **macOS builds** can only be created on macOS
- **Windows builds** can only be created on Windows
- **Linux builds** can be created on Linux or with Docker

The built executables will be in the `release/` directory.

## Project Structure

```
electron/
├── electron-main.ts    # Electron main process
├── preload.ts          # Preload script for Electron
├── src/
│   ├── App.tsx         # Main counter component
│   ├── main.tsx        # React entry point
│   └── ...
├── dist/               # Built React app (generated)
├── dist-electron/      # Built Electron files (generated)
└── package.json
```

## Scripts

- `npm run dev` - Start Vite dev server only
- `npm run electron:dev` - Start both Vite and Electron in dev mode
- `npm run build` - Build the app (TypeScript + Vite)
- `npm run build:mac` - Build macOS .dmg installer
- `npm run build:win` - Build Windows .exe installer and portable
- `npm run build:linux` - Build Linux AppImage and .deb packages
- `npm run build:all` - Build for all platforms
- `npm run lint` - Run ESLint

## Usage

The app provides a simple counter interface with three buttons:
- **Increment** - Increase the counter by 1
- **Decrement** - Decrease the counter by 1
- **Reset** - Reset the counter to 0

## License

MIT
