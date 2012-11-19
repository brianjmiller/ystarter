    /**
        Provides core App functionality

        @module ystarter-app
        @submodule ystarter-app-core
    */

    /**
        Primary App implementation

        @class YStarter.App.Core
        @constructor
        @extends YStarter.App.Base
    */
    var classPrefix = "yui3-" + NAME + "-",
        Clazz = Y.namespace("YStarter.App").Core = Y.Base.create(
        NAME,
        Y.App,
        [],
        {
            views: {
                signIn: {
                    type: Y.YStarter.App.V.SignIn
                },
                signUp: {
                    type: Y.YStarter.App.V.SignUp
                },
                home: {
                    type: Y.YStarter.App.V.Home
                }
            },

            initializer: function (cfg) {
                Y.log("initializer", "debug", Clazz.NAME);
                var contentTop = Y.one("#pageTopContent");

                this.once(
                    "ready",
                    function (e) {
                        if (this.hasRoute(this.getPath())) {
                            this.dispatch();
                        } else {
                            if (Y.YStarter.user === null) {
                                this.navigate("/sign/up");
                            }
                            else {
                                this.navigateHome();
                            }
                        }
                    }
                );
            },

            destructor: function (cfg) {
                Y.log("destructor", "debug", Clazz.NAME);
            },

            verifyAuth: function (req, res, next) {
                Y.log("verifyAuth", "debug", Clazz.NAME);

                if (Y.YStarter.user === null) {
                    this.navigate("/sign/up");
                    return;
                }
                next();
            },

            navigateHome: function(){
                Y.log("navigateHome", "debug", Clazz.NAME);
                this.navigate("/home");
            },

            handleSignUp: function (req, res, next) {
                Y.log("handleSignUp", "debug", Clazz.NAME);
                if (Y.YStarter.user !== null) {
                    this.navigateHome();
                } else {
                    this.showSignUp();
                    next();
                }
            },

            handleSignIn: function (req, res, next) {
                Y.log("handleSignIn", "debug", Clazz.NAME);
                if (Y.YStarter.user !== null) {
                    this.navigateHome();
                } else {
                    this.showSignIn();
                    next();
                }
            },

            handleSignOut: function (req, res, next) {
                Y.log("handleSignOut", "debug", Clazz.NAME);
                this.fire("logout");

                this.navigate("/sign/in");
            },

            handleHome: function (req, res, next) {
                Y.log("handleHome", "debug", Clazz.NAME);
                this.showHome();
                next();
            },

            showSignIn: function () {
                Y.log("showSignIn", "debug", Clazz.NAME);
                this.set("contentClass", "signIn");

                this.showView("signIn", null, { callback: function (view) { view.fire("shown"); }});
            },

            showSignUp: function () {
                Y.log("showSignUp", "debug", Clazz.NAME);
                this.set("contentClass", "signUp");

                this.showView("signUp", null, { callback: function (view) { view.fire("shown"); }});
            },

            showHome: function () {
                Y.log("showHome", "debug", Clazz.NAME);

                this.showView("home", null, { callback: function (view) { view.fire("shown"); }});
            }
        },
        {
            ATTRS: {
                serverRouting: {
                    value: false
                },
                // TODO: remove this as a requirement
                root: {
                    value: "/"
                },
                routes: {
                    value: [
                        {
                            path: "/sign/up",
                            callbacks: [
                                "handleSignUp"
                            ]
                        },
                        {
                            path: "/sign/in",
                            callbacks: [
                                "handleSignIn"
                            ]
                        },
                        {
                            path: "/sign/out",
                            callbacks: [
                                "handleSignOut"
                            ]
                        },
                        {
                            path: "/home",
                            callbacks: [
                                "verifyAuth",
                                "handleHome"
                            ]
                        }
                    ]
                },
                transitions: {
                    value: true
                }
            }
        }
    );
