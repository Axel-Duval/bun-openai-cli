import { openai } from '../../utils/openai';

const _deleteFile = async (fileId: string) => openai.files.del(fileId);

const _deleteFileExe = async (fileId: string) => {
    try {
        const file = await _deleteFile(fileId);
        console.log(`Deleting file ${fileId}\n-------------------------------------------`);
        console.log(file);
    } catch (error) {
        console.log((error as any).message);
    }
};

const deleteFile = (execute: boolean, fileId: string) => {
    return execute ? _deleteFileExe(fileId) : _deleteFile(fileId);
};

export { deleteFile };
