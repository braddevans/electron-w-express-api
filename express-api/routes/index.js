module.exports = function (app, config) {
    const module = {};
    const router = app.Router()
    let ejs = require('ejs');

    router.get("/", (req, res) => {
        console.log({lemon: "melon", example: "yes"})
        res.render('index', {ledata: {lemon: "melon", example: "yes"}});
    });

    module.router = router;

    return module;
};