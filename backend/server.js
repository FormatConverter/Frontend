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

// serve a simple HTML form for testing (upload HTML)
app.get('/', (req, res) => {
  res.send(`
    <form action="/upload-and-convert" method="post" enctype="multipart/form-data">
      <input type="file" name="htmlFile" accept=".html" />
      <button type="submit">Upload and Convert to PDF</button>
    </form>
  `);
});

// POST endpoint to handle file upload and conversion
app.post('/upload-and-convert', upload.single('htmlFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // save the uploaded HTML file to the temp directory
    const filePath = path.join(tempDir, `uploaded-${Date.now()}.html`);
    fs.writeFileSync(filePath, req.file.buffer);
    console.log('File uploaded successfully:', filePath);

    // Convert the uploaded HTML file to PDF
    const pdfFilePath = path.join(tempDir, `converted-${Date.now()}.pdf`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlContent = fs.readFileSync(filePath, 'utf-8');

    // set the content of the page to the uploaded HTML
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // generate the PDF
    await page.pdf({ path: pdfFilePath, format: 'A4' });
    await browser.close();

    console.log('PDF generated successfully:', pdfFilePath);

    // send the converted PDF file for download
    res.status(200).send(`
      File uploaded and converted to PDF successfully. 
      You can download the PDF by visiting <a href="/download?file=${path.basename(pdfFilePath)}">here</a>.
    `);
  } catch (error) {
    console.error('Error uploading and converting file:', error);
    res.status(500).send('Error uploading or converting file.');
  }
});

// Serve the converted PDF for download
app.get('/download', (req, res) => {
  const pdfFileName = req.query.file;
  if (!pdfFileName) {
    return res.status(400).send('No PDF file specified.');
  }

  const pdfFilePath = path.join(tempDir, pdfFileName);
  if (!fs.existsSync(pdfFilePath)) {
    return res.status(404).send('PDF file not found.');
  }

  // send the PDF file for download
  res.download(pdfFilePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading the PDF file.');
    } else {
      console.log('PDF downloaded successfully:', pdfFilePath);
    }
  });
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
