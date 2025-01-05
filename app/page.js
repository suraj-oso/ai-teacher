'use client'

import { useState, useRef, useCallback } from 'react'
import ImageUpload from '../components/ImageUpload'
import QuestionInput from '../components/QuestionInput'
import Response from '../components/Response'
import CameraCapture from '../components/CameraCapture'
import ImageReview from '../components/ImageReview'
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
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid white', paddingBottom: '1rem', marginBottom: '2rem' }}>AI TEACHER ASSISTANT</h1>
      <ImageUpload setImage={handleImageChange} />
      <CameraCapture setImage={handleImageChange} />
      {image && <ImageReview image={image} />}
      <QuestionInput question={question} setQuestion={setQuestion} />
      <button 
        onClick={handleSubmit} 
        disabled={!image || !question || loading}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          padding: '1rem 2rem',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '1rem',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'THINKING...' : 'GET ANSWER'}
      </button>
      {error && (
        <div style={{ marginTop: '1rem', color: 'red', border: '2px solid white', padding: '1rem' }}>
          Error: {error}
        </div>
      )}
      {extractedText && (
        <div style={{ marginTop: '1rem', border: '2px solid white', padding: '1rem' }}>
          <h3>Extracted Text:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{extractedText}</p>
        </div>
      )}
      <Response response={response} />
    </main>
  )
}

