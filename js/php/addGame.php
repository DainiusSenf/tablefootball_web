<?php

		require_once 'db.php'; 
		
		if(isset($_GET['player1'])){
			$player1 = $_GET['player1'];
			$player2 = $_GET['player2'];
			$player3 = $_GET['player3'];
			$player4 = $_GET['player4'];
			$score1 = $_GET['score1'];
			$score2 = $_GET['score2'];
						
			try{
				if(isset($_GET['approved1'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2')";
				} else if(isset($_GET['approved2'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2')";
				} else if(isset($_GET['approved3'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2')";
				} else if(isset($_GET['approved4'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2')";
				} else {
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2')";
				}
		
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