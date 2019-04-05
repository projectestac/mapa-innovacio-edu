<?php

/**
 * File: instancies/index.php
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

require_once '../config.php';
require_once '../utils.php';

$result = [];

// Set-up database connection:
$dbConn = new PDO(
    'mysql:dbname='.DB_NAME.
    ';host='.DB_HOST.
    ';charset='.DB_CHARSET,
    DB_USER, DB_PASSWORD
);

// Set 'where' conditions based on current request params
$conditions = [];
$parameters = [];

if (!empty($_REQUEST['centre'])) {
    $conditions[] = 'Codi_centre = ?';
    $parameters[] = $_REQUEST['centre'];
}

if (!empty($_REQUEST['prog'])) {
    $conditions[] = 'id_programa = ?';
    $parameters[] = $_REQUEST['prog'];
}

if (!empty($_REQUEST['curs'])) {
    $conditions[] = 'Curs = ?';
    $parameters[] = $_REQUEST['curs'];
}

// Build and launch query statement
$sql = 'SELECT * FROM innova_programes_centres';
if ($conditions) {
    $sql .= ' WHERE '.implode(' AND ', $conditions);
}
$sql .= ' ORDER BY Codi_centre,id_programa,Curs';
$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
$result = [];
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $instancia = array(
        'centre' => $Codi_centre,
        'programa' => $id_programa,
        'curs' => $Curs,
        // 'bloc' => $Bloc,
    );
    array_push($result, $instancia);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
