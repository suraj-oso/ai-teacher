export default function ImageReview({ image }) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4">Image Review</h2>
      <div className="relative">
        <div className="absolute -inset-1 bg-black"></div>
        <div className="relative border-2 border-black overflow-hidden">
          <img src={image} alt="Uploaded or captured image" className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

