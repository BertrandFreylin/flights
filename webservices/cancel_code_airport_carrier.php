<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT f.`CancellationCode`, a.city, c.description, SUM(1) AS somme
				FROM flights f
				JOIN airports a ON (a.iata = f.Origin)
                JOIN carriers c ON (c.code = f.UniqueCarrier)
                WHERE (f.`CancellationCode` LIKE 'A') or (f.`CancellationCode` LIKE 'B') or (f.`CancellationCode` LIKE 'C') or (f.`CancellationCode` LIKE 'D')
                GROUP BY f.`CancellationCode`, a.airport, c.description
				ORDER BY `f`.`CancellationCode`
				LIMIT 500";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'cancel_code' => $row[0],
			 	'airport_dep' => $row[1], 
			 	'somme' => intval($row[2])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>