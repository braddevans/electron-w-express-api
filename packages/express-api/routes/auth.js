const jwt = require("jsonwebtoken");
const fs = require("fs")
const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app, config) {
    const module = {};
    const router = app.Router();

    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        "/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );


    router.post("/login", controller.login);

    //todo redo code below

    router.post("/verifyjwt", (req, res) => {
        let username = "";
        let authAccess = "";

        res.setHeader('Content-Type', 'application/json');
        jwt.verify(
            req.body.token,
            privateKey,
            {
                algorithm: 'RS256',
            },
            function (err, token) {
                res.end(JSON.stringify({tokendata: token}, null, 3));
            });
    });


    router.get("/", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({login_status: loginstatus}, null, 3));
    });

    module.router = router;

    return module;
};