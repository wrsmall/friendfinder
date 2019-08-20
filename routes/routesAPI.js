var people = require('../data/people');

module.exports = function (app) {
   
    app.get("/api/tables", function(req, res) {
        res.json(people);
      });


    app.post("/api/member", function (req, res) {
        var thisuser=req.body;
        var uservaules=thisuser.value
        console.log(uservaules);
        var matchName = '';
		var matchImage = '';
		var totalDifference = 50000;
		for (var i = 0; i < people.length; i++) {
			var diff = 0;
			for (var j = 0; j < thisuser.length; j++) {
				diff += Math.abs(people[i].scores[j] - thisuser[j]);
			}
			console.log('diff = ' + diff);
			if (diff < totalDifference) {
				
				totalDifference = diff;
				matchName = people[i].name;
				matchImage = people[i].image;
			}
		}

		
		people.push(thisuser);

	
		res.json({matchName: matchName, matchImage: matchImage});
	});

};
