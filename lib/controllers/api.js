'use strict';

/*
Original api was linted and copied here
 */

var arr = [],
    food = ['Pizza', 'Burger','Asiatisch', 'Sushi', 'Indisch', 'Mediterran',
            'Orientalisch', 'Gourmet', 'International'];

function randRange(from, to, mantissa) {
  mantissa = mantissa || 0;
  return (Math.random()*(to-from+1)+from).toFixed(mantissa);
}

var winner = randRange(0, food.length-1);

function getFoodIndex() {
  if (Math.random() > 0.3) {
    return randRange(0, food.length-1);
  }
  else {
    return winner;
  }
}

var i = 0;

function resetApi() {
  winner = randRange(0, food.length-1);
  arr = [];
  i = 0;
}

setInterval(function() {

  // For hosting at heroku, to avoid mem leak, reset api every 1000 items.
  if (arr.length > 1000) {
    resetApi();
  }

  var name = food[getFoodIndex()],
    geoLat = randRange(45, 52, 5), geoLong = randRange(5, 30, 5),
    price = randRange(1, 100),
    obj = { id: i, name: name, geoLat: geoLat, geoLong: geoLong, price: price };
  arr.push(obj);
  i++;
}, 1000);


exports.orders = function(req, res) {
  res.json(arr);
};

exports.reset = function(req, res) {
  resetApi();
  res.json({success: true});
};