export default function Response({ response }) {
    if (!response) return null
  
    return (
      <div style={{ marginTop: '2rem', border: '2px solid white', padding: '1rem' }}>
        <h2 style={{ borderBottom: '2px solid white', paddingBottom: '0.5rem', marginBottom: '1rem' }}>ANSWER:</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
      </div>
    )
  }
  
  