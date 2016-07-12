<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT Origin, Dest, SUM(1) AS common_flight
				FROM flights
				GROUP BY Origin, Dest
				ORDER BY common_flight DESC
				LIMIT 30";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'origin' => $row[0],
				'dest' => $row[1],
			 	'total' => intval($row[2])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>