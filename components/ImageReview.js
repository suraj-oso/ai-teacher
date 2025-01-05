export default function ImageReview({ image }) {
    return (
      <div style={{ marginBottom: '2rem', border: '2px solid white', padding: '1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Image Review</h2>
        <img src={image} alt="Uploaded or captured image" style={{ maxWidth: '100%', border: '2px solid white' }} />
      </div>
    )
  }
  
  