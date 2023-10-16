import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

import {
    setupDirectoryes
    
} from './storage'

const app = express();
app.use(express.json());

app.post("/processing", (req, res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    inputFilePath && outputFilePath ? res.status(400).send("you have to set the video") : null;

    ffmpeg(inputFilePath)
        .outputOption('-c:v libx264', 'scale=640:360')
        .on('end', () => res.status(200).send('video converted'))
        .on('error', (err) => res.status(500).send('error'))
        .save(outputFilePath);

    return res.status(200).send("video converted");
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

