from os import name
from config.supabase import supabase

def register(email:str, password: str, username:str):
    
    existing_username = supabase.table("Profile").select("name").eq("name", username).execute()

    if len(existing_username.data) > 0:
        raise ValueError("Username is already taken")

    response =  supabase.auth.sign_up({
        "email": email,
        "password": password,
        "options": {
            "data": {
                "username": username
            }
        }
    })
        
    return response.user.email

def login(email:str, password:str):
    response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
    })
    return response.session

def verifyOtp(email:str, otp:str):
    response = supabase.auth.verify_otp({
        "email": email,
        "token": otp,
        "type": "email"
    })
    if response.session:
        # Extract the username we saved earlier
        user_metadata = response.user.user_metadata
        username = user_metadata.get("username", "Unknown")
        
        # Now that they have a session, this insert will work!
        supabase.table("Profile").insert({
            "id": response.user.id,
            "name": username
        }).execute()

    return response.user.email
