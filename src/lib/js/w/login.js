    /**
        Login form widget

        @module ystarter-w
        @submodule ystarter-w-login
    */

    /**
        Login Widget implementation

        @class YStarter.W.Login
        @constructor
        @extends YStarter.W.Base
    */
    var Clazz = Y.namespace("YStarter.W").Login = Y.Base.create(
        NAME,
        Y.YStarter.W.Base,
        [],
        {
            bindUI: function () {
                Y.log("bindUI", "debug", Clazz.NAME);

                this.get("contentBox").delegate(
                    "key",
                    this._doSignIn,
                    "enter",
                    "." + this._classNames.usernameInput + ", " + "." + this._classNames.passwordInput,
                    this
                );
            },

            _uiSetMessage: function () {
                Y.log("_uiSetMessage", "debug", Clazz.NAME);
                this._messageNode.setHTML(this.get("message"));
            },

            _afterSignInClick: function (e) {
                Y.log("_afterSignInClick", "debug", Clazz.NAME);
                e.preventDefault();

                this._doSignIn();
            },

            _doSignIn: function () {
                Y.log("_doSignIn", "debug", Clazz.NAME);

                var username = this._usernameInputNode.get("value"),
                    password = this._passwordInputNode.get("value");
                Y.log("_doSignIn - username: " + username, "debug", Clazz.NAME);
                Y.log("_doSignIn - password: " + password, "debug", Clazz.NAME);

                if (username === "" || password === "") {
                    this.set("message", "Email address or password empty");
                    return;
                }

                this.set("message", "Verifying...");
                Y.io(
                    "/api/login",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        data: Y.JSON.stringify(
                            {
                                username: username,
                                password: password
                            }
                        ),
                        context: this,
                        on: {
                            success: this._loginSuccess,
                            failure: this._loginFailure
                        },
                        "arguments": {
                            username: username
                        }
                    }
                );
            },

            _loginSuccess: function (txnId, response, args) {
                Y.log("_loginSuccess: " + args.username, "debug", Clazz.NAME);
                this.set("message", "Login succeeded");

                this.fire("login", { username: args.username, userJSON: response.responseText });
            },

            _loginFailure: function (txnId, response, args) {
                Y.log("_loginFailure: " + args.username, "debug", Clazz.NAME);
                this.set("message", "Login failed");
            }
        },
        {
            ATTRS: {
                strings: {
                    value: {
                        title: "Sign In:",
                        usernameLabel: "Email Address",
                        passwordLabel: "Password",
                        loginButtonLabel: "Sign In"
                    }
                },
                message: {
                    value: ""
                }
            },

            _ATTRS_2_UI: {
                BIND: [ "message" ],
                SYNC: [ "message" ]
            },

            _CLASS_NAMES: [
                "title",
                "usernameLabel",
                "passwordLabel",
                "usernameInput",
                "passwordInput",
                "signIn",
                "message"
            ],

            _EVENTS: {
                signIn: "click"
            },

            _TEMPLATE: [
                '<div class="{c title}">{s title}</div>',
                '<div>',
                '<label for="username" class="{c usernameLabel}">{s usernameLabel}</label>',
                '<br>',
                '<input type="text" class="{c usernameInput}">',
                '</div>',
                '<div>',
                '<label for="password" class="{c passwordLabel}">{s passwordLabel}</label>',
                '<br>',
                '<input type="password" class="{c passwordInput}">',
                '</div>',
                '<div>',
                '<a href="#" class="ystarter-button {c signIn}">{s loginButtonLabel}</a>',
                '</div>',
                '<div>',
                '<span class="{c message}"></span>',
                '</div>',
                '<div>',
                '</div>'
            ].join("")
        }
    );
