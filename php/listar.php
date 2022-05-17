<?php
	$datajson = (!file_exists('database.json') ? [] : json_decode(file_get_contents('database.json')));
	echo json_encode($datajson, JSON_UNESCAPED_UNICODE);

	// $data = file_get_contents("database.json");
	// $events = json_decode($data, true);
	// if($data == "" && $data == NULL){
	// 	echo "no hay nada";
	// }else{

	// 	$last = end($events);
	
	// 	foreach ($events as $element) {
	// 		if ($last == $element) 
	// 			$lastRegister=  $element['id'];
	// 	}
	
	
	// 	echo "hay : ".count($events)." y el ultimo registro es ".count($events).' + 1 = '.$lastRegister + 1;
	// }


	// foreach ($events as $key => $entry) {
	// 	if ($entry['id'] == '1') {
	// 			$events[$key]['title'] = " actualizado";
	// 	}
	// }
	// $newJsonString = json_encode($events);
	// file_put_contents('database.json', $newJsonString);

