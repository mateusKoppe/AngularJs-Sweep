<?php

namespace App\Routers;

use App\Helpers\Router;

class MainRouter extends Router
{
    public function __construct()
    {
        $this->importRoutes(new UserRouter());
        $this->importRoutes(new ClassRouter());
        $this->routes[] = ['OPTIONS', '*', function() { http_response_code(200); }];

    }
}

