<?php
$password = 'Password23!';
$redirect_after_login = 'get-tables.php';
$remember_password = strtotime('+30 days');
if (isset($_POST['password']) && $_POST['password'] == $password) {
    setcookie("password", $password, $remember_password);
    header('Location: ' . $redirect_after_login);
    exit;
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Password protected</title>
</head>

<body>
    <div style="text-align:center;margin-top:50px;">
        You must enter the password to view this content.
        <form method="POST">
            <input type="text" name="password">
        </form>
    </div>
</body>

</html>