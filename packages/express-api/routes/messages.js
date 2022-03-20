const controller = require("../controllers/message.controller");
const {authJwt} = require("../middleware");
module.exports = function (app, config) {
    const module = {};
    const router = app.Router()

    router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        "/create",
        [authJwt.verifyToken],
        controller.createMessage
    );

    module.router = router;

    return module;
};