# MWB Test Task

## ES6 questions
* I added comments indicating my thought processes and intent

### File Structure
I answered ES6 questions in Markdown.
`/es6-questions/q${n}.md` - variable n is question no.

## Vue app
* Using NO dependencies other than vue itself - taking that VanillaJS and no frameworks 
requirement seriously - also excluding any external libraries - going to extreme lengths
to avoid dependencies
* (Still includes ionicons + google fonts via cdn - want it to look nice)

### Vue app question 2
You can enable it using
```js
    Vue.config.devtools = true
```
(done in `/vue-searchable-table-task/src/main.js`)


### Running:
```bash
cd vue-searchable-table-task
yarn install
yarn run serve
```

### Building for production:
```bash
cd vue-searchable-table-task
yarn install
yarn run build
```


### Normally I would...
* ...use vuex for data management
* ...use axios library for api calls (though not for something as basic as this)
* ...use lodash or similar for debouncing (not write my own)
* ...(probably) use a pre-made infinite scroll library
* ...use fewer CSS hacks, e.g. table header shadow
* ...use something like Bloodhound.js for searching on the client side __OR__
* ...do most of the search, filtering, etc. logic on the server side using
purpose-built tools

### Usually I already...
* write my own SCSS from scratch
* follow the same general Vue approaches (similar component composition) - however using 
`vuex` would reduce the size and complexity of the main components considerably and allow
for easier composition, as much of the logic would reside on that side

### Potential future improvements
* Add some useful tests

