import { openai } from '../../utils/openai';

const _retrieveFile = (fileId: string) => openai.files.retrieve(fileId);

const _retrieveFileExe = async (fileId: string) => {
    try {
        const file = await _retrieveFile(fileId);
        console.log(file);
    } catch (error) {
        console.log((error as any).message);
    }
};

const retrieveFile = (execute: boolean, fileId: string) => {
    return execute ? _retrieveFileExe(fileId) : _retrieveFile(fileId);
};

export { retrieveFile };
