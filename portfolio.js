const path = require('path');
const fs = require('fs');
const showdown  = require('showdown')
const converter = new showdown.Converter();

//variables to use
let portfolio = [];
let games = [];
let projects = [];

const dirPath = path.join(__dirname, "Portfolio");

var projectTypeFolders = fs.readdirSync(dirPath);

projectTypeFolders.forEach(projectTypeFolder => {
    fs.readdirSync(path.join(dirPath, projectTypeFolder)).forEach(projectFolder => {
        const projectFiles = fs.readdirSync(path.join(dirPath, projectTypeFolder, projectFolder))
        const newProject = getProject(projectFiles, path.join(dirPath, projectTypeFolder, projectFolder));
        portfolio.push(newProject);
        switch(projectTypeFolder.toUpperCase()){
            case "GAMES": games.push(newProject); break;
            case "PROJECTS": projects.push(newProject); break;
            default: console.log("projectTypeFolder Not Found"); break;
        }
    })
});

//doubles project list
portfolio.forEach(project => portfolio.push(project));
games.forEach(project => games.push(project));
projects.forEach(project => projects.push(project));

function getProject(projectFiles, projectPath) {
    //Parse through each file in project folder
    var newProject = {path: projectPath};
    projectFiles.forEach(file => {
        const extension = file.split(".").pop(); //if file is a directory, will be name of directory
        switch(extension) {
            case "json": 
                let data = JSON.parse(fs.readFileSync(path.join(projectPath, file)));
                Object.keys(data).forEach(key => newProject[key] = data[key]);
            break;
            case "md": newProject.body = converter.makeHtml(fs.readFileSync(path.join(projectPath, file)).toString());
            break;
            case "builds": 
                newProject.builds = {};
                const buildsAvailable = fs.readdirSync(path.join(projectPath, file));
                buildsAvailable.forEach(build => newProject.builds[build] = path.join(projectPath, file, build));
                newProject.buildsPath = path.join(projectPath, file);
            break;
            case "img": 
                newProject.images = {};
                const imagesAvailable = fs.readdirSync(path.join(projectPath, file));
                imagesAvailable.forEach(image => newProject.images[image] = path.join(projectPath, file, image));
                newProject.imagesPath = path.join(projectPath, file);
            break;
        }
    })
    newProject.hasDownloads = false;
    if(newProject.builds) {
        Object.keys(newProject.builds).forEach(build => {
            if(build.toLocaleLowerCase() === "windows" || build.toLocaleLowerCase() === "mac" || build.toLocaleLowerCase() === "linux"){
                newProject.hasDownloads = true;
            }
        });
    }
    
    return newProject;
}



//Attempt to do asynch
/*
    //handling errors
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    let portfolio2 = []
    //listing all files using forEach
    files.forEach(function (file) {
        const filePath = path.join(dirPath, file);
        fs.readFile(filePath, function (error, content) {
            if(error) 
                return console.log('Unable to scan file: ' + error);
            portfolio2.push(JSON.parse(content));
        });
        console.log(portfolio)
    });
    console.log(portfolio2)
});

*/
// const getPortfolio = () => {
//     portfolio.forEach(element => {
//         console.log(element);
//     })
//     return portfolio;
// };

module.exports.portfolio = portfolio;
module.exports.games = games;
module.exports.projects = projects;