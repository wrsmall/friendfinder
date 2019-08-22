var people = require('../data/people');

module.exports = function (app) {

	app.get("/api/tables", function (req, res) {
		res.json(people);
	});


	app.post("/api/member", function (req, res) {
		var thisuser = req.body;

		var matchName = '';
		var matchImage = '';
		var alldiff = [];
		for (var i = 0; i < people.length; i++) {
			var diff = 0;
			for (var x = 0; x < people[i].answers.length; x++) {
				console.log(people[i].answers[x]);
				console.log(thisuser.answers[x]);
				diff = parseInt(diff) + Math.abs(parseInt(people[i].answers[x]) - parseInt(thisuser.answers[x]));
				console.log('diff ' + diff);
			}
			console.log('diff = ' + diff);
			people[i].val =parseInt(diff);
			alldiff.push(diff);
		}
		var lowdiff = Math.min(alldiff);
		for (let j = 0; j < people.length; j++) {
			if (lowdiff === people[j].val) {

				matchName = people[j].name;
				matchImage = people[j].image;
			}
		};

		people.push(thisuser);


		res.json({ matchName: matchName, matchImage: matchImage });
	});

};
