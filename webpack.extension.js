const path = require("path");

module.exports = config => {

    if(!config.externals)
    { config.externals = {}; }
/*
    config.externals["@treacherous/core"] = "@treacherous/core";
    config.externals["@treacherous/vue"] = "@treacherous/vue";
    config.externals["@treacherous/decorators"] = "@treacherous/decorators";*/
/*
    const scssConfig = {
        test: /ext\.scss$/, use:
            ["style-loader", "css-loader", "sass-loader"]
    };

    config.module.rules.push(scssConfig);*/
};