const bodyParser = require('body-parser');
const cors = require('cors');
const spawn = require('child_process').spawn;
const express = require('express');
const fs = require('fs');

const app = express();

const {port, endpoints} = require('./config');

app.use(cors());
app.use(bodyParser.json());

function log(str) {
    fs.appendFile('log.txt', str, (err) => {
        if (err) throw err
    })
}

function dataLog(data) {
    let text = data.toString();
    process.stdout.write(text);
    log(text)
}


endpoints.forEach(({command, url, passPhrase}) => {
    app.post(url, (req, res, next) => {
        if(req.body.passPhrase === passPhrase) {
<<<<<<< HEAD
            exec(command, {}, (err, stdo, stde) => {
                if(err) {
                    res.sendStatus(500);
                    return console.error(err);
                }
                if(stdo) log(stdo);
                if(stde) log(stde);
            let commands = command.split(' ');
            let process = spawn(commands[0], commands.slice(1));
            process.stdout.on('data', dataLog);
            process.stderr.on('data', dataLog);

            process.stdin.setEncoding('utf8');

            process.on('exit', () => {
                res.sendStatus(200);
            });

            process.on('error', () => {
                res.sendStatus(500)
            })
        } else {
            res.sendStatus(401)
        }
    })
});

app.listen(port, () => { console.log (`listening on port ${port}`) });
