<?php
	// Le tableau de résultat
	$result_request = array();
	
	if(isset($_GET['iata'])) {
		// Connexion à la BDD
		include("../bdd/connexion_bdd.php");
		
		$iata = $_GET['iata'];
	
		$query = "SELECT city
				FROM airports
				WHERE iata LIKE '".$iata."'";
		
		$result = mysqli_query($conn, $query);
	
		while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array('city' => $row[0]);
		}

		mysqli_free_result($result);
	
		// Déconnexion de la BDD
		include("../bdd/deconnexion_bdd.php");
	};
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>