const path = require('path');
const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();

// variables to use
const portfolio = [];
const games = [];
const projects = [];

// get all of Portfolio data

const dirPath = path.join(__dirname, 'Portfolio');

const projectTypeFolders = fs.readdirSync(dirPath);

projectTypeFolders.forEach((projectTypeFolder) => {
    fs.readdirSync(path.join(dirPath, projectTypeFolder)).forEach(
        (projectFolder) => {
            const projectFiles = fs.readdirSync(
                path.join(dirPath, projectTypeFolder, projectFolder)
            );
            const newProject = getProject(
                projectFiles,
                path.join(dirPath, projectTypeFolder, projectFolder)
            );
            portfolio.push(newProject);

            switch (projectTypeFolder.toUpperCase()) {
                case 'GAMES':
                    games.push(newProject);
                    break;
                case 'PROJECTS':
                    projects.push(newProject);
                    break;
                default:
                    console.log('projectTypeFolder Not Found');
            }
        }
    );
});

function getProject(projectFiles, projectPath) {
    //Parse through each file in project folder
    const newProject = { path: projectPath };
    projectFiles.forEach((file) => {
        const extension = file.split('.').pop(); //if file is a directory, will be name of directory
        switch (extension) {
            // append data.json data to newProject
            case 'json':
                let data = JSON.parse(
                    fs.readFileSync(path.join(projectPath, file))
                );
                Object.keys(data).forEach(
                    (key) => (newProject[key] = data[key])
                );
                break;
            // turn the markdown into html and save it to newProject
            case 'md':
                newProject.body = converter.makeHtml(
                    fs.readFileSync(path.join(projectPath, file)).toString()
                );
                break;
            // find the builds
            case 'builds':
                newProject.builds = {};
                const buildsAvail = fs.readdirSync(
                    path.join(projectPath, file)
                );
                buildsAvail.forEach(
                    (build) =>
                        (newProject.builds[build] = path.join(
                            projectPath,
                            file,
                            build
                        ))
                );
                newProject.buildsPath = path.join(projectPath, file);
                break;
            // assign images
            case 'img':
                newProject.images = {};
                const imagesAvail = fs.readdirSync(
                    path.join(projectPath, file)
                );
                imagesAvail.forEach(
                    (image) =>
                        (newProject.images[image] = path.join(
                            projectPath,
                            file,
                            image
                        ))
                );
                newProject.imagesPath = path.join(projectPath, file);
                break;
        }
    });

    // check if it has downloads
    newProject.hasDownloads = false;
    if (newProject.builds) {
        Object.keys(newProject.builds).forEach((build) => {
            const buildOS = build.toLocaleLowerCase();
            if (
                buildOS === 'windows' ||
                buildOS === 'mac' ||
                buildOS === 'linux'
            ) {
                newProject.hasDownloads = true;
            }
        });
    }

    return newProject;
}

// sort lists by order assigned in data
portfolio.sort((a, b) => b.order - a.order);
games.sort((a, b) => b.order - a.order);
projects.sort((a, b) => b.order - a.order);

// get about-content data
module.exports.aboutContent = converter.makeHtml(
    fs.readFileSync(path.join(__dirname, 'about-content.md')).toString()
);

// get quick-about data
module.exports.quickAbout = converter.makeHtml(
    fs.readFileSync(path.join(__dirname, 'quick-about.md')).toString()
);

module.exports.portfolio = portfolio;
module.exports.games = games;
module.exports.projects = projects;
