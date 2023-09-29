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
    $user = R::findOne('users', 'employee_id LIKE ?', [$_POST['employeeId']]);
    if ($user) {
        $_SESSION['employeeId'] = $user->employee_id;
        echo json_encode($user);
        exit;
    } else {
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }
} catch (PDOException $e) {
    $data = array("message" => $e->getmessage());
    echo json_encode($data);
    exit();
}
R::close();
