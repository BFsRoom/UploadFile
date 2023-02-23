import express from 'express'
import cors from 'cors'
import multer from 'multer'

import fileController from './controllers/FileController'

const app = express()
const upload = multer()

app.use(cors())

app.post('/uploadFile', upload.single('file'), fileController.uploadFile)

app.get('/fetchAllData', upload.none(), fileController.getFiles)

app.delete('/deleteFile/:id', upload.none(), fileController.deleteFile)

app.listen(5000, () => console.log('server is running'))