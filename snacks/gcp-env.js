const express = require('express');
const dotenv  = require('dotenv');

dotenv.config();
const port = process.env.PORT;
const name = process.env.K_SERVICE || 'gcp-snack';
const nenv = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.get('/', async (req,res) => {
    res.send(process.env);
});

app.get('/env/:key', async (req,res) => {
    const key = req.params.key;
    if(key && process.env[key]){
        res.send(`${key}=${process.env[key]}`);
    }else{
        res.send(`ERROR: ${key} not found`);
    }
});

app.listen(port, ()=> {
    console.log(`*** ${name} : environment:${nenv}`);
    console.log(`*** ${name} : npm_package_name:${process.env.npm_package_name}`);
    console.log(`*** ${name} : npm_package_version:${process.env.npm_package_version}`);
    console.log(`*** ${name} : started @ ${port} port`);
});