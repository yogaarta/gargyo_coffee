const Router = require("express").Router();
const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");
const { imageUpload } = require("../middlewares/upload");
const { checkToken } = require("../middlewares/auth");
// const db = require("../config/db"); // nanti dihapus dan dipindah ke controller dan modul


Router.get("/all", usersController.getAllUsers);

Router.get("/:id", usersController.getUserById);

Router.get("/", validate.queryFindUser, usersController.findUserByQuery);

Router.post("/", validate.bodyPostUser, usersController.postUser);

Router.patch("/:id", usersController.putUser);

// Router.patch("/", checkToken, imageUpload.single("profile_picture"), (req, res) => {
//     const id = req.userPayload.id;
//     const { file = null } = req;
//     const profile_picture = file.path.replace("public","").replace(/\\/g, "/");
//     db.query("UPDATE users SET profile_picture = $1 WHERE id = $2 RETURNING profile_picture", [profile_picture, id])
//     .then(result => {
//         res.status(200).json({
//             data: result.rows[0],
//             err: null
//         });
//     }).catch(err => {
//         res.status(500).json({
//             err,
//             data: []
//         });
//     });
// });

Router.patch("/", checkToken, imageUpload.single("profile_picture"), usersController.patchUser);

Router.delete("/:id", usersController.deleteUserById);

module.exports = Router;