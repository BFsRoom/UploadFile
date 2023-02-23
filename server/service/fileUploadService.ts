
import fs from 'fs'
import fileRepo from '../repository/FileRepo'
import moment from 'moment'

class FileUploadService
{
    private file: Express.Multer.File

    constructor(file: Express.Multer.File) {
        this.file = file
    }

    async createFileUpload(): Promise<number> {
        const fileId = await this.createFileRecord()
        
        this.writeToFileStream()

        return fileId
    }

    private async createFileRecord(): Promise<number> {
        return await fileRepo.createFileRecord({
            name: this.file.originalname,
            size: this.file.size,
            date: moment().format("YYYY-MM-DD")
        })
    }

    private writeToFileStream() {
        const fileStream = fs.createWriteStream(`${__dirname}/../img/${this.file.originalname}`)

        fileStream.write(this.file.buffer, 'base64')

        fileStream.on('error', () => {
            console.log('error occurred while writing to stream')
        })
        
        fileStream.end()
    }
}

export default FileUploadService