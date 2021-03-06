const validate = {};

validate.bodyPostUser = (req, res, next) => {
    const { email, pass, mobile_number } = req.body;
    if (!email) {
        return res.status(400).json({
            err: { msg: "Input email!" },
            data: []
        });
    }
    if (!pass) {
        return res.status(400).json({
            err: { msg: "Input pass!" },
            data: []
        });
    }
    if (!mobile_number) {
        return res.status(400).json({
            err: { msg: "Input mobile_number!" },
            data: []
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
    const { name, price, description } = req.body;
    const { file } = req;
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
    // if (!size) {
    //     return res.status(400).json({
    //         err: "Input size!"
    //     });
    // }
    if (!description) {
        return res.status(400).json({
            err: "Input description!"
        });
    }
    if (!file) {
        return res.status(400).json({
            err: "Upload picture!"
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
    } if (!end_date) {
        return res.status(400).json({
            err: "Input end_date!"
        });
    }
    next();
};

validate.bodyPostPromo = (req, res, next) => {
    const { start_date, end_date, code, discount } = req.body;
    // if (!product_id) {
    //     return res.status(400).json({
    //         err: "Input product_id!"
    //     });
    // }
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
            err: { msg: "Input email!" }
        });
    }
    if (!pass) {
        return res.status(400).json({
            err: { msg: "Input pass!" }
        });
    }
    next();
};


module.exports = validate;