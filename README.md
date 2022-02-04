# Portfolio Website

This is my personal website I made for showing my games and projects, in addtion to learn the basics of full-stack web development. The goal was to make a website where I can easily add and edit projects within this github repository to update my website.

try it out at www.trystonminsquero.com

A big thank you to [Rik Ghosh](https://github.com/RikGhosh487) for helping me with a lot of the frontend, he had done most of the css and frontend javascript applications. In addition to guiding me on what technologies to use and miscelanous work.

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
* For the frontend, used regular javascript, css, and html (handlebars) 

## Deployed using heroku

This allowed for easy and free deployment, just using [Kaffeine](https://kaffeine.herokuapp.com/) to make sure the app is always on. The only thing I pay for is the domain for the entire project. However, I was messing around a bit with other hosting options and created a dockerfile to test them out, but never ended up using it.

## Conclusion

You can hear about more details on the website itself, and anyone is free to use this as a template for their own website. This is more of a longterm work in progress and will have a steady stream of content updates as well as a place to expierment new ideas.

