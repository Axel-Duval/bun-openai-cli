import chalk from 'chalk';
import { secondsToDhms, timestamp } from '../../utils/dateFormatted';
import { OpenAI, openai } from '../../utils/openai';

const _listFineTuningJobs = async () => {
    const jobs: OpenAI.FineTuning.Jobs.FineTuningJob[] = [];
    let page = await openai.fineTuning.jobs.list();
    while (page.hasNextPage()) {
        jobs.push(...page.getPaginatedItems());
        page = await page.getNextPage();
    }
    return jobs.reverse();
};

const _listFineTuningJobsExe = async () => {
    try {
        const jobs = await _listFineTuningJobs();
        console.log(
            `Fine tuning jobs count: ${chalk.bold(jobs.length)}\n--------------------------`
        );
        for (const job of jobs) {
            console.log(
                `{ id: ${chalk.bold(job.id)}, ` +
                    `status: ${chalk.bold(job.status)}, ` +
                    `started: ${timestamp(job.created_at)}, ` +
                    `finished: ${job.finished_at ? timestamp(job.finished_at) : null}, ` +
                    `duration: ${
                        job.finished_at ? secondsToDhms(job.finished_at - job.created_at) : null
                    }, ` +
                    `tokens: ${job.trained_tokens} }`
            );
        }
    } catch (error) {
        console.log((error as any).message);
    }
};

const listFineTuningJobs = (execute: boolean) => {
    return execute ? _listFineTuningJobsExe() : _listFineTuningJobs();
};

export { listFineTuningJobs };
