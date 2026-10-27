<img width="1365" height="766" alt="Screenshot 2026-10-27 12 40 29" src="https://github.com/user-attachments/assets/aa870ccf-589d-4c6a-825e-538c062e9c33" />
<img width="1365" height="766" alt="Screenshot 2026-10-27 12 38 41" src="https://github.com/user-attachments/assets/faba7ca7-8c97-4e29-bf20-3e4e7aacc6b2" />
<img width="1365" height="766" alt="Screenshot 2026-10-27 12 40 04" src="https://github.com/user-attachments/assets/a2021aa0-c0e8-438c-84a0-7ef160994094" />
<img width="1365" height="766" alt="Screenshot 2026-10-27 12 39 52" src="https://github.com/user-attachments/assets/e2e3f195-d171-46d6-bfe3-8236a3f29fea" />
<img width="1365" height="766" alt="Screenshot 2026-10-27 12 39 08" src="https://github.com/user-attachments/assets/9ea4dd54-d876-4857-b0a7-fd56155d3637" />
<img width="1365" height="766" alt="Screenshot 2026-10-27 12 39 41" src="https://github.com/user-attachments/assets/45b4ba73-3219-40fe-bb2c-9f6d410d8b45" />

# BTech Dashboard

An offline-first lead management dashboard built to solve a personal freelancing workflow problem. It simplifies lead follow-ups by showing which leads need attention, what action to take next, and when to take it.

**[Live Demo](https://b-tech-dashboard-eight.vercel.app/login)** · **[GitHub Repository](https://github.com/Brian9975/BTech-Dashboard)**

## Overview

Managing freelancing leads through WhatsApp conversations made it difficult and time-consuming to track lead stages and remember when to follow up. BTech Dashboard solves this problem by centralizing lead management and automatically identifying leads that need attention based on their stage and last contact date.

## Features

- **Lead Management:** Create, view, update, and delete leads.
- **Automated Follow-Up Suggestions:** Identify leads that need attention and suggest the next action based on their stage and last contact date.
- **Today's Dashboard:** View leads that require attention and the actions to take next.
- **Quick Lead Updates:** Quickly update a lead's stage and last contact date.
- **Search and Filtering:** Find and filter leads efficiently.
- **Stage-Based Navigation:** View leads by stage and access individual lead details.
- **Task Management:** Create, view, update, and delete tasks.
- **Task Attention Indicators:** Flag tasks that need attention, are due soon, are due today, or have passed their deadlines.
- **Scripts Library:** Save reusable scripts and copy them to the clipboard.
- **Offline-First Functionality:** Continue working without an internet connection using IndexedDB.
- **Automatic Data Syncing:** Synchronize data between IndexedDB and Firebase when connectivity returns.
- **Authentication:** Sign in using email and password or Google.
- **Multi-Device Access:** Access your own synced data across devices.
- **Dashboard Statistics:** View useful summaries of your data.
- **Responsive Design:** Use the application across different screen sizes.
- **Dark Mode:** Switch between light and dark themes.

## Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Local Database:** IndexedDB
- **Backend and Syncing:** Firebase
- **Authentication:** Firebase Authentication
- **Routing:** React Router DOM
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js and npm
- A Firebase project

### 1. Clone the Repository

```bash
git clone https://github.com/Brian9975/BTech-Dashboard.git
cd BTech-Dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with the configuration from your own Firebase project. Enable Email/Password and Google sign-in in Firebase Authentication.

Do not commit your `.env` file or expose private credentials.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

## Live Demo

Try the application here: [BTech Dashboard](https://b-tech-dashboard-eight.vercel.app/login)

Anyone can create an account and explore the dashboard.

## Author

**Brian Kariuki**

- [GitHub Profile](https://github.com/Brian9975)
- [Project Repository](https://github.com/Brian9975/BTech-Dashboard)
