<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once "vendor/autoload.php";

$router = new App\Routers\MainRouter();

$router->render();
