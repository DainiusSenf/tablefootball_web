<?php
		require_once 'db.php'; 

        
		if(isset($_GET['player1'])){
			$player1 = $_GET['player1'];
			$player2 = $_GET['player2'];
			$player3 = $_GET['player3'];
			$player4 = $_GET['player4'];
			$sql = "SELECT * FROM users WHERE username = '$player1' or username = '$player2' or
			username = '$player3' or username = '$player4'";
		

			// use prepared statements, even if not strictly required is good practice
			$stmt = $dbh->prepare( $sql );

			// execute the query
			$stmt->execute();

			// fetch the results into an array
			$result = $stmt->fetchAll( PDO::FETCH_ASSOC );

			// convert to json
			$json = json_encode( $result );

			// echo the json string
			echo $json;
		}
?>