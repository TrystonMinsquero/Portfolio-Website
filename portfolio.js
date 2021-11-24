const path = require('path');
const fs = require('fs');

//variables to use
let portfolio = [];
let games = [];
let projects = [];

const dirPath = path.join(__dirname, "Portfolio");

var files = fs.readdirSync(dirPath)

files.forEach(file => {
    const newProject = JSON.parse(fs.readFileSync(path.join(dirPath, file)));
    portfolio.push(newProject);
    if(newProject.layout === 'game')
        games.push(newProject);
    else
        projects.push(newProject);
});

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