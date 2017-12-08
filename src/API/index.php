<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once "functions.php";

$controller = $_GET["controller"];
$action = $_GET["action"];

$controller = ucfirst($controller) . "Controller";
$controller_file = "controllers/$controller.php";

require_once $controller_file;

$controller = new Controller();
$controller->action();
