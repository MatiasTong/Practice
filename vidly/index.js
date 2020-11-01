const express = require("express")
//init express
const app = express()

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]

// the callback function is called the route handler
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

//route parameters(/) are required and (?) query parameters are optional
// app.get('/api/courses/:id/:years', (req, res) => {
// res.send(req.query)
// res.send(req.params)
// }
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found')
    res.send(course)
})

//create an environment variable which changes with the host
//Terminal export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))
