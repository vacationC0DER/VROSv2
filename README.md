# Vacation Rental OS

A comprehensive vacation rental property management system built with React, TypeScript, and Supabase.

## Features

- **Strategy Map**: Track company performance and strategic objectives
- **Analytics Dashboard**: Real-time performance metrics and insights
- **CRM System**: Manage property owner relationships and deals
- **Sales Pipeline**: Track leads and opportunities
- **Marketing Tools**: Access templates and marketing resources
- **Data Request System**: Property and sales data lookup tools
- **Knowledge Base**: Internal documentation and resources
- **Forum**: Team communication and collaboration
- **Learning Management**: Training and development platform

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **Icons**: Lucide React
- **Drag & Drop**: @hello-pangea/dnd

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # React contexts
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries
├── pages/         # Page components
├── stores/        # Zustand stores
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Database Schema

The application uses Supabase with the following main tables:

- `users`: User accounts and profiles
- `departments`: Organization structure
- `objectives`: Strategic objectives and goals
- `projects`: Project management
- `crm_deals`: Sales pipeline and deals
- `forum_posts`: Team communication
- `knowledge_articles`: Internal documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
