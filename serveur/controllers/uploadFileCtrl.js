const cloudinary = require("cloudinary");
const fs = require("fs");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCtrl = {
  uploadAvatar: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "avatar",
          width: 150,
          height: 150,
          crop: "fill",
        },
        async (err, result) => {
          if (err) throw err;
          else {
            removeTmp(file.tempFilePath);
            const token = req.cookies.jwt;
            jwt.verify(
              token,
              process.env.TOKEN_SECRET,
              async (err, decodedToken) => {
                //console.log(decodedToken.id);
                await UserModel.findOneAndUpdate(
                  { _id: decodedToken.id },

                  {
                    avatar: result.secure_url,
                  },

                  { new: true, upsert: true, setDefaultsOnInsert: true }
                );
              }
            );
          }

          res.json({ url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  uploadDataToBecomeTeacher: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "teacherData",
        },
        async (err, result) => {
          if (err) throw err;
          else {
            removeTmp(file.tempFilePath);
            const token = req.cookies.jwt;
            jwt.verify(
              token,
              process.env.TOKEN_SECRET,
              async (err, decodedToken) => {
                //console.log(decodedToken.id);
                await UserModel.findOneAndUpdate(
                  { _id: decodedToken.id },

                  {
                    yourDataFile: result.secure_url,
                  },

                  { new: true, upsert: true, setDefaultsOnInsert: true }
                );
              }
            );
          }

          res.json({ url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadCtrl;
