# Juspay UI Engineer Assignment - SaaS Dashboard

This is a submission for the UI Engineer position at Juspay. A pixel-perfect SaaS dashboard implementation built with React and Next.js, featuring modern UI components, animations, and comprehensive functionality.

## 🚀 Live Demo

[https://juspay-dash.vercel.app](https://juspay-dash.vercel.app)

## 🛠️ Technologies Used

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI primitives
- **Data Tables**: TanStack Table (React Table)
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **Theme**: next-themes (Dark/Light mode)
- **Icons**: Lucide React
- **Code Quality**: Biome (Linting & Formatting)

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd juspay-dash
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ Features

### Core Functionality

- ✅ **Filtering**: Filter orders by status with multi-select checkboxes
- ✅ **Searching**: Real-time search across order IDs with keyboard shortcuts (Cmd/Ctrl + K)
- ✅ **Sorting**: Column-based sorting with visual indicators
- ✅ **Pagination**: Page-based navigation with smart page number display
- ✅ **Dark/Light Theme**: Toggle between themes with system preference support
- ✅ **Favorites**: Add/remove navigation items to favorites using context-based state management

### UI Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Sidebar Navigation**: Collapsible navigation sidebar with favorites
- **Activity Sidebar**: Real-time activity feed with user avatars
- **Command Palette**: Quick navigation using Cmd/Ctrl + K
- **Data Tables**: Fully functional order management table
- **Charts**: Revenue, sales, and location-based visualizations
- **Microinteractions**: Smooth hover effects, transitions, and animations

### Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Focus states and indicators
- Screen reader friendly

## 🎯 How to Use Features

### Search

- Click the search button in the sidebar or press `Cmd/Ctrl + K` to open command palette
- In the orders table, use the search input to filter by order ID

### Filter Orders

- Click the filter icon in the orders table header
- Select/deselect status checkboxes to filter orders
- Filter counts are displayed next to each status

### Sorting

- Click column headers to sort ascending/descending
- Visual indicators show current sort direction

### Pagination

- Use previous/next buttons or click page numbers
- Current page is highlighted

### Theme Toggle

- Click the theme toggle button in the header
- Switch between light and dark modes

### Favorites Management

- Click the star icon next to any navigation item to add/remove from favorites
- View your favorites in the sidebar under the "Favorites" tab
- Favorites are managed using React Context for global state
- Recently visited pages are automatically tracked

### Add New Order

- Click the "+" button in the orders table header
- Fill in the form (User, Address, Project, Status)
- Submit to add the order to the table

## 📁 Project Structure
