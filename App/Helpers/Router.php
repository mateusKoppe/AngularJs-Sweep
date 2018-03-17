<?php

namespace App\Helpers;

use AltoRouter;

class Router {
    public $routes = [];
    public $path = false;

    public function importRoutes($router) {
        $this->routes = array_merge($this->routes, $router->routes);
    }
    
    public function render() {
        $router = new AltoRouter();
        
        if($this->path) {
            $router->setBasePath($this->path);
        }

        foreach ($this->routes as $route) {
            $router->map($route[0], $route[1], $route[2], $route[3]);
        }

        $match = $router->match();

        $this->callController($match);
    }

    protected function callController($match) {
        $target = $match['target'];
        $controller = explode('::', $match['target'])[0];
        $action = explode('::', $match['target'])[1];

        $controller = "\\App\\Controllers\\$controller";
        $controller = new $controller();
        return $controller->$action($match['params']);
    }
    
}