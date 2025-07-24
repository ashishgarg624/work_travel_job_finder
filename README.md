# Work & Travel Job Finder

A React-based application for finding work opportunities across Australia, specifically designed for international workers and backpackers.

## Features

- **Split-screen Interface**: Job listings on the left, interactive map on the right
- **Advanced Filtering**: Filter by state, industry, or search by company/contact names
- **Contact Tracking**: Mark employers as contacted with visual indicators
- **Interactive Map**: OpenStreetMap integration with custom markers
- **Responsive Design**: Optimized for all device sizes
- **Real-time Updates**: Instant filtering and search results

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Leaflet** for map functionality
- **Lucide React** for icons
- **Vite** for development and building

## Setup Instructions

1. **Clone or download the project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the local development URL (typically `http://localhost:5173`)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main header with branding
│   ├── FilterPanel.tsx # Search and filter controls
│   ├── JobCard.tsx     # Individual job listing card
│   ├── JobList.tsx     # Left panel with job listings
│   ├── Map.tsx         # Right panel with interactive map
│   └── StatsPanel.tsx  # Statistics display
├── data/
│   └── jobs.ts         # Job opportunity data
├── hooks/
│   └── useJobs.ts      # Custom hook for job management
├── types/
│   └── Job.ts          # TypeScript interfaces
└── App.tsx             # Main application component
```

## Key Features Explained

### Job Listings
- Comprehensive job cards with all contact information
- Industry categorization with color coding
- Contact status tracking (contacted/not contacted)
- Click-to-select functionality

### Interactive Map
- Custom markers with different colors for selection states
- Popup information windows with full job details
- Auto-fitting bounds to show all filtered jobs
- Synchronized selection with job list

### Filtering System
- Real-time search across company names, addresses, and contacts
- State-based filtering
- Industry-based filtering
- Clear filters functionality

### Contact Management
- One-click contact status toggle
- Visual indicators for contacted employers
- Persistent state during session (resets on page reload)

## Data Structure

Each job opportunity contains:
- Company information (name, address, contact details)
- Geographic coordinates for map display
- Industry classification
- Contact person details

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## License

This project is for demonstration purposes. Please respect the copyright notice in the original requirements.