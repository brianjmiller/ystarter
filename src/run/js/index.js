"use strict";
YUI().use(
    "base",
    "ystarter",
    "ystarter-css",
    function (Y) {
        Y.log("Building App Core", "debug", "index");
        try {
            Y.YStarter.App.Build();
        } catch (ex) {
            Y.error("App Build catch: " + ex);
        }
    }
);
