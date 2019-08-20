var people = require('../data/people');

module.exports = function (app) {
   
    app.get("/api/tables", function(req, res) {
        res.json(people);
      });


    app.post("/api/member", function (req, res) {
        //people.push(req.body);
        var thisuser=req.body;
        var uservaules=thisuser.value
        console.log(uservaules);
        var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < people.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < thisuser.length; j++) {
				diff += Math.abs(people[i].scores[j] - thisuser[j]);
			}
			console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				 

				totalDifference = diff;
				matchName = people[i].name;
				matchImage = people[i].image;
			}
		}

		// Add new user
		people.push(thisuser);

		// Send appropriate response
		res.json({matchName: matchName, matchImage: matchImage});
	});

};
