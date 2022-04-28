const validate = {};

validate.bodyPostUser = (req, res, next) => {
    const { user_email, user_pass, user_mobile_number } = req.body;
    if (!user_email) {
        return res.status(400).json({
            err: "Input user_email!"
        });
    }
    if (!user_pass) {
        return res.status(400).json({
            err: "Input user_pass!"
        });
    }
    if (!user_mobile_number) {
        return res.status(400).json({
            err: "Input user_mobile_number!"
        });
    }
    next();
};

validate.queryFindUser = (req, res, next) => {
    const { user_email } = req.query;
    if (!user_email) {
        return res.status(400).json({
            err: "Input user_email"
        });
    }
    next();
};

validate.queryFindProduct = (req, res, next) => {
    const { product_name } = req.query;
    if (!product_name) {
        return res.status(400).json({
            err: "Input product_name"
        });
    }
    next();
};

validate.bodyPostProduct = (req, res, next) => {
    const { product_name, product_price, product_size, product_description, product_pict } = req.body;
    if (!product_name) {
        return res.status(400).json({
            err: "Input product_name!"
        });
    }
    if (!product_price) {
        return res.status(400).json({
            err: "Input product_price!"
        });
    }
    if (!product_size) {
        return res.status(400).json({
            err: "Input product_size!"
        });
    }
    if (!product_description) {
        return res.status(400).json({
            err: "Input product_description!"
        });
    }
    if (!product_pict) {
        return res.status(400).json({
            err: "Input product_pict!"
        });
    }
    next();
};

validate.queryFindTransactionsByDate = (req, res, next) => {
    const { start_date, end_date } = req.query;
    if (!start_date) {
        return res.status(400).json({
            err: "Input start_date!"
        });
    }if (!end_date) {
        return res.status(400).json({
            err: "Input end_date!"
        });
    }
    next();
};

validate.bodyPostPromo = (req, res, next) => {
    const { product_id, promo_start, promo_end, promo_code, promo_discount } = req.body;
    if (!product_id) {
        return res.status(400).json({
            err: "Input product_id!"
        });
    }
    if (!promo_start) {
        return res.status(400).json({
            err: "Input promo_start!"
        });
    }
    if (!promo_end) {
        return res.status(400).json({
            err: "Input promo_end!"
        });
    }
    if (!promo_code) {
        return res.status(400).json({
            err: "Input promo_code!"
        });
    }
    if (!promo_discount) {
        return res.status(400).json({
            err: "Input promo_discount!"
        });
    }
    next();
};

validate.queryFindPromo = (req, res, next) => {
    const { promo_code } = req.query;
    if (!promo_code) {
        return res.status(400).json({
            err: "Input promo_code"
        });
    }
    next();
};

module.exports = validate;