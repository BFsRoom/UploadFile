class DocumentFileSizeValidator
{
    private fileSizeInBytes: Number
    private maxFileSizeInBytes: Number = 10000000

    constructor(fileSize: Number) {
        this.fileSizeInBytes = fileSize
    }

    validateFileSize(): boolean {
        return this.fileSizeInBytes <= this.maxFileSizeInBytes
    }

    getErrorMessage(): string {
        return 'Maximum file size accepted is 10MB.'
    }
}

export default DocumentFileSizeValidator