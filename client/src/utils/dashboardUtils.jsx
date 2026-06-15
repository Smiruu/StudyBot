export const getFileTypeDisplay = (mimeType) => {
    if (!mimeType) return 'DOCUMENT';
    
    switch (mimeType) {
        case 'application/pdf':
            return 'PDF';
        case 'text/plain':
            return 'TXT';
        case 'text/markdown':
            return 'MD';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'DOCX';
        case 'image/png':
            return 'PNG';
        case 'image/jpeg':
            return 'JPG';
        case 'image/webp':
            return 'WEBP';
        default:
            // Fallback: split by slash and take the second part
            const parts = mimeType.split('/');
            if (parts.length > 1) {
                return parts[1].toUpperCase();
            }
            return 'DOCUMENT';
    }
};

export const filterAndSortFiles = (files, searchQuery, sortBy) => {
    if (!files || files.length === 0) return [];
    
    let result = [...files];

    // Search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(file => file.title.toLowerCase().includes(query));
    }

    // Sort
    switch (sortBy) {
        case 'Date':
            result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'Name':
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'Type':
            const getType = (file) => getFileTypeDisplay(file.file_type);
            result.sort((a, b) => getType(a).localeCompare(getType(b)));
            break;
        default:
            break;
    }

    return result;
};