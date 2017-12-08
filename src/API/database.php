<?php

class Database
{
    public static $HOST = 'localhost';
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
