const express = require('express');
const dotenv = require('dotenv');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

dotenv.config();
const port=process.env.PORT || 3000;
process.env.GOOGLE_APPLICATION_CREDENTIALS='./gcp-snack-d5d2415bc422.json';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

const client = new SecretManagerServiceClient();

const getSecret = async () => {
    try {
        let keyHandle = 'projects/gcp-snack/secrets/secret-api/versions/latest';
        const [version] = await client.accessSecretVersion({
            name: keyHandle
        });
        return await version.payload.data.toString();
    }catch(error){
        console.log(error);
        throw error;
    }
};

app.get('/', async (req, res) => {
    await getSecret()
        .then((val) => console.log(`Got secret value [${val}]`))
        .catch((err) => console.log(`Got error [${err}]`));
    res.send('Hello ACG');
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});