import { OpenAI, openai } from '../../utils/openai';

const _createCompletion = async (body: OpenAI.ChatCompletionCreateParamsNonStreaming) => {
    return openai.chat.completions.create(body);
};

const _createCompletionExe = async (body: OpenAI.ChatCompletionCreateParamsNonStreaming) => {
    try {
        const completion = await _createCompletion(body);
        console.log(completion);
    } catch (error) {
        console.log((error as any).message);
    }
};

const createCompletion = (
    execute: boolean,
    body: OpenAI.ChatCompletionCreateParamsNonStreaming
) => {
    return execute ? _createCompletionExe(body) : _createCompletion(body);
};

export { createCompletion };
