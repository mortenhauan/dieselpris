# Lessons

- For responsive layout fixes in this repo, prefer Tailwind/CSS-only solutions before introducing breakpoint hooks or JS-driven viewport logic.
- For layout overflow bugs, collect runtime measurements of `documentElement` width and the actual offending DOM elements before attempting visual fixes.
