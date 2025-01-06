'use client'

import { useState, useRef, useCallback } from 'react'
import ImageUpload from '../components/ImageUpload'
import QuestionInput from '../components/QuestionInput'
import Response from '../components/Response'
import CameraCapture from '../components/CameraCapture'
import ImageReview from '../components/ImageReview'
import Footer from '../components/Footer'
import { createWorker } from 'tesseract.js';

export default function Home() {
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const workerRef = useRef(null)

  const initializeWorker = useCallback(async () => {
    if (!workerRef.current) {
      const worker = await createWorker('eng')
      workerRef.current = worker
    }
  }, [])

  const extractTextFromImage = useCallback(async (imageData) => {
    if (!workerRef.current) {
      await initializeWorker()
    }
    const { data: { text } } = await workerRef.current.recognize(imageData)
    setExtractedText(text)
    return text
  }, [initializeWorker])

  const handleImageChange = useCallback(async (newImage) => {
    setImage(newImage)
    if (newImage) {
      try {
        const text = await extractTextFromImage(newImage)
        console.log('Extracted text:', text)
      } catch (err) {
        console.error('Error extracting text:', err)
        setError('Failed to extract text from the image.')
      }
    }
  }, [extractTextFromImage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, question, extractedText }),
      })
      const data = await res.json()
      if (res.ok) {
        setResponse(data.response)
      } else {
        setError(data.error || 'An error occurred while generating the response.')
        console.error('API response error:', data)
      }
    } catch (err) {
      setError('An error occurred while communicating with the server.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBE6]">
      <main className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 max-w-[800px] mx-auto font-mono">
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute -inset-1 bg-black"></div>
          <h1 className="relative bg-[#FFFBE6] p-3 sm:p-4 text-xl sm:text-2xl md:text-4xl font-bold border-2 border-black text-center sm:text-left">
            AI TEACHER ASSISTANT
          </h1>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-black"></div>
            <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
              <ImageUpload setImage={handleImageChange} />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-black"></div>
            <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
              <CameraCapture setImage={handleImageChange} />
            </div>
          </div>

          {image && (
            <div className="relative">
              <div className="absolute -inset-1 bg-black"></div>
              <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
                <ImageReview image={image} />
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute -inset-1 bg-black"></div>
            <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
              <QuestionInput question={question} setQuestion={setQuestion} />
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={!image || !question || loading}
            className="relative w-full group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute -inset-1 bg-black transition-all group-hover:-inset-2"></div>
            <span className="relative block bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black text-lg sm:text-xl font-bold">
              {loading ? 'THINKING...' : 'GET ANSWER'}
            </span>
          </button>

          {error && (
            <div className="relative">
              <div className="absolute -inset-1 bg-red-600"></div>
              <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-red-600">
                <p className="text-red-600 font-bold text-sm sm:text-base">Error: {error}</p>
              </div>
            </div>
          )}

          {/* {extractedText && (
            <div className="relative">
              <div className="absolute -inset-1 bg-black"></div>
              <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Extracted Text:</h3>
                <p className="whitespace-pre-wrap text-sm sm:text-base">{extractedText}</p>
              </div>
            </div>
          )} */}

          <Response response={response} />
          <Footer />
        </div>
      </main>
    </div>
  )
}

