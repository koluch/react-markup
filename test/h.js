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
let h = markup.h

let common = require('./_common');
let byText = common.byText
let byRender = common.byRender

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

        it('should properly parse id selector', () => {
            assert.equal(
                byRender(
                    h("div#container")
                ),
                byText(
                    '<div id="container"></div>'
                )
            );
        });

        it('should properly parse class name selector', () => {
            assert.equal(
                byRender(
                    h("div.selected")
                ),
                byText(
                    '<div class="selected"></div>'
                )
            );
        });

        it('should properly parse multiple class name selector', () => {
            assert.equal(
                byRender(
                    h("div.selected.highlighted")
                ),
                byText(
                    '<div class="selected highlighted"></div>'
                )
            );
        });

        it('should properly parse id and class name selector', () => {
            assert.equal(
                byRender(
                    h("div#container.selected")
                ),
                byText(
                    '<div class="selected" id="container"></div>'
                )
            );
        });

        it('should properly parse id and multiple class name selector', () => {
            assert.equal(
                byRender(
                    h("div#container.selected.highlighted")
                ),
                byText(
                    '<div class="selected highlighted" id="container"></div>'
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

        it('should properly work with null and undefined children', () => {
            assert.equal(
                byRender(
                    h("div",
                        {className:'item'},
                        null,
                        undefined,
                        "text"
                    )
                ),
                byText(
                    '<div class="item"><span>text</span></div>'
                )
            );
        });
    })

})

