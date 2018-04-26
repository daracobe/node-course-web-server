const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine','hbs');



// middleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) =>{
        if(error){
            console.log('Unable to append server.log');
        }
    });

    next();
});

/*app.use((req,res,next) =>{
    res.render('maintence.hbs');
});*/

// middleware
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>{
   // res.send('<h1> Hello world! </h1>');
   /* res.send({
        name: 'Dariana Contreras',
        likes: ['Reading',
            'Music'
        ]
    });*/
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
      
    });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad',(req,res) =>{
    res.send({
        code: '404',
        errormessage: 'Not found'
    })
});

app.listen(3000);