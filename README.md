# RoadWatch AI 🛣️

**Topic Selected:** Road SOS

RoadWatch AI is a cutting-edge public audit platform and real-time anomaly detection system. It aims to solve the lack of transparency in municipal road repair budgets and empower citizens to report, track, and verify road hazards using simulated dashcam feeds.

## 🚀 Key Features

- 🗺️ **Live Map Dashboard**: Displays real-time road anomalies (Potholes, Cracks, Faded Markings) with glowing markers coded by severity.
- 🧠 **Neural Analysis & Dashcam Simulation**: Simulates the processing of video feeds to automatically detect road surface issues and dispatch actionable telemetry.
- 🏆 **Citizen Rewards & Gamification**: Users earn experience points (XP) and rank badges for auditing routes and verifying hazards, incentivizing public governance.
- 📊 **Road Analytics**: Provides comprehensive indices including Ride Comfort, Surface Quality, and severity breakdowns across different municipal wards.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Glassmorphism UI)
- React-Leaflet & CartoDB Dark Base Maps
- Framer Motion
- Lucide React

**Backend:**
- Python 3
- FastAPI
- Uvicorn

## ⚙️ Installation & Setup

The project is divided into two distinct components: the Frontend and the Backend API. Both must be running concurrently for the application to function properly.

### 1. Starting the Backend (FastAPI)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Python dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
3. Start the Uvicorn server:
   ```bash
   python main.py
   ```
   *The backend API will run on `http://127.0.0.1:8000`.*

### 2. Starting the Frontend (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will be accessible at `http://localhost:5173`.*

## 📖 How to Use the App

1. Open the frontend URL (`http://localhost:5173`) in your browser.
2. Navigate to the **Control Center** in the left sidebar and click **"Live Dashcam Feed"**.
3. This triggers the backend AI simulation which will automatically populate the map with anomalies.
4. Click on any glowing marker on the map to instantly view the **Full Report** for that specific anomaly (including Lat/Lng coordinates and estimated fiscal impact).
5. Use the sidebar navigation to switch between the Live Map, Citizen Rewards, and Road Analytics views to see live gamification and telemetry.

## 📝 Hackathon Submission Notes
- The presentation slides are available in `RoadWatch_AI_Submission.pptx`.
- The detailed documentation is available in `RoadWatch_AI_Documentation.docx`.
- The required code and structured databases have been configured for submission via Unstop.
