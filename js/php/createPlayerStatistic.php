<?php

		require_once 'db.php'; 
		
		if(isset($_GET['player'])){
			$player = $_GET['player'];
			$highestElo = $_GET['highestElo'];
			$lowestElo = $_GET['lowestElo'];
			$gamesCount = $_GET['gamesCount'];
			$gamesWon = $_GET['gamesWon'];
			$gamesLost = $_GET['gamesLost'];
			$winRate = $_GET['winRate'];
			$winStreak = $_GET['winStreak'];
			$highestRank=0;
						
			try{
				$sql = "INSERT INTO statistics(username, highestRank,highestElo,lowestElo,gamesCount,gamesWon, gamesLost,winRate,winStreak)
					VALUES ('$player','$highestRank','$highestElo','$lowestElo','$gamesCount','$gamesWon','$gamesLost','$winRate','$winStreak')";
		
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