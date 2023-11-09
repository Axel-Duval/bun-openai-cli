import chalk from 'chalk';
import { COLORS_FN } from '../../utils/colors';
import { timestamp } from '../../utils/dateFormatted';
import { OpenAI, openai } from '../../utils/openai';

const _listFineTuningJobEvents = async (fineTuningJobId: string) => {
    const events: OpenAI.FineTuning.Jobs.FineTuningJobEvent[] = [];
    let page = await openai.fineTuning.jobs.listEvents(fineTuningJobId);
    while (page.hasNextPage()) {
        events.push(...page.getPaginatedItems());
        page = await page.getNextPage();
    }
    return events.reverse();
};

const _listFineTuningJobEventsExe = async (fineTuningJobId: string) => {
    try {
        const events = await _listFineTuningJobEvents(fineTuningJobId);
        for (const event of events) {
            const loss = (event as any).data?.train_loss;
            const accuracy = (event as any).data?.train_mean_token_accuracy;
            const color = COLORS_FN[event.level];
            console.log(
                color(
                    `[${timestamp(event.created_at)}] ${event.message} ${
                        accuracy ? `mean_token_accuracy=${accuracy}` : ''
                    } ${loss ? `exact_loss=${loss}` : ''} `
                )
            );
        }
    } catch (error) {
        console.log((error as any).message);
    }
};

const listFineTuningJobEvents = (execute: boolean, fineTuningJobId: string) => {
    return execute
        ? _listFineTuningJobEventsExe(fineTuningJobId)
        : _listFineTuningJobEvents(fineTuningJobId);
};

export { listFineTuningJobEvents };
