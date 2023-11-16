import fs from 'fs';

const extractMessagesFromSample = (filePath: string) => {
    const messages: any[] = [];
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    content.split(/\r?\n/).forEach(line => {
        messages.push(...JSON.parse(line).messages);
    });
    return messages;
};

export { extractMessagesFromSample };
