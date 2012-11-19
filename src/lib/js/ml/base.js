    /**
        Base model list

        @module ystarter-ml
        @submodule ystarter-ml-base
    */

    /**
        ModelList Base implementation

        @class YStarter.ML.Base
        @constructor
        @extends ModelList
    */
    var Clazz = Y.namespace("YStarter.ML").Base = Y.Base.create(
        NAME,
        Y.ModelList,
        [],
        {
            initializer: function () {
                Y.log("initializer", "debug", Clazz.NAME);
            }
        },
        {
            ATTRS: {}
        }
    );
