<?php

namespace App\Routers;

use App\Helpers\Router;

class UserRouter extends Router
{
    public $routes = [
        ["POST", "/users", "UserController::create", "createUser"],
        ["POST", "/login", "UserController::login", "login"],
        ["GET", "/users/checkAvailability/[:username]", "UserController::checkAvailability", "checkAvailability"]
    ];
}
