<?php

namespace App\Helpers;

use PDO;

class Database
{
    public static $HOST = 'sweep-mysql';
    public static $NAME = 'sweep';
    public static $USER = 'root';
    public static $PASSWORD = 'root';
    public static $CONN;

    public static function createConnection()
    {
      SELF::$CONN = new PDO('mysql:host='. SELF::$HOST .';dbname='. SELF::$NAME, SELF::$USER, SELF::$PASSWORD);
      return SELF::$CONN;
    }
}
