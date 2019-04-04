<?php

/**
 * File: utils.php
 * 
 * Linted with PHP_CodeSniffer (http://pear.php.net/package/PHP_CodeSniffer/)
 * against PEAR standards (https://pear.php.net/manual/en/standards.sample.php)
 * with phpcbf
 * 
 * PHP Version 7
 * 
 * @category Service
 * @package  Api
 * @author   Francesc Busquets <francesc@gmail.com>
 * @license  https://eupl.eu/1.2/en/ EUPL-1.2
 * @link     https://github.com/projectestac/mapa-innovacio-edu
 */

function ToArray($exp, $sep=',') {    
    $expTxt = trim((string)$exp);
    return $expTxt == '' ? [] : array_map('trim', explode($sep, $expTxt));
}
