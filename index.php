<?php
/**
* @todo  了解 PSR-4规范！！
* @todo http://www.jb51.net/article/89548.htm
*/
error_reporting(E_ALL); 
ini_set("display_errors", 1); 

function my_error_handler($errno,$errstr,$errfile,$errline) {
	var_dump( func_num_args());
	echo "<br/><pre>";
	var_dump(func_get_args());
	echo "errno: ".$errno."<br/>";
	echo "err msg: ".$errstr."<br/>";
	echo "err file: ".$errfile."<br/>";
	echo "err line: ".$errline."<br/>";
}
set_error_handler('my_error_handler');

function my_exception_handler($exception){
	var_dump($exception->getMessage());
	echo "<br/><pre>";
	var_dump(func_get_args());
}
set_exception_handler('my_exception_handler');

try {
    echo "hehe";
    var_dump($name);
    //$n = 1 / 0; //warning: Division by zero in /data/tellidea/index.php on line 7
    $n = 1 % 0;
 } catch (ErrorException  $e) {
  echo "catched", PHP_EOL;
  }

