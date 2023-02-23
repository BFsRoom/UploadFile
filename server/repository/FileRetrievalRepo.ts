import connection from '../db'
let instance: null|FileRetrievalRepo = null

class FileRetrievalRepo {
    static getInstance(): FileRetrievalRepo {
        if (instance === null) {
            instance = new FileRetrievalRepo()
        }
        return instance
    }

    async findFiles(): Promise<Array<{ fileId: number, fileName: string }>> {
        try {
            return await new Promise((resolve, reject) => {
                connection.query(
                    `SELECT * FROM uploaded_file`,
                    [],
                    (error, results) => {
                        if (error) {
                            console.log(error)
                            reject([])
                        }
                        resolve(results)
                    }
                )
            })
        } catch (error) {
            return []
        }
    }

    async deleteFileById(fileId: number): Promise<boolean> {
        try {
            return await new Promise((resolve, reject) => {
                connection.query(
                    `DELETE FROM uploaded_file WHERE id IN (${fileId})`,
                    (error) => {
                        if (error) {
                            reject(false)
                        }
                        resolve(true)
                    }
                )
            })
        } catch (error) {
            return false
        }
    }
}

export default FileRetrievalRepo.getInstance()