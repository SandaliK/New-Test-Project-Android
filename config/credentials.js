const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
    process.loadEnvFile(envFile);
}

const { TEST_USER_EMAIL, TEST_USER_PASSWORD } = process.env;

if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
    throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD are missing. Copy .env.example to .env and fill them in.');
}

module.exports = {
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD
};
