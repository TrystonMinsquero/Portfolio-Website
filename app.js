// imports - must use EcmaScript syntax
const express = require('express');
const path = require('path');
const Portfolio = require('./portfolio');
const { create } = require('express-handlebars');



// initalize app
const app = express();
const PORT = process.env.PORT || 5000;
const hbs = create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        bar() { return foo; }
    }
});

//express handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "./views");

// console.log("Porfolio length: " + Portfolio.portfolio.length);
// console.log("Games length: " + Portfolio.games.length);
// console.log("Projects length: " + Portfolio.projects.length);

// set public folder as static
app.use(express.static(path.join(__dirname, 'public')));

// access public files for CSS, JS, Favicons, and Images
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/Builds', express.static(path.join(__dirname, 'public/Builds')));
app.use('/UnityTemplate', express.static(path.join(__dirname, 'public/UnityTemplate')));


app.use(express.urlencoded({ extended: false }));

var topThreeProjects = [];
Portfolio.portfolio.forEach(element => {
    if(element.title === "Hole Flounder" || element.title === "Wyles Loop" || element.title === "Astrolothree") {
        topThreeProjects.push(element);
    }
});

// routing
app.get('/', (req, res) => {
    res.render('home', {
        recentProjects: [
        topThreeProjects[0],
        topThreeProjects[1],
        topThreeProjects[2],
        ]
    });
});

Portfolio.portfolio.forEach(element => {
    if(element.permalink) {
        //if(element.builds) console.log(`${element.title} has embeddedwebgl: ` + element.builds.includes('EmbeddedWebGL'));
        app.get("/" + element.permalink, (_, res) => res.render('project', {
            project: element
        }));
        
        if(element.builds){
            app.use('/' + element.permalink + '/' + "builds", express.static(element.buildsPath));
            if(element.builds['WebGL']){
                // app.use('/TemplateData', express.static(path.join(element.builds['WebGL'], 'TemplateData')));
                // app.use('/Build', express.static(path.join(element.builds['WebGL'], 'Build')));
                app.get("/" + element.permalink + '/WebGL', (_, res) => res.sendFile(path.join(element.builds['WebGL'],'index.html')));
            }
        }
        if(element.images)
            app.use('/' + element.permalink + '/' + "img", express.static(element.imagesPath));
        
    }
    
});

app.get('/portfolio', (_, res) => 
    res.render('portfolio', {
        portfolio: Portfolio.portfolio,
        games: Portfolio.games,
        projects: Portfolio.projects
    }
    ));
app.get('/resume', (_, res) => res.sendFile(path.join(__dirname, 'resume.html')));
app.get('/contact', (_, res) => res.sendFile(path.join(__dirname, 'contact.html')));


app.get('/portfolio/', (_, res) => res.redirect('/portfolio'));
app.get('/home', (_, res) => res.redirect('/'));


//404 middleware
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  })

app.listen(PORT, () => {
    return console.log(`Server started on PORT ${PORT}`);
});
