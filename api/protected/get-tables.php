<?php
session_start();
require_once './protect.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de control</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" />
</head>

<body>
    <table id="myTable" class="display" style="width:100%">
        <thead>
            <tr>
                <th>id</th>
                <th>contenido</th>
            </tr>
        </thead>
        <tbody>
            <?php
            require_once './get-questions.php';
            ?>
        </tbody>
        <tfoot>
            <tr>
                <th>id</th>
                <th>contenido</th>
            </tr>
        </tfoot>
    </table>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script>
        new DataTable('#myTable');
    </script>
</body>

</html>