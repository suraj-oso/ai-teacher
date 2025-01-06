import { useState, useRef } from 'react'

export default function ImageUpload({ setImage }) {
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="image-upload"
        ref={fileInputRef}
      />
      <label 
        htmlFor="image-upload"
        className="block w-full relative group cursor-pointer"
      >
        <div className="absolute -inset-1 bg-black transition-all group-hover:-inset-2"></div>
        <span className="relative block bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black text-center font-bold text-sm sm:text-base">
          UPLOAD PROBLEM IMAGE
        </span>
      </label>
      {preview && (
        <div className="mt-4 relative">
          <div className="absolute -inset-1 bg-black"></div>
          <div className="relative border-2 border-black overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  )
}

