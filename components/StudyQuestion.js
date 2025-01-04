import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function StudyQuestion({ question }) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white text-black">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Current Study Question:</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{question}</p>
      </CardContent>
    </Card>
  )
}

