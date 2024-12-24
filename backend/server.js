const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize app
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// File conversion endpoint
app.post('/convert', upload.single('file'), (req, res) => {
    const { format } = req.body;
    const uploadedFile = req.file;

    if (!uploadedFile || !format) {
        return res.status(400).json({ success: false, message: "Invalid file or format" });
    }

    // Simulate file conversion (mock process)
    const convertedFilePath = path.join(__dirname, 'converted', `${uploadedFile.filename}.${format}`);
    fs.renameSync(uploadedFile.path, convertedFilePath);

    res.json({
        success: true,
        downloadUrl: `/converted/${uploadedFile.filename}.${format}`,
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend API is running on http://localhost:${PORT}`);
});