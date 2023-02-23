import express from 'express';
import { validateFileSize } from '../service/fileValidatorService';
import FileUploadService from '../service/fileUploadService';
import fileRetrievalService from '../service/FileRetrievalService';

let instance: null | FileController = null

class FileController {
    static getInstance(): FileController {
        if (instance === null) {
            instance = new FileController()
            return instance
        }

        return instance
    }

    async uploadFile(request: express.Request, response: express.Response) {
        try {
            const file: any = request.file
            let fileSize = request.file ? request.file.size : 10000000;

            const validFileSize = await validateFileSize(fileSize)

            if (!validFileSize.isValid) {
                return response.status(400).json({
                    success: false,
                    message: 'Invalid Request'
                })
            }

            const fileUploadService = new FileUploadService(file)
            const fileId = await fileUploadService.createFileUpload()

            if (fileId === 0) {
                return response.status(500).json({
                    success: false,
                    message: 'Error uploading file'
                })
            }

            response.json({
                success: true,
                fileId
            })
        } catch (error) {
            response.json({
                success: false,
                message: 'Error uploading file'
            })
        }
    }

    async getFiles(request: express.Request, response: express.Response) {
        try {
            const files = await fileRetrievalService.findFiles()

            response.json({
                success: true,
                files
            })
        } catch (error) {
            response.json({
                success: false,
                message: 'Error retrieving files'
            })
        }
    }

    async deleteFile(request: express.Request, response: express.Response) {
        const fileId = parseInt(request.params.id)

        try {
            const fileDetails = await fileRetrievalService.deleteFile(fileId)

            if (fileDetails === false) {
                return response.status(404).json({
                    success: false,
                    message: 'File not found'
                })
            } else {
                return response.status(200).json({
                    success: true,
                    message: 'File delete'
                })
            }
        } catch (error) {
            console.log({error})
            response.json({
                success: false,
                message: 'Error retrieving files'
            })
        }
    }

}

export default FileController.getInstance()