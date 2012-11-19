    /**
        Base widget

        @module ystarter-w
        @submodule ystarter-w-base
    */

    /**
        Widget Base implementation

        @class YStarter.W.Base
        @constructor
        @extends Widget
        @uses MakeNode
    */
    var Clazz = Y.namespace("YStarter.W").Base = Y.Base.create(
        NAME,
        Y.Widget,
        [ Y.MakeNode ],
        {},
        {
            ATTRS: {}
        }
    );
