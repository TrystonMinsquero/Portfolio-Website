# Portfolio Website

This is my personal website I made for showing my games and projects, in addition to learning the basics of full-stack web development. The goal was to make a website where I can easily add and edit projects within this GitHub repository to update my website.

try it out at www.trystonminsquero.com

A big thank you to [Rik Ghosh](https://github.com/RikGhosh487) for helping me with a lot of the frontend, he had done most of the CSS and frontend JavaScript applications. In addition to guiding me on what technologies to use and miscellaneous work.

## How I made it

* Used Nodejs for the backend
  * I used this as it is one of the most popular, flexible, and easy to pickup
  * I didn't use any big frameworks for this and stuck with vanilla Javascript to get a solid foundation
  * For dependencies I used:
    * Express for routing and middleware
    * Express-handlebars so I could dynamically pass data to my HTML
    * Showdownjs to convert markdown into HTML, this was great so I can edit content straight in GitHub anywhere
    * Emailjs-com to send email without having to put secure data in the code
  * Used vanilla javascript to read files from the project directory for each project to generate the data. This allows me to drop in a project very easily for my future endeavors.
* For the frontend, used regular javascript, CSS, and HTML (handlebars) 

## Deployed using Heroku

This allowed for easy and free deployment, just using [Kaffeine](https://kaffeine.herokuapp.com/) to make sure the app is always on. The only thing I pay for is the domain for the entire project. However, I was messing around a bit with other hosting options and created a Dockerfile to test them out, but never ended up using it.

## Conclusion

You can hear more details on the website itself, and anyone is free to use this as a template for their website. This is more of a long-term work in progress and will have a steady stream of content updates as well as a place to experiment with new ideas.
