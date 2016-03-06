"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 06.03.2016 15:36
 */
let assert = require('chai').assert;

let markup = require('../lib/index')

let common = require('./_common');
let byText = common.byText
let byRender = common.byRender

describe('react-markup', () => {
    describe("helpers", () => {

        let tags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b",
            "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center",
            "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl",
            "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1",
            "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd",
            "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav",
            "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q",
            "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike",
            "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead",
            "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wb"]

        let emptyTags = ["area","base","br","col","embed","menuitem","hr","img","input","keygen","link",
        "meta","param","source", "track", "textarea"]


        for(let i in tags) {
            let tag = tags[i];

             if(tag === "textarea") {
                it('should properly render  empty ' + tag + ' element', () => {
                    assert.equal(byRender(markup[tag]()), byText('<'+tag+'></'+tag+'>'))
                })
            }
            else if(emptyTags.indexOf(tag) != -1) {
                if(tag == "menuitem") { //very strange behaviour for menuitem - it's rendered as empty pair tag
                    it('should properly render empty ' + tag + ' element', () => {
                        assert.equal(byRender(markup[tag]()), byText('<'+tag+'></'+tag+'>'))
                    })
                }
                else {
                    it('should properly render empty ' + tag + ' element', () => {
                        assert.equal(byRender(markup[tag]()), byText('<'+tag+'/>'))
                    })
                }
            }
            else {
                it('should properly render ' + tag+' element with text content', () => {
                    assert.equal(byRender(markup[tag]("text content")), byText('<'+tag+'>text content</'+tag+'>'))
                })
                it('should properly render ' + tag+' element with class name', () => {
                    assert.equal(
                        byRender(markup[tag]({className:"selected"})),
                        byText('<'+tag+' class="selected"></'+tag+'>')
                    )
                })
                it('should properly render ' + tag+' element with class name and text content', () => {
                    assert.equal(
                        byRender(markup[tag]({className:"selected"}, "text content")),
                        byText('<'+tag+' class="selected">text content</'+tag+'>')
                    )
                })
            }

        }


    })
})

