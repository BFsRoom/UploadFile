import { readFile, constants } from 'fs'
import { access } from 'fs/promises'
import fileRetrievalRepo from '../repository/FileRetrievalRepo'
let instance: null|FileRetrievalService = null

class FileRetrievalService {
    static getInstance(): FileRetrievalService {
        if (instance == null) {
            instance = new FileRetrievalService()
        }
        return instance
    }

    async findFiles() {
        return await fileRetrievalRepo.findFiles()
    }

    async deleteFile(fileId: number): Promise<boolean> {
        const fileResponse = await fileRetrievalRepo.deleteFileById(fileId)

        if (fileResponse === false) {
            return false
        }else{
           return fileResponse === true
        }
    }

}

export default FileRetrievalService.getInstance()