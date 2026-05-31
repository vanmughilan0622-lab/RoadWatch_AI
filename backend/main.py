from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import asyncio

app = FastAPI(title="RoadWatch AI India - Public Audit Platform")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Indian Budget Data (Values in ₹ Lakhs)
MOCK_BUDGETS = {
    "Koramangala Ward 151": {"allocated": 850, "spent": 210, "defects_reported": 142},
    "Indiranagar Ward 80": {"allocated": 1200, "spent": 950, "defects_reported": 67},
    "HSR Layout Ward 174": {"allocated": 600, "spent": 120, "defects_reported": 215},
    "Whitefield Ward 184": {"allocated": 2500, "spent": 400, "defects_reported": 380},
    "Jayanagar Ward 153": {"allocated": 950, "spent": 880, "defects_reported": 24},
}

DEFECT_TYPES = ["Pothole", "Crack", "Faded Marking"]

# Center of Bangalore (Bengaluru)
BANGALORE_LAT = 12.9716
BANGALORE_LON = 77.5946

@app.get("/")
async def root():
    return {"message": "RoadWatch AI India Backend is running"}

@app.post("/api/process-feed")
async def process_feed():
    """
    Simulates processing a video feed and detecting road defects.
    Returns random set of detected defects around Bangalore.
    """
    await asyncio.sleep(1.2) # Faster processing simulation
    
    num_defects = random.randint(5, 12) # Indian roads might have more defects for the demo
    defects = []
    
    for i in range(num_defects):
        defects.append({
            "id": f"defect_in_{int(time.time())}_{i}",
            "type": random.choice(DEFECT_TYPES),
            "lat": BANGALORE_LAT + random.uniform(-0.04, 0.04),
            "lng": BANGALORE_LON + random.uniform(-0.04, 0.04),
            "severity": random.choice(["Low", "Medium", "High", "Critical"]),
            "timestamp": time.time()
        })
        
    return {"status": "success", "defects": defects}

@app.get("/api/municipal-budget")
async def get_municipal_budget():
    return {"status": "success", "data": MOCK_BUDGETS}

@app.get("/api/user-rewards")
async def get_user_rewards():
    return {
        "status": "success",
        "data": {
            "total_points": 12450,
            "badge": "Road Warrior Lvl 4",
            "contributions": {
                "km_audited": 420.5,
                "reports_verified": 89,
                "active_streaks": 12
            },
            "recent_activity": [
                {"action": "Pothole Verified", "points": "+50", "time": "2 hours ago"},
                {"action": "Route Scan (15km)", "points": "+150", "time": "1 day ago"},
                {"action": "Hazard Reported", "points": "+100", "time": "3 days ago"}
            ]
        }
    }

@app.get("/api/road-analytics")
async def get_road_analytics():
    return {
        "status": "success",
        "data": {
            "road_quality_index": 76.4,
            "total_bumps_detected": 1420,
            "ride_comfort_score": 8.2,
            "severity_distribution": {
                "Low": 45,
                "Medium": 30,
                "High": 15,
                "Critical": 10
            }
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
