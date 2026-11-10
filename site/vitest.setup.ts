import '@testing-library/jest-dom/vitest'

// jsdom has no scrolling; the router restores scroll position after each navigation.
window.scrollTo = () => {}
