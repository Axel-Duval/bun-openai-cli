import { openai } from '../../utils/openai';

const _retrieveModel = (modelId: string) => openai.models.retrieve(modelId);

const _retrieveModelExe = async (modelId: string) => {
    try {
        const model = await _retrieveModel(modelId);
        console.log(model);
    } catch (error) {
        console.log((error as any).message);
    }
};

const retrieveModel = (execute: boolean, modelId: string) => {
    return execute ? _retrieveModelExe(modelId) : _retrieveModel(modelId);
};

export { retrieveModel };
