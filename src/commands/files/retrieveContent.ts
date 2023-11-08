import { openai } from '../../utils/openai';

const _retrieveFileContent = (fileId: string) => openai.files.retrieveContent(fileId);

const _retrieveFileContentExe = async (filePath: string) => {
    try {
        const content = await _retrieveFileContent(filePath);
        console.log(content);
    } catch (error) {
        console.log((error as any).message);
    }
};

const retrieveFileContent = (execute: boolean, fileId: string) => {
    return execute ? _retrieveFileContentExe(fileId) : _retrieveFileContent(fileId);
};

export { retrieveFileContent };
