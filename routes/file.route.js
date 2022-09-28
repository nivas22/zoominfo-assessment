const express = require('express');
const {  createFileFolder, getFiles, moveFile }  = require('../controller/file.controller');
const validateRequest = require('../middleware/validate-request');
const multer  = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

router.post('/create', [upload.single('file'), validateRequest], createFileFolder);
router.get('/', [validateRequest], getFiles);
router.put('/move', [validateRequest], moveFile);

module.exports = router;
