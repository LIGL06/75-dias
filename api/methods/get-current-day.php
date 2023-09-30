
<?php
$now = time();
$start = strtotime("2023-09-23"); //TODO: CHANGE THIS to 2023-10-01
$datediff = $now - $start;
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
$day = $datediff / (60 * 60 * 24);

echo json_encode(round($day));
exit();
?>
