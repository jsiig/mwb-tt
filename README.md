# MWB Test Task

## ES6 questions
* I added comments indicating my thought processes and intent

### File Structure
I answered ES6 questions in Markdown.
`/es6-questions/q${n}.md` - variable n is question no.

## Vue app
* Using NO dependencies other than vue itself - taking that VanillaJS and no frameworks 
requirement seriously
* Going to extreme lengths to avoid dependencies - only Vue and build tools and fonts+icons
* (Still includes ionicons + google fonts via cdn - needs to look nice)

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
* follow the same general Vue approaches (component composition) - however using 
`vuex` would reduce the size and complexity of the main components considerably and
allow for easier composition, as much of the logic would reside on that side

