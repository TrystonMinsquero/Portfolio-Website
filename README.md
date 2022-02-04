# Portfolio Website

This is my personal website I made for showing my projects and to learn the basics of full-stack web development. The goal was to make a website where I can easily add and edit projects within this github repository to update my website.

try it out at www.trystonminsquero.com

## How I made it

* Used Nodejs for the backend
  * I used this as it is one of the most popular, flexable, and easy to pickup
  * I didn't use any big frameworks for this and stuck with vanilla Javascript to get a solid foundation
  * For dependencies I used:
    * Express for routing and middleware
    * Express-handlebars so I could dynamically pass data to my HTML
    * Showdownjs to convert markdown into HTML, this was great so I can edit content straight in github anywhere
    * Emailjs-com to send email without having to put secure data in the code
  * Used vanilla javascript to read files from the project directory for each project to generate the data. This allows me to drop in a project very easily for my future endevors.
* Used regular javascript, css, and html (handlebars) for the frontend

## Deployed using heroku

This allowed for easy and free deployment, just using [Kaffeine](https://kaffeine.herokuapp.com/) to make sure the app is always on. The only thing I pay for is the domain for the entire project. However, I was messing around a bit with other hosting options and created a dockerfile to test them out.

