import numbers
from fastapi import APIRouter
from pydantic import BaseModel
from apps.users import controller


router = APIRouter(
    prefix ="/api/auth",
    tags = ["Authentication"]
)

class UserRegister(BaseModel):
    email: str
    password: str
    username: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserVerifyOtp(BaseModel):
    email: str
    otp: str

@router.post("/register")
async def register(user: UserRegister):
    return controller.register(user)

@router.post("/login")
async def login(user: UserLogin):
    return controller.login(user)

@router.post("/verify")
async def verifyOtp(user: UserVerifyOtp):
    return controller.verifyOtp(user)
