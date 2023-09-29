<?php
session_start();
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: GET");
$now = time();
$start = strtotime("2023-07-01"); //TODO: CHANGE THIS to 2023-10-01
$datediff = $now - $start;
$today = $datediff / (60 * 60 * 24);
$today = round($today);
$yesterday = $today-1;
$prev48Hrs = $today-2;
$baseQuery = 'employee_id LIKE ? AND day LIKE ?';
$days = array("today" => $today, "yesterday" => $yesterday, "prev48Hrs" => $prev48Hrs);
if (!$_REQUEST['employeeId']) {
    $data = array("error" => "No employeeId!");
    echo json_encode($data);
    R::close();
    exit();
}
try {
    $fromTy = R::findOne('entries', $baseQuery, [$_REQUEST['employeeId'], $day]);
    $fromYy = R::findOne('entries', $baseQuery, [$_REQUEST['employeeId'], $yesterday]);
    $fromPYy = R::findOne('entries', $baseQuery, [$_REQUEST['employeeId'], $prev48Hrs]);

    $entries = array("days" => $days, "fromTy" => $fromTy, "fromYy" => $fromYy, "fromPYy" => $fromPYy);
    // Consultar si hay registros de 48 hrs atrás, si sí ya contesto, sino toca poner esos días previos
    R::close();
    if ($entries) {
        echo json_encode($entries);
        exit;
    } else {
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }
} catch (PDOException $e) {
    $data = array("error" => $e->getmessage());
    echo json_encode($data);
    R::close();
    exit;
}
