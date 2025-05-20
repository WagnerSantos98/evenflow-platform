const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Configuração do cliente R2
const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CF_ACCESS_KEY_ID,
        secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
    },
});

// Upload da imagem para R2
const uploadToR2 = async(file, key, acl, metadata = {}) => {
    const params = {
        Bucket: process.env.CF_BUCKET_NAME,
        Key: key,
        Body: file.data,
        ACL: acl,
        ContentType: file.mimetype,
        Metadata: metadata
    };

    await s3.send(new PutObjectCommand(params))
    // Retorna a URL pública da imagem
    return `https://${process.env.CF_BUCKET_NAME}.r2.cloudflarestorage.com/${key}`;
};

// Deletar pasta do usuário no R2
const deletarPastaUsuario = async(usuarioId) => {
    try {
        // Listar todos os objetos na pasta do usuário
        const listParams = {
            Bucket: process.env.CF_BUCKET_NAME,
            Prefix: `usuarios/${usuarioId}/`
        };

        const objects = await s3.send(new ListObjectsV2Command(listParams));

        if (!objects.Contents || objects.Contents.length === 0) {
            return; // Caso a pasta esteja vazia
        }

        // Preparar array de objetos para deletar
        const deleteParams = {
            Bucket: process.env.CF_BUCKET_NAME,
            Delete: {
                Objects: objects.Contents.map(obj => ({ Key: obj.Key }))
            }
        };

        // Deletar todos os objetos
        await s3.send(new DeleteObjectsCommand(deleteParams));
    } catch(error) {
        console.error('Erro ao deletar pasta do usuário no R2:', error);
        throw error;
    }
};

//Excluir imagem do usuário
const excluirImagem = async (urlCompleta) => {
    try {
        const url = new URL(urlCompleta);
        const key = decodeURIComponent(url.pathname.substring(1)); // remove a barra inicial

        const params = {
            Bucket: process.env.CF_BUCKET_NAME,
            Key: key
        };

        await s3.send(new DeleteObjectCommand(params));
    } catch (error) {
        console.error('Erro ao excluir imagem do R2:', error);
    }
};

// Deletar pasta do evento no R2
const deletarPastaEvento = async(eventoId) => {
    try {
        // Listar todos os objetos na pasta do usuário
        const listParams = {
            Bucket: process.env.CF_BUCKET_NAME,
            Prefix: `eventos/${eventoId}/`
        };

        const objects = await s3.send(new ListObjectsV2Command(listParams));

        if (!objects.Contents || objects.Contents.length === 0) {
            return; // Caso a pasta esteja vazia
        }

        // Preparar array de objetos para deletar
        const deleteParams = {
            Bucket: process.env.CF_BUCKET_NAME,
            Delete: {
                Objects: objects.Contents.map(obj => ({ Key: obj.Key }))
            }
        };

        // Deletar todos os objetos
        await s3.send(new DeleteObjectsCommand(deleteParams));
    } catch(error) {
        console.error('Erro ao deletar pasta do evento no R2:', error);
        throw error;
    }
};

module.exports = {
    // Upload de imagem de perfil do usuário
    uploadAvatarUsuario: async(usuarioId, file) => {
        const extensaoArquivo = file.name.split('.').pop().toLowerCase();
        const nomeArquivo = `avatar.${extensaoArquivo}`
        const key = `usuarios/${usuarioId}/${nomeArquivo}`;

        return uploadToR2(file, key, 'private', {
            uploadedBy: usuarioId.toString(),
            originalName: file.name
        });
    },

    // Upload de imagem para evento
    uploadImagemEvento: async(eventoId, file, isGaleria = false) => {
        const extensaoArquivo = file.name.split('.').pop().toLowerCase();
        const nomeArquivo = uuidv4() + '.' + extensaoArquivo;
        const key = isGaleria
            ? `eventos/${eventoId}/galeria/${nomeArquivo}`
            : `eventos/${eventoId}/capa.${extensaoArquivo}`;

        return uploadToR2(file, key, 'public-read', {
            eventoId: eventoId.toString(),
            originalName: file.name
        });
    },

    // Gera URL assinada para imagens privadas
    getUrlAssinada: async(key) => {
        const command = new GetObjectCommand({
            Bucket: process.env.CF_BUCKET_NAME,
            Key: key
        });
        
        return getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hora de validade
    },

    deletarPastaUsuario,
    deletarPastaEvento,
    excluirImagem
};