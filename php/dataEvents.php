<?php
include './config.php';
switch ($_REQUEST['accion']) {
	case 'event':
		$txtTituloEvento = $_POST['txtTituloEvento'];
		$txtInicio = $_POST['txtInicio'];
		$txtFin = $_POST['txtFin'];
		$txtColor = $_POST['txtColor'];

		$idEvent = $_POST['idEvent'];
		if($txtTituloEvento == '' || $txtInicio == '' ){
			$arrResponse = ['message' => "Debe llenar los campos", 'status' => false];
		}else{
			// si el id llega en vacio quiere decir que se esta creando un nuevo evento
			if($idEvent == ''){
				// se verifica si el archivo existe si no se crea  por primera vez
				if(!file_exists(JSON_DATA_EVENTS)){
					// cargamos el documento si no existe se crea 
					$datajson = (!file_exists(JSON_DATA_EVENTS) ? [] : json_decode(file_get_contents(JSON_DATA_EVENTS)));
					$writable = fopen(JSON_DATA_EVENTS,'w');
					// se le agregan los datos recibidos
					array_push($datajson, [
						'id' => 1,
						'title' => $txtTituloEvento,
						'start' => $txtInicio,
						'end' => $txtFin,
						'color' => $txtColor
					]);
					$arrResponse = ['message' => "Se creo el primer evento ", 'status' => true];
					fwrite($writable,json_encode($datajson));
					fclose($writable);
					// si ya existe un archivo se sobreescribe
				}else if(file_exists(JSON_DATA_EVENTS)){
					$data = file_get_contents("../json/database.json");
					$events = json_decode($data, true);
					// secuenta y se obtiene el ultimo registro para sumarle 1
					$last = end($events);
					foreach ($events as $element) {
						if ($last == $element) 
							$lastRegister =  $element['id'] + 1;
					}
					// se sobre escribe el JSON con la nueva data
					$writable = fopen(JSON_DATA_EVENTS,'w');
					array_push($events, [
						'id' => $lastRegister,
						'title' => $txtTituloEvento,
						'start' => $txtInicio,
						'end' => $txtFin,
						'color' => $txtColor
					]);
					$arrResponse = ['message' => "Evento guardado", 'status' => true];
					fwrite($writable,json_encode($events));
					fclose($writable);
				}
				// si la variable idEvent llega con un dato quier decir que se editara el evento
			}else{
				if($txtTituloEvento == ''){
					$arrResponse = ['message' => "Titulo no debe estar vacio", 'status' => false];
				}else{
					$data = file_get_contents(JSON_DATA_EVENTS);
					$events = json_decode($data, true);
					foreach ($events as $key => $entry) {
						if ($entry['id'] == $idEvent) {
							$events[$key]['title'] = $txtTituloEvento;
							$events[$key]['start'] = $txtInicio;
							$events[$key]['end'] = $txtFin;
							$events[$key]['color'] = $txtColor;
						}
					}
					$newJsonString = json_encode($events);
					file_put_contents(JSON_DATA_EVENTS, $newJsonString);
					$arrResponse = ['message' => "Evento actualizado", 'status' => true];
				}
			}
		}
		echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
		break;
	
	case 'delete':
		$idEvent = $_POST['idEvent'];
		$data = file_get_contents(JSON_DATA_EVENTS);
		// decode json to associative array
		$json_arr = json_decode($data, true);
		// get array index to delete
		$arr_index = array();
		foreach ($json_arr as $key => $value) {
			if ($value['id'] == $idEvent) {
					$arr_index[] = $key;
			}
		}
		// delete data
		foreach ($arr_index as $i) {
			unset($json_arr[$i]);
		}
		// rebase array
		$json_arr = array_values($json_arr);
		// encode array to json and save to file
		file_put_contents(JSON_DATA_EVENTS, json_encode($json_arr));
		$arrResponse = ['message' => "Evento eliminado", 'status' => true];
		echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
		break;

	case 'drop':
		$txtInicio = $_POST['start'];
		$txtEnd = $_POST['end'];
		$idEvent = $_POST['idEvent'];
		$data = file_get_contents(JSON_DATA_EVENTS);
		$events = json_decode($data, true);
		foreach ($events as $key => $entry) {
			if ($entry['id'] == $idEvent) {
				$events[$key]['start'] = $txtInicio;
				$events[$key]['end'] = $txtEnd;
			}
		}
		$newJsonString = json_encode($events);
		file_put_contents(JSON_DATA_EVENTS, $newJsonString);
		$arrResponse = ['message' => "Evento cambiado", 'status' => true];
		echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
		break;
}