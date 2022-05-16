const validate = {};

validate.bodyPostUser = (req, res, next) => {
    const { email, pass, mobile_number } = req.body;
    if (!email) {
        return res.status(400).json({
            err: "Input email!"
        });
    }
    if (!pass) {
        return res.status(400).json({
            err: "Input pass!"
        });
    }
    if (!mobile_number) {
        return res.status(400).json({
            err: "Input mobile_number!"
        });
    }
    next();
};

validate.queryFindUser = (req, res, next) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({
            err: "Input email"
        });
    }
    next();
};

validate.queryFindProduct = (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({
            err: "Input name"
        });
    }
    next();
};

validate.bodyPostProduct = (req, res, next) => {
    const { name, price, size, description } = req.body;
    console.log(req.body);
    if (!name) {
        return res.status(400).json({
            err: "Input name!"
        });
    }
    if (!price) {
        return res.status(400).json({
            err: "Input price!"
        });
    }
    if (!size) {
        return res.status(400).json({
            err: "Input size!"
        });
    }
    if (!description) {
        return res.status(400).json({
            err: "Input description!"
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
    const { product_id, start_date, end_date, code, discount } = req.body;
    if (!product_id) {
        return res.status(400).json({
            err: "Input product_id!"
        });
    }
    if (!start_date) {
        return res.status(400).json({
            err: "Input start_date!"
        });
    }
    if (!end_date) {
        return res.status(400).json({
            err: "Input end_date!"
        });
    }
    if (!code) {
        return res.status(400).json({
            err: "Input code!"
        });
    }
    if (!discount) {
        return res.status(400).json({
            err: "Input discount!"
        });
    }
    next();
};

validate.queryFindPromo = (req, res, next) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({
            err: "Input code"
        });
    }
    next();
};

validate.bodyLoginUser = (req, res, next) => {
    const { email, pass } = req.body;
    if (!email) {
        return res.status(400).json({
            err: "Input email!"
        });
    }
    if (!pass) {
        return res.status(400).json({
            err: "Input pass!"
        });
    }
    next();
};


module.exports = validate;