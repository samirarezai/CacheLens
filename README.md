# CacheLens

![CacheLens Banner](./assets/cachlense.png)

A modern Chromium cache explorer built with Tauri, Rust, and React.

CacheLens allows you to inspect Chrome cache files, preview cached images, analyze web assets, and explore browser storage through a fast native desktop application.

---

## Features

- Recursive Chrome cache scanning
- Cached image preview (PNG / JPEG / WebP)
- CSS / JS / HTML content viewer
- File metadata inspection
- File type detection using binary signatures
- Modern desktop UI
- Native performance with Rust
- Cross-platform architecture powered by Tauri

---

<!-- ## Screenshots -->

<!-- ### Cache Explorer -->

<!-- ![Screenshot](./assets/screenshot.png) -->

<!-- --- -->

## Tech Stack

- Tauri
- Rust
- React
- TypeScript
- Vite

---

## Supported Browsers

Currently supported:

- Google Chrome

Planned:

- Microsoft Edge
- Brave Browser
- Opera

---

## Installation

### Windows

Download the latest installer from the Releases page.

- `.msi` installer
- `.exe` setup

---

## Development

### Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/cachelens.git
cd cachelens
```

### Install dependencies

```bash
npm install
```

### Run development mode

```bash
npm run tauri dev
```

---

## Build Release

```bash
npm run tauri build
```

Generated installers can be found in:

```txt
src-tauri/target/release/bundle/
```

---

## Project Structure

```txt
src/
  React frontend

src-tauri/
  Rust backend
```

---

## Future Features

- Browser history viewer
- Cache analytics dashboard
- Domain statistics
- Network inspector
- HTTP header analysis
- Cache expiration analysis
- DevTools Protocol integration
- IndexedDB explorer
- Cookie viewer

---

## Why CacheLens?

CacheLens was created as an experimental browser cache analysis tool to explore:

- Browser internals
- Filesystem inspection
- Chromium cache structure
- Native desktop applications with Rust
- High-performance frontend/backend architecture

---

## License

MIT License
