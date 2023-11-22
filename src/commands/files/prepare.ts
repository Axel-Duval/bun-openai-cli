import fs from 'fs';

const cleanInput = (input: string) => input.replaceAll('"', '').trim();

const cleanAndFormatOutput = (output: string) => {
    const cleaned = output.replaceAll('""', '"').replaceAll('"{', '{').replaceAll('}"', '}');
    return JSON.parse(cleaned);
};

const toRow = (system: string, user: string, assistant: string) => {
    const row = {
        messages: [
            { role: 'system', content: system },
            { role: 'user', content: cleanInput(user) },
            { role: 'assistant', content: JSON.stringify(cleanAndFormatOutput(assistant)) },
        ],
    };
    return JSON.stringify(row);
};

const _prepareFile = async (inputFilePath: string, outputFilePath: string) => {
    const system = 'Respond as an Explore AI robot as defined before.';
    const content = fs.readFileSync(inputFilePath, { encoding: 'utf8' });
    const prepared: string[] = [];
    content.split(/\r?\n/).forEach((line, i) => {
        if (i > 0) {
            const [input, output] = line.split('\t');
            try {
                prepared.push(toRow(system, input, output));
                console.log(`🟢 ${i}: ${input}`);
            } catch (error) {
                console.log(`🔴 ${i}: ${input}`);
            }
        }
    });
    fs.writeFileSync(outputFilePath, prepared.join('\n'), { encoding: 'utf8' });
    return;
};

const _prepareFileExe = (inputFilePath: string, outputFilePath: string) => {
    try {
        _prepareFile(inputFilePath, outputFilePath);
    } catch (error) {
        console.log((error as any).message);
    }
};

const prepareFile = (execute: boolean, inputFilePath: string, outputFilePath: string) => {
    return execute
        ? _prepareFileExe(inputFilePath, outputFilePath)
        : _prepareFile(inputFilePath, outputFilePath);
};

export { prepareFile };
