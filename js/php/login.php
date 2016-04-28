<?php

		require_once 'db.php'; 
		
		if(isset($_GET['username'])){
			$username = $_GET['username'];
			$psw = $_GET['password'];
			
			try{
				$sql = "SELECT * FROM users	WHERE username='$username' and password='$psw';";
		
				$stmt = $dbh->prepare( $sql );
				$stmt->execute();
				$result = $stmt->fetchAll( PDO::FETCH_ASSOC );

				// convert to json
				$json = json_encode( $result );

				// echo the json string
				if($stmt)
					echo $json;
				else
					echo $json_response = json_encode(false);
			} catch(PDOException $e){
				echo $json_response = json_encode($e);
			}
		}
	?>