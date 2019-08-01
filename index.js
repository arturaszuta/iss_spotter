const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  makeItPretty(passTimes);
});

const makeItPretty = function(innerObject) {
  const timeArrays = innerObject.response;

  timeArrays.forEach((element) => {
    console.log(`Next pass is at ${new Date(element.risetime * 1000)} for ${element.duration} seconds!`);
  })

}







