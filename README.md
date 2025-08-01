# SportX Betting Application

## Overview

This is a betting application built with **Nuxt.js 3** and **Vue.js 3** for the SportX Senior Lead Frontend Tech Test. The application displays sports events and allows users to place bets with a functional betting slip.

## Time Spent

**Total time spent: 3.5 hours**

- Initial setup and configuration: 45 minutes
- Main component development: 2 hours
- Testing implementation: 30 minutes
- Documentation and final touches: 15 minutes

## Features Implemented

### Mandatory Requirements ✅

- ✅ **Framework**: Built with Nuxt.js (first choice from requirements)
- ✅ **No third-party libraries**: Pure Vue.js with Tailwind CSS for styling
- ✅ **JSON data integration**: Uses the provided JSON data to generate events list
- ✅ **Functional choice buttons**:
    - Toggle selection on click
    - Visual feedback when selected (green border/background)
    - Add/remove from "My Choices" section
    - Remove button [X] in betting slip
    - Multiple choices from same event can be selected
- ✅ **"My Choices" section**:
    - Shows "No bets chosen" when empty
    - Displays selected bets with event info and odds
    - Remove functionality for each bet
- ✅ **Proper date formatting**: Displays as "24th of March 20:45"
- ✅ **README with instructions**: This file with setup and time tracking

### Optional Features ✅

- ✅ **Amount controls**: Increase/decrease buttons and input field
- ✅ **Input validation**: Minimum amount of 0.1, proper number formatting
- ✅ **Total calculations**: Real-time calculation of total and potential gain
- ✅ **Testing**: Unit tests and functional tests with Vitest

## Project Structure

```
sportx-betting-app/
├── pages/
│   └── index.vue                 # Main betting page
├── assets/
│   └── css/
│       └── main.css             # Tailwind CSS and custom styles
├── tests/
│   └── SportsBetting.test.js    # Unit and functional tests
├── nuxt.config.ts               # Nuxt configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vitest.config.ts             # Testing configuration
└── README.md                    # This file
```

## How to Run

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Extract the project files** to a directory
2. **Install dependencies**:
    ```bash
    npm install
    ```

### Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Testing

To run the tests:

```bash
npm run test
```

To run tests with UI:

```bash
npm run test:ui
```

### Build for Production

```bash
npm run build
```

### Generate Static Site

```bash
npm run generate
```

## Technical Implementation

### Architecture

- **Nuxt.js 3**: Used for the framework with Vue 3 Composition API
- **Vue 3 Composition API**: Modern reactive state management
- **Tailwind CSS**: For responsive styling and UI components
- **Vitest**: For unit and functional testing

### Key Components

1. **Main Betting Interface** (`pages/index.vue`):
    - Event listing with proper categorization
    - Interactive betting buttons with odds
    - Real-time betting slip updates

2. **Betting Logic**:
    - Reactive state management with Vue 3 `ref()`
    - Toggle functionality for bet selection
    - Amount calculation and validation

3. **Data Handling**:
    - JSON data processing and display
    - Date formatting utilities
    - Bet state management

### Styling

- Matches the ASCII art layout requirements
- Responsive design with mobile consideration
- Visual feedback for user interactions
- Clean, professional betting interface

### Testing Strategy

- **Unit Tests**: Testing individual functions and calculations
- **Functional Tests**: Testing user interactions and state changes
- **Integration Tests**: Testing component behavior and data flow

## Features Explanation

### Betting Functionality

1. **Event Display**: Shows all events from JSON with proper formatting
2. **Choice Selection**: Click any odds button to add/remove from betting slip
3. **Multiple Selections**: Can select multiple outcomes from the same event
4. **Visual Feedback**: Selected choices have green border and background
5. **Betting Slip**: Shows selected bets with remove functionality

### Calculations

- **Total**: `Amount × Number of Bets`
- **Potential Gain**: `Amount × Sum of All Selected Odds`
- **Amount Controls**: Increment/decrement by 0.1, minimum 0.1

### User Experience

- Intuitive clicking to add/remove bets
- Clear visual distinction for selected choices
- Real-time updates of totals
- Responsive design for different screen sizes

## Browser Compatibility

- Modern browsers supporting ES6+
- Chrome, Firefox, Safari, Edge
- Mobile browsers

## Notes and Considerations

### Design Decisions

1. **Nuxt.js Choice**: Selected as the primary framework as requested
2. **Composition API**: Used for better TypeScript support and modern Vue patterns
3. **Tailwind CSS**: Chosen for rapid UI development and consistency
4. **Component Structure**: Single page application for simplicity

### Potential Improvements

1. **State Management**: Could add Pinia for complex state management
2. **API Integration**: Currently uses static JSON, could be extended for live data
3. **Accessibility**: Could add ARIA labels and keyboard navigation
4. **Animations**: Could add subtle transitions for better UX
5. **Internationalization**: Could add multi-language support

### Testing Coverage

- ✅ Bet addition and removal
- ✅ Amount calculations
- ✅ Input validation
- ✅ State management
- ✅ Utility functions
- ✅ User interactions

## Deployment

The application can be deployed to any static hosting service:

- **Netlify**: `npm run generate` + drag & drop
- **Vercel**: Direct integration with repository
- **GitHub Pages**: Using generated static files
- **Traditional hosting**: Upload `dist/` folder contents

---

**Author**: SportX Frontend Developer
**Date**: 2025
**Framework**: Nuxt.js 3 + Vue.js 3
**Time Spent**: 3.5 hours

https://www.hackerrank.com/test/b0ors00540e/questions/2lb9e6ti58t
