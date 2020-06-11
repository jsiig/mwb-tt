# MWB Test Task

## ES6 questions
* I added comments indicating my thought processes and intent

### File Structure
I answered ES6 questions in Markdown.
`/es6-questions/q${n}.md` - variable n is question no.

## Vue app
* Using no dependencies other than vue itself (but still with build tools)
* Any commands provided here are for Linux/BSD/Mac (bash and compatible shells)

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


### Things I'm doing differently here from how I'd normally approach things
* Not using vuex because avoiding any dependencies and because this 
 is a tiny app that doesn't really need it
* Would normally use axios library for api calls (but avoiding dependencies here,
 also not necessary for simple get calls - fetch is just fine)
* Would normally use lodash or similar for debouncing scroll actions 
(or a pre-made infinite scroll library)
