<?php
// recorrer los archivos recibidos
if(!$_FILES == null){
	$user = 'WILL-01';
	$count = 0;
	if(!is_dir('../data/'.$user)) mkdir('../data/'.$user);
	$idUser = 1;
	$fileBase = '../data/'.$user.'/files/';
	$fileHash = substr(md5($fileBase . uniqid(microtime() . mt_rand())), 0, 8);
	if (!file_exists($fileBase)) mkdir($fileBase, 0777, true);
	$data = (!file_exists('../json/'.$user.'dataBase.json') ? [] : json_decode(file_get_contents('../json/'.$user.'dataBase.json')));
	$writable = fopen('../json/'.$user.'-dataBase.json', 'w');
	foreach ($_FILES as $key => $file) {
		if(move_uploaded_file($file['tmp_name'],'../data/'.$user.'/files/'.$file['name'])){
			$arrResponse = ["status" => true, "message" => "archivos guardados"];
			array_push($data,[
				'id' => $key,
				'name' => $file['name']
			]);
			$count ++;
		}else{
			$arrResponse = ["status" => false, "message" => "no se pudieron guardar los archivos"];
		}
	}
	if($count == count($_FILES)){
		fwrite($writable, json_encode($data));
		fclose($writable);
		$arrResponse = ["status" => true, "message" => "Se subieron ".$count.' archivos con exito'];
	}
}else{
	$arrResponse = ["status" => false, "message" => "No se a cargado ningun archivo"];
}
echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);