# Git Branching Practice - To-Do Application

A modern To-Do application built with **TypeScript**, tested with **Playwright**, and organized with best practices for web development.

## 📁 Project Structure

```
git-branching-practice/
├── src/                          # TypeScript source files
│   └── app.ts                   # Main application logic
├── public/                       # Static assets
│   ├── index.html               # Main HTML file
│   └── styles/
│       └── style.css            # Application styles
├── e2e/                         # End-to-end tests
│   └── todo.spec.ts            # Playwright test suite
├── dist/                        # Compiled JavaScript (generated)
├── playwright-report/           # Test reports (generated)
├── node_modules/               # Dependencies (generated)
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TypeScript config
├── playwright.config.ts        # Playwright configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Development

1. **Compile TypeScript:**
   ```bash
   npm run build
   ```

2. **Serve the application locally:**
   ```bash
   npm run serve
   ```
   The application will be available at `http://localhost:8080`

### Running Tests

#### Run all tests
```bash
npm test
```

#### Run tests with UI (interactive mode)
```bash
npm run test:ui
```

#### Run tests in debug mode
```bash
npm run test:debug
```

#### Run tests with visible browser
```bash
npm run test:headed
```

#### View test reports
```bash
npm run test:report
```

#### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📝 Features

- ✅ Add new tasks
- ✅ Mark tasks as complete
- ✅ Remove tasks
- ✅ Task counter
- ✅ Responsive design
- ✅ Keyboard support (Enter key)
- ✅ Beautiful UI with animations

## 🧪 Testing

### Test Coverage

The project includes 15 comprehensive E2E tests covering:

1. Page title and initial state
2. Adding single and multiple tasks
3. Marking tasks as complete
4. Removing tasks
5. Counter functionality
6. Input validation
7. Keyboard interactions
8. Independent task handling
9. Styling and visual feedback

### Writing New Tests

Tests are located in `e2e/todo.spec.ts`. Use the Playwright API to write new tests:

```typescript
test('your test name', async ({ page }) => {
  await page.goto('/');
  await page.locator('#taskInput').fill('Test task');
  await page.locator('#addButton').click();
  await expect(page.locator('li')).toContainText('Test task');
});
```

## 🔧 TypeScript Configuration

The project uses strict TypeScript settings for better type safety:

- Strict mode enabled
- No implicit any
- Strict null checks
- Unused locals/parameters detection
- Fallthrough case detection

## 📦 Dependencies

### Dev Dependencies

- `@playwright/test` - E2E testing framework
- `typescript` - TypeScript compiler
- `vite` - Fast build tool and dev server
- `@types/node` - Node.js type definitions

## 🎨 Styling

The application uses vanilla CSS with:

- CSS Grid and Flexbox for layouts
- CSS Variables for theming
- Media queries for responsive design
- Smooth transitions and animations
- Modern color palette

## 🐛 Debugging

### TypeScript Errors
```bash
npm run type-check
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Use page.pause() in tests
```typescript
test('debug example', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Stops execution here
});
```

## 📚 Useful Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Build TypeScript files |
| `npm run serve` | Start local dev server |
| `npm test` | Run all tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:report` | View test report |
| `npm run lint` | Check TypeScript errors |

## 🌐 Browser Support

Tests run on:
- Chrome/Chromium
- Firefox
- Safari/WebKit
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

This project is open source and available for learning purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. It's designed as a learning tool for Git branching practices and testing methodologies.

---

**Happy Testing! 🎉**
