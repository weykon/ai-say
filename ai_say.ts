import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";

export const aisay = new OpenAIApi();
type Option = {
    organization: string,
    apiKey: string,
}

export class OpenAIAPI {
    api: OpenAIApi
    #config: Configuration
    config(option: Option) {
        const { organization, apiKey } = option;
        this.#config = new Configuration({ organization, apiKey });
        this.api = new OpenAIApi(this.#config);
    }
}

export async function chat(prompt: string, model: string, length: number) {
    const response = await aisay.createChatCompletion({
        messages: [{ role: 'user', content: prompt }],
        model: model,
    });
    return response
}

export async function one_ask(option: CreateCompletionRequest) {
    const response: any = await aisay.createCompletion({
        ...option
    });
    return response.data?.choices?.[0].text.trim();
}

export async function createEmbedding(prompt: string, embModel: string = 'text-embedding-ada-002') {
    const response = await aisay.createEmbedding({
        model: embModel,
        input: [prompt],
    });
    return response
}