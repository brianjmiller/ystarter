    /**
        Provides an App View for "Home" extends App View Base

        @module ystarter-app
        @submodule ystarter-app-v-home
    */

    /**
        App Home App View implementation

        @class YStarter.App.V.Home
        @constructor
        @extends YStarter.App.V.Base
    */
    var Clazz = Y.namespace("YStarter.App.V").Home = Y.Base.create(
        NAME,
        Y.YStarter.App.V.Base,
        [],
        {
            render: function () {
                Y.log("render", "debug", Clazz.NAME);
                var c = this.get("container"),
                    classPrefix = "yui3-" + Y.YStarter.App.V.Base.NAME;

                c.append("Home View");
            }
        },
        {
            ATTRS: {}
        }
    );
