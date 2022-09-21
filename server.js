require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const {students} = require('./exam-info')

hbs.registerPartials(__dirname + '/views/partials');


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// 1: in the home,list all the students who took the exam (list all the students)

app.get('/', (req, res) => {
  res.render('full-list.hbs', {students})
})



// 2: in the '/results' list all the students who passed the test and their score.
// Also, students should be in descending order based on their score.

app.get('/results', (req, res) => {
  let filterStudents = students.filter((students)=>{
    return students.hasPassed;
  })
 
  filterStudents.sort((a, b) => a.score - b.score )
  res.render('results.hbs', {students: filterStudents})
})

// ... Your code here

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}.`)
);
