import fs from 'fs';
import { openai } from '../../utils/openai';

const _createFile = (filePath: string) => {
    return openai.files.create({ purpose: 'fine-tune', file: fs.createReadStream(filePath) });
};

const _createFileExe = async (filePath: string) => {
    try {
        const file = await _createFile(filePath);
        console.log(file);
    } catch (error) {
        console.log((error as any).message);
    }
};

const createFile = (execute: boolean, filePath: string) => {
    return execute ? _createFileExe(filePath) : _createFile(filePath);
};

export { createFile };
