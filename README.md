## hopamchuan

This module will help you to get API response from website https://www.hopamchuan.com/

examples

```javascript
const hpc = require('hopamchuan')

hpc.get('13710', (song) => {
    console.log(song)
})
```

---

```javascript
const hpc = require('hopamchuan')

hpc.autocomplete('giexu', (songs) => {
    console.log(songs)
})
```
