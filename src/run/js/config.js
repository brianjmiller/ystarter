"use strict";
YUI.GlobalConfig = {
    filter: "debug",
    combine: true,
    comboBase: "/ystarter/combo/yui3?",
    root: "build/",
    groups: {
        gallery: {
            combine: true,
            comboBase: "/ystarter/combo/yui3-gallery?",
            root: "build/",
            patterns: {
                "gallery-": {},
                "gallerycss-": { type: "css" }
            }
        },
        localjs: {
            combine: true,
            comboBase: "/ystarter/combo/ystarter?",
            root: "",
            modules: {
                "ystarter": {}
            }
        },
        localcss: {
            combine: true,
            comboBase: "/ystarter/combo/ystarter?",
            root: "",
            modules: {
                "ystarter-app-core-css": { type: "css" },
                "ystarter-app-v-base-css": { type: "css" },
                "ystarter-app-v-signin-css": { type: "css" },
                "ystarter-app-v-signup-css": { type: "css" },
                "ystarter-app-v-home-css": { type: "css" },
                "ystarter-w-login-css": { type: "css" },
                "ystarter-w-acct_create-css": { type: "css" }
            }
        }
    },
    logInclude: {
        "": true,
        "index": true,
        "ystarter-app-builder": true,
        "ystarter-app-core": true,
        "ystarter-app-v-base": true,
        "ystarter-app-v-signin": true,
        "ystarter-app-v-signup": true,
        "ystarter-app-v-home": true,
        "ystarter-m-base": true,
        "ystarter-m-user-base": true,
        "ystarter-ml-base": true,
        "ystarter-v-base": true,
        "ystarter-w-base": true,
        "ystarter-w-login": true,
        "ystarter-w-acct_create": true
    }
};
