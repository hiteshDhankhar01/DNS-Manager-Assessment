// routes/domainRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createDomain, getAllDomains, getDomainById, updateDomain, deleteDomain, findDomains } = require('../Controllers/DomainController');
const { uploadFileData } = require('../Controllers/UploadFile');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('file'), uploadFileData);
router.post('/create', createDomain);
router.get('/get-all-domains', getAllDomains);
router.get('/get-domain/:id', getDomainById);
router.put('/update-domain/:id', updateDomain);
router.delete('/delete/:id', deleteDomain);
router.get('/find', findDomains);

module.exports = router;
