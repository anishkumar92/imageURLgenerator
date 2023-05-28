const sharp = require('sharp');
const fs = require('fs');
// const path= require('path')

const inputFolder = 'D:/code/private/imageURLgenerator/pre-cropped';
const outputFolder = 'D:/code/private/imageURLgenerator/images';

// create output directory if it does not exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const inputFile = inputFolder + '/' + file;
    const outputFile = outputFolder + '/' + file;

    // read the input image
    sharp(inputFile)
      .resize({ width: 1080, height: 1350, fit: 'contain', background: { r: 000, g: 000, b: 000, alpha: 0  } })
      .toBuffer()
    //   .then((data) => {
    //     // create watermark image
    //     return sharp({ create: { width: 800, height: 1000, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } } })
    //       .composite([{ input: './watermark.jpg', gravity: 'southeast' }])
    //       .toBuffer();
    //   })
    
      .then((data) => {
        // composite input image with watermark
        return sharp(inputFile)
          .resize({ width: 1350, height: 1350, fit: 'contain', background: { r: 000, g: 000, b: 000, alpha: 0  } })
          .composite([{ input: data }])
          .toBuffer();
      })
      
      .then((data) => {
        // write output image to file
        fs.writeFileSync(outputFile, data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
