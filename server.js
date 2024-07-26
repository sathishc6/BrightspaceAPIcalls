const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'finalcalc', 'dashboard.html'));
});

// OAuth 2.0 authorization endpoint
app.get('/oauth/authorize', (req, res) => {
    const authUrl = `${process.env.AUTH_ENDPOINT}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=*`;
    res.redirect(authUrl);
});

// OAuth 2.0 callback endpoint
app.get('/oauth/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        res.send('Authorization code not found.');
        return;
    }

    try {
        const response = await axios.post(process.env.TOKEN_ENDPOINT, null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const tokenData = response.data;
        const accessToken = tokenData.access_token;

        res.redirect(`/dashboard?access_token=${accessToken}`);
    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.send('Error exchanging authorization code for access token.');
    }
});

// Dashboard endpoint
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'finalcalc', 'dashboard.html'));
});

// API proxy endpoint to fetch data using the access token
app.get('/api/data', async (req, res) => {
    const accessToken = req.query.access_token;
    const userId = req.query.user_id;
    if (!accessToken || !userId) {
        res.status(400).send('Access token or User ID missing.');
        return;
    }

    try {
        const apiUrlWithUser = `${process.env.API_URL}/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;
        const response = await axios.get(apiUrlWithUser, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data from API.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
