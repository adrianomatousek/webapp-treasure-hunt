# webapp-treasure-hunt

This project has been developed for Computer Science module [ECM2434 - Group Software Engineering Project](https://github.com/adrianomatousek/webapp-treasure-hunt/blob/master/documentation/ECM2434/Module%20ECM2434%20(2019)%20Group%20Software%20Engineering%20Project.pdf) at the [University of Exeter](https://www.exeter.ac.uk). The coursework specification can be [found here](https://github.com/adrianomatousek/webapp-treasure-hunt/blob/master/documentation/ECM2434/ECM2434-project-spec-2020.pdf).

## Introduction
The Treasure Hunt webapp helps new students find their way around campus and learn about points of interest. In this game, gamekeepers (tutors) can define 'routes' for players (students) to follow. A route consists of a list of waypoints. Students can use clues to help them find where a waypoint is. Students can scan the QR code to verify they've found a waypoint.

## Showcase
- Maybe we could put a screen recording here of the app in use
- Or screen shots of various pages of the webapp

## Prerequisites
- Linux/Windows machine
- MariaDB
- Apache
- PHP 7.4
- GMAPS API KEY
- WAMP 3.2.0 (if you're on Windows)
- Docker (optional)

## Quick Setup - Docker (still WIP)
Quickly boot up a Docker container with everything preinstalled (Linux, Apache, MariaDB, PHP)
- Clone the repo `git clone https://github.com/adrianomatousek/webapp-treasure-hunt.git`
- CD into the cloned directory & boot up the Docker container `docker-compose up`

## Technical Overview
We are using a LAMP stack. For the frontend we use the Materialize CSS framework. jsQR for QR code scanning.

## Testing The Source Code - Quick Guide
You can access and run the Test Suite by following these steps: 
- Make sure you are logged onto the website,
- Open the test page, using the URL: https://thehunt.uk/TreasureHunt.php, 
- Open the Console with Developer Tools (by pressing F12 if you are on Google Chrome).

In the console, you will see the result for each individual test case, which will either say ‘Successful’ or ‘FAILED!’. There will be a summary after all test cases are completed, detailing how many test cases were passed and how many tests failed. If a test case fails, you should refer to the open source TestSuite.js file (webapp-treasure-hunt/www/html/TestSuite.js) and find the corresponding test that failed to investigate. Report any issues with this to the repository owner.

## Find Out More
| **Setup Guide** | **Process Documentation** | **Project & Community** |
| :-------------: | :-------------: | :-------------: |
| <a href="https://github.com/adrianomatousek/webapp-treasure-hunt/wiki/Setup-Guide">![](https://github.com/adrianomatousek/webapp-treasure-hunt/blob/master/documentation/images/icons/getting-started_icon.png)</a> | <a href="https://github.com/adrianomatousek/webapp-treasure-hunt/wiki/Process-Documentation">![](https://github.com/adrianomatousek/webapp-treasure-hunt/blob/master/documentation/images/icons/documentation_icon.png)</a> | <a href="https://github.com/adrianomatousek/webapp-treasure-hunt/wiki/Project-and-Community">![](https://github.com/adrianomatousek/webapp-treasure-hunt/blob/master/documentation/images/icons/contributing_icon.png)</a> |
| [Setup Guide](https://github.com/adrianomatousek/webapp-treasure-hunt/wiki/Setup-Guide) | [Process Documentation](https://github.com/adrianomatousek/webapp-treasure-hunt/wiki/Process-Documentation) | [Project and Community](https://github.com/adrianomatousek/webapp-treasure-hunt/wiki/Project-and-Community) |
| A step-by-step guide to running the Treasure Hunt webapp | Process documentation such as Requirement Analysis & how we collaborate as a team | About the open-source project, our community and how to contribute |


### [View the Trello Kanban board](https://trello.com/b/Yg87NVOQ/swe-coursework-kanban-board-group-l)


## Aknowledgements & Attributions
- [Material.io](material.io) for various icons
- [snowplow](https://github.com/snowplow/snowplow) for their excellent documentation, which we took inspiration from
- [Materialize](https://materializecss.com/) for their framework
- [jsQR](https://github.com/cozmo/jsQR) a javascript library to scan QR codes
