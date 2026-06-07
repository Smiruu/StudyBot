import { supabaseAdmin } from "../../config/supabase.js";

export const refresh = async (token) => {
    const { data, error } = await supabaseAdmin.auth.refreshSession({
        refresh_token: token
    })

    if (error) {
        console.error("Services Error: Refresh, ", error)
        throw new Error(error)
    }
    return data
}

export const register = async (username, email, password) => {

    const { data: existingUser } = supabaseAdmin
        .from("Profiles")
        .select("name")
        .eq("name", username)
        .single()

    if (existingUser) {
        console.error("Services error: Username already taken")
        throw new Error("Username is already taken.")
    }
    const { data, error } = await supabaseAdmin.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username
            },
        }
    })

    if (error) throw error;
    return data
}

export const verifyRegister = async (email, token) => {

    const { data, error: verifyError } = await supabaseAdmin.auth.verifyOtp({
        email: email,
        token: token,
        type: 'email',

    })
    console.log(data)
    const { error: ProfileError } = await supabaseAdmin
        .from("Profile")
        .insert({
            id: data?.user?.id,
            name: data.user.user_metadata.username,
        })

    if (ProfileError) {
        console.error("Services Error: Profile, ", ProfileError)
        throw new Error(ProfileError)
    };
    if (verifyError) {
        console.error("Services Error: Verify, ", verifyError)
        throw new Error(verifyError)
    };

    return data
}

export const login = async (email, password) => {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email, password
    })

    if (error) {
        console.error("Services Error: Login, ", error.message)
        throw new Error(error.message)
    }

    return data
}