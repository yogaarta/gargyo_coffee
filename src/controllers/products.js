const productsModel = require("../models/products");
const { getProductsFromServer, getFavoriteProducts, getSingleProductsFromServer, findProduct, createNewProduct, updateProduct, deleteProduct } = productsModel;

const getAllProducts = (req, res) => {
    getProductsFromServer(req.query)
        .then(result => {
            const { data, totalData, totalPage } = result;
            const { page = 1, limit = 3 } = req.query;
            // let name = req.query.name ? `${nextPage}name=${req.query.name}` : null;
            // console.log(name);
            let route = "";
            if(Object.keys(req.query).length > 0){
                route = req.originalUrl.split("?")[1].replace(`page=${page}`, "").replace(`limit=${limit}`, "").split("&").sort().join("&").replace("&&", "&");
            } 
            // console.log(route);
            // console.log(req.query);
            // console.log(Object.keys(req.query).length);
            const meta = {
                totalData,
                totalPage,
                currentPage: Number(page),
                nextPage: Number(page) === totalPage ? null : `/products/all?page=${Number(page) + 1}&limit=${limit}${route}`,
                prevPage: Number(page) === 1 ? null : `/products/all?page=${Number(page) - 1}&limit=${limit}${route}`
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
    const { file }= req;
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
    const {id} = req.params;
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