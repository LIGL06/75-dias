<?php
session_start();
require_once '../config/db.php';
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
$request_headers = getallheaders();
if (isset($request_headers['x-api-key']) && $request_headers['x-api-key'] != $_POST['employeeId']) {
    $data = array("message" => "Invalid credentials!");
    echo json_encode($data);
    exit();
}
try {
    $user = R::dispense('users');
    if (R::findOne('users', 'employee_id LIKE ?', [$_POST['employeeId']])) {
        $data = array("message" => "Already created!");
        echo json_encode($data);
        exit();
    }
    if (isset($_POST['fullName']) && isset($_POST['employeeId'])) {
        $user->age = $_POST['age'];
        $user->email = $_POST['email'];
        $user->employeeId = $_POST['employeeId'];
        $user->fullName = $_POST['fullName'];
        $user->height = $_POST['height'];
        $user->identity = $_POST['identity'];
        $user->phone = $_POST['phone'];
        $user->weight = $_POST['weight'];
        $id = R::store($user);
        $user->id = $id;
        echo json_encode($user);
        exit();
    } else {
        // TODO: Do error handling
        $data = array("message" => "Incomplete data!");
        echo json_encode($data);
        exit();
    }
} catch (PDOException $e) {
    // TODO: Do error handling
    $data = array("message" => $e->getmessage());
    echo json_encode($data);
    exit();
}
R::close();
