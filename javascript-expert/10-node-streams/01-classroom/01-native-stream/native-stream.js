process.stdin.pipe(process.stdout)
.on('data', msg => console.log('data', msg))