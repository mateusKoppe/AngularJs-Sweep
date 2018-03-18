<?php

namespace App\Routers;

use App\Helpers\Router;

class ClassRouter extends Router
{
    public $routes = [
        ['GET', '/classByUser/[i:user]', 'ClassController::classByUser', 'classByUser'],
        ['GET', '/class/[i:id]', 'ClassController::classByUser', 'showClass'],
        ['PUT', '/class/[i:id]', 'ClassController::update', 'updateClass'],
        ['GET', '/class/[i:class]/studants', 'StudantController::list', 'listStudant'],
        ['POST', '/class/[i:class]/studants', 'StudantController::create', 'createStudant']
    ];
}
