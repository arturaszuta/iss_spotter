const { nextISSTimesForMyLocation } = require('./iss_promised');


const makeItPretty = function(innerObject) {
  const timeArrays = innerObject;
  timeArrays.forEach((element) => {
    console.log(`Next pass is at ${new Date(element.risetime * 1000)} for ${element.duration} seconds!`);
  });

};

nextISSTimesForMyLocation().then(data => makeItPretty(data)).catch((error) => {
  console.log('There was something fishy happening behind the scenes!' + error.message)
});
 