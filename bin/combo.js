#!/usr/bin/env node

var comboServer = require("../node_modules/combohandler/lib/server"),
    app
;

app = comboServer(
    {
        roots: {
            "/ystarter/combo/yui3": "vendor/yui3",
            "/ystarter/combo/yui3-gallery": "vendor/yui3-gallery",
            "/ystarter/combo/ystarter": "build"
        }
    }
);

app.listen(8001);
