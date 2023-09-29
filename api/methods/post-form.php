<?php
session_start();
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
// employeeId, ids, day
$request_headers = getallheaders();
if (isset($request_headers['x-api-key']) && $request_headers['x-api-key'] != $_POST['employeeId']) {
    $data = array("error" => "Invalid credentials!");
    echo json_encode($data);
    exit();
}
try {
    $user = R::findOne('users', 'employee_id LIKE ?', [$_POST['employeeId']]);
    if (!$user) {
        $data = array("error" => "User not created!");
        echo json_encode($data);
        exit();
    }
    if (isset($_POST['ids']) && isset($_POST['day'])) {
        $entries = explode(",", $_POST['ids']);
        $data = array();
        $existent = R::find('entries', 'employee_id LIKE ? AND day LIKE ?', [$_REQUEST['employeeId'], $_REQUEST['day']]);
        R::trashAll( $existent ); //for multiple beans
        foreach ($entries as $key => $value) {
            $now = time();
            $start = strtotime("2023-07-01"); //TODO: CHANGE THIS to 2023-10-01
            $datediff = $now - $start;
            $day = $datediff / (60 * 60 * 24);

            $entry = R::dispense('entries');
            $entry->questionId = $value;
            $entry->day = $_POST['day'];
            $entry->employeeId = $_POST['employeeId'];
            $id = R::store($entry);
            R::close();
            $entry->id = $id;
            array_push($data, $entry);
        }
        echo json_encode($data);
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
