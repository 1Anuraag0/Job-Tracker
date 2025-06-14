
# 🎯 Job Application Tracker

> A modern, intuitive web application to streamline your job search process and track applications with ease.



## 🌟 Features

- **📊 Kanban Board View** - Visualize your application pipeline with drag-and-drop functionality
- **🔐 Secure Authentication** - Protected user accounts with email verification
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Real-time Updates** - Instant synchronization across all your devices
- **📈 Application Analytics** - Track your success rates and application trends
- **🎨 Modern UI/UX** - Clean, intuitive interface built with shadcn/ui components

## 🚀 Live Demo

Experience the app live: [Job Application Tracker]((https://vibes-job.lovable.app/auth))


## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Deployment**: Lovable Platform

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AuthHero.tsx    # Authentication hero section
│   ├── KanbanBoard.tsx # Main kanban board component
│   └── ...
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── lib/                # Library configurations
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Usage

1. **Sign Up/Sign In** - Create your account or log in to existing one
2. **Add Applications** - Click "Add Job" to create new job applications
3. **Track Progress** - Move applications through different stages:
   - 📝 Applied
   - 🗣️ Interviewing
   - 🎉 Offer
   - ❌ Rejected
4. **Manage Details** - Edit application details, add notes, and set reminders

## 🎨 Design System

This project uses a consistent design system built on:

- **Colors**: Tailwind CSS color palette with custom primary colors
- **Typography**: Inter font family for optimal readability
- **Spacing**: 8px grid system for consistent layouts
- **Components**: shadcn/ui for accessible, customizable components

## 🔒 Security Features

- **Row Level Security (RLS)** - Database-level data protection
- **Password Security** - Advanced password validation and strength checking
- **Input Validation** - Comprehensive form validation using Zod
- **XSS Protection** - Sanitized inputs and outputs

## 🚀 Deployment

### Deploy to Lovable (Recommended)

1. Push your changes to the connected GitHub repository
2. Visit your [Lovable Project](https://lovable.dev/projects/6d9bf246-3a81-4ac7-89f1-cebfe7bdf0e9)
3. Click **Share → Publish** to deploy

### Deploy to Other Platforms

The application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop the `dist` folder after `npm run build`
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - The modern development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Database and authentication by [Supabase](https://supabase.com)


## 🗺️ Roadmap

- [ ] Email notifications for application deadlines
- [ ] Integration with job boards (LinkedIn, Indeed)
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] AI-powered application suggestions

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
  <p>⭐ Star this repo if it helped you!</p>
</div>
