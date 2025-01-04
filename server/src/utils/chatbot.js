const { GoogleGenerativeAI } = require("@google/generative-ai");

const systemInstruction = "You are a highly intelligent engine designed to analyze CVs and job preferences based on user inputs. The input will be a dictionary consisting of various details about the user, such as their skills, experience, education, job titles, and preferred job characteristics (e.g., industry, location, work environment). Your task is to creatively analyze the input and recommend up to 8 job titles that best match the user's qualifications and preferences. The output should be a list of recommended jobs, including the job title, a relevance score, and a reason for each recommendation, and level of job like senior or junior or  Mid-Level. Ensure that the recommended jobs align with the given qualifications and preferences, drawing from a wide range of job roles, industries, and locations.";

const apiKey = process.env.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function run(content) {
    const chatSession = model.startChat({
        generationConfig,
        history: [{
            role: "user",
            parts: [{
                text: systemInstruction
            }]
        }, ]
    });

    const result = await chatSession.sendMessage(JSON.stringify(content));
    return JSON.parse(result.response.text());
}

module.exports = run;