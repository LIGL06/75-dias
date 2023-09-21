<?php
require_once '../config/db.php';
$questions = R::findAll('questions');
foreach ($questions as $key => $value) {
    echo "
    <tr>
        <td>$value->id</td>
        <td>$value->content</td>
    </tr>
    ";
}
