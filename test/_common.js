"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 06.03.2016 17:20
 */
let ReactDOMServer = require('react-dom/server')


exports.byText = function(str) {
    return str.replace(/\n/, "").replace(/>\s+</g, "><").trim()
}

exports.byRender = function(elem) {
    let str = ReactDOMServer.renderToString(elem);
    // Delete data-reactid, except key parts specified by user
    str = str.replace(/data-reactid="\.[^\$"]*/g, 'data-reactid="')
    str = str.replace(/data-reactid="\$/g, 'data-reactid="')
    str = str.replace(/\s?data-reactid=""/g, '')
    // Delete checksum attribute
    str = str.replace(/\s?data-react-checksum="[^"]*"/g, '')
    return str;
}
