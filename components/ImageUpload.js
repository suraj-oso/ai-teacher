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

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div 
      style={{ marginBottom: '2rem' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
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
        style={{
          border: '2px solid white',
          padding: '1rem',
          display: 'inline-block',
          cursor: 'pointer'
        }}
      >
        UPLOAD PROBLEM IMAGE
      </label>
      <p style={{ marginTop: '0.5rem' }}>Or drag and drop an image here</p>
      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', border: '2px solid white' }} />
        </div>
      )}
    </div>
  )
}

