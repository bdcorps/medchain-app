$(document).ready(function() {

	 $.post("http://184.172.241.130:31090/api/Patient", {
				"$class": "org.acme.medchain.Patient",
				"patientId": doc[0].name,
				"name": doc[0].name
		},
		function(data, status) {
			console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
		});

	var form = $("#disease-select");
	
	$('#submitToDoctor').click(function(e) {
		var diseaseElement = document.getElementById("diseases");
		var diseaseToAdd = diseaseElement.options[diseaseElement.selectedIndex].value;

		console.log(diseaseToAdd);

		$.post("http://184.172.241.130:31090/api/Disease", {
					"$class": "org.acme.medchain.Disease",
					"diseaseId": diseaseToAdd,
					"description": diseaseToAdd,
					"patient": "none"
				},
				function(data, status) {
					console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

					$.post("http://184.172.241.130:31090/api/AddDiseaseToPatient", {
								"$class": "org.acme.medchain.AddDiseaseToPatient",
								"disease": diseaseToAdd,
								"newPatient": doc[0].name
						   },
						   function(data, status) {
								console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
						   });
		});

		setTimeout(function() {
            form.submit();
        	}, 3500);
	});
});