import connection from '../db'
import UploadedFile from '../models/UploadedFile'

let instance: null | FileRepo = null

class FileRepo {
    static getInstance(): FileRepo {
        if (instance === null) {
            instance = new FileRepo()
            return instance
        }

        return instance
    }

    async createFileRecord(file: UploadedFile): Promise<number> {
        try {
            return await new Promise((resolve, reject) => {
                connection.query(
                    "INSERT INTO uploaded_file (name,size,date) VALUES (?, ?, ?)",
                    [
                        file.name,
                        file.size,
                        file.date
                    ],
                    (error, results) => {
                        if (error) {
                            console.log(error)
                            reject(0)
                        }
                        resolve(results.insertId)
                    }
                )
            })
        } catch (error) {
            console.log(error)
            return 0
        }
    }
}

export default FileRepo.getInstance()