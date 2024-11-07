const express = require('express');
const multer = require('multer');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// create a temp directory to store uploaded files
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Serve a simple HTML form for testing (upload HTML)
app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="htmlFile" accept=".html" />
      <button type="submit">Upload HTML</button>
    </form>
  `);
});

// POST endpoint to handle file upload
app.post('/upload', upload.single('htmlFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // save the uploaded HTML file to the temp directory
    const filePath = path.join(tempDir, `uploaded-${Date.now()}.html`);
    fs.writeFileSync(filePath, req.file.buffer);
    console.log('File uploaded successfully:', filePath);
    res.status(200).send(`File uploaded successfully. You can now convert it to PDF by visiting /convert.`);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

// POST endpoint to convert the uploaded HTML to PDF
app.post('/convert', async (req, res) => {
  try {
    // Find the most recent uploaded HTML file (for simplicity)
    const uploadedFiles = fs.readdirSync(tempDir).filter(file => file.endsWith('.html'));
    if (uploadedFiles.length === 0) {
      return res.status(400).send('No uploaded HTML file found to convert.');
    }

    const htmlFilePath = path.join(tempDir, uploadedFiles[uploadedFiles.length - 1]);
    const pdfFilePath = path.join(tempDir, `converted-${Date.now()}.pdf`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

    // set the content of the page to the uploaded HTML
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // generate the PDF
    await page.pdf({ path: pdfFilePath, format: 'A4' });
    await browser.close();

    console.log('PDF generated successfully:', pdfFilePath);
    res.status(200).send(`File converted successfully. You can now download the PDF by visiting /download.`);
  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).send('Error converting HTML to PDF.');
  }
});

// Serve the converted PDF for download
app.get('/download', async (req, res) => {
    try {
      // Find the most recent converted PDF file
      const pdfFiles = fs.readdirSync(tempDir).filter(file => file.endsWith('.pdf'));
      if (pdfFiles.length === 0) {
        return res.status(400).send('No converted PDF file found to download.');
      }
  
      const pdfFilePath = path.join(tempDir, pdfFiles[pdfFiles.length - 1]);
  
      // Send the PDF file for download
      res.download(pdfFilePath, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading the PDF file.');
        } else {
          console.log('PDF downloaded successfully:', pdfFilePath);
        }
      });
    } catch (error) {
      console.error('Error during download:', error);
      res.status(500).send('Error during download.');
    }
  });
  

process.on('SIGINT', () => {
    console.log('Server shutting down...');
    const files = fs.readdirSync(tempDir);
    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      fs.unlinkSync(filePath);
    });
  
    fs.rmdirSync(tempDir);
    console.log('Temp directory deleted.');

    process.exit(0);
});
  

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
