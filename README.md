# Tic-tac-toe server

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
http://localhost:3001

## TODO`s

Make AI moves smarter

    read borad to find opponent tags
        mark playerTag in path where 2 opponent tags exist
    if first run (no fields marked by playerTag)
        mark random empty field
    else
        read board to find player tags
        mark playerTag in path where most playerTags exist

Store high scores by name

    Redis
        Scores: {name, score}

Multiplayer

    Redis
        AvailablePlayers: {id, name}
        Board: {player1 , player2, fields, inviter}

    App
        Invatation list based on AvailablePlayers
        On invitation request, Board is created
        Will send requests in intervals to monitor changes in Board
        Each turn will go through exisiting logic to monitor events

## The general logic

POST /player:

    Accepts
    fields - current board field state
    playerTag - player identification "o"/"x"
    index - next move index

        Mark players move to fields
            by assigning playerTag to field array at index
        Counts playerTag in possible "paths"
            if a path contains above 3 fields with playerTag, win detected
        Search for empty slots
            if none found, it's a tie
        if none above is true, respond with new field state

POST /ai:

    Accepts
    fields - current board field state
    playerTag - player identification "o"/"x"

        Find the best next move
        Invoke player move with new index (used in /player)

Counts playerTag in possible "paths" steps:

    Generate a collection of possible "paths" by index (player move)
    Use these paths to read fields
    each read would look for a field.player property that equals playerTag
    if such exist, the path would inc. count and add index to path index collection

## The general architecture

    APIs:
        POST player
        POST ai

    tictac.handler:
        checking available events (win/tie/ongoing)
    tictac.state:
        logic to support tictac.handler phases
