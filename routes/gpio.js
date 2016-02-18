var five = require('johnny-five');
var Raspi = require('raspi-io');
var board = new five.Board({
  io: new Raspi()
});

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('gpio', { title: 'Gpio' });

   
  res.send('Welcome to GPIO');
});

router.get('/read/:pinno', function(req, res, next) {
  pinno = Number(req.params.pinno);

  board.on('ready', function() {
    this.pinMode(pinno, five.Pin.INPUT);
    this.digitalRead(pinno, function(value) {
      console.log(value);
      res.send(value);
    });
  });
});

router.get('/write/:pinno/:value', function(req, res, next) { 
  pinno = Number(req.params.pinno);
  value=(req.params.value.toString().trim() === 'HIGH')?true:false;

  board.on('ready', function() {
    this.pinMode(pinno, five.Pin.OUTPUT);
    this.digitalWrite(pinno, value);
  });
});

module.exports = router;

