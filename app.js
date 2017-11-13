'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cfenv = require('cfenv');

var mongoose = require('mongoose');

var models = require('./models/models.js');
var Patient = models.patientModel;
var Doctor = models.doctorModel;
var Pharmacist = models.pharmacistModel;

mongoose.connect('mongodb://sssaini1:sssaini1@ds231725.mlab.com:31725/medical-chain');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var patient = "sukhpal";
var doctor = "1";
var pharmacist = "pharmacist";
var drug1 = '', drug2 = '';
var duplicateArray = [];

app.use(function(req, res, next) {
	// res.header('Access-Control-Allow-Origin', "x-requested-with");
	// res.header("Access-Control-Allow-Headers", "*");
	next();
})

app.post('/process', function(req, res) {
	console.log('****** PROCESS *******');
	console.log(drug1 + ' / ' + drug2);
	res.render('process.ejs', {
		duplicateArray,
	});
});

// app.post('/pharma', function(req, res) {
// 	// console.log("the patient I am looking for in the db: " + req.body.name);
// 	var date = new Date().toDateString().substring(4);
// 	patient = 'sssaini';
// 	Patient.find({
// 		"name": patient
// 	}, function(err, doc) {
// 		console.log(doc);
// 		res.render('pharma-test.ejs', {
// 			doc,
// 			date
// 		});
// 	});
// });

// app.post('/doctor-info-old', function(req, res) {
// 	res.render('doctor-info-old.ejs');
// })

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res) {

	//Setting the original docs
	/*
		var p1 = new Patient({ name: 'sssaini', age: 10, gender: "M", diseases: [], drugs: [] });

		p1.save(function(err) {
			if (err) {
				console.log(err);
			}

			var d1 = new Doctor({
				name: '1',
				age: 20,
				gender: "F",
			});

			d1.patients.push(p1._id);

			d1.save(function(err) {
				if (err) {
					console.log(err);
				}

				var pharma1 = new Pharmacist({ name: "pharmacist", customers: [] });
				pharma1.customers.push({ patient: p1._id, doctor: d1._id });
				pharma1.save(function(err) {
					if (err) {
						console.log(err);
					}
				});
			});
		});
	*/

	res.render('patient-main.ejs');
});

app.get('/patient-main', function(req, res) {
	res.render('patient-main.ejs')
})

app.post('/patient-info', function(req, res) {
	console.log("the patient I am looking for in the db: " + req.body.name);
	patient = req.body.name;
	Patient.find({
		"name": req.body.name
	}, function(err, doc) {
		console.log(doc);
		// console.log('comments !!!!!:', doc[0].comments);
		// console.log('drugs !!!!!!!:', doc[0].drugs);
		res.render('patient-info.ejs', {
			doc,
		});
	});
});

app.post('/doctor-main', function(req, res) {
	console.log("*************doctor main *******");
	console.log(req.body);

	doctor = "1";
	if (req.body.disease1 === "Hepatitis") { doctor = "1"; } else { doctor = "2"; }

	var options = {
		safe: true,
		upsert: true
	};

	var update = {
		$push: {
			diseases: req.body.disease1,
			comments: "Appointment booked",
		}
	};

	Patient.findOneAndUpdate({
		"name": req.body.name
	}, update, options, function(err, doc) {
		if (err) {
			console.log('got an error ' + err);
		} else {
			console.log('saved');
		}

	});
	var query = Patient.findOne({
		"name": req.body.name
	}, {}, function(err, doc) {
		if (err) {
			console.log('got an error ' + err);
		}
	});

	query.then(function(doc2) {
		console.log("patient found to add to doctor: " + doc2);

		var update2 = {
			$push: {
				patients: doc2._id
			}
		};

		var query2 = Doctor.findOneAndUpdate({
			"name": doctor
		}, update2, options, function(err, doc) {
			if (err) {
				console.log('got an error ' + err);
			} else {
				console.log('saved');

				console.log("____________")
				console.log(doc)

				res.render('doctor-main.ejs', {
					doc,
					patient: doc2
				});
			}
		});
	});
});

app.post('/doctor-info', function(req, res) {
	console.log("the patient I am looking for in the db: " + patient);


	var query = Patient.findOne({
		"name": patient
	}, {}, function(err, doc) {
		if (err) {
			console.log('got an error ' + err);

		}
	})


	query.then(function(doc) {

		console.log("doc for doctor-info" + doc);


		var query2 = Doctor.findOne({
			"name": doctor
		}, {}, function(err, doc) {
			if (err) {
				console.log('got an error ' + err);
			}
		})

		query2.then(function(doc2) {
			res.render('doctor-info.ejs', {
				doc: doc2,
				patient: doc
			});
		});
	});

});

app.post('/pharmacist-main', function(req, res) {
	var date = new Date().toDateString().substring(4);
	duplicateArray = [];
	drug1 = req.body.drug1;
	drug2 = req.body.drug2;

	console.log("***** Body: %j", req.body);
   var comments = req.body.comments;

	console.log("the patient I am looking for in the db: " + patient);
	console.log("doctor is " + doctor);

	var query3 = Doctor.findOne({
		"name": doctor
	}, "name age patients", function(err, doc) {
		if (err) {
			console.log('got an error ' + err);
		}
	})

	query3.then(function(doc) {

		var options = {
			safe: true,
			upsert: true
		};

		console.log(doc);
		var update2 = {
			$push: {
				drugs: { $each: [drug1, drug2] },
				comments: { $each: ["Prescription added: " + drug1 + " " + drug2, comments] },
			}
		};

		Patient.findOneAndUpdate({
			"name": patient
		}, update2, options, function(err, doc) {
			if (err) {
				console.log('got an error ' + err);
			} else {
				console.log('Patient found and saved');
			}
		});

		var options = {
			safe: true,
			new: true
		};
		var update2 = {
			$push: {
				customers: { patient: doc.patients[0], doctor: doc._id }
			}
		};

		Pharmacist.findOneAndUpdate({
			"name": pharmacist
		}, update2, options, function(err, doc) {
			if (err) {
				console.log('got an error ' + err);
			} else {
				console.log('Pharmacist found and saved');

				console.log("namw: " + doc.customers[0].patient);

				var query4 = Patient.findById(
					doc.customers[0].patient,
					function(err, doc3) {
						if (err) {
							console.log('got an error ' + err);
						}
						patient = doc3;
					})
					.then(function(doc3) {
						console.log('****PATIENT*****');
						for (var i = 0; i < patient.drugs.length; i++) {
							for (var j = i + 1; j < patient.drugs.length; j++) {
								if (patient.drugs[i] === patient.drugs[j]) {
									console.log('i:' , i , '/ patient drugs:' , patient.drugs[i]);
									console.log('j:' , j , '/ patient drugs:' , patient.drugs[j]);
									duplicateArray.push(patient.drugs[i]);
									console.log(duplicateArray);
									patient.drugs.splice(j, 1);
									j = patient.drugs.length;
								}
							}
						}
						doc3.drugs = patient.drugs;
						doc3.save(function(err, doc) {
							if (err) return handleError(err);
						});
						console.log('DUP ARRAY ****');
						console.log(duplicateArray);
						res.render('pharmacist-main.ejs', {
							drug1,
							drug2,
							doc: doc,
							duplicateArray,
							patient: doc3,
							date,
					});
				});
			};
		});
	});
});

var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});