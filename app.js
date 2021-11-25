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
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/Builds', express.static(path.join(__dirname, 'public/Builds')));
app.use('/UnityTemplate', express.static(path.join(__dirname, 'public/UnityTemplate')));

app.use(express.urlencoded({ extended: false }));

// routing
app.get('/', (req, res) => {
    res.render('home', {
        recentProjects: [
        Portfolio.portfolio[1],
        Portfolio.portfolio[0],
        Portfolio.portfolio[1],
        ]
    });
});

Portfolio.portfolio.forEach(element => {
    if(element.permalink) {
        app.get("/" + element.permalink, (_, res) => res.render('project', {
            project: element,
            hasDownloads: (element.builds && (element.builds.indexOf('WebGL') >= 0 && element.builds.length > 1) || element.builds.indexOf('WebGL') < 0),
            webGLPath: ((element.builds && element.builds.indexOf('WebGL') >= 0) ? "/Builds/" + element.title + "/WebGL/" : undefined),
            windowsPath: (element.builds && element.builds.indexOf('Windows') >= 0) ? "/Builds/" + element.title + "/Windows/" : undefined,
        }));
    }
});

app.get('/portfolio', (_, res) => 
    res.render('portfolio', {
        portfolio: Portfolio.portfolio,
        games: Portfolio.games,
        projects: Portfolio.projects
    }
    ));
app.get('/portfolio/', (_, res) => res.redirect('/portfolio'));
app.get('/home', (_, res) => res.redirect('/'));


//404 middleware
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  })

app.listen(PORT, () => {
    return console.log(`Server started on PORT ${PORT}`);
});
