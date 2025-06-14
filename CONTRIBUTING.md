
# Contributing to Job Application Tracker

Thank you for your interest in contributing to Job Application Tracker! We welcome contributions from developers of all experience levels.

## 🎯 How to Contribute

### 🐛 Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-username/job-application-tracker/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, etc.)

### 💡 Suggesting Features

1. Check existing [Issues](https://github.com/your-username/job-application-tracker/issues) and [Discussions](https://github.com/your-username/job-application-tracker/discussions)
2. Create a new issue with:
   - Clear feature description
   - Use case and motivation
   - Possible implementation approach

### 🔧 Code Contributions

#### Prerequisites

- Node.js 18+
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

#### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/job-application-tracker.git
   cd job-application-tracker
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

#### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update types as needed

3. **Test your changes**
   ```bash
   npm run build  # Ensure it builds successfully
   ```

4. **Commit with conventional commit format**
   ```bash
   git commit -m "feat: add job application filters"
   git commit -m "fix: resolve kanban drag-drop issue"
   git commit -m "docs: update README installation steps"
   ```

#### Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

#### Pull Request Process

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Use a clear title and description
   - Reference related issues
   - Include screenshots for UI changes

3. **Code Review**
   - Address feedback promptly
   - Keep discussions professional
   - Make requested changes

## 📋 Coding Standards

### TypeScript

- Use strict TypeScript settings
- Define proper types for all props and state
- Avoid `any` type usage
- Use meaningful variable names

### React

- Use functional components with hooks
- Follow React best practices
- Use custom hooks for reusable logic
- Implement proper error boundaries

### Styling

- Use Tailwind CSS utility classes
- Follow responsive design principles
- Maintain consistent spacing (8px grid)
- Use semantic color names

### File Organization

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   └── [Component].tsx # Feature components
├── pages/              # Page components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # Type definitions
└── contexts/           # React contexts
```

## 🧪 Testing Guidelines

- Write unit tests for utility functions
- Test component rendering and interactions
- Ensure responsive design works
- Test accessibility features

## 🔐 Security Considerations

- Never commit sensitive data
- Validate all user inputs
- Follow secure coding practices
- Report security issues privately

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## 🏆 Recognition

Contributors will be:
- Listed in project credits
- Mentioned in release notes
- Given commit access for regular contributors

## ❓ Questions?

- Open a [Discussion](https://github.com/your-username/job-application-tracker/discussions)
- Join our [Discord](https://discord.gg/yourserver)
- Email: contribute@yourapp.com

Thank you for contributing! 🎉
