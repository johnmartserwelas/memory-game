# Project Rules & Development Protocols

**Project:** React/TypeScript Memory Game  

This document defines the development protocols, coding standards, and project objectives for the **Memory / Concentration Card-Matching Game**. The goal is to ensure consistency, code quality, and alignment with the project’s requirements while maintaining a focus on UX, accessibility, and scalability.

---

## 1. Core Directives & Mission

### 1.1 Primary Mission
Build a small, polished memory game using **React 18 + TypeScript** with **SCSS Modules**, focusing on:
- Clean and maintainable component design  
- Strict type safety and TypeScript hygiene  
- Smooth game logic and state management without heavy state libraries  
- Accessibility and responsive UI  
- Subtle, tasteful animations  

### 1.2 Overarching Goals
- **Technical Excellence**: Write clean, modular, and testable code.  
- **UX Polish**: Prioritize smooth interactions, feedback, and animations.  
- **Performance**: Ensure fast load times and minimal re-renders.  
- **Maintainability**: Keep abstractions sensible over feature bloat.  

---

## 2. Development Philosophy & Constraints

- Keep the project **small and focused** (MVP-first, stretch goals optional).  
- No external heavy state management libraries (e.g., Redux).  
- All logic should be **component-driven** with React hooks and context (if needed).  
- Use **synthetic or mock data** for testing—no external APIs required.  

---

## 3. Technology Stack

### 3.1 Frontend
- **Framework**: React 18 + TypeScript  
- **Build Tool**: Vite or Next.js (Pages Router)  
- **Styling**: SCSS Modules with organized variables/mixins  
- **Testing**: Vitest + React Testing Library  

### 3.2 Infrastructure
- **Version Control**: GitHub (GitFlow branching recommended)  
- **CI/CD**: GitHub Actions (linting, tests)  
- **Deployment**: Vercel or Netlify  

---

## 4. Game Features & Requirements

### 4.1 Core Requirements (MVP)
- **Game Board**: Default 4×4 grid of cards; shuffles at start/reset.  
- **Gameplay**: Two-card flip mechanic, matches stay visible, mismatches reset after delay.  
- **Controls**:  
  - Timer (starts on first flip, stops on last match)  
  - Move counter  
  - Restart button (reshuffles, resets state)  
- **Difficulty Levels**: At least 3 board sizes (2×2, 4×4, 6×6).  
- **Responsive Design**: Minimum 320px width (mobile-first).  

### 4.2 Styling
- SCSS Modules (component-scoped).  
- Consistent variables, mixins, and minimal duplication.  
- Subtle flip animations (CSS transform).  

---

## 5. Development Workflow & Standards

- **Type Safety**: Enforce strict TypeScript settings.  
- **Linting & Formatting**: ESLint + Prettier.  
- **Code Reviews**: All merges require review.  
- **Branching**: GitFlow (feature/bugfix branches).  
- **Commits**: Conventional Commits style.  

---

## 6. Testing & QA

- **Unit Tests**: For core game logic and utilities.  
- **Integration Tests**: Ensure components interact correctly (e.g., card flipping).  
- **E2E Tests**: Validate full gameplay flow.  
- **Quality Gates**: All tests must pass in CI before merging.  

---

## 7. Deployment & Release

- **Versioning**: Semantic Versioning (SemVer).  
- **Hosting**: Deployed on Vercel/Netlify.  
- **Changelog**: Maintain updates for features/bugfixes.  

---

## 8. Software Principles

- **SOLID Principles**  
- **KISS** (Keep It Simple, Stupid)  
- **DRY** (Don’t Repeat Yourself)  
- **YAGNI** (You Aren’t Gonna Need It)  
- **Separation of Concerns** (logic, UI, state separated)  
- **Clean Code** (readable, small functions, meaningful names)  

---

## 9. Future Roadmap (Additional Features)

These are features beyond the MVP that improve usability, accessibility, and replayability:  

1. **Accessibility Enhancements**  
   - Full keyboard navigation (Tab/Shift+Tab to focus, Enter/Space to flip cards).  
   - Proper semantics and ARIA roles (e.g., `button`, `aria-pressed`, live regions for status updates).  

2. **Best Score Persistence**  
   - Save the best score in **localStorage**.  
   - Ranking based first on **least moves**, then **fastest time** in case of a tie.  

3. **Additional Extra Features**  
   - Themes (dark/light mode or different card designs).  
   - Sound effects (card flip, match, win).  
   - Scoreboard or leaderboard for multiple plays.  
   - Win celebration animations.  

---
