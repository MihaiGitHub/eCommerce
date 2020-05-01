// module for parsing form data and file uploads
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// create new product
exports.create = (req, res) => {
    // create new form, get all form data
    let form = new formidable.IncomingForm();

    // keep same image extension
    form.keepExtensions = true;

    // parse form data from request
    // data coming as form-data from frontend
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = new Product(fields);

        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        // save product in db
        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
};