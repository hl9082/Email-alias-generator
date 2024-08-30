const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const axios = require('axios');
const path = require('path'); // Thêm dòng này

const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.hostEmail) {
        return res.status(400).send('Please fill in all fields');
    }

    const { firstName, lastName, hostEmail } = req.body;

    const file = req.file;
    if (!file) {
        return res.status(400).send('Please upload a file');
    }

    try {
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet);

        const aliases = rows.slice(0, 50).map(row => ({
            firstName: row['First Name'],
            lastName: row['Last Name'],
            alias: row['Alias']
        }));

        for (const alias of aliases) {
            await createAliasEmail(alias.firstName, alias.lastName, hostEmail, alias.alias);
        }

        res.send('Alias emails created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create alias emails');
    }
});

const createAliasEmail = async (firstName, lastName, hostEmail, alias) => {
    const authToken = 'mdOJSjd0s9wFqrP';  // Thay bằng auth token của bạn

    try {
        const response = await axios.post(
            `https://mail.zoho.com/api/accounts/${hostEmail}/aliases`,
            {
                firstName,
                lastName,
                alias
            },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`Alias created: ${response.data}`);
    } catch (error) {
        console.error(`Failed to create alias: ${JSON.stringify(error.response.data)}`);
    }
};
const getAccounts = async () => {
    const authToken = 'mdOJSjd0s9wFqrP';  // Thay bằng auth token của bạn

    try {
        const response = await axios.get(
            "https://mail.zoho.com/api/accounts",
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`Alias created: ${response.data}`);
    } catch (error) {
        console.error(`Failed to get accounts: ${JSON.stringify(error.response.data)}`);
    }
}

getAccounts();

module.exports = router;
