# Setup and Development Guide

## Project Overview

This project is a **TypeScript-based To-Do application** with comprehensive E2E testing using **Playwright**. It demonstrates best practices for:

- TypeScript strict mode configuration
- Modern project structure
- Comprehensive E2E testing
- GitHub Actions CI/CD
- Responsive web design

## Prerequisites

Before you start, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

Verify installation:
```bash
node --version    # Should be v16+
npm --version     # Should be v7+
git --version
```

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`:
- `@playwright/test` - Testing framework
- `typescript` - TypeScript compiler
- `vite` - Build tool
- Other development dependencies

### 2. Install Playwright Browsers

```bash
npx playwright install
```

This downloads the browser binaries needed for testing:
- Chromium
- Firefox
- WebKit

You can also install browsers for specific platforms:
```bash
npx playwright install chromium firefox webkit
```

### 3. Verify Installation

```bash
npm run type-check
```

This should run without errors if TypeScript is properly configured.

## Project Structure Explained

### `/src` - TypeScript Source Files
Contains all TypeScript application code:
- `app.ts` - Main application logic
  - Task management functions
  - DOM event handlers
  - Type definitions

### `/public` - Static Assets
Files served directly to the browser:
- `index.html` - Main HTML entry point
  - Contains page structure
  - Links to stylesheets and scripts
- `styles/style.css` - Application styles
  - Component styling
  - Responsive design
  - Animations and transitions

### `/e2e` - End-to-End Tests
Playwright test suite:
- `todo.spec.ts` - Test specifications
  - 15+ test cases
  - Full application workflows
  - Edge case coverage

### `/dist` - Compiled Output
Generated after building:
- `app.js` - Compiled JavaScript
- Source maps for debugging

### Root Configuration Files

**TypeScript Configuration:**
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - App-specific settings

**Build & Test Configuration:**
- `vite.config.ts` - Vite build configuration
- `playwright.config.ts` - Playwright test configuration
- `package.json` - Project metadata and scripts

**Code Quality:**
- `.editorconfig` - Editor formatting rules
- `.gitignore` - Git ignore patterns

**CI/CD:**
- `.github/workflows/test.yml` - GitHub Actions workflow

## Development Workflow

### 1. Start Development Server

```bash
npm run serve
```

This starts an HTTP server on `http://localhost:8080` serving the public folder.

### 2. Edit TypeScript Files

Edit files in `/src`:
```bash
# Example: Update src/app.ts
code src/app.ts
```

### 3. Rebuild Project

After making changes:
```bash
npm run build
```

This compiles TypeScript to JavaScript in the `/dist` folder.

### 4. Test Your Changes

Reload the browser at `http://localhost:8080` to see changes.

## Running Tests

### Run All Tests
```bash
npm test
```

Runs all tests in the `/e2e` folder across all configured browsers.

### Run Tests with UI
```bash
npm run test:ui
```

Opens interactive test runner UI in your browser. Best for development and debugging.

### Run Tests in Debug Mode
```bash
npm run test:debug
```

Pauses execution at each step, allowing inspection.

### Run Tests with Visible Browser
```bash
npm run test:headed
```

Shows the browser window while running tests.

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View Test Report
```bash
npm run test:report
```

Opens the HTML test report in your browser.

## Writing Tests

### Test File Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
    await page.locator('#element').click();
    await expect(page.locator('#result')).toBeVisible();
  });
});
```

### Common Test Patterns

**Locating Elements:**
```typescript
// By selector
page.locator('#id')
page.locator('.class')

// By text
page.locator('text=Click me')

// By role
page.getByRole('button', { name: 'Submit' })

// By label
page.getByLabel('Username')

// By placeholder
page.getByPlaceholder('Enter text')
```

**Interacting:**
```typescript
await page.locator('#input').fill('text');
await page.locator('button').click();
await page.locator('checkbox').check();
await page.keyboard.press('Enter');
```

**Assertions:**
```typescript
await expect(element).toBeVisible();
await expect(element).toHaveText('Expected');
await expect(element).toHaveValue('value');
await expect(element).toBeChecked();
```

**Waiting:**
```typescript
await page.locator('#element').waitFor();
await page.waitForTimeout(1000); // Not recommended, use waitFor() instead
```

## TypeScript Configuration

### Compiler Options

The project uses strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,           // All strict options enabled
    "noUnusedLocals": true,   // Error on unused variables
    "noUnusedParameters": true, // Error on unused parameters
    "noImplicitAny": true,    // Error on implicit any
    "strictNullChecks": true, // Strict null checking
    "esModuleInterop": true   // CommonJS/ES module interop
  }
}
```

### Path Aliases

Use `@/*` to import from src:
```typescript
// Instead of:
import { func } from '../../src/utils';

// Use:
import { func } from '@/utils';
```

## Debugging

### Debug Tests
```bash
npm run test:debug
```

The Playwright Inspector will open, allowing step-by-step debugging.

### Add Breakpoints in Tests
```typescript
test('my test', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Execution pauses here
  await page.locator('button').click();
});
```

### View Generated Traces
After a test failure with `trace: 'on-first-retry'`:
```bash
npx playwright show-trace trace.zip
```

## TypeScript Type Checking

Check for TypeScript errors without building:
```bash
npm run lint
```

Or use in your IDE:
- VS Code: Install "TypeScript" extension
- IntelliJ: Built-in support

## Common Issues & Solutions

### Issue: Tests timeout
**Solution:** Increase timeout in playwright.config.ts
```typescript
timeout: 30000, // 30 seconds
```

### Issue: "Cannot find module"
**Solution:** Check tsconfig.json paths configuration:
```json
"paths": {
  "@/*": ["src/*"]
}
```

### Issue: Playwright browsers not found
**Solution:** Reinstall browsers
```bash
npx playwright install --with-deps
```

### Issue: Port already in use
**Solution:** Use different port in vite.config.ts
```typescript
server: {
  port: 3000, // Change to different port
}
```

## Best Practices

### TypeScript
- ✅ Use strict mode
- ✅ Avoid `any` type
- ✅ Define interfaces for data structures
- ✅ Use type guards for runtime checks

### Testing
- ✅ Test user interactions, not implementation
- ✅ Use meaningful test descriptions
- ✅ Keep tests independent
- ✅ Avoid hardcoded waits (use waitFor)
- ✅ Test edge cases

### Code Quality
- ✅ Run type checks before committing
- ✅ Keep test coverage high
- ✅ Use descriptive variable names
- ✅ Add JSDoc comments to functions
- ✅ Follow consistent code style

## Useful Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Getting Help

If you encounter issues:

1. Check the error message carefully
2. Run `npm run type-check` to find TypeScript errors
3. Review the relevant documentation
4. Check GitHub Issues for similar problems
5. Ask in relevant communities (Stack Overflow, Reddit, etc.)

---

Happy coding! 🚀
