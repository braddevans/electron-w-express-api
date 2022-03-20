module.exports = function (router, config) {
    const module = {};

    function loggerLoad() {
        router.use(function timeLog(req, res, next) {
            let format = '[LOG] [${year}] [${time}] | ${url}';
            const date = new Date();
            format = format.replaceAll("\$\{time\}", Date.now());
            format = format.replaceAll("\$\{year\}", date.getUTCFullYear());
            format = format.replaceAll("\$\{url\}", req.url);
            console.log(format)
            next()
        })
        return true;
    }

    module.loggerLoad = loggerLoad()

    return module;
};