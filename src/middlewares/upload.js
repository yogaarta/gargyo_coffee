const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const imageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public/images");
//     },
//     filename: (req, file, cb) => {
//         const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         const filename = `${file.fieldname}-${suffix}${path.extname(
//             file.originalname
//         )}`;
//         cb(null, filename);
//     },
// });

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Gargyo Coffee",
        public_id: (req, file) => {
            console.log(file);
            console.log(path.extname);
            const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileName = `${file.fieldname}-${suffix}${path.extname(file.originalname)}`;
            return fileName;
        }
    }
});

const limit = {
    fileSize: 6e6,
};

const imageOnlyFilter = (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const allowedExt = /jpg|JPG|png|PNG/;
    if (!allowedExt.test(extName))
        return cb(new Error("Extension must JPG or PNG"), false);
    cb(null, true);
};

const imageUpload = multer({
    storage: cloudinaryStorage,
    limits: limit,
    fileFilter: imageOnlyFilter,
}).single("picture");

const profPictUpload = multer({
    storage: cloudinaryStorage,
    limits: limit,
    fileFilter: imageOnlyFilter,
}).single("profile_picture");

const uploadProfPict = (req, res, next) => {
    profPictUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }
        next();
    });
};
const uploadImage = (req, res, next) => {
    imageUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }
        next();
    });
};

module.exports = {uploadImage, uploadProfPict};