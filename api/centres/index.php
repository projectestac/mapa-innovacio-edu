<?php

/**
 * File: centres/index.php
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
$min = false;

if (!empty($_REQUEST['id'])) {
    $conditions[] = 'Codi = ?';
    $parameters[] = $_REQUEST['id'];
}

if (!empty($_REQUEST['sstt'])) {
    $conditions[] = 'Codi_ST = ?';
    $parameters[] = $_REQUEST['sstt'];
}

if (!empty($_REQUEST['se'])) {
    $conditions[] = 'Nom_SE = ?';
    $parameters[] = $_REQUEST['se'];
}

if (!empty($_REQUEST['nat'])) {
    $conditions[] = 'Naturalesa = ?';
    $parameters[] = $_REQUEST['nat'];
}

if (!empty($_REQUEST['min'])) {
    $min = $_REQUEST['min'] == 'true';
}

// Build and launch query statement
$sql = 'SELECT * FROM innova_centres WHERE Codi IN (SELECT Codi_centre FROM `innova_programes_centres`)';

if ($conditions) {
    $sql .= ' AND '.implode(' AND ', $conditions);
}
$sql .= ' ORDER BY Codi';
$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
$result = [];
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $centre = $min ? array(
        'id' => $Codi,
        'nom' => $Nom,
        'lat' => (float)$Latitud,
        'lng' => (float)$Longitud,
        'sstt' => $Codi_ST,
        'se' => $Nom_SE,
        'public' => $Naturalesa == "Públic",
        'estudis' => ToArray($Estudis),
    ) : array(
        'id' => $Codi,
        'tipus' => $TipusCentre,
        'nom' => $Nom,
        'municipi' => $Municipi,
        'comarca' => $Comarca,
        'lat' => (float)$Latitud,
        'lng' => (float)$Longitud,
        'sstt' => $Codi_ST,
        'se' => $Nom_SE,
        'public' => $Naturalesa == "Públic",
        'estudis' => ToArray($Estudis),
        'adreca' => $Adreça,
        'web' => $Web,
        'logo' => $Logo,
        'nodes' => $WebNodes,
        'web_propi' => $WebPropi,
        'tel' => $Telefons,
        'mail' => $Mail,
        'twitter' => $Twitter,
    );
    array_push($result, $centre);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
