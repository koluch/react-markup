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

export const h = function () {

    let i, len

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
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
        let typeProps = {}
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

    return React.createElement.apply(null, reactArgs)
}

export const a = (...args) => h("a", ...args)
export const abbr = (...args) => h("abbr", ...args)
export const acronym = (...args) => h("acronym", ...args)
export const address = (...args) => h("address", ...args)
export const applet = (...args) => h("applet", ...args)
export const area = (...args) => h("area", ...args)
export const article = (...args) => h("article", ...args)
export const aside = (...args) => h("aside", ...args)
export const audio = (...args) => h("audio", ...args)
export const b = (...args) => h("b", ...args)
export const base = (...args) => h("base", ...args)
export const basefont = (...args) => h("basefont", ...args)
export const bdi = (...args) => h("bdi", ...args)
export const bdo = (...args) => h("bdo", ...args)
export const big = (...args) => h("big", ...args)
export const blockquote = (...args) => h("blockquote", ...args)
export const body = (...args) => h("body", ...args)
export const br = (...args) => h("br", ...args)
export const button = (...args) => h("button", ...args)
export const canvas = (...args) => h("canvas", ...args)
export const caption = (...args) => h("caption", ...args)
export const center = (...args) => h("center", ...args)
export const cite = (...args) => h("cite", ...args)
export const code = (...args) => h("code", ...args)
export const col = (...args) => h("col", ...args)
export const colgroup = (...args) => h("colgroup", ...args)
export const datalist = (...args) => h("datalist", ...args)
export const dd = (...args) => h("dd", ...args)
export const del = (...args) => h("del", ...args)
export const details = (...args) => h("details", ...args)
export const dfn = (...args) => h("dfn", ...args)
export const dialog = (...args) => h("dialog", ...args)
export const dir = (...args) => h("dir", ...args)
export const div = (...args) => h("div", ...args)
export const dl = (...args) => h("dl", ...args)
export const dt = (...args) => h("dt", ...args)
export const em = (...args) => h("em", ...args)
export const embed = (...args) => h("embed", ...args)
export const fieldset = (...args) => h("fieldset", ...args)
export const figcaption = (...args) => h("figcaption", ...args)
export const figure = (...args) => h("figure", ...args)
export const font = (...args) => h("font", ...args)
export const footer = (...args) => h("footer", ...args)
export const form = (...args) => h("form", ...args)
export const frame = (...args) => h("frame", ...args)
export const frameset = (...args) => h("frameset", ...args)
export const h1 = (...args) => h("h1", ...args)
export const h2 = (...args) => h("h2", ...args)
export const h3 = (...args) => h("h3", ...args)
export const h4 = (...args) => h("h4", ...args)
export const h5 = (...args) => h("h5", ...args)
export const h6 = (...args) => h("h6", ...args)
export const head = (...args) => h("head", ...args)
export const header = (...args) => h("header", ...args)
export const hr = (...args) => h("hr", ...args)
export const html = (...args) => h("html", ...args)
export const i = (...args) => h("i", ...args)
export const iframe = (...args) => h("iframe", ...args)
export const img = (...args) => h("img", ...args)
export const input = (...args) => h("input", ...args)
export const ins = (...args) => h("ins", ...args)
export const kbd = (...args) => h("kbd", ...args)
export const keygen = (...args) => h("keygen", ...args)
export const label = (...args) => h("label", ...args)
export const legend = (...args) => h("legend", ...args)
export const li = (...args) => h("li", ...args)
export const link = (...args) => h("link", ...args)
export const main = (...args) => h("main", ...args)
export const map = (...args) => h("map", ...args)
export const mark = (...args) => h("mark", ...args)
export const menu = (...args) => h("menu", ...args)
export const menuitem = (...args) => h("menuitem", ...args)
export const meta = (...args) => h("meta", ...args)
export const meter = (...args) => h("meter", ...args)
export const nav = (...args) => h("nav", ...args)
export const noframes = (...args) => h("noframes", ...args)
export const noscript = (...args) => h("noscript", ...args)
export const object = (...args) => h("object", ...args)
export const ol = (...args) => h("ol", ...args)
export const optgroup = (...args) => h("optgroup", ...args)
export const option = (...args) => h("option", ...args)
export const output = (...args) => h("output", ...args)
export const p = (...args) => h("p", ...args)
export const param = (...args) => h("param", ...args)
export const pre = (...args) => h("pre", ...args)
export const progress = (...args) => h("progress", ...args)
export const q = (...args) => h("q", ...args)
export const rp = (...args) => h("rp", ...args)
export const rt = (...args) => h("rt", ...args)
export const ruby = (...args) => h("ruby", ...args)
export const s = (...args) => h("s", ...args)
export const samp = (...args) => h("samp", ...args)
export const script = (...args) => h("script", ...args)
export const section = (...args) => h("section", ...args)
export const select = (...args) => h("select", ...args)
export const small = (...args) => h("small", ...args)
export const source = (...args) => h("source", ...args)
export const span = (...args) => h("span", ...args)
export const strike = (...args) => h("strike", ...args)
export const strong = (...args) => h("strong", ...args)
export const style = (...args) => h("style", ...args)
export const sub = (...args) => h("sub", ...args)
export const summary = (...args) => h("summary", ...args)
export const sup = (...args) => h("sup", ...args)
export const table = (...args) => h("table", ...args)
export const tbody = (...args) => h("tbody", ...args)
export const td = (...args) => h("td", ...args)
export const textarea = (...args) => h("textarea", ...args)
export const tfoot = (...args) => h("tfoot", ...args)
export const th = (...args) => h("th", ...args)
export const thead = (...args) => h("thead", ...args)
export const time = (...args) => h("time", ...args)
export const title = (...args) => h("title", ...args)
export const tr = (...args) => h("tr", ...args)
export const track = (...args) => h("track", ...args)
export const tt = (...args) => h("tt", ...args)
export const u = (...args) => h("u", ...args)
export const ul = (...args) => h("ul", ...args)
export const _var = (...args) => h("var", ...args)
export const video = (...args) => h("video", ...args)
export const wb = (...args) => h("wb", ...args)

