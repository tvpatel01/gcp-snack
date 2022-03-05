const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// Initialize and acquire environment vaiables
dotenv.config();
const port = process.env.PORT || 3000;
const gcpkey = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Initialize firebase
// Load service account key, if running on remote machine
if(gcpkey){
    const key = require(gcpkey);
    initializeApp({credential: cert(key)});
}else{
    initializeApp();
}
const firestore = getFirestore();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');

// Define default route
app.get('/', async (req, res) => {
    try {
        let cardJson = {'name':'The Bourne Identity', 'cast':'Matt Damon', 'created': Timestamp.now()};
        const result = await firestore.collection("post")
            .add( cardJson )
            .then(docRef => {
                res.status(200).send(docRef);
            }).catch(err => {
                res.status(500).send('Unable to send post: '+ err);
            });
    }catch(error){
        res.status(500).send('Unexpected error: ' + error);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});