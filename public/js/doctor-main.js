 $(document).ready(function() {
     $.get("http://184.172.241.130:31090/api/system/historian", {},
         function(data, status) {
             console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
             document.getElementById("results").appendChild(renderjson(data));
         });
 });