"use strict";
/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 06.03.2016 15:36
 */
let assert = require('chai').assert;

let markup = require('../dist/index')
let ReactDOMServer = require('react-dom/server')
let h = markup.h

function byText(str) {
    return str.replace(/\n/, "").replace(/>\s+</g, "><").trim()
}

function byRender(elem) {
    let str = ReactDOMServer.renderToString(elem);
    // Delete data-reactid, except key parts specified by user
    str = str.replace(/data-reactid="\.[^\$"]*/g, 'data-reactid="')
    str = str.replace(/data-reactid="\$/g, 'data-reactid="')
    str = str.replace(/\s?data-reactid=""/g, '')
    // Delete checksum attribute
    str = str.replace(/\s?data-react-checksum="[^"]*"/g, '')
    return str;
}

describe('react-markup', () => {
    describe("h", () => {
        it('should properly rendered empty div', () => {
            assert.equal(
                byRender(
                    h("div")
                ),
                byText(
                    '<div></div>'
                )
            );
        });

        it('should properly rendered empty div with class name', () => {
            assert.equal(
                byRender(
                    h("div", {className: "header"})
                ),
                byText(
                    '<div class="header"></div>'
                )
            );
        });

        it('should properly rendered empty span with class name and text content', () => {
            assert.equal(
                byRender(
                    h("span", {className: "header"}, "text content")
                ),
                byText(
                    '<span class="header">text content</span>'
                )
            )
        });

        it('should properly rendered div with class name and vararg children', () => {
            assert.equal(
                byRender(
                    h("div", {className: "header"},
                        h("span", "Some"),
                        h("span", "Text")
                    )
                ),
                byText(
                    '<div class="header">' +
                    '    <span>Some</span>' +
                    '    <span>Text</span>' +
                    '</div>'
                )
            )
        });

        it('should properly rendered div without attributes and vararg children', () => {
            assert.equal(
                byRender(
                    h("div",
                        h("span", "Some"),
                        h("span", "Text")
                    )
                ),
                byText(
                    '<div>' +
                    '    <span>Some</span>' +
                    '    <span>Text</span>' +
                    '</div>'
                )
            );
        });


        it('should properly rendered div without attributes and children as array', () => {
            assert.equal(
                byRender(
                    h("div", [
                        h("span", {key: "id48"}, "Child 1"),
                        h("span", {key: "id52"}, "Child 2")
                    ])
                ),
                byText(
                    '<div>' +
                    '    <span data-reactid="id48">Child 1</span>' +
                    '    <span data-reactid="id52">Child 2</span>' +
                    '</div>'
                )
            );
        });

        it('should properly rendered div with class name and children as array', () => {
            assert.equal(
                byRender(
                    h("div", {className: "header"}, [
                        h("span", {key: "id48"}, "Child 1"),
                        h("span", {key: "id52"}, "Child 2")
                    ])
                ),
                byText(
                    '<div class="header">' +
                    '    <span data-reactid="id48">Child 1</span>' +
                    '    <span data-reactid="id52">Child 2</span>' +
                    '</div>'
                )
            );
        });

        it('should properly rendered div with children passed in different ways', () => {
            assert.equal(
                byRender(
                    h("div", [
                        h("span", {key: "id48"}, "Child 1"),
                        h("span", {key: "id52"}, "Child 2")
                    ], "header text")
                ),
                byText(
                    '<div>' +
                    '    <span data-reactid="id48">Child 1</span>' +
                    '    <span data-reactid="id52">Child 2</span>' +
                    '    <span>header text</span>' +
                    '</div>'
                )
            );
        });

        it('should properly rendered div with class name and arguments passed in different ways', () => {
            assert.equal(
                byRender(
                    h("div", {className: "header"}, [
                        h("span", {key: "id48"}, "Child 1"),
                        h("span", {key: "id52"}, "Child 2")
                    ], "header text")
                ),
                byText(
                    '<div class="header">' +
                    '    <span data-reactid="id48">Child 1</span>' +
                    '    <span data-reactid="id52">Child 2</span>' +
                    '    <span>header text</span>' +
                    '</div>'
                )
            );
        });
    })

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
            "time", "title", "tr", "track", "tt", "u", "ul", "_var", "video", "wb"]

        let emptyTags = ["area","base","br","col","embed","menuitem","hr","img","input","keygen","link",
        "meta","param","source", "track", "textarea"]


        for(let i in tags) {
            let tag = tags[i];

            if(tag === "_var") {
                it('should properly render  empty var element', () => {
                    assert.equal(byRender(markup._var("text content")), byText('<var>text content</var>'))
                })
            }
            else if(tag === "textarea") {
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

