// imports - must use EcmaScript syntax
const express = require('express');
const path = require('path');
const Portfolio = require('./portfolio');
const links = require('./redirect-links.json');
const { create } = require('express-handlebars');
const { redirect } = require('express/lib/response');

// initalize app
const app = express();
const PORT = process.env.PORT || 5000;
const hbs = create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        bar() {
            return foo;
        },
    },
});

//express handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// set public folder as static
app.use(express.static(path.join(__dirname, 'public')));

// access public files for CSS, JS, Favicons, and Images
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// enable routing
app.use(express.urlencoded({ extended: false }));

var topThreeProjects = new Array(3);
Portfolio.portfolio.forEach((elem) => {
    switch (elem.title) {
        case 'Tobor Party':
            topThreeProjects[0] = elem;
            break;
        case 'Hole Flounder':
            topThreeProjects[1] = elem;
            break;
        case 'Time DashKing':
            topThreeProjects[2] = elem;
            break;
    }
});

// routing

const staticPages = require('./static-data.js').staticPages;

for (const page in staticPages) {
    if (page === 'home') {
        app.get('/', (_, res) => {
            res.render(page, staticPages[page]);
        });
    } else {
        app.get('/' + page, (_, res) => {
            res.render(page, staticPages[page]);
        });
    }
}

// project routing
Portfolio.portfolio.forEach((elem) => {
    if (elem.permalink) {
        // project page routing
        app.get('/' + elem.permalink, (_, res) =>
            res.render('project', {
                project: elem,
                styles: ['style.css', 'proj.css', 'tabletsupport.css'],
                scripts: ['project.js'],
            })
        );

        // add webGL routing (if it exists)
        if (elem.builds) {
            app.use(
                '/' + elem.permalink + '/builds',
                express.static(elem.buildsPath)
            );
            if (elem.builds['WebGL']) {
                app.get('/' + elem.permalink + '/WebGL', (_, res) =>
                    res.sendFile(path.join(elem.builds['WebGL'], 'index.html'))
                );
            }
        }

        // make all images static
        if (elem.images)
            app.use(
                '/' + elem.permalink + '/img',
                express.static(elem.imagesPath)
            );
    }
});

// get request redirect for other sites
links.forEach((link) => {
    app.get('/' + link.title, (_, res) => res.redirect(link.redirect));
});

// redirection adjustment handlers
app.get('/portfolio/', (_, res) => res.redirect('/portfolio'));
app.get('/home', (_, res) => res.redirect('/'));

// redirect games and projects with proper index
app.get('/games', (_, res) => {
    res.cookie('index', '0');
    res.redirect('/portfolio');
});
app.get('/projects', (_, res) => {
    res.cookie('index', '1');
    res.redirect('/portfolio');
});

// 404 middleware
app.use((_, res) => {
    res.status(404).render('404', {
        styles: ['style.css', '404.css', 'tabletsupport.css'],
        scripts: ['error404Handler.js'],
    });
});

// activate on PORT
app.listen(PORT, () => {
    return console.log(
        `Server started on PORT ${PORT} \nAccess on http://localhost:${PORT}`
    );
});
