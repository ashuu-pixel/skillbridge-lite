# SkillBridge Lite

SkillBridge Lite is a responsive internship discovery application built with React and React Router. It allows users to explore internship opportunities, view detailed information, and submit demo applications through a user-friendly interface.

## Features

- Responsive internship listing cards
- Six sample internship opportunities
- Search and category filtering
- Dynamic internship detail pages
- Application form with controlled inputs
- Required-field, email, and phone validation
- Inline validation errors and success feedback
- My Applications page
- Application storage using browser localStorage
- Loading, error, and empty states
- Custom 404 page
- Responsive navigation with active-link styling
- Lazy loading for selected routes
- Accessible form labels and keyboard focus styles

## Tech Stack

- React
- Vite
- React Router
- JavaScript
- CSS
- Vitest
- React Testing Library
- jsdom

## Getting Started

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in your terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run code linting |
| `npm test -- --run` | Run automated tests |

## Routes

- `/` — Home page
- `/opportunities` — Browse internship opportunities
- `/opportunities/:id` — Internship details
- `/opportunities/:id/apply` — Application form
- `/my-applications` — View saved applications
- Any unknown URL — 404 page

## Testing

Automated tests are implemented using Vitest and React Testing Library.

**Latest test results: 11/11 passed**

- Search and filtering: 3 tests
- Opportunity data fetching: 3 tests
- Application form validation: 2 tests
- App routing: 3 tests

## Edge Cases

- Invalid internship IDs display a not-found message.
- Empty form fields display validation errors.
- Invalid email addresses are rejected.
- Invalid phone numbers are rejected.
- API loading and error states are handled.
- Unknown routes display a 404 page.

## Application Disclaimer

This is a front-end demonstration project. Application submissions are saved in the browser's localStorage. They are not sent to or stored on a backend server.

## Accessibility Improvements

- Visible keyboard focus indicators.
- Accessible labels for search and category controls.
- Live region announcements for opportunity results.
- Loading status announcements for screen readers.
- Accessible form labels and validation messages.
- Reduced-motion support.

### Accessibility Testing

- Lighthouse Accessibility score: 100/100 (recorded test result).
- axe DevTools: No violations reported in the test performed.
- Keyboard navigation: Tested using the Tab key.
- Search, category filtering, and pagination: Checked manually.

## Future Improvements

- Backend integration
- User authentication
- Database storage
- Real internship application submissions

## Project Status

Core internship discovery, routing, application form, accessibility improvements, and automated testing have been implemented.