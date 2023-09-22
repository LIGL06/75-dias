<?php
require_once '../config/db.php';
$employees = R::findAll('users');
?>

<table id="employees" class="display" style="width:100%">
    <caption>Empleados</caption>
    <thead>
        <tr>
            <th>id</th>
            <th>edad</th>
            <th>email</th>
            <th>#empleado</th>
            <th>Nombre Completo</th>
            <th>altura</th>
            <th>identidad</th>
            <th>teléfono</th>
            <th>peso inicial</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach ($employees as $key => $value) {
            echo "
            <tr>
                <td>$value->id</td>
                <td>$value->age</td>
                <td>$value->email</td>
                <td>$value->employeeId</td>
                <td>$value->fullName</td>
                <td>$value->height</td>
                <td>$value->identity</td>
                <td>$value->phone</td>
                <td>$value->weight</td>
            </tr>
            ";
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
            <th>id</th>
            <th>edad</th>
            <th>email</th>
            <th>#empleado</th>
            <th>Nombre Completo</th>
            <th>altura</th>
            <th>identidad</th>
            <th>teléfono</th>
            <th>peso inicial</th>
        </tr>
    </tfoot>
</table>