export default function Response({ response }) {
  if (!response) return null

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-black"></div>
      <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 border-black">ANSWER:</h2>
        <p className="whitespace-pre-wrap text-sm sm:text-base">{response}</p>
      </div>
    </div>
  )
}

