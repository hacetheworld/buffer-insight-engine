require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const BUFFER_ENDPOINT =
  "https://api.buffer.com/graphql";

async function getBufferPosts() {
  const query = `
  query {
    posts(
      first: 10
      input: {
        organizationId: "${process.env.BUFFER_ORGANIZATION_ID}"
        filter: {
          status: [sent]
        }
      }
    ) {
      edges {
        node {
          id
          text
          dueAt
          metrics {
            type
            name
            value
            unit
          }
          metricsUpdatedAt
        }
      }
    }
  }
  `;

  const response = await fetch(BUFFER_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query
    })
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }

  return data.data.posts.edges.map(
    (item) => item.node
  );
}

function buildPrompt(posts) {
  return `
You are a senior social media strategist.

Analyze the following Buffer social media data.

Your task:

1. Find highest performing content themes
2. Find lowest performing content themes
3. Find best posting times
4. Identify content gaps
5. Generate 5 future content ideas
6. Provide evidence for every recommendation
7. Give confidence levels

Return ONLY valid JSON.

JSON FORMAT:

{
  "summary":"",
  "bestTheme":"",
  "bestPostingTime":"",
  "confidence":"",
  "recommendations":[
    {
      "title":"",
      "reason":""
    }
  ],
  "evidence":[
    ""
  ],
  "missedOpportunities":[
    ""
  ]
}

POST DATA:

${JSON.stringify(posts, null, 2)}
`;
}

app.post("/analyze", async (req, res) => {
  try {
    const posts = await getBufferPosts();
    console.log("Fetched posts:", posts.length);

    if (!posts.length) {
      return res.json({
        summary: "No posts found.",
        bestTheme: "",
        bestPostingTime: "",
        confidence: "Low",
        recommendations: [],
        evidence: [],
        missedOpportunities: []
      });
    }

     const prompt = buildPrompt(posts);


const completion =
  await client.chat.completions.create({
    model: "deepseek/deepseek-chat-v3-0324",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });


    const response =
  completion.choices[0].message.content;

   let cleaned = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const firstBrace = cleaned.indexOf("{");
const lastBrace = cleaned.lastIndexOf("}");

cleaned = cleaned.slice(
  firstBrace,
  lastBrace + 1
);

const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});