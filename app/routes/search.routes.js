module.exports = app => {
    const search = require("../controllers/search.controller.js");

    var router = require("express").Router();

    // Retrieve a single with
    router.get("/", search.findAll);

    app.use('/api/search', router);
}; 