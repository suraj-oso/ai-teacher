export default function QuestionInput({ question, setQuestion }) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid white',
            fontSize: '1rem',
            fontFamily: 'monospace',
            resize: 'vertical',
            minHeight: '100px'
          }}
        />
      </div>
    )
  }
  
  