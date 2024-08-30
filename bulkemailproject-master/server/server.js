const express = require('express');
const axios = require('axios');
const multer = require('multer');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');

const app = express();
const upload = multer();
const PORT = 5000; // Đổi cổng để không trùng với cổng của React

// Thay thế bằng các thông tin thực tế của bạn
//const ZOHO_CLIENT_ID = '1004.SDIKK4HI5EAIML6YP9PPUJQP7F6KRN';
//const ZOHO_CLIENT_SECRET = 'a7568f3f3bab8acfe03e04f4c4989612a556e61694';
const ZOHO_ACCESS_TOKEN = 'mdOJSjd0s9wFqrP';
const ZOHO_ACCOUNT_ID = '846703444'; // Thay thế bằng ID tài khoản Zoho thực tế của bạn
const ZOHO_API_URL = `https://mail.zoho.com/api/accounts/${846703444}/aliases`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Tạo alias email từ form nhập liệu
app.post('/create-email', async (req, res) => {
    const { firstName, lastName, host } = req.body;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${host}`;

    try {
        const response = await axios.post(
            ZOHO_API_URL,
            { email: email },
            {
                headers: {
                    Authorization: `mdOJSjd0s9wFqrP ${ZOHO_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                    
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error creating email:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Internal Server Error' });
    }
});

// Tạo alias email từ tệp Excel
app.post('/upload-emails', upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const emailPromises = data.map(async (row) => {
            const email = `${row.firstName.toLowerCase()}.${row.lastName.toLowerCase()}@${row.host}`;
            return axios.post(
                ZOHO_API_URL,
                { email: email },
                {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        });

        const results = await Promise.all(emailPromises);
        res.json(results.map(result => result.data));
    } catch (error) {
        console.error('Error processing file:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to process file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
