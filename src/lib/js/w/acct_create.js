    /**
        Account Create form widget

        @module ystarter-w
        @submodule ystarter-w-acct_create
    */

    /**
        Account Create Widget implementation

        @class YStarter.W.AcctCreate
        @constructor
        @extends YStarter.W.Base
    */
    var Clazz = Y.namespace("YStarter.W").AcctCreate = Y.Base.create(
        NAME,
        Y.YStarter.W.Base,
        [],
        {
            _inProcess: null,

            initializer: function () {
                Y.log("initializer", "debug", Clazz.NAME);
                this._inProcess = false;
            },

            bindUI: function () {
                Y.log("bindUI", "debug", Clazz.NAME);
                this.get("contentBox").delegate(
                    "key",
                    this._doCreate,
                    "enter",
                    "input",
                    this
                );
            },

            _uiSetMessage: function () {
                Y.log("_uiSetMessage: " + this.get("message"), "debug", Clazz.NAME);
                this._messageNode.setHTML(this.get("message"));
            },

            _afterCreateClick: function (e) {
                Y.log("_afterCreateClick", "debug", Clazz.NAME);
                e.preventDefault();

                this._doCreate();
            },

            _doCreate: function () {
                Y.log("_doCreate", "debug", Clazz.NAME);

                var s = this.get("strings"),
                    firstName = this._firstNameInputNode.get("value"),
                    lastName = this._lastNameInputNode.get("value"),
                    email = this._emailInputNode.get("value"),
                    password = this._newPassInputNode.get("value"),
                    conPassword = this._conPassInputNode.get("value");

                if (this._inProcess) {
                    this.set("message", s.stateProcessing);
                    return;
                }

                if (firstName === "") {
                    this.set("message", s.firstNameLabel + " " + s.isRequired);
                    return;
                } else if (lastName === "") {
                    this.set("message", s.lastNameLabel + " " + s.isRequired);
                    return;
                } else if (email === "") {
                    this.set("message", s.emailLabel + " " + s.isRequired);
                    return;
                } else if (password === "") {
                    this.set("message", s.newPassLabel + " " + s.isRequired);
                    return;
                }
                if (password !== conPassword) {
                    this.set("message", s.passNoMatch);
                    return;
                }

                this.set("message", s.stateCreating);

                this._inProcess = true;
                Y.io(
                    "/api/user",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        data: Y.JSON.stringify(
                            {
                                email: email,
                                password: password,
                                firstName: firstName,
                                lastName: lastName
                            }
                        ),
                        context: this,
                        on: {
                            success: this._ioSuccess,
                            failure: this._ioFailure
                        },
                        "arguments": {
                            email: email
                        }
                    }
                );
            },

            _ioSuccess: function (txnId, response, args) {
                Y.log("_ioSuccess: " + args.username, "debug", Clazz.NAME);
                this.set("message", this.get("strings").stateSucceeded);
                this._inProcess = false;

                this.fire("signedUp");
            },

            _ioFailure: function (txnId, response, args) {
                Y.log("_ioFailure: " + args.username, "debug", Clazz.NAME);
                this.set("message", this.get("strings").stateFailed);
                this._inProcess = false;
            }
        },
        {
            ATTRS: {
                strings: {
                    value: {
                        title: "Create User Account",
                        alreadyHave: "Already have an account?",
                        signIn: "Sign In",
                        firstNameLabel: "First Name",
                        lastNameLabel: "Last Name",
                        emailLabel: "Email Address",
                        newPassLabel: "Password",
                        conPassLabel: "Confirm Password",
                        createButtonLabel: "Create Account",
                        isRequired: "is required",
                        passNoMatch: "Passwords don't match",
                        stateCreating: "Creating...",
                        stateSucceeded: "Account creation succeeded",
                        stateFailed: "Account creation failed",
                        stateProcessing: "Already processing"
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
                "alreadyHaveContainer",
                "alreadyHave",
                "firstNameLabel",
                "firstNameInput",
                "lastNameLabel",
                "lastNameInput",
                "emailLabel",
                "emailInput",
                "newPassLabel",
                "newPassInput",
                "conPassLabel",
                "conPassInput",
                "createContainer",
                "create",
                "message"
            ],

            _EVENTS: {
                create: "click"
            },

            _TEMPLATE: [
                '<div class="{c title}">{s title}</div>',
                '<div class="{c alreadyHaveContainer}">',
                '<span class="{c alreadyHave}">{s alreadyHave} <a class="ystarter-app-link" href="/sign/in">{s signIn}</a></span>',
                '</div>',
                '<div>',
                '<label for="first_name" class="{c firstNameLabel}">{s firstNameLabel}</label>',
                '<br>',
                '<input type="text" class="{c firstNameInput}">',
                '</div>',
                '<div>',
                '<label for="last_name" class="{c lastNameLabel}">{s lastNameLabel}</label>',
                '<br>',
                '<input type="text" class="{c lastNameInput}">',
                '</div>',
                '<div>',
                '<label for="email" class="{c emailLabel}">{s emailLabel}</label>',
                '<br>',
                '<input type="text" class="{c emailInput}">',
                '</div>',
                '<div>',
                '<label for="new_password" class="{c newPassLabel}">{s newPassLabel}</label>',
                '<br>',
                '<input type="password" class="{c newPassInput}">',
                '</div>',
                '<div>',
                '<label for="con_password" class="{c conPassLabel}">{s conPassLabel}</label>',
                '<br>',
                '<input type="password" class="{c conPassInput}">',
                '</div>',
                '<div class="{c createContainer}">',
                '<a href="#" class="ystarter-button {c create}">{s createButtonLabel}</a>',
                '</div>',
                '<div>',
                '<span class="{c message}"></span>',
                '</div>'
            ].join("")
        }
    );
