<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT f.`DayofMonth`, (`DepDelay`+`ArrDelay`) AS airport_delay, a.airport
				FROM flights f
				JOIN airports a ON ((a.iata = f.Origin) or (a.iata = f.Dest))
                WHERE Month = 1 AND (`DepDelay`+`ArrDelay`)>0
                GROUP BY f.`DayofMonth`, a.airport
				ORDER BY a.airport, f.`DayofMonth`
				LIMIT 500";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'day_of_month' => intval($row[0]),
			 	'airport_delay' => intval($row[1]), 
			 	'airport' => $row[2]
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>