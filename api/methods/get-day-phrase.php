<?php
require_once '../config/db.php';
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: GET");
$baseQuery = 'id LIKE ?';
if (!$_REQUEST['day']) {
    $data = array("error" => "No day!");
    echo json_encode($data);
    R::close();
    exit();
}
try {
    $phrase = R::findOne('phrases', $baseQuery, [$_REQUEST['day']]);
    if ($phrase) {
        echo json_encode($phrase);
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
