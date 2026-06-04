from fastapi import HTTPException
from apps.users import services

def register(user_data):
    try:
        user = services.register(
            email=user_data.email,
            password=user_data.password,
            username=user_data.username
        )

        return {
            "status": "success",
            "message": "User registered successfully",
            "email": user.email,

        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def login(user_data):
    try:
        session = services.login(
            email=user_data.email,
            password=user_data.password
        )

        return {
            "status": "success",
            "message": "User logged in successfully",
            "session": session
        }
 
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

def verifyOtp(user_data):
    try:
        user = services.verifyOtp(
            email=user_data.email,
            otp=user_data.otp
        )

        return {
            "status": "success",
            "message": "User verified successfully",
            "email": user.email,

        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
