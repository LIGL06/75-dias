<?php
require_once '../config/db.php';
$columns = "entries.question_id, entries.employee_id, questions.content, entries.day, users.full_name";
$conditions = "users.employee_id = entries.employee_id AND questions.id = entries.question_id";
$sql = "SELECT " . $columns . " FROM entries JOIN users, questions WHERE " . $conditions;
$entries = R::getAll($sql);
?>


<table id="entries" class="display" style="width:100%">
    <caption>Registros</caption>
    <thead>
        <tr>
            <th>#pregunta</th>
            <th>#empleado</th>
            <th>pregunta</th>
            <th>#Día</th>
            <th>Nombre completo</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach ($entries as $value) {
            echo "<tr>";
            foreach ($value as $key => $property) {
                echo "<td>$property</td>";
            }
            echo "</tr>";
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
            <th>#pregunta</th>
            <th>#empleado</th>
            <th>pregunta</th>
            <th>#Día</th>
            <th>Nombre completo</th>
        </tr>
    </tfoot>
</table>