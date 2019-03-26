<?php
include "0_connexio.php";


// connexio a les bases de dades
global $conn;
$link = mysqli_connect(EW_CONN_HOST, EW_CONN_USER, EW_CONN_PASS, EW_CONN_DB);
if (mysqli_connect_errno()) {
  printf("Conexión fallida: %s\n", mysqli_connect_error());
  exit();
}
mysqli_set_charset($link, "utf8");




$link = mysqli_connect(EW_CONN_HOST, EW_CONN_USER, EW_CONN_PASS,EW_CONN_DB);


//include "../../wp-includes/pluggable.php";

/* verificar la conexión */
if (mysqli_connect_errno()) {
  printf("Conexión fallida: %s\n", mysqli_connect_error());
  exit();
}
mysqli_set_charset($link, "utf8");


$opc=$_REQUEST["opc"];


$projecte="innovacio";

if (isset($_REQUEST['valors'])) {
  $valors=$_REQUEST["valors"];
} else {
  $valors="";
}

$valors=explode(",",$valors); 
$fltrPol="";

for ($i=0;$i<count($valors);$i++){
  if (strpos($valors[$i],'Tipus_geometria')>-1) {
    $fltrPol=$valors[$i];
    break;
  }  
}

/*
var_dump($_REQUEST);
echo "<hr>".$fltrPol."<hr>";
//$fltrPol="Tipus_geometria='ST'";
//*/

switch ($opc) {
  case "recollidaVariables":
    $codiPlantilla=$valors[1];        
    /*
    $sql="SELECT *  FROM `innova_configuracions` ";
    $sql .="WHERE codi_config='".$codiPlantilla."'";
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);    
    break;
    //*/


    //$codiPlantilla=$valors[1];        
    //$projecte=$valors[4]; 
    $sql="SELECT *  FROM `configuracions` ";
    $sql .="WHERE  projecte='".$projecte."' and codi_config='".$codiPlantilla."'";    
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    $row = mysqli_fetch_assoc($result); 
    echo $row["valors"];    
    break;




  case "recollidaPoligons":
    $colconfig=$valors[1];        
    $fltr=$valors[2];
    if (isset($valors[3])){
      $ord=$valors[3];    
    } else {
      $ord="";
    }

    if (isset($valors[4])){
      $ambit=$valors[4];
    } else {
      $ambit="ST";      
    }

    $ambit="SEZ";      

    switch ($ambit) {
    case 'ST':
      $sql="SELECT * FROM `innova_poligons` as pol ";
      $sql .="INNER JOIN (SELECT est.Codi_ST as Codi_ST , count(id),countEst, Format((count(id)/countEst)*100,2) as percent FROM  ";
      $sql .="(select `id`, `Curs`, `Codi_centre`, `id_programa`, `Programa` from innova_programes_centres Group By Codi_centre) as cenPrg ";
      $sql .="INNER JOIN innova_centres as cen on cenPrg.Codi_centre=cen.Codi ";
      $sql .="INNER JOIN innova_programes as nomPrg on cenPrg.id_programa=nomPrg.id_programa ";
      $sql .="inner join (SELECT `Codi_ST`,count(codi) as countEst FROM `innova_centres` group by Codi_ST) as est  on est.Codi_ST=cen.Codi_ST ";
      $sql .="Group By Codi_ST ) as percent on percent.Codi_ST= pol.Codi_ST ";

      if ($fltrPol!=""){
        $sql .="WHERE ".$fltrPol;
      }
      if ($ord!=""){
        $sql .="ORDER BY ".$ord;
      }
      break;

    case 'SEZ':
      $sql="SELECT * FROM `innova_poligons` as pol ";
      $sql .="INNER JOIN (SELECT est.Codi_ST, est.Nom_SE, count(id) as numCenInnova,countEst as totalCen, Format((count(id)/countEst)*100,2) as percent FROM  ";
      $sql .="(select `id`, `Curs`, `Codi_centre`, `id_programa`, `Programa` from innova_programes_centres Group By Codi_centre) as cenPrg ";
      $sql .="INNER JOIN innova_centres as cen on cenPrg.Codi_centre=cen.Codi ";
      $sql .="INNER JOIN innova_programes as nomPrg on cenPrg.id_programa=nomPrg.id_programa ";
      $sql .="inner join (SELECT Codi_ST,`Nom_SE`,count(codi) as countEst FROM `innova_centres` group by Nom_SE) as est  on est.Nom_SE=cen.Nom_SE ";
      $sql .="Group By Codi_ST,Nom_SE ) as percent on percent.Nom_SE= pol.Nom_SE ";


      if ($fltrPol!=""){
        $sql .="WHERE ".$fltrPol;
      }
      if ($ord!=""){
        $sql .="ORDER BY ".$ord;
      }
      break;      

    default:
      # code...
      break;
    }

    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      //$data[$i]["Color"]='#FF0000';
      $data[$i]["Color"]='#FF00FF';      
      $i++;
    }
    echo json_encode($data);    
    break;




  case "recollidaPlantilles":
    $codPlant=$valors[2];        
    //echo $codPlant;
    $sql="SELECT *  FROM `innova_plantilles` ";
    //$sql .="WHERE codi_plantilla='".$codPlant."'";
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);    
    break;


  case "recollidaDades":
 	  $colconfig=$valors[1];        
  	$fltr=$valors[2];
    if (isset($valors[3])){
      $ord=$valors[3];    
    } else {
      $ord="";
    }

    $sql="SELECT id, codi_centre, Latitud, Longitud, Codi_ST, Bloc, Nom_programa , curs, Municipi ,  Naturalesa, Nom , TipusCentre, Ambits_innovacio, Ambits_curriculars, Logo , Web, Descripcio, Enllac,Titol  FROM `innova_programes_centres` as cenPrg ";
    $sql .="INNER JOIN innova_centres as cen on cenPrg.Codi_centre=cen.Codi ";    
    $sql .="INNER JOIN innova_programes as nomPrg on cenPrg.id_programa=nomPrg.id_programa ";        
    if ($fltr!=""){
      $sql .="WHERE ".$fltr;
    }
    if ($ord!=""){
      $sql .="ORDER BY ".$ord;
    }
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_row($result)) {
      $data[$i]=$row;                              
      $i++;
    }
 
    echo json_encode($data);   
  	break;



  case "recollidaCentresProgramaSE":
    $idPrg=$valors[0];        
    $nomSE=$valors[1];            
    $sql="SELECT `Nom_SE`,`Codi`, `Nom`, `Municipi`, `Naturalesa`,  `TipusCentre`,  `Estudis`, `Web`, group_concat(Curs Order by Curs separator '<br>' ) as CursosPrograma FROM `innova_programes_centres` as inn ";
    $sql .="INNER JOIN `innova_centres` as cen on inn.Codi_centre = cen.Codi ";
    $sql .="Where Id_programa=".$idPrg." and Nom_SE ='".$nomSE."' " ;
    $sql .="Group By Codi_centre " ;    
    $sql .="Order by nom " ;        

    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
 
    echo json_encode($data);   
    break;

 
  case "recollidaCentres":
    $colconfig=$valors[1];        
    $fltr=$valors[2];
    $ord=$valors[3];    
    $sql="SELECT `Codi`, `Latitud`, `Longitud`,  `Codi_ST`, `Comarca`, `Nom_SE`, `Municipi`, `Naturalesa`,  `TipusCentre`, `Nom`, `Estudis`, `Web`, `Logo` FROM `innova_centres` ";
    if ($fltr!=""){
      $sql .="WHERE ".$fltr;
    }
    if ($ord!=""){
      $sql .="ORDER BY ".$ord;
    }
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_row($result)) {
      $data[$i]=$row;                              
      $i++;
    }
 
    echo json_encode($data);   
    break;


  case "recollidaDescripcio":
    $id=$valors[0];        
    $sql="SELECT * FROM `innova_programes_centres` Where Id=".$id;
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    while ($row = mysqli_fetch_assoc($result)) {
      $idPrg=$row["id_programa"];                              
      $codiCentre=$row["Codi_centre"];            
    }


    $sql="SELECT inn.id_programa, group_concat(Curs order by Curs) as Cursos, `Codi`, `Latitud`, `Longitud`,  `Codi_ST`, `Comarca`, `Nom_SE`, `Municipi`, `Naturalesa`,  `TipusCentre`, `Nom`, `Estudis`, `Web`, `Simbol`, Nom_programa, Descripcio, Enllac, Ambits_curriculars, Ambits_innovacio, `Titol` FROM `innova_programes_centres` as inn ";
    $sql .="INNER JOIN innova_programes as prg on inn.id_programa=prg.id_programa ";
    $sql .="INNER JOIN innova_centres as cen on inn.Codi_centre=cen.Codi ";
    $sql .="WHERE inn.Id_programa=".$idPrg." and Codi_centre='".$codiCentre."' " ;
    $sql .="Group by inn.Id_programa, Codi_centre" ;    
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
 
    echo json_encode($data);   
    break;


case "recollidaEstadistiquesST":
    $idPrg=$valors[0];      
    $sql="SELECT nomPrg.id_programa as id_programa, est.Codi_ST as Codi_ST, count(id) as cenPrg, countEst as cenST, Format((count(id)/countEst)*100,2) as proporcio,  ";
    $sql .="SUM( IF( Curs =  '2015-2016', 1, 0 ) ) AS  '2015-2016', ";
    $sql .="SUM( IF( Curs =  '2016-2017', 1, 0 ) ) AS  '2016-2017', ";
    $sql .="SUM( IF( Curs =  '2017-2018', 1, 0 ) ) AS  '2017-2018' ";  
    $sql .="FROM  ";
    $sql .="(select `id`, `Curs`, `Codi_centre`, `id_programa`, `Programa` from innova_programes_centres Group By Codi_centre) as cenPrg ";
    $sql .="INNER JOIN innova_centres as cen on cenPrg.Codi_centre=cen.Codi ";
    $sql .="INNER JOIN innova_programes as nomPrg on cenPrg.id_programa=nomPrg.id_programa ";
    $sql .="inner join (SELECT `Codi_ST`,count(codi) as countEst FROM `innova_centres` group by Codi_ST) as est  on est.Codi_ST=cen.Codi_ST ";
    $sql .="Where nomPrg.id_programa='".$idPrg."' ";
    $sql .="Group By Codi_ST ";
    if ($fltr!=""){
      $sql .="WHERE ".$fltr;
    }
    if ($ord!=""){
      $sql .="ORDER BY ".$ord;
    }
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);   
    break;


  case "recollidaCentresProgramaST":
    $idPrg=$valors[0];        
    $codST=$valors[1];            
    $sql="SELECT  `Nom_programa`,`Codi_ST`, `Municipi`, `Codi`, `Nom`, `Naturalesa`,  `TipusCentre`,  `Estudis`, `Web`, group_concat(Curs Order by Curs separator '<br>' ) as CursosPrograma, `Titol` FROM `innova_programes_centres` as inn ";
    $sql .="INNER JOIN `innova_centres` as cen on inn.Codi_centre = cen.Codi ";
    $sql .="INNER JOIN `innova_programes` as prg on inn.Id_programa = prg.Id_programa ";    
    $sql .="Where inn.Id_programa=".$idPrg." and Codi_ST ='".$codST."' " ;
    $sql .="Group By Codi_centre " ;    
    $sql .="Order by Municipi, nom " ;        

    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
 
    echo json_encode($data);   
    break;




case "recollidaEstadistiquesSE":
    $sql="SELECT est.Codi_ST, est.Nom_SE, count(id) as cenPrg, countEst as cenSE, Format((count(id)/countEst)*100,2) as proporcio FROM  ";
    $sql .="(select `id`, `Curs`, `Codi_centre`, `id_programa`, `Programa` from innova_programes_centres Group By Codi_centre) as cenPrg ";
    $sql .="INNER JOIN innova_centres as cen on cenPrg.Codi_centre=cen.Codi ";
    $sql .="INNER JOIN innova_programes as nomPrg on cenPrg.id_programa=nomPrg.id_programa ";
    $sql .="inner join (SELECT Codi_ST,`Nom_SE`,count(codi) as countEst FROM `innova_centres` group by Nom_SE) as est  on est.Nom_SE=cen.Nom_SE ";
    $sql .="Group By Codi_ST,Nom_SE ";
    if ($fltr!=""){
      $sql .="WHERE ".$fltr;
    }
    if ($ord!=""){
      $sql .="ORDER BY ".$ord;
    }
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    echo "<table>";
      echo "<tr>";
            echo utf8_decode("<td>ST</td>");
            echo utf8_decode("<td>Nom<br>SE</td>");            
            echo utf8_decode("<td>Centres<br>innovació</td>");
            echo utf8_decode("<td>Total<br>centres</td>");
            echo utf8_decode("<td>% centres<br>innovació</td>");
      echo "<tr>";                
    $i=0;
    while ($row = mysqli_fetch_row($result)) {
      echo "<tr>";
            echo "<td>".$row[0]."</td>";
            echo "<td>".utf8_decode($row[1])."</td>";
            echo "<td>".$row[2]."</td>";
            echo "<td>".$row[3]."</td>";
            echo "<td>".$row[4]."</td>";            
      echo "<tr>";            
      $data[$i]=$row;                              
      $i++;
    }
    echo "<table>";
    echo "<style>td{border:1px solid grey;padding:5px}</style>";
    //echo json_encode($data);   
    break;



case "recollidaEst":
    if (isset($valors[0])){
      $Nom_SE=$valors[0];    
    } else {
      $Nom_SE="SE del Priorat";
    }

    $sql="SELECT count(Codi) as numCen from innova_centres where Nom_SE=\"".$Nom_SE."\" Group By Nom_SE ";
    $result=mysqli_query($link, $sql);

    $row = mysqli_fetch_assoc($result); 
    $numCen=$row["numCen"];


    $sql="SELECT prg.`id_programa` as Id_programa, cen.`Nom_SE` as Nom_SE , `Nom_programa`,  COUNT( inn.id_programa ) AS numCenInnova, ".$numCen." as totCen, Format((COUNT( inn.id_programa )/".$numCen.")*100,2) as percent , prg.`Descripcio` as Descripcio  FROM  `innova_programes` AS prg ";
    $sql .="INNER JOIN innova_programes_centres AS inn ON prg.id_programa = inn.id_programa ";
    $sql .="INNER JOIN innova_centres AS cen ON cen.Codi = inn.Codi_centre ";  
    $sql .="where cen.Nom_SE=\"".$Nom_SE."\" ";    
    $sql .="GROUP BY prg.id_programa, Nom_SE ";
    $sql .="ORDER BY `Nom_programa`  ";

    if ($fltr!=""){
      $sql .="WHERE ".$fltr;
    }
    if ($ord!=""){
      $sql .="ORDER BY ".$ord;
    }
    $result=mysqli_query($link, $sql);
    //echo "<br>".$sql."<hr>";
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {

      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);   
    break;


case "recollidaPrograma":
    if (isset($valors[0])){
      $Id_programa=$valors[0];    
    }

    $sql="SELECT * from innova_programes where Id_programa=".$Id_programa;
    $result=mysqli_query($link, $sql);
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);   
    break;


case "recollidaProgramaST":
    if (isset($valors[0])){
      $Id_programa=$valors[0];    
    }

    $sql="SELECT * from innova_programes where Id_programa=".$Id_programa;
    $result=mysqli_query($link, $sql);
    $i=0;
    while ($row = mysqli_fetch_assoc($result)) {
      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);   
    break;


case "recollidaDadesProgramaCurs":
    if (isset($valors[0])){
      $Id_programa=$valors[0];    
    }

    $sql="SELECT prg.id_programa, Nom_programa, ";
    $sql .="SUM( IF( Curs =  '2015-2016', 1, 0 ) ) AS  '2015-2016', ";
    $sql .="SUM( IF( Curs =  '2016-2017', 1, 0 ) ) AS  '2016-2017', ";
    $sql .="SUM( IF( Curs =  '2017-2018', 1, 0 ) ) AS  '2017-2018' ";            
    $sql .="FROM innova_programes_centres as inn ";
    $sql .="Inner join innova_programes as prg on inn.Id_programa=prg.Id_programa ";
    $sql .="GROUP BY prg.id_programa ";
    $sql .="Order BY Nom_programa";    
    //echo "<br>".$sql."<hr>";
    $result=mysqli_query($link, $sql);
    $i=0;
    while ($row = mysqli_fetch_row($result)) {
      $data[$i]=$row;                              
      $i++;
    }
    echo json_encode($data);   
    break;

}
//Final del la recollida de dades 



?>

