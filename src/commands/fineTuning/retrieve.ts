import { openai } from '../../utils/openai';

const _retrieveFineTuningJob = async (fineTuningJobId: string) => {
    return openai.fineTuning.jobs.retrieve(fineTuningJobId);
};

const _retrieveFineTuningJobExe = async (fineTuningJobId: string) => {
    try {
        const job = await _retrieveFineTuningJob(fineTuningJobId);
        console.log(job);
    } catch (error) {
        console.log((error as any).message);
    }
};

const retrieveFineTuningJob = (execute: boolean, fineTuningJobId: string) => {
    return execute
        ? _retrieveFineTuningJobExe(fineTuningJobId)
        : _retrieveFineTuningJob(fineTuningJobId);
};

export { retrieveFineTuningJob };
