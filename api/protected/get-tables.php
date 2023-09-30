<?php
require_once './protect.php';
session_start();
$now = time();
$start = strtotime("2023-10-02"); //TODO: CHANGE THIS to 2023-10-02
$datediff = $now - $start;
$day = $datediff / (60 * 60 * 24);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de control</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css" />
</head>

<body>
    <h1 style="text-align:center">Día #<?php echo json_encode(round($day)) ?></h1>
    <section>
        <h3>Preguntas</h3>
        <?php
        require_once './get-questions.php';
        ?>
    </section>

    <section>
        <h3>Empleados</h3>
        <?php
        require_once './get-employees.php';
        ?>
    </section>

    <section>
        <h3>Registros</h3>
        <?php
        require_once './get-entries.php';
        ?>
    </section>

    <section>
        <h3>Avances</h3>
        <?php
        require_once './get-weights.php';
        ?>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.print.min.js"></script>
    <script>
        $(document).ready(function() {
            const props = {
                dom: 'Bfrtip',
                buttons: [
                    'columnsToggle',
                    'columnsVisibility',
                    'copy',
                    'csv',
                    'excel',
                    'pdf',
                    'print'
                ]
            }
            $('#questions').DataTable({
                ...props
            });
            $('#employees').DataTable({
                ...props
            });
            $('#entries').DataTable({
                ...props
            });
            $('#weights').DataTable({
                ...props
            });
        });
    </script>
</body>

</html>