"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 05.03.2016 19:34
 */

var React = require('react')
require('es6-object-assign').polyfill();

var classNameRegexp = /\./g;
var len, i, j

exports.h = function () {

    len = arguments.length
    var args = new Array(len)
    for (len = arguments.length, i = 0; i < len; ++i) {
        args[i] = arguments[i];
    }

    var tag = args[0];
    var props = null
    var children = null

    if (args.length > 1) {
        if (typeof(args[1]) === "string"
            || typeof(args[1]) === "number"
            || typeof(args[1]) === "boolean"
            ||  React.isValidElement(args[1])
            || args[1].constructor === Array) {
            children = new Array(args.length - 1)
            for(i = 1, len = args.length; i < len; ++i) {
                children[i - 1] = args[i]
            }
        }
        else {
            props = args[1]
            children = new Array(args.length - 2)
            for(i = 2, len = args.length; i < len; ++i) {
                children[i - 2] = args[i]
            }
        }
    }
    else {
        children = new Array(args.length - 1)
        for(i = 1, len = args.length; i < len; ++i) {
            children[i - 1] = args[i]
        }
    }

    if (typeof tag === "string") {
        var typeProps = {}
        if (tag.indexOf(".") != -1) {
            typeProps.className = tag.substring(tag.indexOf(".") + 1).replace(classNameRegexp," ");
            tag = tag.substring(0, tag.indexOf("."))
        }
        if (tag.indexOf("#") != -1) {
            typeProps.id = tag.substring(tag.indexOf("#") + 1)
            tag = tag.substring(0, tag.indexOf("#"))
        }
        if (typeProps != null) {
            props = Object.assign(typeProps, props)
        }
    }

    len = children.length
    var reactArgs = new Array(children.length + 2)
    reactArgs[0] = tag
    reactArgs[1] = props
    for(i = 0; i < len; ++i) {
        reactArgs[i + 2] = children[i]
    }

    return React.createElement.apply(undefined, reactArgs)
}

// Create helpers
exports.a = exports.abbr = exports.acronym = exports.address = exports.applet = exports.area = exports.article
 = exports.aside = exports.audio = exports.b = exports.base = exports.basefont = exports.bdi = exports.bdo
 = exports.big = exports.blockquote = exports.body = exports.br = exports.button = exports.canvas
 = exports.caption = exports.center = exports.cite = exports.code = exports.col = exports.colgroup
 = exports.datalist = exports.dd = exports.del = exports.details = exports.dfn = exports.dialog
 = exports.dir = exports.div = exports.dl = exports.dt = exports.em = exports.embed = exports.fieldset
 = exports.figcaption = exports.figure = exports.font = exports.footer = exports.form = exports.frame
 = exports.frameset = exports.h1 = exports.h2 = exports.h3 = exports.h4 = exports.h5 = exports.h6
 = exports.head = exports.header = exports.hr = exports.html = exports.i = exports.iframe = exports.img
 = exports.input = exports.ins = exports.kbd = exports.keygen = exports.label = exports.legend = exports.li
 = exports.link = exports.main = exports.map = exports.mark = exports.menu = exports.menuitem = exports.meta
 = exports.meter = exports.nav = exports.noframes = exports.noscript = exports.object = exports.ol
 = exports.optgroup = exports.option = exports.output = exports.p = exports.param = exports.pre = exports.progress
 = exports.q = exports.rp = exports.rt = exports.ruby = exports.s = exports.samp = exports.script
 = exports.section = exports.select = exports.small = exports.source = exports.span = exports.strike
 = exports.strong = exports.style = exports.sub = exports.summary = exports.sup = exports.table
 = exports.tbody = exports.td = exports.textarea = exports.tfoot = exports.th = exports.thead = exports.time
 = exports.title = exports.tr = exports.track = exports.tt = exports.u = exports.ul = exports.var
 = exports.video = exports.wb = function(){}

for(let tag in exports) {
    if(tag !== "h") {
        exports[tag] = function() {
            len = arguments.length
            var args = new Array(len + 1);
            for (j = 0; j < len; j++) {
                args[j + 1] = arguments[j];
            }
            args[0] = tag
            return module.exports.h.apply(undefined, args);
        }
    }
}
