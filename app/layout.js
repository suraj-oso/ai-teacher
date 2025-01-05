export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AI Teacher Assistant</title>
        <script src="https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js"></script>
      </head>
      <body style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        fontFamily: 'monospace',
        margin: 0,
        padding: 0
      }}>
        {children}
      </body>
    </html>
  )
}

