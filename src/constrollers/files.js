const path = require('path');
const File = require('../models/File');
const { paginate } = require('../helpers/pagination');

const createFile = async (req, res, next) => {
  try {
    const {
      filename: name, size, mimetype, originalname,
    } = req.file;
    const file = await File.create({
      name, size, mimetype, fileName: originalname, type: path.extname(originalname),
    });

    res.send(file);
  } catch (e) {
    next(e);
  }
};

const listFiles = async (req, res, next) => {
  try {
    const { list_size, page } = req.query;
    const files = await File.findAll({ ...paginate({ page, list_size }) });

    res.send(files);
  } catch (e) {
    next(e);
  }
};

const findFileById = async (req, res, next) => {
  try {
    res.send(req.fileById);
  } catch (e) {
    next(e);
  }
};

const downloadFileById = async (req, res, next) => {
  try {
    const { fileById } = req;

    res.sendFile(path.resolve(`public/uploads/${fileById.name}`));
  } catch (e) {
    next(e);
  }
};

const updateFileById = async (req, res, next) => {
  try {
    const {
      params: { id }, file: {
        filename: name, size, mimetype, originalname,
      },
    } = req;

    await File.update({
      name, size, mimetype, fileName: originalname, type: path.extname(originalname),
    }, { where: { id: +id } });

    res.send({ ...req.file, id: +id });
  } catch (e) {
    next(e);
  }
};

const removeFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    await File.destroy({
      where: { id },
    });

    res.send('ok');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createFile,
  listFiles,
  findFileById,
  downloadFileById,
  updateFileById,
  removeFile,
};
