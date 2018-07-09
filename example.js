const mx = require('./index')

mx.get('13710', (lists) => {
    console.log(lists)
})
mx.autocomplete('giexu', (lists) => {
    console.log(lists)
})
