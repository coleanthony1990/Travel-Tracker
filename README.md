<a name="readme-top"></a>

# Around - Travel Tracker

## Table of Contents
- [About The Project](#about-the-project)
- [Project Spec](#project-spec)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [Reflections](#reflections)

---

## About The Project

Around is a travel tracking application. This application can show a user's travel plans(past, future, and pending) based on a login username. If the user was to login in with the username, "traveler25", and the password, "travel", they would be brought to Leighton Doerrling's travel page. from here a user can see a display of trips as well as click "New Trip" to book a trip based on a set of inputs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Spec
Travel Tracker is an application built in week 12 of the [Turing School of Software and Design](https://turing.edu/) front-end engineering program. The goals of this [project](https://frontend.turing.edu/projects/travel-tracker.html) were to:

* Create a robust testing suite using TDD
* Generate and display user data through data manipulation
* Utilize Lighthouse and Wave for accessibility
* Make network requests to API endpoints to retrieve and manipulate data as well as post data
* Implement error handling 
* Implement third party packages


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
[![DAY.JS](https://img.shields.io/static/v1?label=&message=DAY.JS&color=%23f57242&style=for-the-badge)](https://https://day.js.org/en/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
# Getting Started
You can find the project [here](https://github.com/coleanthony1990/Travel-Tracker.git) and follow the instructions below to get started.
  

### Installation
1. Clone the repo
   ```sh
   git clone git@github.com:emilyjmiles/fitlit-group-project.git
   ```
2. Install NPM packages
   ```sh
   npm install
   npm start
   ``` 
3. Clone down the api repo
   ```sh
  git clone git@github.com:turingschool-examples/travel-tracker-api.git
   ```
4. Install api NPM packages
   ```sh
   npm install
   npm start
   ``` 
5. Enter the following url in your browser: http://localhost:8080/
6. Explore the website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
* The program displays user data through individual trip cards and the user can also enter a new trip and see that trip displayed among their other trip cards.
<!-- <img width="1428" alt="Screen Shot 2022-09-04 at 12 14 24 PM" src="https://user-images.githubusercontent.com/94808267/188327742-03ee3310-d07a-498b-8213-637de49ab7ef.png"> -->

| Destktop View | Mobile View |
|---------------|-----------------|
<img src="https://media.giphy.com/media/6QMupVufGnhGwmbZpj/giphy.gif" width=100%>|<p align="center"><br/><img src="https://media.giphy.com/media/5D3KvzWgqlYy7nBR5x/giphy.gif" width=77%></p>

New feature ideas: 
- [x] During Part Two of the project:
    - [x] The activity box will contain a chart that displays the user's daily activity.
    - [x] Add a weekly graph of the users activity.
    - [x] A user will be able to add data to their hydration, sleep, or activity.
    - [x] A user will be able to see the comparison of their data to all the users average data.
- [x] The friends buttons will be clickable to display their information instead of the user that appeared when the page loaded. 
- [x] The friends hydration and sleep information can be displayed in a box as an average between them.
- [x] The user will be able to toggle between different sets of charts.
- [x] The user will be able to change the weekly data projected in the charts.
- [x] The user details is hidden and viewable after a click on their profile icon.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing
We utilized TDD to create our project using [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
[![Contributors][contributors-shield]][contributors-url]

Emily Miles - [LinkedIn](https://www.linkedin.com/in/emilyjmiles/) - ms.emily.j.miles@gmail.com

Hannah Celemen - [LinkedIn](https://www.linkedin.com/in/hannah-celemen/) - hclaire.celemen@gmail.com

Cole Anthony - [LinkedIn](https://www.linkedin.com/in/cole-edwin-anthony/) - cole.edwin.anthony@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
The following resources helped us build this project:

[![MDN Docs][MDN-shield]][MDN]
[![Chart.js][Charts]][charts-url]
[![Chart.js-tutorials][youtube-shield]][charts-youtube-link]
[![Turing School](https://img.shields.io/badge/Turing_School-030303?style=for-the-badge)](https://turing.edu/)
[![Chai Assertion Library](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)](https://www.chaijs.com/api/bdd/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Reflections
We worked on making the UI/UX design of our page to be responsive to ensure that it is easy to navigate and viewable on any device. We wanted our page to be user accessible by carefully choosing the font and color scheme, as well as using semantic html for screen reader accessibility.

In Part 1, we learned how to retrieve data from provided Endpoints to create our bar charts. It required a lot of research and how to properly configure them to look uniform with our page. We hope to project user data in other chart forms that will more concisely show the user their progress.

At the start of this project, we were all concerned about the size and complexity of the work that needed to be done. To our surprise, the experience was much smoother and less stressful than we had anticipated. We feel this was due to our continuous communication and supportive teamwork throughout the project.

In Part 2, we learned how to work with more complex data sets, work with a local server, how to post data to a server and we built upon our knowledge of how to display the data we worked with in our charts. As our styling was mostly finished by Part 1, this time for Part 2 was mostly spent improving functionality and making sure our validations were working properly. We implemented preventative error handling in our input fields so only valid data to be posted to the server, as well as handling for failed HTTP requests and server errors.

We continued our excellent communication and support of one another to enhance our working conditions. We successfully completed this project working asynchronously and holding stand-ups to discuss our work to verify everyone understood the changes before pushing them up. We are all very proud of the work we did with this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[youtube-shield]: https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white
[charts-youtube-link]: https://www.youtube.com/c/ChartJS-tutorials
[MDN-shield]: https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white
[MDN]:https://developer.mozilla.org/en-US/
[charts-url]: https://www.chartjs.org/docs/latest/
[Charts]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[contributors-shield]: https://img.shields.io/badge/Contributors-3-2ea44f?style=for-the-badge
[contributors-url]: https://github.com/emilyjmiles/fitlit-group-project/graphs/contributors

[product-screenshot]: images/screenshot.png

