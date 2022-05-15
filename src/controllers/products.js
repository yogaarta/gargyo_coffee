const productsModel = require("../models/products");
const { getProductsFromServer, getFavoriteProducts, getSingleProductsFromServer, findProduct, createNewProduct, updateProduct, deleteProduct } = productsModel;

const getAllProducts = (req, res) => {
    getProductsFromServer(req.query)
        .then(result => {
            const { data, totalData, totalPage } = result;
            const { name, category, sort, order, page = 1, limit } = req.query;
            let nextPage = "/products/all?";
            let prevPage = "/products/all?";
            if (name) {
                nextPage += `name=${name}&`;
                prevPage += `name=${name}&`;
            }
            if (category) {
                nextPage += `category=${category}&`;
                prevPage += `category=${category}&`;
            }
            if (sort) {
                nextPage += `sort=${sort}&`;
                prevPage += `sort=${sort}&`;
            }
            if (order) {
                nextPage += `order=${order}&`;
                prevPage += `order=${order}&`;
            }
            if (limit) {
                nextPage += `limit=${limit}&`;
                prevPage += `limit=${limit}&`;
            }            
            nextPage += `page=${Number(page)+1}`;
            prevPage += `page=${Number(page)-1}`;
            const meta = {
                totalData,
                totalPage,
                currentPage: Number(page),
                nextPage: Number(page) === totalPage ? null : nextPage,
                prevPage: Number(page) === 1 ? null : prevPage
            };
            res.status(200).json({
                data,
                meta,
                err: null
            });
        })
        .catch(error => {
            const { err, status } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const getAllFavoriteProducts = (req, res) => {
    getFavoriteProducts()
        .then(result => {
            const { total, data } = result;
            res.status(200).json({
                data,
                total,
                err: null
            });
        })
        .catch(error => {
            const { err, status } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const getProductsById = (req, res) => {
    const { id } = req.params;
    getSingleProductsFromServer(id)
        .then((result) => {
            const { data } = result;
            res.status(200).json({
                data,
                err: null
            });
        }).catch(error => {
            const { err, status } = error;
            res.status(status).json({
                err,
                data: []
            });
        });
};

const findProductByQuery = (req, res) => {
    findProduct(req.query)
        .then(result => {
            const { data, total } = result;
            res.status(200).json({
                data,
                total,
                err: null
            });
        })
        .catch(error => {
            const { status, err } = error;
            res.status(status).json({
                data: [],
                err
            });
        });

};

const createProduct = (req, res) => {
    const { file = null } = req;
    createNewProduct(req.body, file)
        .then(result => {
            const { data } = result;
            res.status(200).json({
                err: null,
                data,
            });
        })
        .catch(error => {
            const { status, err } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const putProduct = (req, res) => {
    const { id } = req.params;
    const { file } = req;
    updateProduct(id, req.body, file)
        .then(result => {
            const { data } = result;
            res.status(200).json({
                err: null,
                data
            });
        })
        .catch(error => {
            const { status, err } = error;
            res.status(status).json({
                data: [],
                err
            });
        });
};

const deleteProductById = (req, res) => {
    const { id } = req.params;
    deleteProduct(id)
        .then((result) => {
            const { data } = result;
            res.status(200).json({
                data,
                err: null
            });
        })
        .catch(error => {
            const { err, status } = error;
            res.status(status).json({
                err,
                data: []
            });
        });
};

module.exports = {
    getAllProducts,
    getAllFavoriteProducts,
    getProductsById,
    findProductByQuery,
    createProduct,
    putProduct,
    deleteProductById
};