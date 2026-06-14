# WILDGuard Research Project Website

WILDGuard is an IoT-based real-time monkey detection and humane deterrence system designed to protect coconut plantations in Sri Lanka.

This repository contains the public research project website, hosted with Netlify.

## Project Overview

Monkey intrusions cause significant crop damage and financial losses for coconut farmers. WILDGuard combines edge intelligence, field sensors, long-range communication, automated deterrence, and farmer-facing analytics into one low-power protection system.

### Core Objectives

- Detect monkey intrusions in real time
- Reduce false positives through sensor fusion and edge classification
- Activate humane, non-harmful deterrence responses
- Support long-range rural communication through LoRa
- Provide useful alerts, activity records, and analytics for farmers

## Website Redesign

The website received a complete visual and technical overhaul in June 2026.

### New Visual Experience

- Modern midnight-blue, cyan, green, and amber design system
- Responsive research-focused hero section
- Official WILDGuard shield-and-monkey logo and favicon
- Pure CSS animated detection network replacing the previous system SVG
- Animated scanning beam, network grid, connection rings, and data paths
- Floating cards for edge vision, LoRa communication, deterrence, and analytics
- Redesigned project cards, research tabs, documents, team, milestones, and contact sections
- Improved team photo presentation without cropped faces

### Content Improvements

- All project milestones are marked as completed
- Duplicate milestone timeline markers were removed
- Methodology is presented as an Observe, Build, Test, and Optimize workflow
- Broken image paths and case-sensitive Netlify asset references were corrected
- Unreliable remote technology icons were replaced with stable interface elements
- Research Project identification is shown prominently at the beginning of the page

### Technical Improvements

- Responsive layouts for desktop, tablet, and mobile screens
- Keyboard-accessible project-domain tabs
- Accessible mobile navigation with ARIA state handling
- Reduced-motion support for users who disable animations
- Graceful behavior if the external animation library is unavailable
- Netlify-compatible contact form handling
- Active navigation states and improved smooth scrolling
- Current footer year generated automatically

## System Architecture

### Detection

- Edge camera processing
- YOLOv8-based classification
- Multi-frame validation
- Motion, ultrasonic, and thermal sensor fusion

### Deterrence

- Ultrasonic sound emitters
- Flashing LED arrays
- Non-harmful light or laser pulses
- Staged response escalation

### Communication

- ESP32 field and relay nodes
- Long-range LoRa communication
- Multi-hop routing and retry mechanisms
- Gateway buffering during intermittent connectivity

### Monitoring

- Real-time event records
- Plantation activity heatmaps
- Deterrence performance metrics
- Predictive analysis and threshold optimization

## Technology Stack

### Website

- HTML5
- CSS3
- JavaScript
- Font Awesome
- AOS animations
- Netlify Forms

### Research System

- Python and MicroPython
- ESP32
- YOLOv8
- LoRa
- Node-RED
- React
- Docker

## Project Structure

```text
research-project-website/
|-- index.html
|-- css/
|   |-- style.css
|   |-- domain.css
|   |-- enhanced-sections.css
|   `-- modern.css
|-- js/
|   |-- main.js
|   `-- domain.js
|-- img/
|   |-- wildguard-logo.png
|   |-- team photographs
|   `-- supporting project images
`-- README.md
```

## Run Locally

No build process is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/AselKarunathilaka/research-project-website.git
   ```

2. Open the project directory.

3. Open `index.html` in a modern browser.

For more accurate local testing, serve the directory with a simple static HTTP server.

## Deployment

The website is designed for static deployment on Netlify. The contact form uses Netlify form detection and becomes active after deployment.

## Research Team

Sri Lanka Institute of Information Technology (SLIIT)

## Credits

- Font Awesome for interface icons
- Google Fonts for Manrope and Space Grotesk
- AOS for optional scroll animations

Copyright 2026 WILDGuard Research Team.
