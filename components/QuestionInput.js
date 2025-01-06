export default function QuestionInput({ question, setQuestion }) {
  return (
    <div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question here..."
        className="w-full min-h-[120px] p-3 sm:p-4 bg-[#FFFBE6] border-2 border-black font-mono resize-y text-sm sm:text-base"
      />
    </div>
  )
}

