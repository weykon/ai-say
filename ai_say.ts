import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";
import env from 'dotenv';
env.config();

const OPENAI_CHATGPT_KEY = process.env.OPENAI_CHATGPT_KEY;
const ORGANIZATION = process.env.ORGANIZATION;

const configuration = new Configuration({
    organization: ORGANIZATION,
    apiKey: OPENAI_CHATGPT_KEY,
});

export const myopenai = new OpenAIApi(configuration);

export class OpenAIAPI {
    api: OpenAIApi
    config: Configuration
    constructor() {
        this.config = new Configuration({
            organization: ORGANIZATION,
            apiKey: OPENAI_CHATGPT_KEY,
        });
        this.api = new OpenAIApi(configuration);
    }
}

async function chat(prompt: string, model: string, length: number) {
    const response = await myopenai.createChatCompletion({
        messages: [{ role: 'user', content: prompt }],
        model: model,
    });
    return response
}

async function one_ask(option: CreateCompletionRequest) {
    const response: any = await myopenai.createCompletion({
        ...option
    });
    return response.data?.choices?.[0].text.trim();
}

async function createEmbedding(prompt: string, embModel: string = 'text-embedding-ada-002') {
    const response = await myopenai.createEmbedding({
        model: embModel,
        input: [prompt],
    });
    return response
}