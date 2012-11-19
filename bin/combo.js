#!/usr/bin/env node

var comboServer = require("../node_modules/combohandler/lib/server"),
    app
;

app = comboServer(
    {
        roots: {
            "/combo/yui3": "vendor/yui3",
            "/combo/yui3-gallery": "vendor/yui3-gallery",
            "/combo/ystarter": "build"
        }
    }
);

app.listen(8000);
