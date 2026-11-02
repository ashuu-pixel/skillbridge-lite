
# SkillBridge Lite

SkillBridge Lite is a responsive internship discovery application built with React and React Router. It helps users explore internship opportunities, view details, and complete a demo application form.

## Features

- Responsive internship listing cards
- Six sample internship opportunities
- Dynamic internship detail routes
- Application form with controlled inputs
- Required-field and email validation
- Inline validation errors and success feedback
- Navigation with active-link styling
- Custom 404 page for unknown routes
- Accessible form labels and keyboard focus styles

## Tech Stack

- React
- Vite
- React Router
- JavaScript
- CSS

## Getting Started

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in your terminal.
4. Install dependencies:

   npm install

5. Start the development server:

   npm run dev

6. Open the local URL shown in your terminal.

## Routes

- `/` — Home page
- `/listings` — All internships
- `/listings/:id` — Internship details
- `/apply/:id` — Application form
- Any unknown URL — 404 page

## Edge Cases

- Invalid internship IDs display an internship-not-found message.
- Empty form fields display inline validation errors.
- Invalid email addresses are rejected.
- Unknown routes display a 404 page.

## Application Disclaimer

This is a front-end demonstration project. Application submissions are simulated in the browser and are not stored or sent to a backend server.

## Future Improvements

- Backend integration
- User authentication
- Database storage
- Internship search and filtering

## Accessibility Improvements

SkillBridge Explorer includes accessibility improvements to support keyboard users and screen readers.

- Added visible keyboard focus indicators for buttons, links, search inputs, and dropdowns.
- Added reduced-motion support for users who prefer less animation.
- Added accessible labels for search and category controls.
- Added a live region to announce changes in opportunity results.
- Added a loading status announcement for screen readers.
- Used form labels and validation messages to help users complete the application form.

### Accessibility Testing

- Lighthouse Accessibility score: 100/100 (recorded test result).
- axe DevTools: No violations reported in the test performed.
- Keyboard navigation: Tested using the Tab key.
- Search, category filtering, and pagination: Checked manually.

**Note:** Accessibility results may vary with future code changes. Run the tests again before release.
