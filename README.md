# Tic-tac-toe App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## TODO`s

Login page

    requesting for a name
    name will be stored in state
    basic route navigation would be nice

High scores popup

Available players popup

Waiting opponent response overlay

## The general logic

Contains the following states

    Fields
        indicates players/opponent moves and events
    allowClicks
        pause clicks on event - win/tie
    players
        scores
    aiTurn
        trigger to initiate ai turn reuqest

## The general architecture

Layout -> Tictac.page
uses tictac.hook for states
