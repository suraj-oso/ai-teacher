import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI = null

try {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  if (!apiKey) {
    console.error('API key is not set. Please check your configuration.')
  } else {
    genAI = new GoogleGenerativeAI(apiKey)
    console.log('Gemini API initialized successfully')
  }
} catch (error) {
  console.error('Error initializing Gemini API:', error)
  console.error('Error details:', error.message)
}

export async function askQuestion(question, imageSrc) {
  if (!genAI) {
    console.error('Gemini API is not initialized')
    return 'API is not initialized. Please check your configuration.'
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `You are an AI teacher. Answer the following question based on your knowledge: ${question}`

    let result
    if (imageSrc) {
      console.log('Image processing is currently not supported. Proceeding with text-only query.')
    }
    result = await model.generateContent(prompt)

    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error asking question:', error)
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
    }
    return `Sorry, I encountered an error while processing your question. Error details: ${error.message}`
  }
}

