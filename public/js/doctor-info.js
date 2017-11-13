$(document).ready(function() {

	$('#sendToPharmacy').on('click', function() {
		var drug1 = $("#drug1").val();
		
		$.post("http://184.172.241.130:31090/api/Drug", {
				"$class": "org.acme.medchain.Drug",
				"drugId": drug1,
				"description": drug1,
				"patient": "none"
			},
			function(data, status) {
				console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

				$.post("http://184.172.241.130:31090/api/AddDrugToPatient", {
						"$class": "org.acme.medchain.AddDrugToPatient",
						"drug": drug1,
						"newPatient": doc.name
					},
					function(data, status) {
						console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
					});
			});


		var drug2 = $("#drug2").val();
		// console.log('drug1: ' + drug1 + ' / drug2: ' + drug2);

		$.post("http://184.172.241.130:31090/api/Drug", {
				"$class": "org.acme.medchain.Drug",
				"drugId": drug2,
				"description": drug2,
				"patient": "none"
			},
			function(data, status) {
				console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

				$.post("http://184.172.241.130:31090/api/AddDrugToPatient", {
						"$class": "org.acme.medchain.AddDrugToPatient",
						"drug": drug2,
						"newPatient": doc.name
					},
					function(data, status) {
						console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
					});
			});
	});
});
