const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadToCloudinaryAndCleanTemp = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, { folder: `vocationalTestApp/${folder}` });

  fs.unlink(filePath, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });

  return result.secure_url;
};

const cleanLocal = (pathFile) => {
  fs.unlink(pathFile, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
};

const cleanCloudinary = (pathFile, folder) => {
  if (pathFile && pathFile !== '') {
    const lastArr = pathFile.split('/');
    const last = lastArr[lastArr.length - 1];
    const cloudinaryId = last.split('.')[0];
    cloudinary.uploader.destroy(`vocationalTestApp/${folder}/${cloudinaryId}`);
  }
};

module.exports = {
  uploadToCloudinaryAndCleanTemp,
  cleanCloudinary,
  cleanLocal,
};
