import { openai } from '../../utils/openai';

const _deleteModel = async (modelId: string) => openai.models.del(modelId);

const _deleteModelExe = async (modelId: string) => {
    try {
        const model = await _deleteModel(modelId);
        console.log(`Deleting model ${modelId}\n-------------------------------------------`);
        console.log(model);
    } catch (error) {
        console.log((error as any).message);
    }
};

const deleteModel = (execute: boolean, modelId: string) => {
    return execute ? _deleteModelExe(modelId) : _deleteModel(modelId);
};

export { deleteModel };
