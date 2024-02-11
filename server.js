const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// Konfigurasi multer untuk menangani upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Simpan file di folder 'uploads'
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + path.extname(file.originalname)); // Nama file baru
        cb(null, file.originalname); // Nama file barus
    }
});

const upload = multer({ storage });

// Handle POST request untuk endpoint '/upload'
app.post('/upload', upload.array('image'), (req, res) => {
    // Respon sukses jika file berhasil diupload
    res.send('File(s) uploaded successfully.');
});

// Serve static files dari folder 'uploads'
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
