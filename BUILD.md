# Building Instructions

## Quick Start

### macOS (.dmg)

On a macOS machine:
```bash
npm run build:mac
```

The `.dmg` file will be created in `release/` directory:
- `Simple Counter-1.0.0-arm64.dmg` (for Apple Silicon)
- `Simple Counter-1.0.0-x64.dmg` (for Intel Macs)

### Windows (.exe)

On a Windows machine:
```bash
npm run build:win
```

The installers will be created in `release/` directory:
- `Simple Counter Setup 1.0.0.exe` - Full installer with setup wizard
- `Simple Counter 1.0.0.exe` - Portable executable (no installation needed)

## Cross-Platform Building

### Building Windows on macOS/Linux

You can use Wine or Docker to build Windows installers on macOS/Linux:

1. **Using Docker** (recommended):
```bash
# Build Windows installer using Docker
docker run --rm -ti -v ${PWD}:/project -w /project electronuserland/builder:wine
```

2. **Using Wine** (manual setup required):
```bash
# Install Wine first, then:
npm run build:win
```

### Building macOS on Windows/Linux

macOS builds **must** be done on a macOS machine. You cannot build macOS installers on Windows or Linux.

## Build Output

All builds are output to the `release/` directory:

```
release/
├── mac/
│   └── Simple Counter-1.0.0.dmg
├── win/
│   ├── Simple Counter Setup 1.0.0.exe
│   └── Simple Counter 1.0.0.exe
└── linux/
    ├── Simple Counter-1.0.0.AppImage
    └── Simple Counter_1.0.0_amd64.deb
```

## Configuration

The build configuration is in `package.json` under the `"build"` key. You can customize:

- **App ID**: `com.simplecounter.electron`
- **Product Name**: `Simple Counter`
- **Icons**: Add icons to `build/` directory:
  - `build/icon.icns` for macOS
  - `build/icon.ico` for Windows
  - `build/icon.png` for Linux

If icons are not provided, electron-builder will use default icons.

## Troubleshooting

### Build fails with "icon not found"
- Option 1: Remove the icon references from `package.json` build config
- Option 2: Create placeholder icons in the `build/` directory

### macOS build requires code signing
For distribution on macOS, you may need to sign the app:
```json
"mac": {
  "identity": "Developer ID Application: Your Name (TEAM_ID)"
}
```

### Windows build size is large
The installer includes all dependencies. The portable version is smaller but still includes everything needed to run.

