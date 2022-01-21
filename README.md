# Schmemory(Memory) Game

This is a card game where pairs of cards contain images, such that for each card, there is exactly one other card with the same image. The cards are placed face-down on a surface. A player chooses any two cards and flips them face-up. If the images match, they will stay face-up — otherwise they should be flipped back. This continues until all cards are face-up.

# Schmemory example

This is an unfinished example implementation of the schmemory game to help you get started. It includes babel, sass, webpack and webpack-dev-server, but you are not required to touch those.
The javascript is in a class-based es5 syntax, but you do not need to adhere to this when you are adding your own code.

*You may add, refactor and re-arrange code, but you shouldn't remove any of it. Base your solution on the provided code.*

## The initial code consists of the following files:

- ``src/index.html`` contains the html.
- ``src/scripts/index.js`` contains the javascript code.
- ``src/styles/index.scss`` contains the styles.
- The ``example-image-server`` folder contains a simple image server that generates and serves images, but you can ignore that for now. 

# Prerequisites
You will need Node installed on your machine for this project to work. You can download that here if you don't have it installed already: https://nodejs.org/en/ (Choose the LTS version). 

# Running

In the root of this directory, open a terminal/command-line(View->Terminal in most IDEs) and run the following: 
1. ``npm install`` : (First time only) Installs the required npm packages the example image server and the client
2. ``npm run start-all``: Runs the image-server and the client simultaneously
This will also auto-reload your project when you save any changes made. Only ``npm run start-all`` is required after the first time if you stop or close the project.

Once it is running the game should open automatically in a browser (if not you can view it by opening http://localhost:3001/). Note that it will initially display 4 cards, but it is not possible to click them yet.
# Tasks
First you need to complete the TODO-comments in ``src/scripts/index.js``. They are numbered in the recommended order. After completing 1 & 2 you should be able to test flipping your cards by clicking them in the browser.

There are a lot of areas you can choose to focus on after you've implemented the basic functionality if you have more time! Here is a list of suggestions (You are only supposed to do one or two of these)
1. Improve/fix gameplay. (there are still a number of things that could be fixed and improve to play the game as expected) 
2. Points, timers, scoreboards
3. Responsive design
4. UI elements like buttons, tooltips, end- and error-states
5. Accessibility 
6. Fancy look and feel
7. Adding your own images and an extra endpoint to serve them from

*Remember that you should not spend more than 3 hours on this project at the most.*
## What did you focus on?
- Please add a list here of the ideas you tried to implement. Optionally add a sentence or two about what you would improve further if you had more time.
- 

# If you need help, got stuck or have feedback
If you need any help or have some feedback about this test, please contact the person that sent you this test, or send an email to ole-martin.grotterud@schibsted.com.
