import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",});


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Helper function to handle error responses
function handleError(res, error) {
  // console.error(error);
  return res.status(500).json({ error: "Internal Server Error" });
}

// Helper function to handle chat completion responses
function handleChatCompletionResponse(res, chatCompletion) {
  return res.status(200).json(chatCompletion.choices[0]?.message?.content || "");
}

// controller to handle the groq api
async function handleGroqAPI(req, res) {
  try { 
    const { input } = req.body;

    // Input validation
    if (!input || input.trim() === "") {
      return res.status(400).json({ error: "Invalid input | Please enter valid input!" });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    // Handle Groq API errors
    if (chatCompletion.error) {
      return handleError(res, chatCompletion.error);
    }

    return handleChatCompletionResponse(res, chatCompletion);
  } catch (error) {
    return handleError(res, error);
  }
}


function getResponse(req, res) {
  res.send("Hello from the server");
}

export {
    handleGroqAPI,
    getResponse,
}