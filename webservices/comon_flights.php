<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT Origin, Dest, SUM(1) AS common_flight
				FROM flights
				GROUP BY Origin, Dest
				ORDER BY total DESC";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'city' => $row[0],
				'airport' => $row[1],
			 	'carrier' => $row[2],
			 	'vols_total' => intval($row[3])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>