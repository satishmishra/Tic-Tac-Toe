
class GameView extends Backbone.View

  el: '#tic-tac-toe'
  down: "mousedown"
  up: "mouseup"

  selectors:
    grid: "#grid"
    gridLengthOption: "#grid-length-option"

  events:
    'change select': 'changeGridView'
    'mouseup input.button': 'newGame'

  initialize: (options = {}) ->
    @moveCount = 0
    @gridSize = 3
    @board=  new Array(9)
    @renderGridLengthOptions()
    @renderGrid(3)

  setGame: (length)->
    @moveCount = 0
    @gridSize = length
    squares = document.getElementsByTagName("td")
    s = 0

    while s < squares.length
      squares[s].addEventListener @down, ((evt) =>
        @squareSelected evt, @getCurrentPlayer()
        return
      ), false
      s++
    
    @createBoard()
    @setInitialPlayer()

  renderGrid: (length = 3) ->
    width = length*100
    gridTemplate = _.template $("#grid-template").html(), {length} 
    $(@selectors.grid).html gridTemplate
    $("#grid table").css('width', width)
    @setGame(length)
    return this


  renderGridLengthOptions: ()->
    gridLengthOptionTemplate = _.template $("#grid-length-option-template").html(), {length: 100}
    $(@selectors.gridLengthOption).html gridLengthOptionTemplate 

  changeGridView: (e)->
    length = $(e.currentTarget).val()
    @board = new Array(parseInt(length) * parseInt(length))
    @renderGrid length

  createBoard: ->
    @moveCount = 0
    i = 0

    while i < @board.length
      @board[i] = ""
      document.getElementById(i).innerHTML = ""
      i++

  squareSelected: (evt, currentPlayer) ->
    square = evt.target
    
    if square.className.match(/marker/) or $(square).find('div')?.attr('class')?.match(/marker/)
      alert "Sorry, that space is taken!  Please choose another square."
    
    else
      @fillSquareWithMarker square, currentPlayer
      @updateBoard square.id, currentPlayer
      @checkForWinner square.id, currentPlayer
      @switchPlayers()


  fillSquareWithMarker: (square, player) ->
    marker = document.createElement("div")
    
    marker.className = player + "-marker"
    square.appendChild marker


  updateBoard: (index, marker) ->
    @board[index] = marker
    @moveCount++
    
  declareWinner: (currentPlayer)->
    @newGame()  if confirm("We have a #{currentPlayer} as a winner!  New game?")

  
  checkForWinner: (index, currentPlayer)->
    row = Math.floor(index/@gridSize)
    col = index%@gridSize

    # check for row
    i = 0
    while i < @gridSize
      if @board[row*@gridSize+i] isnt currentPlayer
        break 
      if i is @gridSize-1
        @declareWinner(currentPlayer)
        return
      i++
    # check for col
    j = 0
    while j < @gridSize
      if @board[col+@gridSize*j] isnt currentPlayer
        break 
      if j is @gridSize-1
        @declareWinner(currentPlayer)
        return
      j++

    # check for diagonal
    if row is col   # it means we are in col
      k = 0
      while k < @gridSize
        if @board[k*@gridSize+k] isnt currentPlayer
          break 
        if k is @gridSize-1
          @declareWinner(currentPlayer)
          return
        k++

    # check for anti diagonal
    l = 0
    while l < @gridSize
      if @board[l*(@gridSize-1)+(@gridSize-1)] isnt currentPlayer
        break 
      if l is @gridSize-1
        @declareWinner(currentPlayer)
        return
      l++

    if @moveCount is (Math.pow(@gridSize, 2)-1)
      @newGame()  if confirm("It's a draw. New game?")

  getCurrentPlayer :->
    document.querySelector(".current-player").id

  setInitialPlayer :->
    playerX = document.getElementById("X")
    playerO = document.getElementById("O")
    playerX.className = ""
    playerO.className = ""
    playerX.className = "current-player"

  switchPlayers :->
    playerX = document.getElementById("X")
    playerO = document.getElementById("O")
    if playerX.className.match(/current-player/)
      playerO.className = "current-player"
      playerX.className = ""
    else
      playerX.className = "current-player"
      playerO.className = ""

  newGame:  ->
    playerX = document.getElementById("X")
    playerO = document.getElementById("O")
    playerX.className = "current-player"
    playerO.className = ""
    @createBoard()

