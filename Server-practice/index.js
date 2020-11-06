const Joi = require('joi')
const express = require("express")
//init express
const app = express()
//to use req.body
app.use(express.json());


//Get All  /courses
//Get /courses/:id
//Post /courses/:id + course object return added course object with new id
//Put  /courses/:id + course object returns updated course object


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
    if (!course) return res.status(404).send('The course with the given id was not found')
    res.send(course)
})


app.post('/api/courses', (req,res)=>{
     //Validate, if invalid return a 400 bad request 
     const {error} = validateCourse(req.body);

     if(error){
         // result.error contains details which has an array of error messages
         return res.status(400).send(error.details[0].message)
         
     }
    
    const course ={
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
})

app.put('/api/courses/:id', (req, res)=>{
    //look up courses, and if it doesn't exist return a 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found')

    //Validate, if invalid return a 400 bad request
    const {error} = validateCourse(req.body);
   

    if(error){
        // result.error contains details which has an array of error messages
        return res.status(400).send(error.details[0].message)
    }

    //Update course
    course.name =req.body.name
    res.send(course)

})

app.delete('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found')

    //Delete
    const index =courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)

})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    //returns array of error message objects
    return schema.validate(course);
}
//create an environment variable which changes with the host
//Terminal export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))
