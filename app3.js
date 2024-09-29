const http = require('http')
const server =  http.createServer((req, res)=> {
    if(req.url === '/') {
        res.write("hello world")
        res.end()
    }
    if(req.url === "/api/courses") {
        res.write(JSON.stringify([1,2,3,4]))
        res.end()
    }
})
// WE not doing this like it
// server.on('connection', (socket)=> {
//     console.log(socket, "New connection");
// })

server.listen(3000)
console.log('Listening on port 3000...')