// imports - must use EcmaScript syntax
const path = require('path');
const Portfolio = require('./portfolio');
const fs = require('fs');
const Handlebars = require('handlebars');

const staticPages = require('./static-data.js').staticPages;
const staticPath = path.join(__dirname, 'dist');

const mainTemplate = Handlebars.compile(
    fs.readFileSync(
        path.join(__dirname, 'views', 'layouts', 'main.handlebars'),
        'utf8'
    )
);

function buildStaticSite() {
    if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath);
    }

    // copy public folder to dist
    copyFolderRecursiveSync(
        path.join(__dirname, 'public', 'css'),
        path.join(staticPath)
    );
    copyFolderRecursiveSync(
        path.join(__dirname, 'public', 'img'),
        path.join(staticPath)
    );
    copyFolderRecursiveSync(
        path.join(__dirname, 'public', 'js'),
        path.join(staticPath)
    );

    // build static pages
    for (const page in staticPages) {
        const fileName = page === 'home' ? 'index.html' : page + '.aa';
        buildHTML(page, path.join(staticPath, fileName), staticPages[page]);
    }

    // project routing
    Portfolio.portfolio.forEach((elem) => {
        if (elem.permalink) {
            buildHTML(
                'project',
                path.join(staticPath, elem.permalink) + '.html',
                {
                    project: elem,
                    styles: ['style.css', 'proj.css', 'tabletsupport.css'],
                    scripts: ['project.js'],
                }
            );

            const projectPath = path.join(staticPath, elem.permalink);

            if (!fs.existsSync(projectPath) && (elem.builds || elem.images))
                fs.mkdirSync(projectPath);

            if (elem.builds) {
                // copy all builds
                copyFolderRecursiveSync(elem.buildsPath, projectPath);
            }

            // make all images static
            if (elem.images)
                copyFolderRecursiveSync(elem.imagesPath, projectPath);
        }
    });
}

function copyFileSync(source, target) {
    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

function buildHTML(templateName, target, data) {
    var template = Handlebars.compile(
        fs.readFileSync(
            path.join(__dirname, 'views', templateName + '.handlebars'),
            'utf8'
        )
    );
    var html = mainTemplate({
        body: template(data),
        styles: data.styles,
        scripts: data.scripts,
    });
    fs.writeFileSync(target, html);
}

buildStaticSite();
module.exports.buildStaticSite = buildStaticSite;
