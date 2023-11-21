const { wget } = require('../dist')

const start = async() => {
    try {
        await wget().url('http://localhost').user('root').execute((m) => console.log('m: ', m) )
        
    } catch (error) {
        console.log('error', error)
    }
}
// console.log(wget)

start();
// process.exit(0)