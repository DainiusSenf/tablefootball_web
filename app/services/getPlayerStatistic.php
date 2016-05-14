<?php

		require_once 'db.php'; 
		
		if(isset($_GET['player'])){
			$player = $_GET['player'];
						
			try{
				$sql = "SELECT * from statistics WHERE username='$player'";
		
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
			} catch(PDOException $e){
				echo $json_response = json_encode($e);
			}
			
			
			
		}
?>