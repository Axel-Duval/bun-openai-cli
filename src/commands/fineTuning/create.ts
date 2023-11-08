import { OpenAI, openai } from '../../utils/openai';

const _createFineTuningJob = async (params: OpenAI.FineTuning.Jobs.JobCreateParams) => {
    return openai.fineTuning.jobs.create(params);
};

const _createFineTuningJobExe = async (params: OpenAI.FineTuning.Jobs.JobCreateParams) => {
    try {
        const job = await _createFineTuningJob(params);
        console.log(job);
    } catch (error) {
        console.log((error as any).message);
    }
};

const createFineTuningJob = (execute: boolean, params: OpenAI.FineTuning.Jobs.JobCreateParams) => {
    return execute ? _createFineTuningJobExe(params) : _createFineTuningJob(params);
};

export { createFineTuningJob };
