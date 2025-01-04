'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { askQuestion } from '../utils/geminiApi'
import WebcamCapture from './WebcamCapture'
import StudyQuestion from './StudyQuestion'

const studyQuestions = [
  "What is the capital of France?",
  "Explain the process of photosynthesis.",
  "What is the formula for the area of a circle?",
  "Describe the water cycle.",
]

export default function AIVisualTeacher() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isCapturing, setIsCapturing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const webcamRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion(studyQuestions[Math.floor(Math.random() * studyQuestions.length)])
    }, 10000) // Change question every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      console.log('Image captured:', imageSrc)
      return imageSrc
    }
    return null
  }

  const handleAskQuestion = async () => {
    setIsCapturing(true)
    setAnswer('')
    const imageSrc = captureImage()
    try {
      const response = await askQuestion(question, imageSrc)
      setAnswer(response)
    } catch (error) {
      console.error('Error in handleAskQuestion:', error)
      setAnswer(`An error occurred while processing your question. Please try again. Error details: ${error.message}`)
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <WebcamCapture webcamRef={webcamRef} />
      <StudyQuestion question={currentQuestion} />
      <Card className="w-full max-w-2xl mx-auto bg-white text-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Ask AI Teacher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-gray-100 text-black font-bold p-2 border-2 border-black"
          />
          <Button 
            onClick={handleAskQuestion}
            disabled={isCapturing || !question}
            className="w-full bg-black text-white font-bold p-2 hover:bg-gray-800"
          >
            {isCapturing ? 'Processing...' : 'Ask Question'}
          </Button>
        </CardContent>
      </Card>
      {answer && (
        <Card className="w-full max-w-2xl mx-auto bg-white text-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Answer:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg whitespace-pre-wrap">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

