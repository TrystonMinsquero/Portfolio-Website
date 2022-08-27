const Portfolio = require('./portfolio.js');

module.exports.staticPages = {
    home: {
        styles: ['style.css', 'tabletsupport.css'],
        scripts: [],
        recentProjects: Portfolio.GetProjectsByName([
            'Tobor Party',
            'Hole Flounder',
            'Time DashKing',
        ]),
        aboutContent: Portfolio.quickAbout,
    },
    about: {
        aboutContent: Portfolio.aboutContent,
        styles: ['style.css', 'proj.css', 'tabletsupport.css'],
        scripts: ['project.js'],
    },
    portfolio: {
        portfolio: Portfolio.portfolio,
        games: Portfolio.games,
        projects: Portfolio.projects,
        styles: ['style.css', 'tabletsupport.css'],
        scripts: ['portfolioDisplay.js'],
    },
    resume: {
        styles: ['style.css', 'tabletsupport.css'],
        scripts: [],
    },
    contact: {
        styles: ['style.css', 'form.css', 'tabletsupport.css'],
        scripts: ['mail.js'],
    },
    404: {
        styles: ['style.css', '404.css', 'tabletsupport.css'],
        scripts: ['error404Handler.js'],
    },
};
