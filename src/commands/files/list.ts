import chalk from 'chalk';
import OpenAI from 'openai/index.mjs';
import { timestamp } from '../../utils/dateFormatted';
import { openai } from '../../utils/openai';

const _listFiles = async () => {
    const files: OpenAI.Files.FileObject[] = [];
    let page = await openai.files.list();
    files.push(...page.getPaginatedItems());
    while (page.hasNextPage()) {
        page = await page.getNextPage();
        files.push(...page.getPaginatedItems());
    }
    return files.reverse();
};

const _listFilesExe = async () => {
    try {
        const files = await _listFiles();
        console.log(`Files count: ${chalk.bold(files.length)}\n---------------`);
        for (const file of files) {
            console.log(
                `{ id: ${file.id}, ` +
                    `name: ${file.filename}, ` +
                    `createdAt: ${timestamp(file.created_at)}, ` +
                    `finished: ${file.status} }`
            );
        }
    } catch (error) {
        console.log((error as any).message);
    }
};

const listFiles = (execute: boolean) => {
    return execute ? _listFilesExe() : _listFiles();
};

export { listFiles };
