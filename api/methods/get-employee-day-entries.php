<?php
session_start();
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: GET");
$baseQuery = 'employee_id LIKE ? AND day LIKE ?';
if (!$_REQUEST['employeeId']) {
    $data = array("error" => "No employeeId!");
    echo json_encode($data);
    R::close();
    exit();
}
if (!$_REQUEST['day']) {
    $data = array("error" => "No day!");
    echo json_encode($data);
    R::close();
    exit();
}
try {
    $result = R::find('entries', $baseQuery, [$_REQUEST['employeeId'], $_REQUEST['day']]);
    R::close();
    if ($result) {
        echo json_encode($result);
        exit;
    } else {
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }
} catch (PDOException $e) {
    $data = array("error" => $e->getmessage());
    echo json_encode($data);
    R::close();
    exit();
}
