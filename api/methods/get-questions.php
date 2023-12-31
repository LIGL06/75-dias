<?php
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
try {
    $questions = R::findAll('questions');
    if ($questions) {
        echo json_encode($questions);
        exit();
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
