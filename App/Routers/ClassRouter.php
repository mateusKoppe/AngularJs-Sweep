<?php

namespace App\Routers;

use App\Helpers\Router;

class ClassRouter extends Router
{
    public $routes = [
        ['GET', '/classByUser/[i:user]', 'ClassController::classByUser', 'classByUser'],
        ['GET', '/class/[i:id]', 'ClassController::classByUser', 'class'],
        ['GET', '/class/[i:class]/studants', 'StudantController::list', 'studants'],
        ['POST', '/class/[i:class]/studants/[i:id]', 'StudantController::list', 'studant']
    ];
}