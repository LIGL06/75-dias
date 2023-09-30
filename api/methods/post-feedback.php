<?php
session_start();
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
$request_headers = getallheaders();
if (isset($request_headers['x-api-key']) && $request_headers['x-api-key'] != $_POST['employeeId']) {
    $data = array("message" => "Invalid credentials!");
    echo json_encode($data);
    exit();
}
try {
    $feedback= R::dispense('feedback');
    $entry = R::findOne('feedback', 'employee_id LIKE ? AND week LIKE ?', [$_POST['employeeId'], $_POST['week']]);
    if ($entry) {
        R::trash($entry);
    }
    if (isset($_POST['employeeId']) && isset($_POST['week'])) {
        $feedback->week = $_POST['week'];
        $feedback->employeeId = $_POST['employeeId'];
        $feedback->weight = $_POST['weight'];
        $id = R::store($feedback);
        $feedback->id = $id;
        echo json_encode($feedback);
        exit();
    } else {
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }
} catch (PDOException $e) {
    // TODO: Do error handling
    $data = array("message" => $e->getmessage());
    echo json_encode($data);
    exit();
}
R::close();
