import { openai } from '../../utils/openai';

const _cancelFineTuningJob = async (fineTuningJobId: string) => {
    return openai.fineTuning.jobs.cancel(fineTuningJobId);
};

const _cancelFineTuningJobExe = async (fineTuningJobId: string) => {
    try {
        const job = await _cancelFineTuningJob(fineTuningJobId);
        console.log(
            `Cancelling fine tuning job ${fineTuningJobId}\n---------------------------------------------------------`
        );
        console.log(job);
    } catch (error) {
        console.log((error as any).message);
    }
};

const cancelFineTuningJob = (execute: boolean, fineTuningJobId: string) => {
    return execute
        ? _cancelFineTuningJobExe(fineTuningJobId)
        : _cancelFineTuningJob(fineTuningJobId);
};

export { cancelFineTuningJob };
