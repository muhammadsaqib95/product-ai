import { tools, executeTool } from "../tools.js";

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const MODEL = "llama3.2:latest";

const ollamaTools = tools.map((t) => ({
    type: "function",
    function: {
        name: t.name,
        description: t.description,
        parameters: t.input_schema,
    },
}));

export async function askAI(query) {
    const messages = [
        {
            role: "system",
            content: "You are a helpful shopping assistant. Use the available tools to answer questions about products, users, and orders.",
        },
        { role: "user", content: query },
    ];

    while (true) {
        const res = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: MODEL, messages, tools: ollamaTools, stream: false }),
        });

        if (!res.ok) throw new Error(`Ollama error: ${res.status} ${await res.text()}`);

        const { message } = await res.json();
        messages.push(message);

        if (!message.tool_calls?.length) return message.content;

        for (const call of message.tool_calls) {
            const { name, arguments: args } = call.function;
            const result = await executeTool(name, args);
            messages.push({ role: "tool", content: result });
        }
    }
}
