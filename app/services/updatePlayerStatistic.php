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
			$highestRank = $_GET['highestRank'];
						
			try{
				$sql = "UPDATE statistics SET highestRank='$highestRank',
				highestElo='$highestElo',
				lowestElo='$lowestElo',
				gamesCount='$gamesCount',
				gamesWon='$gamesWon',
				gamesLost='$gamesLost',
				winRate='$winRate',
				winStreak='$winStreak'
				WHERE username='$player'";
		
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