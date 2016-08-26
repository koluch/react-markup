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
    return str.replace(/\n/, "").trim()
}

exports.byRender = function(elem) {
    return ReactDOMServer.renderToStaticMarkup(elem);
}
