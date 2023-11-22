const { join } = require('path')
const { wget } = require('../dist')


console.log('333', )
const start = async() => {
    try {
        await wget('https://releases.ubuntu.com/22.04.3/ubuntu-22.04.3-desktop-amd64.iso')
        .tries(3)
        .continue()
        .output('')
        .execute((m) => console.log('m: ', m) )
        
    } catch (error) {
        console.log('error', error)
    }
}
// console.log(wget)

start();
// process.exit(0)