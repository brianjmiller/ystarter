    /**
        Base User model

        @module ystarter-m
        @submodule ystarter-m-user-base
    */

    /**
        User Model Base implementation

        @class YStarter.M.User.Base
        @constructor
        @extends YStarter.M.Base
    */

    /*jslint stupid: true */
    var Clazz = Y.namespace("YStarter.M.User").Base = Y.Base.create(
        NAME,
        Y.YStarter.M.Base,
        [],
        {},
        {
            ATTRS: {
                username: {},
                password: {}
            }
        }
    );
