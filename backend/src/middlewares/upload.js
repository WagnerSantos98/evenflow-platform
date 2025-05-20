const multer = require('multer');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
}

const uploadUsuario = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).single('foto'); //campo do upload de avatar/foto

const uploadEvento = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).fields([
    { name: 'capa', maxCount: 1 },
    { name: 'galeria', maxCount: 10 }
]);

module.exports = {
    uploadUsuario,
    uploadEvento
};
