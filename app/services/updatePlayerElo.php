<?php

		require_once 'db.php'; 
		
		if(isset($_GET['player'])){
			$player = $_GET['player'];
			$elo = $_GET['elo'];
			$elo = intval($elo);
						
			try{
				$sql = "UPDATE users SET elo='$elo' WHERE username='$player'";
		
				$stmt = $dbh->prepare( $sql );
				$stmt->execute();
				if( $stmt )
					echo $json_response = json_encode(true);
				else
					echo $json_response = json_encode(false);
			} catch(PDOException $e){
				echo $json_response = json_encode($e);
			}
			
			
			
		}
?>