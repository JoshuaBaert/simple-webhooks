const bodyParser = require('body-parser');
const cors = require('cors');
const exec = require('child_process').exec;
const express = require('express');
const fs = require('fs');

const app = express();

const {port, endpoints} = require('./config');

app.use(cors());
app.use(bodyParser.json());

function log(txt) {
    fs.appendFile('log.txt', txt, (err) => {
        if (err) throw err
    })
}


endpoints.forEach(({command, url, passPhrase}) => {
    app.post(url, (req, res, next) => {
        if(req.body.passPhrase === passPhrase) {
            exec(command, {}, (err, stdo, stde) => {
                if(err) {
                    res.sendStatus(500);
                    return console.error(err);
                }
                if(stdo) log(stdo);
                if(stde) log(stde);
                res.sendStatus(200);
            })
        } else {
            res.sendStatus(401)
        }
    })
});

app.listen(port, () => { console.log (`listening on port ${port}`) });
