// module for parsing form data and file uploads
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// middleware for adding product to request
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: 'Product not found'
            });
        }

        // make product available in the request object
        req.product = product;
        next();
    });
};

// return product to frontend
exports.read = (req, res) => {
    // don't send the photo for performance reasons
    req.product.photo = undefined;

    return res.json(req.product);
};

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

        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required!'
            });
        }

        let product = new Product(fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }

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

exports.remove = (req, res) => {
    let product = req.product;

    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({ message: 'Product deleted successfully!' });
    });
};

// update new product
exports.update = (req, res) => {
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

        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: 'All fields are required!'
            });
        }

        let product = req.product;
        
        // update product object with new fields
        product = _.extend(product, fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }

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

// return products based on sell / arrival
// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, then all products are returned
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo") // deselect photo, don't return photo because its huge file
        .populate('category') // populate category as well which is referenced in Product model
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: 'Products not found'
                });
            }

            res.json(data);
        })
};

// find products based on the req product category
// other products that have the same category will be returned
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    // find all products in that category except for the product itself, to show as related products
    // $ne - not included
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name') // pull _id and name from category document
        .exec((err, products) => {
            if(err){
                return res.status(400).json({
                    error: 'Products not found'
                });
            }

            console.log(products)

            res.json(products);
        });
};