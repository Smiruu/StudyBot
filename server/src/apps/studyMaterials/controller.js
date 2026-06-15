import * as fileService from "./service.js";


export const uploadFiles = async (req, res) => {
    try {
        const files = req.files

        const user_id = req.user.id

        if (!files || files.length === 0) {
            return res.status(400).json({error:"No files provided"})
        }

        const uploadPromises = files.map(file => fileService.fileUpload(file,user_id))
        const uploadedFiles = await Promise.all(uploadPromises)

        res.status(201).json({
            message:"Files uploaded successfully",
            data: uploadedFiles,
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({error:error.message})
    }
}

export const getAllUserStudyMaterials = async (req, res) => {
    try {
        const user_id = req.user.id
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const {data, count} = await fileService.getAllUserStudyMaterials(user_id, page, limit)

        const totalPages = Math.ceil(count/limit);

        res.status(200).json({
            message: "Study Materials fetched successfully",
            data: data,
            meta: {
                current_page: page,
                items_per_page: limit,
                total_pages: totalPages,
                has_next_page: page < totalPages,
                has_previous_page: page > 1
            }
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({error:error.message})
    }
}

export const getMaterialById = async (req, res) => {
    try {
        const materialId = req.params.id

        const {signedUrl, title } = await fileService.fetchMaterialById(materialId);

        res.status(200).json({
            message: "File fetched successfully",
            data: signedUrl,
            title: title
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({error:error.message})
    }
}

