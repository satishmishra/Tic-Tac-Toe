express = require 'express'
app = express()

app.use express.bodyParser()
console.log "Added body bodyParser"

app.get "/ticTacToeGame", (req, res) ->
	console.log req.body
		res.send 200


port = 3000

app.listen port

console.log "Listening on port:" + port
