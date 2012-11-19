    var Clazz,
        instance = null,
        userCookieName = "YSTARTER_USER",
        sessionCookieName = "YSTARTER_SESSION";

    Clazz = Y.namespace("YStarter.App").Builder = Y.Base.create(
        NAME,
        Y.Base,
        [],
        {
            _core: null,

            initializer: function () {
                Y.log("initializer", "debug", Clazz.NAME);
                var userCookie = Y.Cookie.get(userCookieName);

                Y.log("initializer - setting up user", "debug", Clazz.NAME);
                Y.YStarter.user = null;
                if (userCookie !== null) {
                    Y.log("initializer - user logged in", "debug", Clazz.NAME);
                    this._doLogin(userCookie, { forInit: true });
                }

                Y.log("initializer - creating app core", "debug", Clazz.NAME);
                this._core = new Y.YStarter.App.Core(
                    {
                        viewContainer: "#pageContentContainer",
                        linkSelector: "a.ystarter-app-link"
                    }
                );
                this._core.render();

                this._core.after("*:login", this._afterLogin, this);
                this._core.after("*:logout", this._afterLogout, this);
                this._core.after("*:signedUp", this._afterSignedUp, this);

                Y.on("windowresize", Y.bind(this._onWindowResize, this));
                Y.on("io:failure", this._onIOFailure, this);
            },

            _doLogin: function (userJSON, cfg) {
                Y.log("_doLogin", "debug", Clazz.NAME);
                // TODO: protect this
                var userCfg = Y.JSON.parse(userJSON),
                    body = Y.one("body");

                cfg = cfg || {
                    forInit: false
                };

                Y.Cookie.set(userCookieName, userJSON, { path: "/" });

                Y.YStarter.user = new Y.YStarter.M.User.Base(userCfg);

                body.addClass("authenticated");
            },

            destructor: function () {
                Y.log("destructor", "debug", Clazz.NAME);
                this._core.destroy();
                this._core = null;
                Y.YStarter.user.destroy();
                Y.YStarter.user = null;
            },

            _afterLogin: function (e) {
                Y.log("_afterLogin", "debug", Clazz.NAME);
                Y.log("_afterLogin - e.userJSON: " + e.userJSON, "debug", Clazz.NAME);

                this._doLogin(e.userJSON);

                this._core.navigateHome();
            },

            _afterLogout: function (e) {
                Y.log("_afterLogout", "debug", Clazz.NAME);

                Y.Cookie.remove(userCookieName, { path: "/" });
                Y.Cookie.remove(sessionCookieName, { path: "/" });

                Y.YStarter.user = null;

                Y.one("body").removeClass("authenticated");
            },

            _afterSignedUp: function (e) {
                Y.log("_afterSignedUp", "debug", Clazz.NAME);
                Y.log("_afterSignedUp - e.user: " + e.user, "debug", Clazz.NAME);
                this._core.navigate("/sign/in");
            },

            _onWindowResize: function (e) {
                Y.log("_onWindowResize", "debug", Clazz.NAME);
            },

            _onIOFailure: function (txnId, response) {
                Y.log("_onIOFailure", "debug", Clazz.NAME);
                Y.log("_onIOFailure - status: " + response.status, "debug", Clazz.NAME);
                if (response.status === 401 && Y.YStarter.user !== null) {
                    this._core.navigate("/sign/out");
                }
            }
        },
        {
            ATTRS: {}
        }
    );

    //
    // set up a function to build a singleton to wrap access to the UI builder
    // by creating an instance if one doesn't already exist, otherwise returns
    // the existing one the build method should then only ever be called once
    //
    Y.namespace("YStarter.App").Build = function (config) {
        if (!instance) {
            instance = new Clazz(config);
        }
        return instance;
    };
