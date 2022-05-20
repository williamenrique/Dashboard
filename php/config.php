<?php
const USER = "will-01";
const RUTA_FILES = '../data/'.USER.'/files/';
const JSON_DATA_EVENTS = '../json/'.USER.'-databaseEvents.json';
const JSON_DATA_IMG = '../json/'.USER.'-databaseProfile.json';
const JSON_DATA_FILES = '../json/'.USER.'-databaseFiles.json';

function formatear_fecha($fecha){
	$dia = date('N', strtotime($fecha));
	$dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
	$mes = date("m", strtotime($fecha));
	$ano = date("Y", strtotime($fecha));
	$meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	$salida = $dias[$dia-1].', '.date("d", strtotime($fecha)).' de '.$meses[$mes-1].' '.$ano;
	return $salida;
}
