var GameView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GameView = (function(_super) {
  __extends(GameView, _super);

  function GameView() {
    return GameView.__super__.constructor.apply(this, arguments);
  }

  GameView.prototype.el = '#tic-tac-toe';

  GameView.prototype.down = "mousedown";

  GameView.prototype.up = "mouseup";

  GameView.prototype.selectors = {
    grid: "#grid",
    gridLengthOption: "#grid-length-option"
  };

  GameView.prototype.events = {
    'change select': 'changeGridView',
    'mouseup input.button': 'newGame'
  };

  GameView.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.gameOver = false;
    this.moveCount = 0;
    this.gridSize = 3;
    this.board = new Array(9);
    this.renderGridLengthOptions();
    return this.renderGrid(3);
  };

  GameView.prototype.setGame = function(length) {
    var s, squares;
    this.moveCount = 0;
    this.gridSize = length;
    squares = document.getElementsByTagName("td");
    s = 0;
    while (s < squares.length) {
      squares[s].addEventListener(this.down, ((function(_this) {
        return function(evt) {
          _this.squareSelected(evt, _this.getCurrentPlayer());
        };
      })(this)), false);
      s++;
    }
    this.createBoard();
    return this.setInitialPlayer();
  };

  GameView.prototype.renderGrid = function(length) {
    var gridTemplate, width;
    if (length == null) {
      length = 3;
    }
    width = length * 100;
    gridTemplate = _.template($("#grid-template").html(), {
      length: length
    });
    $(this.selectors.grid).html(gridTemplate);
    $("#grid table").css('width', width);
    this.setGame(length);
    return this;
  };

  GameView.prototype.renderGridLengthOptions = function() {
    var gridLengthOptionTemplate;
    gridLengthOptionTemplate = _.template($("#grid-length-option-template").html(), {
      length: 100
    });
    return $(this.selectors.gridLengthOption).html(gridLengthOptionTemplate);
  };

  GameView.prototype.changeGridView = function(e) {
    var length;
    length = $(e.currentTarget).val();
    this.board = new Array(parseInt(length) * parseInt(length));
    return this.renderGrid(length);
  };

  GameView.prototype.createBoard = function() {
    var i, _results;
    this.gameOver = false;
    this.moveCount = 0;
    i = 0;
    _results = [];
    while (i < this.board.length) {
      this.board[i] = "";
      document.getElementById(i).innerHTML = "";
      _results.push(i++);
    }
    return _results;
  };

  GameView.prototype.squareSelected = function(evt, currentPlayer) {
    var square, _ref, _ref1;
    if (this.gameOver) {
      if (confirm("Game has been over! new game?")) {
        this.newGame();
      }
      return;
    }
    square = evt.target;
    if (square.className.match(/marker/) || ((_ref = $(square).find('div')) != null ? (_ref1 = _ref.attr('class')) != null ? _ref1.match(/marker/) : void 0 : void 0)) {
      return alert("Sorry, that space is taken!  Please choose another square.");
    } else {
      this.fillSquareWithMarker(square, currentPlayer);
      this.updateBoard(square.id, currentPlayer);
      this.checkForWinner(square.id, currentPlayer);
      return this.switchPlayers();
    }
  };

  GameView.prototype.fillSquareWithMarker = function(square, player) {
    var marker;
    marker = document.createElement("div");
    marker.className = player + "-marker";
    return square.appendChild(marker);
  };

  GameView.prototype.updateBoard = function(index, marker) {
    this.board[index] = marker;
    return this.moveCount++;
  };

  GameView.prototype.declareWinner = function(currentPlayer) {
    this.gameOver = true;
    if (confirm(" " + currentPlayer + " has won!!  New game?")) {
      return this.newGame();
    }
  };

  GameView.prototype.checkForWinner = function(index, currentPlayer) {
    var col, i, j, k, l, row;
    row = Math.floor(index / this.gridSize);
    col = index % this.gridSize;
    i = 0;
    while (i < this.gridSize) {
      if (this.board[row * this.gridSize + i] !== currentPlayer) {
        break;
      }
      if (i === this.gridSize - 1) {
        this.declareWinner(currentPlayer);
        return;
      }
      i++;
    }
    j = 0;
    while (j < this.gridSize) {
      if (this.board[col + this.gridSize * j] !== currentPlayer) {
        break;
      }
      if (j === this.gridSize - 1) {
        this.declareWinner(currentPlayer);
        return;
      }
      j++;
    }
    if (row === col) {
      k = 0;
      while (k < this.gridSize) {
        if (this.board[k * this.gridSize + k] !== currentPlayer) {
          break;
        }
        if (k === this.gridSize - 1) {
          this.declareWinner(currentPlayer);
          return;
        }
        k++;
      }
    }
    l = 0;
    while (l < this.gridSize) {
      if (this.board[l * (this.gridSize - 1) + (this.gridSize - 1)] !== currentPlayer) {
        break;
      }
      if (l === this.gridSize - 1) {
        this.declareWinner(currentPlayer);
        return;
      }
      l++;
    }
    if (this.moveCount === (Math.pow(this.gridSize, 2) - 1)) {
      this.gameOver = true;
      if (confirm("It's a draw. New game?")) {
        return this.newGame();
      }
    }
  };

  GameView.prototype.getCurrentPlayer = function() {
    return document.querySelector(".current-player").id;
  };

  GameView.prototype.setInitialPlayer = function() {
    var playerO, playerX;
    playerX = document.getElementById("X");
    playerO = document.getElementById("O");
    playerX.className = "";
    playerO.className = "";
    return playerX.className = "current-player";
  };

  GameView.prototype.switchPlayers = function() {
    var playerO, playerX;
    playerX = document.getElementById("X");
    playerO = document.getElementById("O");
    if (playerX.className.match(/current-player/)) {
      playerO.className = "current-player";
      return playerX.className = "";
    } else {
      playerX.className = "current-player";
      return playerO.className = "";
    }
  };

  GameView.prototype.newGame = function() {
    var playerO, playerX;
    playerX = document.getElementById("X");
    playerO = document.getElementById("O");
    playerX.className = "current-player";
    playerO.className = "";
    return this.createBoard();
  };

  return GameView;

})(Backbone.View);