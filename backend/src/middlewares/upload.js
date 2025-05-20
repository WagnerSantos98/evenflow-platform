const multer = require('multer');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).fields([
    { name: 'capa', maxCount: 1 },    // Campo para a imagem de capa
    { name: 'galeria', maxCount: 10 } // Campo para as imagens da galeria
]);

module.exports = { upload };