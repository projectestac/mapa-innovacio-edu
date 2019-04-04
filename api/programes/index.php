<?php

/**
 * File: programes/index.php
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

if (!empty($_REQUEST['id'])) {
    $conditions[] = 'Id_programa = ?';
    $parameters[] = $_REQUEST['id'];
}

if (!empty($_REQUEST['nom'])) {
    $conditions[] = 'Nom_curt = ?';
    $parameters[] = $_REQUEST['nom'];
}

// Build and launch query statement
$sql = 'SELECT * FROM innova_programes';
if ($conditions) {
    $sql .= ' WHERE '.implode(' AND ', $conditions);
}
$sql .= ' ORDER BY Id_programa';
$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
$result = [];
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $programa = array(
        'id' => $id_programa,
        'nom' => $Nom_programa,
        'nomCurt' => $Nom_curt,
        'descripcio' => $Descripcio,
        'link' => $Enllac,
        'ambCurr' => ToArray($Ambits_curriculars),
        'ambInn' => ToArray($Ambits_innovacio),
        'arees' => ToArray($Arees),
        'simbol' => $Simbol,
        'color' => $Color,
        'tipus' => ToArray($Tipus_centres),
    );
    array_push($result, $programa);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
