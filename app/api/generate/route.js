import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiKey) {
    console.error("API key is not configured");
    return new Response(JSON.stringify({ error: 'API key is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Initialize the Gemini API client
  const genAI = new GoogleGenerativeAI(apiKey);

  const { image, question, extractedText } = await req.json();

  try {
    // Initialize the model with the updated model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a parts array with the image, extracted text, and question
    const parts = [
      {
        text: `Image content: ${extractedText}\n\nQuestion: ${question}`
      }
    ];

    // If there's an image, add it to the parts
    if (image) {
      const imageData = image.split(',')[1]; // Remove the data URL prefix
      parts.unshift({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData
        }
      });
    }

    // Generate content
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate response', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

