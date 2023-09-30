<?php
require_once '../config/db.php';
$columns = "feedback.week, users.employee_id, users.full_name, feedback.weight";
$conditions = "users.employee_id = feedback.employee_id";
$sql = "SELECT " . $columns . " FROM feedback JOIN users WHERE " . $conditions;
$entries = R::getAll($sql);
?>


<table id="weights" class="display" style="width:100%">
    <caption>Avances</caption>
    <thead>
        <tr>
            <th>#semana</th>
            <th>#empleado</th>
            <th>Nombre completo</th>
            <th>peso</th>
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
            <th>#semana</th>
            <th>#empleado</th>
            <th>Nombre completo</th>
            <th>peso</th>
        </tr>
    </tfoot>
</table>