<?php
require_once '../config/db.php';
$questions = R::findAll('questions');
?>

<table id="questions" class="display" style="width:100%">
    <caption>Preguntas</caption>
    <thead>
        <tr>
            <th>id</th>
            <th>contenido</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach ($questions as $key => $value) {
            echo "
            <tr>
                <td>$value->id</td>
                <td>$value->content</td>
            </tr>
            ";
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
            <th>id</th>
            <th>contenido</th>
        </tr>
    </tfoot>
</table>