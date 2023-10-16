import { ALL } from "dns";

const fs = require('fs');
const fext = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

const ioutFilePath = './videos/input.mp4';
const outputFilePath = './videos/output.mp4';


export function setupDirectoryes(): void{
    ensureDirectoryExistence('./videos');
    ensureDirectoryExistence('./videos/converted');
}

export function convertVideo(inputFilePath: String, outputFilePath: String): void{
    ffmpeg(inputFilePath)
        .outputOption('-c:v libx264', 'scale=640:360')
        .on('end', () => console.log('video converted'))
        .on('error', (_err: String) => console.log(_err))
        .save(outputFilePath)
}

export function deleteRawVideo(inputFilePath: String): void{
    fs.unlink(inputFilePath, (err: String) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

export function ensureDirectoryExistence(dirPath: String): void {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        console.log("nice");
    }
    catch (err) {
        console.error(err);
   }
}


setupDirectoryes();
convertVideo(ioutFilePath, outputFilePath);