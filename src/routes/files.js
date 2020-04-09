const express = require('express');
const { getFile, upload, unlinkFile } = require('../middleware/files');
const {
  createFile, listFiles, findFileById, downloadFileById, updateFileById, removeFile,
} = require('../constrollers/files');

const router = express.Router();

router.post('/file/upload', upload.single('file'), createFile);
router.get('/file/list', listFiles);
router.delete('/file/delete/:id', [getFile, unlinkFile, removeFile]);
router.get('/file/:id', [getFile, findFileById]);
router.get('/file/download/:id', [getFile, downloadFileById]);
router.put('/file/update/:id', [getFile, unlinkFile, upload.single('file'), updateFileById]);

module.exports = router;
