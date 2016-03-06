"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 05.03.2016 19:34
 */

import React from 'react'

require('es6-object-assign').polyfill();

var classNameRegexp = /\./g;

exports.h = function () {
    var len,i

    var args = new Array(arguments.length)
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

    var reactArgs = new Array(children.length + 2)
    reactArgs[0] = tag
    reactArgs[1] = props
    for(i = 0, len = children.length; i < len; ++i) {
        reactArgs[i + 2] = children[i]
    }

    return React.createElement.apply(undefined, reactArgs)
}

// Create helpers
var tags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b",
    "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center",
    "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl",
    "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1",
    "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd",
    "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav",
    "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q",
    "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike",
    "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead",
    "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wb"]

for(var i in tags) {
    let tag = tags[i]
    module.exports[tag] = function() {
        for (var len = arguments.length, args = Array(len + 1), i = 0; i < len; i++) {
            args[i + 1] = arguments[i];
        }
        args[0] = tag
        return module.exports.h.apply(undefined, args);
    }
}
