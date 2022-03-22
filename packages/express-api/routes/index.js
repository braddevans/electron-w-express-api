module.exports = function (app, config) {
    const module = {};
    const lemon = {};
    const router = app.Router()

    router.get("/", (req, res) => {
        console.log({lemon: "melon", example: "yes"})
        res.render('index', {ledata: {lemon: "melon", example: "yes"}});
    });

    function getRouter(){
        return router;
    }

    lemon.getRouter = getRouter()
    module.router = router;
    module.lemon = lemon;

    return module;
};