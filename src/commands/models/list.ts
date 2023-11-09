import chalk from 'chalk';
import OpenAI from 'openai/index.mjs';
import { timestamp } from '../../utils/dateFormatted';
import { openai } from '../../utils/openai';

const _listModels = async () => {
    const models: OpenAI.Models.Model[] = [];
    let page = await openai.models.list();
    models.push(...page.getPaginatedItems());
    while (page.hasNextPage()) {
        page = await page.getNextPage();
        models.push(...page.getPaginatedItems());
    }
    return models;
};

const _listModelsExe = async () => {
    try {
        const models = await _listModels();
        console.log(`Models count: ${chalk.bold(models.length)}\n-----------------`);
        for (const model of models) {
            console.log(
                `{ id: ${chalk.bold(model.id)}, ` +
                    `owner: ${model.owned_by}, ` +
                    `createdAt: ${timestamp(model.created)} }`
            );
        }
    } catch (error) {
        console.log((error as any).message);
    }
};

const listModels = (execute: boolean) => {
    return execute ? _listModelsExe() : _listModels();
};

export { listModels };
