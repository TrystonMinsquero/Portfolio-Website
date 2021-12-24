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

// set public folder as static
app.use(express.static(path.join(__dirname, 'public')));

// access public files for CSS, JS, Favicons, and Images
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/Builds', express.static(path.join(__dirname, 'public/Builds')));
app.use('/UnityTemplate', express.static(path.join(__dirname, 'public/UnityTemplate')));

// enable routing
app.use(express.urlencoded({ extended: false }));

var topThreeProjects = [];
Portfolio.portfolio.forEach(elem => {
    if(elem.title === 'Hole Flounder' || elem.title === 'Wyles Loop' || elem.title === 'Astrolothree') {
        topThreeProjects.push(elem);
    }
});

// routing

// home page routing
app.get('/', (_, res) => {
    res.render('home', {
        styles: ["style.css"],
        scripts: [],
        recentProjects: [
        topThreeProjects[0],
        topThreeProjects[1],
        topThreeProjects[2],
        ]
    });
});

// project routing
Portfolio.portfolio.forEach(elem => {
    if(elem.permalink) {
        // project page routing
        app.get('/' + elem.permalink, (_, res) => res.render('project', {
            project: elem,
            styles: ['style.css'],
            scripts: []
        }));
        
        // add webGL routing (if it exists)
        if(elem.builds){
            app.use('/' + elem.permalink + '/' + 'builds', express.static(elem.buildsPath));
            if(elem.builds['WebGL']) {
                app.get('/' + elem.permalink + '/WebGL', (_, res) => res.sendFile(path.join(elem.builds['WebGL'], 'index.html')));
            }
        }

        // make all images static
        if(elem.images)
            app.use('/' + elem.permalink + '/' + 'img', express.static(elem.imagesPath));
    }
});

// GET request for portfolio
app.get('/portfolio', (_, res) => 
    res.render('portfolio', {
        portfolio: Portfolio.portfolio,
        games: Portfolio.games,
        projects: Portfolio.projects,
        styles: ["style.css"],
        scripts: ["portfolioDisplay.js"]
    }
    ));

// GET request for resume
app.get('/resume', (_, res) => 
    res.render('resume', {
        styles: ["style.css"],
        scripts: []
    }));

// GET request for contact
app.get('/contact', (_, res) => 
    res.render('contact', {
        styles: ["style.css"],
        scripts: ["mail.js"]
    }));


// redirection adjustment handlers
app.get('/portfolio/', (_, res) => res.redirect('/portfolio'));
app.get('/home', (_, res) => res.redirect('/'));


// 404 middleware
app.use((_, res) => {
    res.status(404).render('404', {
        styles: ['style.css', '404.css'],
        scripts: ['error404Handler.js']
    });
});

// activate on PORT
app.listen(PORT, () => {
    return console.log(`Server started on PORT ${PORT}`);
});
