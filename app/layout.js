import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AI Teacher Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

