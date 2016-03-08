# react-markup
[![Build Status](https://travis-ci.org/koluch/react-markup.svg)](https://travis-ci.org/koluch/react-markup)

Another one markup library for React.js inspired by hyperscript. It allows use valid JavaScript code instead of 
JSX, like this:

```js
import {h} from 'react-markup'

h("div",
    h("div#header.highlighted.hover",
        h("div.title", "People List")
    ),
    h("div.body", people.map( person => (
        h("div.person", {key:person.id}, person.name)
    ))),
    h("div#footer.hidden", "(footer content)")
)

div([
    div(".header.highlighted.hover",[
        div(".title", "People List")
    ]),
    div(".body", people.map( person => (
        div(".person", {key:person.id}, person.name)
    ))),
    div("#footer.hidden", "(footer content)")
])


// which analogue in JSX is:
<div>
    <div id="header" className="highlighted hover">
        <div>People list</div>
    </div>
    <div className="body">
        {
            people.map( person => (
                <div className="person" key={person.id}>{person.name}</div>
            )))
        }
    </div>
    <div id="footer" className="hidden">(footer content)</div>
</div> 
```

## Motivation

Facebook developers encourage everybody use JSX in React code. However, this approach has several disadvantages:

 - a lot of IDE's and text editors, which support JS syntax, work bad with JSX syntax
 
 - it could be harder to properly set up your build process to transpile from JSX and from ES6 at the same time
 
 - some people think, that mix of JS and JSX is harder to read  

## Advantages

This library was inspired by different hyperscript-like libraries, including
[react-hyperscript](https://github.com/mlmorg/react-hyperscript) and  
[virtual-hyperscript](https://github.com/Raynos/virtual-hyperscript), but it has several advantages:

* it is possible to pass child elements as array and as varargs, and semantic of these methods corresponds
to React.createElements semantics (e. g. it requires to pass key property for children, passed as array);

* it doesn't mutate properties (which is not true for [react-hyperscript](https://github.com/mlmorg/react-hyperscript));

* it faster than analogues.   

## More examples

Simple element:

```js
// JSX
<div>Text content</div>

// react-markup
h('div', 'Text content')
// ...or
div('Text content')
```

Div with class and id
```js
// JSX
<div className='highlighted' id='header'>
    Text content
</div> 

// react-markup
h('div#header.highlighted', 
    'Text content'
)
```

Passing children as varargs

```js
// JSX
<div className='container'>
    <div>Header</div>
    <div>Body</div>
</div> 

// react-markup
h('div.container', 
    h('div', 'Header'),
    h('div', 'Body'),
)
```

Passing children as array

```js
// JSX
<div className='container'>
    {
        items.map(x => (
            <div key={x.id}>{x.title}<div>
        ))
    }
</div> 

// react-markup
h('div.container', items.map(x => (
    h('div', {key:x.id}, x.title)
)))
```