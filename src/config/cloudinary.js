const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: "yogaarta", 
  api_key: "927446166528245", 
  api_secret: "KonyjJr5OUCDIr2De5uwBqDDf5U" 
});

module.exports = cloudinary;