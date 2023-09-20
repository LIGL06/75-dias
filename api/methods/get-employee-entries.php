<?php
session_start();
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: GET");
$d = new DateTimeImmutable("now");
$tzo = new DateTimeZone("-06:00");
$local = $d->setTimezone($tzo);
$today = $local->format('Y-m-d');
$yesterday = $local->modify('-1 day')->format('Y-m-d');
$prev48Hrs = $local->modify('-2 day')->format('Y-m-d');
$baseQuery = 'employee_id LIKE ? AND createdAt LIKE ?';
$days = array("today" => $today, "yesterday" => $yesterday, "prev48Hrs" => $prev48Hrs);
if (!$_REQUEST['employeeId']) {
    $data = array("error" => "No employeeId!");
    echo json_encode($data);
    R::close();
    exit();
}
try {
    $fromTy = R::findOne('entries', $baseQuery, [$_REQUEST['employeeId'], $today]);
    $fromYy = R::findOne('entries', $baseQuery, [$_REQUEST['employeeId'], $yesterday]);
    $fromPYy = R::findOne('entries', $baseQuery, [$_REQUEST['employeeId'], $prev48Hrs]);

    $entries = array("days" => $days, "fromTy" => $fromTy, "fromYy" => $fromYy, "fromPYy" => $fromPYy);
    // Consultar si hay registros de 48 hrs atrás, si sí ya contesto, sino toca poner esos días previos
    if ($entries) {
        echo json_encode($entries);
    } else {
        $data = array("data" => []);
        echo json_encode($data);
    }
    R::close();
    exit();
} catch (PDOException $e) {
    $data = array("error" => $e->getmessage());
    echo json_encode($data);
    R::close();
    exit();
}
