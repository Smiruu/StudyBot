import { useState, useCallback } from "react";
import * as filesApi from "../api/filesApi";
import { useAuth } from "../context/authContext";

export const useFiles = () => {
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(6)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    const { token } = useAuth()
    const fetchFiles = useCallback(async (page = 1, limit = 6) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await filesApi.getUserFiles(page, limit);
            console.log(response)
            setFiles(response.data)
            setTotalItems(response.meta.total_items)
            setTotalPages(response.meta.total_pages)
            setPage(response.meta.current_page)
            setLimit(response.meta.items_per_page)

        } catch (error) {

            setError(error || "Failed to fetch materials")
            throw error
        } finally {
            setIsLoading(false)
        }
    }, [token]);

    const fetchFileById = async (id) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await filesApi.getUserFile(id)
            return response
        } catch (error) {
            setError(error || "Failed to fetch file")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const uploadFiles = async (files) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await filesApi.fileUpload(files);
            if (response.data) {
                setFiles(prevFiles => {
                    // Filter out files that already exist in our current view
                    const trulyNewFiles = response.data.filter(
                        newFile => !prevFiles.some(existing => existing.id === newFile.id)
                    );

                    // Prepend only the new files
                    const newList = [...trulyNewFiles, ...prevFiles];

                    // Keep the view limited to current limit
                    return newList.slice(0, limit);
                });
            }
        } catch (error) {
            setError(error || "Failed to upload files")
            throw error;
        } finally {
            setIsLoading(false)
        }
    }

    return {
        files,
        fetchFiles,
        fetchFileById,
        uploadFiles,
        isLoading,
        error,
        page,
        limit,
        totalPages,
        totalItems
    }

}