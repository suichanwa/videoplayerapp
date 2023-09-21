const ThunderClient = require('thunder-client');

const client = new ThunderClient();

const requestPayload = {
  inputFilePath: '../suisuicute.mp4',
  outputFilePath: 'file.mp4',
};

client
  .post('http://localhost:3000/processing', requestPayload)
  .then((response) => {
    console.log('Response:', response.status, response.statusText);
    console.log('Data:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
