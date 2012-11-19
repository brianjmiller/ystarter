    /**
        Provides an App View for SignUp extends App View Base

        @module ystarter-app
        @submodule ystarter-app-v-signup
    */

    /**
        SignUp App View implementation

        @class YStarter.App.V.SignUp
        @constructor
        @extends YStarter.App.V.Base
    */
    var Clazz = Y.namespace("YStarter.App.V").SignUp = Y.Base.create(
        NAME,
        Y.YStarter.App.V.Base,
        [],
        {
            containerTemplate: '<div class="yui3-' + NAME + '"></div>',
            _widget: null,

            initializer: function () {
                Y.log("initializer", "debug", Clazz.NAME);

                this._widget = new Y.YStarter.W.AcctCreate(
                    {
                        bubbleTargets: this
                    }
                );
            },

            destructor: function () {
                Y.log("destructor", "debug", Clazz.NAME);

                this._widget.destroy();
                this._widget = null;
            },

            render: function () {
                Y.log("render", "debug", Clazz.NAME);

                this.get("container").append(
                    Y.one("#leadContent").getHTML()
                );
                this._widget.render(this.get("container"));
            }
        },
        {
            ATTRS: {}
        }
    );
