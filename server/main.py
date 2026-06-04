from fastapi import FastAPI
from config.supabase import supabase
from apps.users.routes import router as authRouter

app = FastAPI(
    title = "Studybot API",
    description="Backend for Studybot AI Features",
    version="1.0.0"
)

app.include_router(authRouter)

@app.get('/')
async def root():
    return {
        "status":"success",
        "message":"API is healthy"
    }