const express = require('express'); //Import the express dependency
const port = 4444;                  //Save the port number where your server will be listening
const app = express();//Instantiate an express app, the main work horse of this server
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
var cnt=0;

app.use('/CSS', express.static(__dirname + "/CSS"));

 const router = express.Router();

var board=[[0,0,0],[0,0,0],[0,0,0]]
var turn=1;
let lastMove={"GameFinished":0};
router.get('/GetLast',function(req,res){
  res.send(lastMove);
});
router.get('/GetMove/:p/:c',function(req,res){
  if(turn%2 == req.params.p%2){
    let c=req.params.c;
    lastMove.player=req.params.p;
    lastMove.cell=req.params.c;
    board[c/3][c%3] = req.params.p;
    turn++;
  }
  res.send(lastMove);
});
router.get('/', (req, res) => {        //get requests to the root ("/") will route here
      cnt++;
      res.render("index", {
      timesShown: cnt,
    });
                                                  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});


//add the router
app.use('/', router);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

