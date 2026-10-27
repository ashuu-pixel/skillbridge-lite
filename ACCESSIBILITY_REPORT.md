
# SkillBridge Explorer — Accessibility Report

## 1. Project Overview

SkillBridge Explorer is a React application that helps users discover internships and entry-level opportunities through search, category filtering, and pagination.

## 2. Accessibility Testing

The application was tested using Lighthouse Accessibility, axe DevTools, and manual keyboard navigation.

- **Lighthouse Accessibility:** 100/100 (recorded score)
- **axe DevTools:** No violations reported in the test performed
- **Keyboard navigation:** Tested using the Tab key
- **Search and filtering:** Checked manually

## 3. Accessibility Improvements

The following improvements were implemented:

1. Added visible focus indicators for keyboard navigation.
2. Added reduced-motion support for users who prefer fewer animations.
3. Added accessible labels to search and category controls.
4. Added an `aria-live` region to announce changes in search results.
5. Added a loading status announcement for screen readers.
6. Used labels and validation feedback in the application form.

## 4. Before and After Evidence

**Before:** Add a screenshot of the original application or the initial accessibility audit.

**After:** Add a screenshot showing the updated application and the Lighthouse Accessibility score.

Screenshots should be captured from your actual application and testing results.

## 5. Conclusion

Accessibility improvements were made to support keyboard navigation, screen-reader announcements, form usability, and reduced-motion preferences. The application should be retested after significant code or design changes.
