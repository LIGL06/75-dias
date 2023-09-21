<?php
    $password = 'Password23!';
    if (empty($_COOKIE['password']) || $_COOKIE['password'] !== $password) {
        header('Location: index.php');
        exit;
    }
