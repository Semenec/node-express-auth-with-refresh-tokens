const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, req.file ? `${req.file.name.split('.')[0]}${path.extname(file.originalname)}` : `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const getFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({ where: { id } });

    if (file) {
      req.fileById = file;
      next();
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (e) {
    next(e);
  }
};

const unlinkFile = async (req, res, next) => {
  try {
    const { fileById } = req;

    fs.unlink(path.resolve(`public/uploads/${fileById.dataValues.name}`), () => {});

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getFile,
  upload,
  unlinkFile,
};
