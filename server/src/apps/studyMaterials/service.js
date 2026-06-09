import {supabaseAdmin} from "../../config/supabase.js";
import crypto from 'crypto'

export const fileUpload = async (file, userId) => {

    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex')

    const {data: existingFile, error: searchError} = await supabaseAdmin
    .from('study_materials')
    .select('*')
    .eq('user_id', userId)
    .eq('file_hash', fileHash)
    .maybeSingle()

    if(existingFile) return existingFile

    if(searchError){
        console.error('Error Searching File:', searchError)
        throw new Error(searchError.message)
    }

    const uniqueFileName = `${userId}/${Date.now()}_${file.originalname}`;
    
    const { error: storageError} = await supabaseAdmin.storage
    .from('study_files')
    .upload(uniqueFileName, file.buffer, {
        contentType: file.mimetype
    });

    if (storageError){
        console.error('Service Error:', storageError);
        throw new Error(storageError.message)
    }

    const {data: storageUrlData} = supabaseAdmin.storage
    .from('study_files')
    .getPublicUrl(uniqueFileName)
    
  
    const {data: dbData, error: dbError} = await supabaseAdmin
    .from('study_materials')
    .insert({
        user_id : userId,
        title: file.originalname,
        file_type: file.mimetype,
        storage_url: storageUrlData.publicUrl,
        file_hash: fileHash
    })
    .select()
    .single()

    if(dbError){
        console.error('Service Error:', dbError)
        throw new Error(dbError.message)
    }

    return dbData
}

export const getAllUserStudyMaterials = async (userId, page = 1, limit = 10) => {
    
    const from  = (page - 1) * limit;
    const to =  from + limit - 1;

    const {data, count, error} = await supabaseAdmin
    .from('study_materials')
    .select("*", {count: 'exact'})
    .eq("user_id", userId)
    .order('created_at', {ascending:false})
    .range(from, to);

    console.log(`SERVICE DEBUG: ID: ${userId}, Page: ${page}, Limit: ${limit}`);
    if (error) {
        console.error('Error Fetching Study Materials:', error)
        throw new Error(error.message)
    }

    return { data, count }
}