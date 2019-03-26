<!DOCTYPE html>
<meta charset="UTF-8">
<html>
  <head>
    <base target="_top">
    
<!-- jQuery -->
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/themes/cupertino/jquery-ui.css">

<!-- <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>  -->
<!--<script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>-->
<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>     


<!--Datatables-->
<!-- jQuery -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" >
<link href="https://cdn.datatables.net/buttons/1.0.3/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" > 

<!-- Leaflet -->
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>   

<!-- Make sure you put this AFTER Leaflet's CSS -->
<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script> 
   

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANTZUP7RPqwaCdyiFp2XhWcJLQxRDRX5U" async defer></script>
<script src='https://unpkg.com/leaflet.gridlayer.googlemutant@latest/Leaflet.GoogleMutant.js'></script>   

<script src='https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js'></script>
  
<link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.3.0/MarkerCluster.css">
<link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.3.0/MarkerCluster.Default.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.3.0/leaflet.markercluster-src.js" ></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-providers/1.3.1/leaflet-providers.js" ></script> 

<script src="https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier-Leaflet/0.2.6/oms.min.js"></script>

<!-- Per als mapes del Cartogràfic -->
<script src="https://rawgithub.com/kartena/Proj4Leaflet/master/lib/proj4-compressed.js" type="text/javascript"></script>
<script src="https://rawgithub.com/kartena/Proj4Leaflet/master/src/proj4leaflet.js" type="text/javascript"></script>
 
<!-- buttons -->
<!-- <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script> -->
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/select/1.2.5/js/dataTables.select.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script>

<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

<script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.print.min.js"></script>

<!--
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
-->

<!-- Bootstrap -->
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>


<style>
.centered{
    width: 85%;
    /*height: 410px;*/
    position: absolute;
    /*top:-200px;*/
    top: 40px;
    left: 0;
    right: 0;
    margin: auto;
}

.opcio{
  color:blue;
}

.nourl{
   pointer-events: none;
   cursor: default;
   text-decoration:none;
}

.zoom {
  width: 35px; 
  height: 35px; 
  margin: 5px;
}

.noZoom {
  width: 0px; 
  height: 35px; 
  margin: 5px;
}

.selFiltre{
   height: 35px; 
   font-size: 14px; 
   margin: 2px 3px;
}

#tblDades{
    font-size:12px;
    line-height: 1;
}


#map {
   height: 100%;
}
   

#divPresTaula, #divPresTargetes  {
   height: 100%;
}

/* Optional: Makes the sample page fill the window. */
html, body {
   height: 90%;
   margin: 0;
   padding: 0;
}

#divTitols{
  font-size:1.5em;
  line-height: 35px;
  vertical-align: middle;  
}

.tblResultats{
    border: 1px solid black;
    width: 90%;
    margin: 0 auto;  
    max-height: 250px;
    overflow-y:scroll;        
}

.tblEdit{
    font-size:15px;
}

th{
 background-color: #cacaca;
}

tr:hover {
  background-color: #d9d9d9;
}

#tblEditReg{
 background-color: #ffffff;
 font-size: 11px;
}

#tblEditReg td{
 padding: 5px 0px;
}

#tblEditReg input, textarea{
 background-color: #f9efef;
 /*background-color: #ac1a0e1a;*/
}

#tblEditReg th{
 background-color: #cacaca;
}

#tblEditReg tr:hover {
  background-color: #d9d9d9;
}


.modal-dialog{
   background-color: white;
   width: 85%;
}

.modal-header{
   background-color: rgb(224, 236, 247);

}

.modal-body{
  /*min-height: 500px;*/
}

.modal-footer{
  clear:both;
}

<!--Mapa-->

   .laLlegenda{
   }

   #llegendaMapa {
     font-family: Arial, sans-serif;
     background: #ffffff;
     padding: 10px;
     margin: 10px;
     border: 1px solid #000;
  }

  .laSuperposicio{
  }

  #Superposicio {
     font-family: Arial, sans-serif;
     background: rgba(0, 0, 255, 0.5); 
     margin: -5px;
     width:400px;
     height:1000px;
  }


.tblInfoPol td{
  padding:1px 5px;
}

#tblInfoEst td{
  /*padding:2px;*/
}

#tblInfoEst th{
  font-weight: bold;
}





#tblCenPrg tr:nth-child(odd) {
    background-color:#dadada!important;
}
#tblCenPrg tr:nth-child(even) {
    background-color:#fafafa!important;
}

#tblCenPrg tr:hover td{ 
  background-color:grey; 
  color: #ffffff;
} 


#tblCenPrg td{ 
  border: solid 1px grey;
} 


#tblDadesEst th{
  font-weight: bold;
  background-color: #a2c1f4;
  padding: 5px;
}

#tblDadesEst td{
   padding: 5px;
}

#tblDadesEst tr{
   border-bottom: 1px solid #cacaca ;
}

#tblDadesEst tr:nth-child(odd) {
    background-color:#dadada;
}
#tblDadesEst tr:nth-child(even) {
    background-color:#fafafa;
}


#tblDadesEst tr:hover td{ 
  background-color:grey; 
  color: #ffffff;
} 

#tblDadesEst td + td + td   {
  text-align: right;
}

#tblDadesEst th + th + th   {
  text-align: right;
}


#tblEstPrgST th{
  font-weight: bold;
  background-color: #939393;
  padding: 5px;
}

#tblEstPrgST td{
    padding: 0px 5px;
}

#tblEstPrgST td + td + td  {
  text-align: center;
}

#tblEstPrgST th + th + th  {
  text-align: center;
}


#tblCenPrg th{
  font-weight: bold;
  background-color: #939393;
  padding: 5px;
}

#tblCenPrg td{
    padding: 0px 5px;
}

#tblCenPrg tr:nth-child(odd) {
    background-color:#dadada!important;
}

#tblCenPrg tr:nth-child(even) {
    background-color:#fafafa!important;
}

#tblCenPrg tr:hover td{ 
  background-color:grey; 
  color: #ffffff;
} 

#tblEstPrgST tr:hover td{ 
  background-color:grey; 
  color: #ffffff;
} 


.tableFixHead {
  overflow-y: auto;
  height: 200px;
}

.tableFixHead table {
  border-collapse: collapse;
  width: 100%;
}

.tableFixHead th,
.tableFixHead td {
  padding: 8px 16px;
}

.tableFixHead th {
  position: sticky;
  top: 0;
  background: #eee;
}


.progress{
  height: 20px;
}

<!--Style timeLineMaps-->

    div#timelinecontainer{
    width: 100%;
    height: 60%;
  background: #B7C1CF;  
    }
  
    div#mapcontainer {
    width: 100%;
    height: 40%;
  background: #CFB7B7;  
    } 
    
    div#timeline{
  left:2%;  
    width: 98%;
    height: 100%;
    font-size: 11px;
    background: #CCCCCC;
    }        
    
    div#map {
  left:2%;  
    width: 98%;
    height: 100%;
    background: #EEEEEE;
    }
  
  div#global_menys_alçada{
  position:absolute;
  left:1%;
  top:150px;  
  z-index:100;
  }
    
  div#global_mes_alçada{
  position:absolute;
  left:1%;
  top:164px;  
  z-index:100;
  }

  div#mapa_menys_alçada{
  position:absolute;
  left:1%;
  top:440px;  
  z-index:100;
  }

  div#mapa_mes_alçada{
  position:absolute;
  left:1%;
  top:454px;  
  z-index:100;
  }

  div#timeline_amplada_text {
  /*position:absolute;*/
  left:4%;
  top:60px; 
  z-index:200;
  }

  div#timeline_amplada {
  /*position:absolute;*/
  left:4%;
  top:75px; 
  z-index:300;
  }
    
  div.infodescription {
    font-style: normal;
    width: 300px;
 }

p{font-family: Arial;
    font-size:1em;
}

.esq{float:left;}
.dret{padding-left:10px;margin-left: 130px;}
a{text-decoration: none;color:#AD2114;}
a:hover{text-decoration: none;color:grey;}




</style>  

</head>

<body>

   <div id="ocult" style=" display:none;">
   </div>

    <div id="imgtemp" style="position: absolute; margin-left: 25%; margin-top: 5%; width: 50%; height: 300px; background-color: #A0AAD5; opacity:0.7; z-index: 99; font-size:1em">
         <input id="btnTancar" type="button" value="X"/>
         <div style='text-align:center; line-height: 100px'>
             Carregant dades
             <br><img src="https://drive.google.com/uc?id=1_O7dANSqSFwgMIC0m7QxTzOD0q-V_nac" style="width: auto; display: block; margin: 0 auto" /> 
         </div> 
    </div>
    <div class="panel-heading" id="Capçalera" style="visibility: hidden;">
        <h3 class="panel-title">
            <div class="row">
               <div class="col-md-8">
                  <h3>Innovacio</h3>
               </div>
               <div class="col-md-4">
                  <img width="120px" style="float: right;" src="">
               </div>
            </div>
        </h3>
    </div>
         
    <div class='container-fluid'>

           
        <div class='row filtres' style='margin:5px 0px;visibility: hidden; float:left; width:85%' id="divFiltres"></div>      
        
        <img src='https://drive.google.com/uc?id=1X1tZEQ8PYYhpQ2nUijq0cwJB5mbqxYpw' id="imgInfo" style="width:38px; margin:5px 5px; float:right; visibility: hidden" onclick="activaInfo()"/>
        <img alt="Fulls de càlcul de Google" src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_spreadsheet_x32.png" id="fullCalcul" style="width:38px; margin:5px 5px; float:right; visibility: hidden" onclick="obrirFullCalcul()"/>  

        <div id="bloc_capçalera_2" hidden>
            <div class='row filtres' style='margin:5px 0px 5px 0px;visibility: hidden; float:left;' id="divTipus">             
                <div id="divSelTipus" style="margin-left:2px;float:left;visibility: hidden; float:left;">
                </div>
                <div class='row filtres' style='margin-left:5px; margin-right:5px; visibility: hidden; float:left' id="divMapaBase"></div> 
                <input id='botoCentrar' src="https://drive.google.com/uc?id=1jVkYeRZiImemNB9QVHJjkbR2xaYgz4mz" class="noZoom" type="image" onClick="centrar()" style='float:left; margin-left:10px; margin-top:0px'> 
            </div> 
            
            <div class='row titols' style='margin:5px 50px; float:left; text-align:center; visibility: hidden' id="divTitols">
            </div>             
            <div style='font-size:14px; float: right;  margin:5px 0px; visibility: hidden' id="btnNovaPagina">
                <input type="button" id="btnB1" value="Anteriors"/>
                <input type="button" id="btnB2" value="Següents"/>
            </div>
            <div style='font-size:14px; float: right; margin-right:10px; margin-top:5px' id='comptadorPagines'></div>
        </div>
        <div id="divPresTaula" style="clear:both; width: 100%; margin-top:5px">
             <div id="userEmail"></div>
             <div id="divFormTaula"></div>
        </div>
        <div id="divPresTargetes" style="clear:both; width: 100%; margin-top:5px"></div>        
        <div id='divBotons' hidden >
            <div style="width:50%; float: left">

            </div>
            <form>
               <div id='btnTancarApl' style='width:50%; float: right; visibility: hidden'><button class='btn btn-primary' style="background-color:grey; width: 25%; display: block; margin: 0 auto"  onclick="self.close()"> Tancar </button></div>
            </form>
        </div>        
    </div>
 
    <div id="map" style="clear:both; margin: 5px 0px" hidden></div>      

<!-- Modal -->
    <div id="finestraInfo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" width='95%'>
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="modalHeader"></h3>
            </div>
            <div class="modal-body" id="missatge">
                <p></p>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Tancar</button>
            </div>
        </div>
    </div>


    <div id="finestraSecundaria" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style='width:95%;z-index:1500;max-height:800px; margin: 30px auto'>
        <div class="modal-dialog">
          <div style='box-shadow: rgba(0,0,0,0.6) -20px 40px 40px 0;'>          
            <div class="modal-header" id='capFinestraSecundaria' style="background-color:#3E394A;color:#ffffff;display: block">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="background-color:#3E394A;color:#ffffff;">×</button>
              <h3 id="capSecundaria"></h3>
            </div>
            <div class="modal-body" id="cosSecundaria" style="background-color:#e2e2e2;">
            </div>
            <div class="modal-footer" id="peuSecundaria"  style="background-color:#3E394A;" >
            </div>
          </div>
        </div>
    </div>

    <div id="finestraTerciaria" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style='width:95%;z-index:1500;max-height:800px; margin: 40px auto'>
        <div class="modal-dialog">
          <div style='box-shadow: rgba(0,0,0,0.6) -20px 40px 40px 0;'>          
            <div class="modal-header" id='capFinestraSecundaria' style="background-color:#ff5b30;color:#000;display: block">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="background-color:#ff5b30;color:#000;">×</button>
              <h3 id="capTerciaria"></h3>
            </div>
            <div class="modal-body" id="cosTerciaria" style="background-color:#e2e2e2;">
            </div>
            <div class="modal-footer" id="peuTerciaria"  style="background-color:#ff5b30;" >
            </div>
          </div>
        </div>
    </div>


    
</body>    


<!--scripts incials-->
<script>
var row_cap=[];

var tp='innovacio'

if (tp=='centres'){
	row_cap[0]=['Codi', 'Latitud', 'Longitud', 'Nom', 'Municipi', 'Comarca', 'Codi_ST', 'Nom_SE', 'Naturalesa', 'TipusCentre', 'Estudis', 'Web', 'Logo'];
	row_cap[1]=['Codi', 'Latitud', 'Longitud', 'Nom', 'selFiltre', 'Comarca', 'selFiltre', 'Nom_SE', 'selFiltre', 'selFiltre', 'Estudis', 'Web', 'Logo'];
	row_cap[2]=['Codi', 'Latitud', 'Longitud', 'Nom', 'Municipi', 'Comarca', 'Codi_ST', 'Nom_SE', 'Naturalesa', 'TipusCentre', 'Estudis', 'Web', 'Logo'];
} else {
	row_cap[0]=['id','codi_centre','Latitud','Longitud','Codi_ST','Bloc','Nom_programa','curs','Municipi','Naturalesa','Nom','TipusCentre','Ambits_innovacio', 'Ambits_curriculars','Logo','Web','Descripcio','Enllac','Titol']
	row_cap[1]=['id','codi_centre','Latitud','Longitud','selFiltre','selFiltre','selFiltre','selFiltre','Municipi','selFiltre','Nom','selFiltre','csvFiltre','csvFiltre','Logo','Web','Descripcio','Enllac','csvFiltre'];	
	row_cap[2]=['taula:visu','codi_centre','Latitud','Longitud','taula:visu','taula:visu','taula:visu','taula:visu','taula:visu','taula:visu','taula:visu','taula:visu','taula:visu', 'taula:visu','Logo','Web','Descripcio','Enllac','taula:visu'];	
}



var tempsAplicacioFiltresIni;
var tempsAplicacioFiltresFin;
var pasAplicacioFiltres=0;

var finalArray=new Array();

var Acces_restringit;
var Agrupament;
var Capçalera;
var Centre_mapa;
var Clau_API;
var Columna_informacio;
var Columna_latitud;
var Columna_longitud;
var Columna_ordre;
var Contacte;
var Correu_gestors;
var Filtres_csv;
var Filtres_select;
var Filtre_inicial;
var Filtre_inicial_poligons;
var Icona;
var Id;
var ID_carpeta_desti_fitxers;
var ID_plantilla_model;
var Marcador_defecte_color;
var Marcador_defecte_forma;
var Mostra_clusters="S";
var Mostra_poligons="N";
var Mostra_densitat="N";
var Casella_clusters="N";
var Casella_poligons="N";
var Casella_densitat="N";
var Num_columnes;
var Num_files;
var Permetre_canvi_mapa;
var Permetre_edicio_taula;
var Pestanya_dades;
var Pestanya_desti;
var Pestanya_poligons;
var Plantilla_mapa;
var Plantilla_targetes;
var Plantilla_taula;
var Plantilla_timeline;
var Plantilla_timemap;
var Posicio_llegenda;
var Presentacions_permeses;
var Tipus_mapa;
var Titol_aplicacio;
var Titol_mapa;
var Titol_targetes;
var Titol_taula;
var Titol_timeline;
var Titol_timemap;
var Visualitzar_boto_tancar;
var Visualitzar_errors;
var Zoom_automatic;
var Zoom_inicial;
var Zoom_max;


var arrayCheckboxesID;
var arrayCheckboxesValue;
var bloc_capçalera_2="N";
var checkboxClustersValue;
var checkboxHeatmapValue;
var checkboxPoligonsValue;
var checkboxMarcadorsValue;
var Correu_gestors='';
var filtresActius=0;
var finalArray=new Array();
var gruixVoraPoligon=0.3;
var heat;
var informacio="1";
var locations=[];
var mapa_actual=Tipus_mapa;
var nTarFila=0;
var Num_files_capçalera=3;
var numCheckboxes=0;
var numPag=1;
var oms;
var opacitatFonsPoligon=20;
var opacitatVoraPoligon=10;
var opacitatHeatMap=10;
var Permetre_canvi_mapa='S';
var Permetre_canvi_presentacions='S';  
var plantilla_1="";
var plantilla_2="";
var plantilles=[];
var poligons=[];
var Presentacions_permeses='mapa,targetes,taula,estadistiques'
var row_org=new Array();
var row_poligons=[];
var row_tip=[];
var row_var=new Array();
var tipus="";
var Tipus_mapa="Google Maps (roadmap)";
var tipus_mapa_actual;
var userEmail='';
var Visualitzar_boto_tancar='N';
var max_marcadors=1000; // per sobre d'aquest valor es mostraran cercles en comptes de svg de marcador


//variables relacionades amb la presentació de targetes
var Num_files=2;
var Num_columnes=6;

//per determinar fer global la variable que guardarà la columna per la que s'ordenaran les matrius en el moment de construir els desplegables 
var colOrd=0; 
var Columna_id="";
var Capçalera='N';
var permisEdit='N';

//relacionats amb el tipus mapa
if (tp=='centres'){
	var numColAgrupa=1;
	var numColLatitud=1;
	var numColLongitud=2;
} else {
	var numColAgrupa=1;
	var numColLatitud=2;
	var numColLongitud=3;
}

var myRenderer;
var agrupaCentres=[];
var bounds;
var bounds_all;
var Centre_mapa="41.71,1.82";
var centres=[];
var Clusters="S";
//var Heat_map="N";
var iniciantMapa=true;
var llegendes="";
var map;
var mapHis;
var Marcador_defecte_color="#AC2010";
var Marcador_defecte_forma="";
var marcadors=[];
var markerCluster;
var markers;

var nomProveidor=["OpenStreetMap.Mapnik","OpenStreetMap.BlackAndWhite","OpenStreetMap.HOT",
	"Google Maps (roadmap)","Google Maps (satellite)","Google Maps (hybrid)","Google Maps (terrain)",
	"ICGC (Topogràfic)","ICGC (Topogràfic_Gris)","ICGC (Topogràfic_1_5000)","ICGC (OrtoFoto)","ICGC (OrtoFoto_Infraroja)","ICGC (Vol_Americà_1945)",
	"Wikimedia",
	"Esri.WorldStreetMap","Esri.WorldTopoMap","Esri.WorldImagery","Esri.WorldShadedRelief","Esri.WorldGrayCanvas",
	"OpenTopoMap",
	"OpenMapSurfer.Roads","OpenMapSurfer.Grayscale",
	"Hydda.Full","Hydda.Base",
	"Stamen.Toner","Stamen.TonerBackground","Stamen.TonerLite","Stamen.Watercolor","Stamen.Terrain","Stamen.TerrainBackground",
	"MtbMap",
	"CartoDB.Positron","CartoDB.PositronNoLabels","CartoDB.DarkMatter","CartoDB.DarkMatterNoLabels","CartoDB.Voyager","CartoDB.VoyagerNoLabels","CartoDB.VoyagerLabelsUnder",
	"HikeBike.HikeBike","HikeBike.HillShading"
];

var proveidorWMS=[0,0,0,
	0,0,0,0,
	1,1,1,1,1,1, // ICGC
	0,
	0,0,0,0,0,
	0,
	0,0,
	0,0,
	0,0,0,0,0,0,
	0,
	0,0,0,0,0,0,0,
	0,0
];


var numColBloc=0;
var numColColorMark="";
var numColDataFin=0;
var numColDataIni=0;
var numColDescripcio=0;
var numColNomLlegendaMapa=-1;
var numColTitol="";
var Posicio_llegenda="baix_dreta";
var proveidor;
var Proveidor_mapes="OpenStreetMap.Mapnik";
var Visualitzar_errors="N";
var Zoom_automatic="N";
var Zoom_inicial=0;
var Zoom_max=8;

var tipusICGC;
var pixelsIco=24;
var escalaIco=1.5;

var path_defecte="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";

// ICGC
var crs25831 = new L.Proj.CRS('EPSG:25831','+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', {
		resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]
});


var Topogràfic = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
	layers: 'topo',
	format: 'image/jpeg',
	crs: crs25831,
	continuousWorld: true,
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
});

var Topogràfic_Gris = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
	layers: 'topogris',
	format: 'image/jpeg',
	crs: crs25831,
	continuousWorld: true,
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
});

var Topogràfic_1_5000 = L.tileLayer.wms("http://geoserveis.icgc.cat/icc_mapesbase/wms/service?", { // Mapa topogràfic de Catalunya 1:5.000 vigent
	layers: 'mtc5m',
	format: 'image/jpeg',
	crs: crs25831,
	continuousWorld: true,
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
});

var OrtoFoto = L.tileLayer.wms("http://mapcache.icc.cat/map/bases/service?", {
	layers: 'orto',
	format: 'image/jpeg',
	crs: crs25831,
	continuousWorld: true,
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
});

var OrtoFoto_Infraroja = L.tileLayer.wms("http://geoserveis.icgc.cat/icc_mapesbase/wms/service?", { // Ortofoto infraroja de Catalunya 1:2.500 vigent
	layers: 'ortoi25c',
	format: 'image/jpeg',
	crs: crs25831,
	continuousWorld: true,
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
});

var Vol_Americà_1945 = L.tileLayer.wms("http://geoserveis.icgc.cat/icc_ortohistorica/wms/service?", { // Ortofoto de Catalunya del Vol americà sèrie A 1:10.000 (1945-46)
	layers: 'ovaa10m',
	format: 'image/jpeg',
	crs: crs25831,
	transparent: true,
	continuousWorld: true,
	attribution: 'Institut Cartogràfic i Geològic de Catalunya -ICGC',
});


//Variables relacionades amb timeLineMap
//var tm="";
var adrColumna = "adreça";
var alcada_select="550";
var bandaTemps="35";
var dataFinal = "dataFin";
var dataInici = "dataIni";
var descColumna = "Descripcio";
var enllaçColumna = "enllaç";
var etiqueta="";
var idColumna = "id";
var latColumna = "latitud";
var locColumna = "localitat";
var lonColumna = "longitud";
var mapaColor = "red";
var mediaColumna = "Imatge";
var quadreHight = "550";
var quadreWidth = "1000";
var tipus='basic';
var titol_pagina ="prova";
var visColumna = "Visible";

var avui = new Date();
avui=avui.getFullYear()+ "/" + (avui.getMonth() +1)+"/" +avui.getDate() ;

var banda = ["Mil·lisegon","Segon","Minut","Hora","Dia","Setmana","Mes","Any","Decada","Centuria","Mil·leni"];
var banda = [];
var bandIntervals = ["Mil·lisegon","seg","min","hr","day","wk","mon","yr","dec","Centuria","Mil·leni"];
var bandIntervals = [];
var bandIntervals=bandIntervals[bandaTemps];
var finestra_temporal=banda[bandaTemps];

/*Timeline.DateTime.MILLISECOND=0;
Timeline.DateTime.SECOND=1;
Timeline.DateTime.MINUTE=2;
Timeline.DateTime.HOUR=3;
Timeline.DateTime.DAY=4;
Timeline.DateTime.WEEK=5;
Timeline.DateTime.MONTH=6;
Timeline.DateTime.YEAR=7;
Timeline.DateTime.DECADE=8;
Timeline.DateTime.CENTURY=9;
Timeline.DateTime.MILLENNIUM=10;
Timeline.DateTime.EPOCH=-1;
Timeline.DateTime.ERA=-2;
//*/

var adreça= [];
var bloc = [];
var bloc_color = [];
var bloc_color= ['green', 'orange', 'blue','red','purple','ltblue','pink','green', 'orange', 'blue','red','yelow'];
var bloc_nom = [];
//bloc_unic = [[1,1]];
var colors_objectes= ['green', 'orange', 'blue','red','purple','ltblue','pink','green', 'orange', 'blue','red','yelow'];
var colors_objectes= [];
var dades= [];
var data_inici = new Date();
var data_inici =data_inici.getFullYear()+ "/" + (data_inici.getMonth() +1)+"/" +data_inici.getDate() ;
var enllaç= [];
var fin = [];
var inici =[];
var lat = []; 
var latitud=[];
var lon = []; 
var longitud=[];
var media= [];
var poblacio= [];
var targetes= [];
var text= [];
var titol = [];
var titol_curt = [];
var totalfiles = 0;
//final codi declaracio de variables de timeLineMap


//Pantalla d'espera per carregar dades
$(document).ready(function(){ 
  $("#btnTancar").click(function(){
      //$('#imgtemp').remove(); 
      $('#imgtemp').hide();           
  });  
  $("#btnB1").click(function(){
      numPag =numPag-1;  
      aplicacioFiltres();     
  });     
  $("#btnB2").click(function(){
      numPag =numPag+1;  
      aplicacioFiltres();             
  });         


});



/*
var time = 100;
var rellotge=setInterval(test, 100);

function test() {
  time -=1;
  console.log(time);
  if(time < 0) {
    $('#imgtemp').css("display","none");       
    clearInterval(rellotge);       
  }
}
//*/




function carregaDades(opc,valors){
  //console.log(valors);
  /*
  if (opc=='recollidaEst'){
      alert(1);
      return;
  }
  //*/

  values="opc="+opc;


  values +="&valors="+valors;    

  console.log(values);

  $.ajax({
    data:  values,
    url:   'dades_recarregar.php',
    type:  'post',
    success:  function (resposta) {
      row=[];
      row=resposta;            
      //console.log(opc+":  "+row.length+":\n"+row);
      switch (opc){
      case 'recollidaVariables':    
        row=[];
        row=resposta;      
        onVariables(row);    
        break;

      case 'recollidaPlantilles':    
        row=[];
        row=resposta;      
        onPlantilles(row);        
        break;

      case 'recollidaPoligons':
        row=[];
        row=resposta;
        onPoligons(row);
        break;

      case 'recollidaDades':
        row=[];
        row=resposta;
        finalArray=row;        
        onDades(row);       
        break;

      case 'recollidaEst':
        row=[];
        row=resposta;
        onVisuEstSE(row);       
        break;

      case 'recollidaPrograma':
        row=[];
        row=resposta;
        onVisuPrograma(row,valors);               
        break;

      case 'recollidaCentresProgramaSE':
        row=[];
        row=resposta;
        onCenProgramaSE(row);       
        break;

      case 'recollidaProgramaST':
        row=[];
        row=resposta;
        onVisuProgramaST(row,valors);               
        break;

      case 'recollidaEstadistiquesST':
        row=[];
        row=resposta;
        onDistCenProgramaST(row);       
        break;


      case 'recollidaCentresProgramaST':
        row=[];
        row=resposta;
        onCenProgramaST(row);       
        break;

      case 'recollidaDescripcio':
        row=[];
        row=resposta;
        onVisuDescripcio(row);       
        break;

      case 'recollidaCentres':
        row=[];
        row=resposta;
        onDades(row);       
        break;

      case 'comprovacioPermis':
        row=[];
        row=resposta;
        onPermis(row);   
        break;

      case 'salvarDades':
        row=[];
        row=resposta;
        onSalvarDades(row);             
        break;

      case 'recollidaDadesSub':
        row=[];
        row=resposta;
        onTimeLine(row);      
        break;

      case 'recollidaDadesProgramaCurs':
        row=[];
        row=resposta;
        creaEsta(row);      
        break;

      }
    },

    dataType:"json"
  });
}




function inicia(){
    //map = L.map('map');  
    var id=$("#idFullCalcul").val();
    var colconfig=$("#colconfig").val();      
    var colconfig="config_1";
    var fltr=$("#fltr").val(); 
    fltr="Curs='2015-2016' ";         
    //google.script.run.withSuccessHandler(onVariables).recollidaVariables(id,colconfig,fltr);    
    var valors=[id,colconfig,fltr];
    carregaDades('recollidaVariables',valors);        
    //carregaDades('recollidaDades',valors);            
    //carregaDades('recollidaPoligons',valors);    
    //carregaDades('recollidaPlantilles',valors);    
}


function obrirFullCalcul(id_full){
   window.open('https://docs.google.com/spreadsheets/d/'+id_full,'_blank');
}


/*
function fnBoto(id_registre,columna,id,url){
   //url=row_org[id_registre][columna];
   //var org=row_org[id_registre][columna];
   //console.log("id: "+id_registre+"\nColumna: "+columna+"\nID: "+id+"\nURL: "+url);
   $('#imgtemp').css('display','block');
   $('#imgtemp').css("visibility","visible");   
   //$("*").css("cursor","wait");      
   if (row_org[0][columna]=="Fitxa"){
      if(url==""){      
         var id=$("#idFullCalcul").val();
         var colconfig=$("#colconfig").val();    
         google.script.run.withSuccessHandler(onFitxa).crear_fitxer_apadrina(id_registre,id,colconfig);     
      } else {
         obreFitxa(url);
      }
   } else {
      obreFitxa(url);
   }
}

function onFitxa(retorn){
   //alert(retorn);
   var fil=retorn[0];
   var col=retorn[1];
   var url=retorn[2];   
   var ele=retorn[3]; 
   var id_registre=retorn[4]; 

   //actualitzar taula amb les dades de la url creada
   $("#"+"btn_"+fil+"_"+col).attr('name', url);

   //desactivar pantalla d'espera
   $('#imgtemp').css('display','none');
   //$("*").css("cursor","default");    

   $("#modalHeader").html("Creació de fitxa de: "+ele);
   var divMissatge="Fitxa creada correctament";
     divMissatge +="<br>S'han afegit, amb permís d'edició del document, els usuaris crp i els gestors de l'aplicació, entre ells sose@xtec.cat";   
     divMissatge +="<br><br>Traspasseu la propietat del document al usuari <strong>sose@xtec.cat</strong>";   
     divMissatge +="<br><br>Afegiu els usuaris que considereu han de poder afegir/modificar informació en el document";        
     divMissatge +="<br><br><a href='"+url+"' target='_blank'>Obrir la fitxa</a>";   
   $("#missatge").html(divMissatge);
   $('#finestraInfo').modal('show');
   //$("*").css("cursor","default");    
      
   $("#tblResultats").css({
     "border":"1px solid black",
     "width": "90%",
     "margin": "0 auto",  
     "max-height": "250px",
     "overflow-y": "scroll"});
}

function obreFitxa(url){
  $('#imgtemp').css('display','none');
  //$("*").css("cursor","default");     
  window.open(url);  
}
//*/


//Càrrega de les variables 
function onVariables(variables) {
   row_var=variables;
   for (v=0;v<row_var.length;v++){
      //console.log(row_var[v][0]);
      valVar=row_var[v]["valor_variable"];
      if (valVar.indexOf("'")>-1){      
          valVar=valVar.replace(new RegExp("'", 'g'),"&apos;"); 
      }
      var str=row_var[v]["nom_variable"]+"='"+valVar+"'";
      eval(str);      
   }
   if (Capçalera=='N'){
     $("#Capçalera").css("display","none");
   } else {
     $("#Capçalera").css("visibility","visible");          
     $("#Capçalera").css("display","block");   
   }
   
   //console.log(Correu_gestors+"\n"+userEmail);
   if (Correu_gestors.indexOf(userEmail)>-1 && userEmail!=""){
       $("#fullCalcul").css("visibility","visible");
   } else {
       $("#fullCalcul").remove();   
   }

   //determinar la columna de la latitud i la logintud si n'hi ha
   /*
   numColLatitud=parseInt(Columna_latitud.charCodeAt(0)-65);
   numColLongitud=parseInt(Columna_longitud.charCodeAt(0)-65);  
	//*/

   
   //Creació del select de Mapa Base
   var strBase="<select id='mapaBase'  style='float:left; width:275px; height: 35px; font-size: 14px;' onChange='canviaMapaBase(this.value)'>";
   strBase += "<option selected disabled>Tipus de mapa</option>";
   for(i=0; i<nomProveidor.length; i++){
      strBase +="<option value="+i+">"+nomProveidor[i]+"</option>";
      }
   strBase +="</select>";
   $("#divMapaBase").html(strBase);

   //Creació del select de presentacions si hi ha més d'una
   row_tip=Presentacions_permeses.split(",");   
   if (row_tip.length>1){
       var str="<select id='selTipus' onchange='aplicaTipus(this.value)' style='float:left; width:300px; height: 35px; font-size: 14px;'>";
           for(i=0; i<row_tip.length; i++){
              str +="<option value='"+row_tip[i]+"'>Presentació en forma de "+row_tip[i].toUpperCase()+"</option>";
            }
            str +="</select>";
      $("#divSelTipus").html(str);
      $("#divSelTipus").css("visibility","visible");         
      $("#divTipus").css("visibility","visible");   
   }
   
   if (Visualitzar_boto_tancar=='S'){
      $("#btnTancarApl").css("visibility","visible");         
   }


   
   if(Clusters!=undefined) {
      Mostra_clusters=Clusters;
   }



   //var plantilla=plantilles[0][1];   
   //recollir les dades despres de les variables per garantir que està el nombre de files a mostrar
   var id=$("#idFullCalcul").val();
   var colconfig=$("#colconfig").val(); 
   


   if(Tipus_mapa.search("ICGC")!=-1) {
        $("#map").show();
        tipusICGC=Tipus_mapa.replace("ICGC (","");
        tipusICGC=tipusICGC.replace(")","");
        var center = [41.82045, 1.54907];
        map = L.map('map', {
                            layers:[eval(tipusICGC)],
                            crs: crs25831,
                            continuousWorld: true,
                            worldCopyJump: false,
                            center: center,
                            zoom: 1
                            });
        tipus_mapa_actual=1;
    } else {       
        map = L.map('map'); 
        if(Tipus_mapa.search("Google")!=-1) {
        var tipusGoogle=Tipus_mapa.replace("Google Maps (","");
        tipusGoogle=tipusGoogle.replace(")","");
        proveidor=L.gridLayer.googleMutant({ type: tipusGoogle }).addTo(map);         
        } else {
        proveidor= new L.tileLayer.provider(Tipus_mapa);
        } 
        map.addLayer(proveidor); 
        tipus_mapa_actual=0;
    }

    myRenderer = L.svg(); 
    map.createPane('poligons');
    map.getPane('poligons').style.zIndex = 250;
    markers = L.markerClusterGroup(); 
    if (Mostra_clusters=='N') {
        oms = new OverlappingMarkerSpiderfier(map,{nearbyDistance:1});
        oms.addListener('spiderfy', function(markers) {
            map.closePopup();
        });
    }

    //google.script.run.withSuccessHandler(onPlantilles).recollidaPlantilles(id,colconfig);  
    //var valors=[id,colconfig];
    var valors=[id,,'Template_1'];    
    carregaDades('recollidaPlantilles',valors);      
}





function canviaMapaBase(numMapa) {
    if(tipus_mapa_actual==0){
        map.removeLayer(proveidor);
    } else {
        map.removeLayer(eval(tipusICGC));
    }
    if(proveidorWMS[numMapa]==0) {
        if(nomProveidor[numMapa].search("Google")!=-1) {
            var tipusGoogle=nomProveidor[numMapa].replace("Google Maps (","");
            tipusGoogle=tipusGoogle.replace(")","");
            proveidor=L.gridLayer.googleMutant({ type: tipusGoogle }).addTo(map);         
        } else {
            proveidor= new L.tileLayer.provider(nomProveidor[numMapa]);
        }  
        map.addLayer(proveidor);
        tipus_mapa_actual=0;
    } else {
        var nouMapa=nomProveidor[numMapa].replace("ICGC (","");
        nouMapa=nouMapa.replace(")","");
        map.addLayer(eval(nouMapa));
        tipusICGC=nouMapa;
        tipus_mapa_actual=1;
    }
}



//Càrrega dels estils de la plantilla
function onPlantilles(plt) {
   if (plt.length<row_tip.length){
      var missatge=[];
      missatge[0]=[];
      missatge[0][0]="No s'han trobat les pestanyes de les següents plantilles indicades al full de configuració<br><br>Reviseu aquesta informació";
      missatge[0][1]="Tipus de presentació autoritzat";      
      missatge[0][2]="Plantilla indicada";            
      missatge[0][3]="Situació";                  
      for (t=0;t<row_tip.length;t++){
        missatge[t+1]=[];      
        missatge[t+1][0]=row_tip[t];      
        missatge[t+1][1]="";            
        missatge[t+1][2]="No trobada";                        

        for (p=0;p<plt.length;p++){
          if (plt[p]["codi_plantilla"].toLowerCase()===row_tip[t].toLowerCase()){
            missatge[t+1][1]=plt[p]["plantilla"];            
            missatge[t+1][2]="Trobada";              
            break;         
          }
        }

      }

      //mostraErrades(missatge);
    }
    var p=0; 
    for (p=0;p<row_tip.length;p++){ 
      plantilles[p]=[];
      plantilles[p][0]=row_tip[p].toLowerCase(); //tipus      
      plantilles[p][1]=eval("Plantilla_"+row_tip[p].toLowerCase())
      for (j=0;j<plt.length;j++){
        if (plantilles[p][1]==plt[j]["codi_plantilla"]){
          plantilles[p][2]=[];      
          plantilles[p][2][0]=plantilles[p][2][1]=plantilles[p][2][2]=plantilles[p][2][3]=plantilles[p][2][4]=plantilles[p][2][5]=plantilles[p][2][6]="" ;

          plantilles[p][2][0] +=plt[j]["plantilla"];
          plantilles[p][2][1] +=plt[j]["botons"];           
          plantilles[p][2][2] +=plt[j]["style"];           
          plantilles[p][2][3] +=plt[j]["script"];           
          plantilles[p][2][4] +=plt[j]["div"];   
          plantilles[p][2][5] +=plt[j]["info"];   
          plantilles[p][2][6] +=plt[j]["llegenda"];         
          llegendes=plt[j]["llegenda"];  
        }
      }
   }
   tipus=plantilles[0][0];
   var id=$("#idFullCalcul").val();
   var colconfig=$("#colconfig").val();
   var fltrPol=$("#fltrPol").val(); 
   //fltrPol="Tipus_geometria='ST'"            
   fltrPol="Tipus_geometria='SEZ'"               
   //google.script.run.withSuccessHandler(onPoligons).recollidaPoligons(id,colconfig,fltrPol);      
   valors=[id,colconfig,fltrPol];
   carregaDades("recollidaPoligons",valors);         
}




//Visualitza les primeres fitxes
function onPoligons(dad) {
  row_poligons=dad;
  var id=$("#idFullCalcul").val();
  var colconfig=$("#colconfig").val();
  var fltr=$("#fltr").val();             
  //google.script.run.withSuccessHandler(onDades).recollidaDades(id,colconfig,fltr);   
  var valors=[id,colconfig,fltr];
  carregaDades('recollidaDades',valors);     
}




function aplicaTipus(){
  if (plantilles.length==1){
     tipus=plantilles[0][0];
  } else {
     tipus=$("#selTipus").val();     
  }

  if (tipus=="estadístiques"){

    carregaDades('recollidaDadesProgramaCurs');
    return;
  }

  //tipus=$("#selTipus").val();    
  if (tipus=="mapa" && Permetre_canvi_mapa=='S') {
     $('#divMapaBase').css("visibility","visible"); 
  } else {
     $('#divMapaBase').css("visibility","hidden"); 
  } 
    
  if (tipus=="mapa" && Zoom_automatic=='N') {
      $('#botoCentrar').removeClass("noZoom").addClass("zoom");
  } else {
      $('#botoCentrar').removeClass("zoom").addClass("noZoom");
  }

  $('#imgtemp').css('display','block');
  $('#imgtemp').show();   
 
  //$("*").css("cursor","wait");   
  //determinar la plantilla a aplicar
  for (p=0;p<plantilles.length;p++){
    console.log(p,plantilles[p]);
    if (plantilles[p][0]==tipus){
       plantilla_1=plantilles[p][2][0];       
       plantilla_2=plantilles[p][2][1];              
       $('#divEstil').html(plantilles[p][2][2]);  
       script=plantilles[p][2][3].replace(new RegExp('""', 'g'),'"');
       $('#divScript').html(script);      
       $('#divDiv').html(plantilles[p][2][4]);  
       console.log(row_var);
       //if (plantilles[p][1]!=""){
       if (row_var["Titol_targetes"]!=""){        
          $("#divTitols").html(row_var["Titol_targetes"]);
          $("#divTitols").css("visibility","visible");         
       } else {
          $("#divTitols").remove(); 
       }

       if (plantilles[p][2][5]!="undefined"){              
          //info=plantilles[p][2][5].replace(new RegExp('""', 'g'),'"');       
          informacio=plantilles[p][2][5];                 
          if (informacio.length>0){
              $("#imgInfo").css("visibility","visible");                     
          }
       } else {
          informacio="";                        
          $("#imgInfo").css("visibility","hidden");                                   
       }

       break;
    }
  }
  //if (plantilles.length>1 || plantilles[0][1].length>0){
  if (row_tip.length>1 ){    
      $("#bloc_capçalera_2").show();            
  }
  creaTipus();  
}



function creaTipus(){
   $('#imgtemp').css('display','block');
   //$("*").css("cursor","wait");   

   switch (tipus){
   case "mapa":
     $("#btnNovaPagina").css("visibility","hidden");         
     $("#comptadorPagines").css("visibility","hidden");                 
     $("#divBotons").css("display","none");                     
     $("#divPresTaula").css("display","none");                               
     $("#divPresTargetes").css("display","none");                      
     $("#divPresTimeMap").css("display","none");               
     $("#divPresTimeLine").css("display","none");                   
     $("#map").css("visibility","visible");               
     $("#map").css("display","block");   
     $("#map").css("margin-left","0px");        
     break;
   case "taula":
     $("#btnNovaPagina").css("visibility","hidden");           
     $("#comptadorPagines").css("visibility","hidden");                      
     $("#divBotons").css("visibility","visible");       
     $("#divBotons").show();                          
     $("#map").css("display","none");                     
     $("#llegendaMapa").css("display","none");                         
     $("#divPresTimeMap").css("display","none");               
     $("#divPresTimeLine").css("display","none");                   
     $("#divPresTaula").css("display","block");                          
     $("#divPresTargetes").css("display","none");       
     break;
   case "targetes":
     $("#divBotons").css("visibility","hidden");    
     $("#comptadorPagines").css("visibility","visible");                 
     $("#btnNovaPagina").css("visibility","visible");                 
     $("#map").css("display","none");                          
     $("#llegendaMapa").css("display","none");                              
     $("#divPresTimeMap").css("display","none");               
     $("#divPresTimeLine").css("display","none");                  
     $("#divPresTaula").css("display","none");                          
     $("#divPresTargetes").css("display","block");            
     break;      
   case "timemap":
     $("#btnNovaPagina").css("visibility","hidden");         
     $("#comptadorPagines").css("visibility","hidden");                 
     $("#divBotons").css("display","none");                     
     $("#divPresTaula").css("display","none");                               
     $("#divPresTargetes").css("display","none");            
     $("#map").css("display","none");       
     $("#llegendaMapa").css("display","none");                              
     $("#divPresTimeLine").css("display","none");               
     $("#divPresTimeMap").css("display","none");               
     $("#divPresTimeMap").css("display","block");                              
     break;      
   case "timeline":
     $("#btnNovaPagina").css("visibility","hidden");         
     $("#comptadorPagines").css("visibility","hidden");                 
     $("#divBotons").css("display","none");                     
     $("#divPresTaula").css("display","none");                               
     $("#divPresTargetes").css("display","none");            
     $("#map").css("display","none");
     $("#llegendaMapa").css("display","none");                              
     $("#divPresTimeMap").css("display","none");               
     $("#divPresTimeLine").css("visibility","visible");               
     $("#divPresTimeLine").css("display","block");                              
     break;           
   case "estadístiques":
     $("#btnNovaPagina").css("visibility","hidden");           
     $("#comptadorPagines").css("visibility","hidden");                      
     $("#divBotons").css("visibility","visible");       
     $("#divBotons").show();                          
     $("#map").css("display","none");                     
     $("#llegendaMapa").css("display","none");                         
     $("#divPresTimeMap").css("display","none");               
     $("#divPresTimeLine").css("display","none");                   
     $("#divPresTaula").css("display","block");                          
     $("#divPresTargetes").css("display","none");       
     break;
   }

/*

  $('#imgtemp').css('display','none');

  switch (tipus){
  case "mapa":
    creaMarcadors(finalArray);
    break;
  case "taula":
    creaTaula(finalArray);  
    break;
  case "targetes":
    creaTarges(finalArray);
    break;
  case "timemap":
    creaTimeMap(finalArray);
    break;     
  case "timeline":
    creaTimeLine(finalArray);
    break;
    case "estadístiques":
      creaEsta(finalArray);  
      break;           
  }
  $('#imgtemp').hide();           
  $("*").css("cursor","default");  
//*/


  aplicacioFiltres();
   //$("*").css("cursor","default"); 
   $('#imgtemp').css('display','none');
}



//Comprovació dels permisos 
function comprovacioPermis(){
    var id=$("#idFullCalcul").val();
    var colconfig=$("#colconfig").val();  
    //console.log(id+"----"+colconfig);
    //google.script.run.withSuccessHandler(onPermis).comprovacioPermis(id,colconfig);   
    var valors=[id,colconfig];
    carregaDades('comprovacioPermis',valors);       
}


//Càrrega de les variables 
function onPermis(permis) {
  userEmail=permis[0];
  Acces_restringit=permis[1];  
  permisEdit=permis[2];

  var str='';
  if (Acces_restringit=='S') {
      str="<h4>Llistat de registres relacionats amb el compte: <strong><font color='red'>"+userEmail+"</font></strong></h3>";
  }      
  $("#userEmail").html(str);
  
  if (permisEdit=='S'){
      $("#btnPermis").show();    
      $("input").prop('disabled', false);     
      var paginacio=false;      
  } else {
      $("#btnPermis").prop('disabled', true);                     
      var paginacio=true;            
  }
  //aplicacioFiltres()
  //presentaDades();
}



function ordenaArray(a, b) {
    if (a[colOrd] === b[colOrd]) {
        return 0;
    } else {
        return (a[colOrd] < b[colOrd]) ? -1 : 1;
    }
}



//Càrrega dels filtres 
function creacioFiltres(dades){
  	var f=0;
  	var flt="";  
   
  	for (c=0;c<row_cap[0].length; c++){
    	var pas=false;  
    	if (row_cap[1][c].toLowerCase().indexOf("selfiltre")>-1){
      	var row=[];
      	var itemsFound = {};      
      	for (r=0;r<dades.length;r++){
        		var str = dades[r][c];
        		if(itemsFound[str]) {
           		continue; 
        		}
        		row.push(dades[r][c]);
        		itemsFound[str] = true;
      	}
      	row.sort();      
      	pas=true;

   	} else if (row_cap[1][c].toLowerCase().indexOf("csvfiltre")>-1) {
	      var row=[];
   	   var itemsFound = {};      
      	for (r=0;r<dades.length;r++){
        		var str = dades[r][c];
        		var xF=str.split(",");
        		for (f=0;f<xF.length;f++){
           		if(itemsFound[xF[f]]) {
             		continue; 
           		}        
           		row.push(xF[f]);
           		itemsFound[xF[f]] = true;           
        		}
   		}
      	row.sort();      
      	pas=true;
    	}
    
		if (pas==true){
			var nomCamp=row_cap[0][c];
			nomCamp=nomCamp.replace(new RegExp(' ', 'g'),'_');               
			nomCamp=nomCamp.replace(new RegExp('/', 'g'),'_');          
			flt +="<select class='selFiltre'  name='"+nomCamp+"' id='sel_"+nomCamp+"' onChange='aplicacioFiltres(this.id)'>";        
				flt +="<option value='*'>"+row_cap[0][c]+"</option>";              
				for (r=0;r<row.length;r++){
  					var str=row[r];            
  					str=str.replace(new RegExp(' ', 'g'),'_');
  					str=str.replace(new RegExp('/', 'g'),'_');            
  					if (str.length>0){            
      				flt +="<option class='opcio' value="+str+">"+row[r]+"</option>";
  					}
				}
			flt +="</select>";  
    	}

		if (row_cap[1][c].toLowerCase().indexOf("agrupa")>-1) { numColAgrupa=c; }
		if (row_cap[1][c].toLowerCase().indexOf("colorpunt")>-1) {numColColorMark=c;}
		/*if (dades[1][c].toLowerCase().indexOf("iconamapa")>-1) { numColIconaMark=c; }   */  
		if (row_cap[1][c].toLowerCase().indexOf("nomllegendamapa")>-1) {numColNomLlegendaMapa=c;}
		/* eliminat perquè aquestà informació s'agafa ara de la configuració i per tant en la funció variables
		if (dades[1][c].toLowerCase().indexOf("latitud")>-1) {numColLatitud=c;}
		if (dades[1][c].toLowerCase().indexOf("longitud")>-1) {numColLongitud=c;} 
		//*/

		if (row_cap[1][c].toLowerCase().indexOf("id")>-1) {numColBotoProjecte=c;}   
		if (row_cap[1][c].toLowerCase().indexOf("dataini")>-1) {numColDataIni=c;}   
		if (row_cap[1][c].toLowerCase().indexOf("datafin")>-1) {numColDataFin=c;}        
		if (row_cap[1][c].toLowerCase().indexOf("descripcio")>-1) {numColDescripcio=c;}        
		if (row_cap[1][c].toLowerCase().indexOf("titol")>-1) {numColTitol=c;}        
		if (row_cap[1][c].toLowerCase().indexOf("bloc")>-1) {numColBloc=c;}        
		if(numColAgrupa<0) {numColAgrupa=numColLatitud;}
  	}
  	if (flt!="") {
		$("#divFiltres").css("visibility","visible"); 
		$('#divFiltres').html(flt);
	} else {
		$("#divFiltres").css("display","none");   
	}
	$('#selTipus').val(tipus);
}




//Aplicacio filtres
function aplicacioFiltres(id){
  tempsAplicacioFiltresIni=Math.floor(Date.now() / 1000);  
	$("*").css("cursor","wait");
	$('#imgtemp').css("display","block");  
	$('#imgtemp').show();                  

	//time = 100;
	//rellotge=setInterval(test, 100);

  

	if ($("#"+id).val()=="*") {
		$("#"+id).css("color","initial"); 
	} else {
		$("#"+id).css("color","red");
	}

	$('#botoCentrar').attr( "src", "https://drive.google.com/uc?id=1jVkYeRZiImemNB9QVHJjkbR2xaYgz4mz" );

	var finalArray=new Array();
	finalArray=row_org;

	filtresActius=0;
	for (c=0;c<row_cap[0].length; c++){
		if (row_cap[1][c].toLowerCase().indexOf("selfiltre")>-1 || row_cap[1][c].toLowerCase().indexOf("csvfiltre")>-1){
			var nomCamp=row_cap[0][c];
			nomCamp=nomCamp.replace(new RegExp(' ', 'g'),'_')
			nomCamp=nomCamp.replace(new RegExp('/', 'g'),'_') 
			//nomCamp=nomCamp.normalize('NFD').replace(/[\u0300-\u036f]/g, "_")
			if($("#sel_"+nomCamp).val()!="*"){
				filtresActius++;
				var arr=new Array();
				arr[0]=row_cap[0]
				arr[1]=row_cap[1]
				arr[2]=row_cap[2]         
				//for (r=Num_files;r<finalArray.length; r++){         
				var n=Num_files_capçalera
				for (r=Num_files_capçalera;r<finalArray.length; r++){                  
					var strName="[name='"+finalArray[r][Columna_id]+"#$"+row_cap[0][c]+"'";
					var strVal=$(strName).val();             
					var strCamp=finalArray[r][c];
					strCamp=strCamp.replace(new RegExp(' ', 'g'),'_')
					strCamp=strCamp.replace(new RegExp('/', 'g'),'_')             
					//strCamp=strCamp.normalize('NFD').replace(/[\u0300-\u036f]/g, "_")
					if(strCamp.indexOf($("#sel_"+nomCamp).val())>-1){             
			 			arr[n]=finalArray[r];
			 			n +=1;
					}
				}
				finalArray=arr;
			}
	 	}
	}
	switch (tipus){
	case "mapa":
		creaMarcadors(finalArray);
		break;
	case "taula":
		creaTaula(finalArray);  
		break;
	case "targetes":
		creaTarges(finalArray);
		break;
	case "timemap":
		creaTimeMap(finalArray);
		break;     
	case "timeline":
		creaTimeLine(finalArray);
		break;
  case "estadístiques":
    creaEsta(finalArray);  
    break;           
	}
	$('#imgtemp').hide();           
	$("*").css("cursor","default");  
   pasAplicacioFiltres ++;
   tempsAplicacioFiltresFin=Math.floor(Date.now() / 1000);
   var durada=Math.floor(Date.now() / 1000)-tempsAplicacioFiltresIni;
   console.log("Aplicació de filtres -"+pasAplicacioFiltres+" - Durada (segons):"+durada);         
}



//Visualitza les primeres fitxes
function onDades(dad) {
   row_org=dad;
   creacioFiltres(row_org);
   aplicaTipus(tipus);   
   $('#imgtemp').css('display','none');     
}



//Visualitza les primeres fitxes
function creaTaula(row) {

  var dades=new Array();
  for (c=0;c<row_cap[0].length; c++) {
    if (row_cap[1][c].toLowerCase()=='id'){
      Columna_id=c;
      break;
    }
  }
  for (r=0; r<row.length; r++){    
    var str="";   
    if (r>2){
      for (c=0; c<row_cap[0].length;c++){
        if (row_cap[2][c].length==0){
          str +="<div id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"'>"+row[r][c]+"</div>##";  
          //str +="<input disabled name='"+dades[r][Columna_id]+"#$"+dades[0][c]+"' value="+dades[r][c]+" style='width:100%'/>##";                    
        }      
        if (row_cap[2][c].toLowerCase().indexOf("taula:visu")>-1){
          str +="<div id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"'>"+row[r][c]+"</div>##";  
          //str +="<input disabled name='"+dades[r][Columna_id]+"#$"+dades[0][c]+"' value="+dades[r][c]+" style='width:100%'/>##";          
        }
        if (row_cap[2][c].toLowerCase().indexOf("taula:edit")>-1 && row_cap[2][c].toLowerCase().indexOf("taula:areatext:edit")<0){ 
          if (row[r][c].length>0){ 
              var valor=row[r][c].replace(/[']+/g, '&apos;');
          }
          if (Permetre_edicio_taula=="S"){
              str +="<input id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"' name='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"' value='"+valor+"' style='width:100%'/>##";
          } else {
              str +="<div id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"'>"+row[r][c]+"</div>##";          
          }
        }      
        if (row_cap[2][c].toLowerCase().indexOf("taula:areatext:edit")>-1){
          if (row[r][c].length>0){         
              var valor=row[r][c].replace(/[']+/g, '&apos;');        
          }
          if (Permetre_edicio_taula=="S"){
              str +="<textarea id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"' name='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"' style='width:100%'>"+valor+"</textarea>##";
          } else {
              str +="<div id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"'>"+row[r][c]+"</div>##";                 
          }          
        } 
        //if (row_cap[2][c].toLowerCase().indexOf("boto")>-1 && row_cap[2][c].toLowerCase()!="botoVisu"){
        if (row_cap[2][c].toLowerCase().indexOf("taula:boto")>-1){        
          if (row[r][c].length>0 || row_cap[1][c].toLowerCase()=="enllaç"){ 
             var name=row[r][c];        
             if (name.indexOf("'")>-1){             
                name=name.replace(/[']+/g, '&apos;');        
             }
             str +="<input type='button' id='btn_"+row[r][Columna_id]+"_"+c+"' name='"+name+"' onclick=\"fnBoto("+row[r][Columna_id]+","+c+",this.id, this.name);\" style='width:100%; height:25px; max-width: 150px;'value='"+row_cap[0][c]+"'</input>##";
          } else {
             var name="";
             str +="<input type='button' id='btn_"+row[r][Columna_id]+"_"+c+"' style='background-color:grey; color:#FFFFFF;width: 100%; height: 25px; max-width: 150px; cursor: default;' disabled name='"+name+"' onclick=\"fnBoto("+row[r][Columna_id]+","+c+",this.id, this.name);\" style='width:100%; height:25px; max-width: 150px;'value='"+row_cap[0][c]+"'</input>##";
          }
        }    
        if (row_cap[2][c].toLowerCase().indexOf("taula:lupa")>-1){
           str +="<img src='https://drive.google.com/uc?id=1erUETb9i5H77tmsmbXQB-HgOqg2ZCwzq' id='btn_"+row[r][Columna_id]+"_"+c+"' onclick='obreDescripcio("+row[r][Columna_id]+");' style='width:25px' />##";
        }           
        if (row_cap[2][c].toLowerCase().indexOf("taula:llapis")>-1){
           str +="<img src='https://drive.google.com/uc?id=1FvHayIHBYJDFNDVnBU0yWIXESzFLEil2' id='btn_"+row[r][Columna_id]+"_"+c+"' onclick='editaRegistre("+row[r][Columna_id]+");' style='width:25px' />##";
        }                   
        
        if (row_cap[2][c].toLowerCase().indexOf("taula:radio:")>-1){
            if (Permetre_edicio_taula=="N"){
               var opc=row_cap[2][c].substring(6,100);
               var opcions=opc.split(",");
               for (p=0;p<opcions.length;p++){
                  if (row[r][c]==opcions[p]){
                     str +="<input type='radio' id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"' checked value='"+opcions[p]+"' name='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"' id='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"' style='margin-left:5px'/>"+opcions[p];
                  } else {
                     str +="<input type='radio' id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"' value='"+opcions[p]+"' name='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"' style='margin-left:5px'/>"+opcions[p];
                  }
               }
               str +="##";               
             } else {
              str +="<div id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"'>"+row[r][c]+"</div>##";
            }
        }            
        if (row_cap[2][c].toLowerCase().indexOf("taula:sel:")>-1){
            var opc=row_cap[2][c].substring(4,100)
            var opcions=opc.split(",");
            var dsbl="";
            if (Permetre_edicio_taula=="S"){
               str +="<select id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"' name='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"' id='"+row[r][Columna_id]+"#$"+row_cap[0][c]+"'>";          
               str +="<option value='*'>"+row_cap[0][c]+"</option>";          
               for (p=0;p<opcions.length;p++){
                  if (row[r][c]==opcions[p]){
                     str +="<option selected value='"+opcions[p]+"'>"+opcions[p]+"</option>";
                  } else {
                     str +="<option value='"+opcions[p]+"'>"+opcions[p]+"</option>";
                  }
               }
               str +="</select>";
               str +="##";               
            } else {
              str +="<div id='"+row[r][Columna_id]+"_"+row_cap[0][c]+"'>"+row[r][c]+"</div>##";                 
            }
        }         
      }
      str=str.substring(0,str.length-2);
      dades[r]=str.split("##");
    } else {
      dades[r]=row[r];             
    }
  }
  var txtDiv ="<form id='frmDades'>";  
      txtDiv +="<table id='tblDades' class='display' width='100%'></table>";
   txtDiv +="</form>";
   
  $("#divFormTaula").html(txtDiv);  
  //comprovacioPermis();
  presentaDades(dades);  
}



//Visualitza les primeres fitxes
function creaEsta(row) {
  //console.log(row);
  presentaEst(row);  
}




//Actualització de les pàgines 
function presentaDades(dades) {
  //console.log(dades);
  $('#imgtemp').css("visibility","visible");  

   var titols=new Array();
   r=0;
   for (c=0;c<row_cap[0].length;c++){
      if (row_cap[2][c].length>0 && row_cap[2][c].toLowerCase().indexOf("taula")>-1){
        var title= row_cap[0][c];
        titols[r]={title};        
        r +=1;
      }
   }

   var targes=new Array();
   for (r=0;r<dades.length;r++){
      var str="";
      for (col=0;col<row_cap[0].length;col++){
          if (row_cap[2][col].indexOf("taula:visu")>-1){ 
             str +=dades[r][col]+"##";
          }
      }
      str=str.substring(0,str.length-2);
      targes[r]=str.split("##");      
   }

   if ( $.fn.dataTable.isDataTable( '#tblDades' ) ) {
      $('#tblDades').unbind();      
      var dt1 = $.fn.dataTable.tables()[0];
      $(dt1).DataTable().destroy();
    }
   

  if (permisEdit=='S'){
      $("#btnPermis").show();    
      $("input").prop('disabled', false);     
      var paginacio=false;      
  } else {
      //$("#btnPermis").hide();    
      $("#btnPermis").prop('disabled', true);                     
      var paginacio=true;            
  }


   $('#tblDades').DataTable( {
        dom: 'Bfrtip',
        select: true,        
        buttons: ['csv','pdf','print'],
        data: targes,
        columns: titols,
        scrollY: '50vh',
        scrollCollapse: true,
        paging: paginacio,        
        "order": []
    });
    
  var table = $('#tblDades').DataTable();
     
  //$("#divBotons").css("visibility","visible");     
  $("#divTaula").show();  
  //$("#divBotons").show();   
  //$("*").css("cursor","default");  
  //$('#imgtemp').css("display","none");    
  $('#imgtemp').hide();
}




//Actualització de les pàgines 
function presentaEst(dades) {
  //console.log(dades);
  $('#imgtemp').css("visibility","visible"); 
    txtDiv ="<table id='tblDadesEst' class='display' style='width:95%; display:block; margin: 0px auto;' >"
        txtDiv +="<tr>";
          txtDiv +="<th>id</td>";
          txtDiv +="<th>Nom_programa</th>";
          txtDiv +="<th>2015-2016</th>";
          txtDiv +="<th>2016-2017</th>";
          txtDiv +="<th>2017-2018</th>";
        txtDiv +="</tr>";          
        for (i=0;i<dades.length;i++){
          txtDiv +="<tr onClick='carregaDades(\"recollidaProgramaST\","+dades[i][0]+",\"SE de la Noguera\")' style='cursor:pointer'>";
            for (c=0;c<dades[0].length;c++){
              txtDiv +="<td>"+dades[i][c]+"</td>";
            }
          txtDiv +="</tr>";          
        }
      txtDiv +="</table>";
   txtDiv +="</form>";  
  $("#divFormTaula").html(txtDiv);  


/*
   if ( $.fn.dataTable.isDataTable( '#tblDadesEst' ) ) {
      $('#tblDadesEst').unbind();      
      var dt1 = $.fn.dataTable.tables()[0];
      $(dt1).DataTable().destroy();
    }
   
    dades=JSON.parse(dades);
    //dades=[];

    titols=["id", "Nom_programa", "2015-2016", "2016-2017", "2017-2018" ];
    console.log(titols);
//*

   $('#tblDadesEst').DataTable( {
        dom: 'Bfrtip',
        data: dades,
        columns: titols,
        scrollY: '50vh',
        scrollCollapse: true,
        select: true,        
        buttons: ['csv','pdf','print']
    } );
    
  var table = $('#tblDadesEst').DataTable();
  //*/   
//*/

  $("#divPresTaula").show();  
  $('#imgtemp').hide();
  $("#btnNovaPagina").css("visibility","hidden");           
  $("#comptadorPagines").css("visibility","hidden");                      
  $("#divBotons").css("visibility","visible");       
  $("#divBotons").show();                          
  $("#map").css("display","none");                     
  $("#llegendaMapa").css("display","none");                         
  $("#divPresTimeMap").css("display","none");               
  $("#divPresTimeLine").css("display","none");                   
  $("#divPresTaula").css("display","block");                          
  $("#divPresTargetes").css("display","none");       
}



//preparar parametres i enviar 
function activaInfo(){
   $("#modalHeader").html("Informació");
   var divMissatge=informacio;
   $("#missatge").html(divMissatge);
   $('#finestraInfo').modal('show');
   //$("*").css("cursor","default");   
}




//Visualitza les primeres fitxes
function editaRegistre(reg) {
  for (c=0;c<row_org[0].length; c++) {
    if (row_org[1][c].toLowerCase()=='id'){
      Columna_id=c;
      break;
    }
  }

  var msgTitol="Edició de les dades del registre: "+reg;

  var str="<form id='frmDadesReg'>";
      str +="<table id='tblEditReg' width='100%'>";
      str +="<tr><th style='width:10%'><label>Camp</label></th><th style='width:85%'><label>Valor</label></th>";
      
  for (r=0; r<row_org.length; r++){
    if (reg==row_org[r][Columna_id]) { 
       break;
    }
  }

  for (c=0; c<row_org[0].length;c++){
    if (row_org[2][c].length!=0){  
      str +="<tr><td><label>"+row_org[0][c]+": </label></td>";
      str +="<td>"
      if (row_org[2][c].toLowerCase().indexOf("text:visu")>-1 || row_org[2][c].toLowerCase().indexOf("areatext:visu")>-1){
        str +=row_org[r][c];
      }
      if (row_org[2][c].toLowerCase().indexOf("text:edit")>-1 && row_org[2][c].toLowerCase().indexOf("areatext:edit")<0){ 
        var valor=row_org[r][c];
        if (row_org[r][c].length>0){ 
           valor=row_org[r][c].replace(/[']+/g, '&apos;');
        }
        str +="<input name='"+row_org[r][Columna_id]+"#$"+row_org[0][c]+"' value='"+valor+"' style='width:100%'/>";
      }      
      if (row_org[2][c].toLowerCase().indexOf("areatext:edit")>-1){
        var valor=row_org[r][c]
        if (row_org[r][c].length>0){         
          valor=row_org[r][c].replace(/[']+/g, '&apos;');        
        }
        str +="<textarea name='"+row_org[r][Columna_id]+"#$"+row_org[0][c]+"' style='width:100%'>"+valor+"</textarea>";
      } 
      if (row_org[2][c].toLowerCase().indexOf("boto")>-1){        
        if (row_org[r][c].length>0 || row_org[0][c].toLowerCase()=="fitxa"){ 
          var name=row_org[r][c].replace(/[']+/g, '&apos;');        
          str +="<input type='button' id='btn_"+row_org[r][Columna_id]+"_"+c+"' name='"+name+"' onclick=\"fnBoto("+row_org[r][Columna_id]+","+c+",this.id, this.name);\" style='width:100%; height:25px; max-width: 150px;'value='"+row_org[0][c]+"'</input>";
        } else {
          var name="";
          str +="<input type='button' id='btn_"+row_org[r][Columna_id]+"_"+c+"' style='background-color:grey; color:#FFFFFF;width: 100%; height: 25px; max-width: 150px; cursor: default;' disabled name='"+name+"' onclick=\"fnBoto("+row_org[r][Columna_id]+","+c+",this.id, this.name);\" style='width:100%; height:25px; max-width: 150px;'value='"+row_org[0][c]+"'</input>";
        }
      }    
      if (row_org[2][c].toLowerCase().indexOf("lupa")>-1){
        str +="<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwKGoUWN2ogT4KK7TvsB1krS76LLCkEkwUYG6p1znsATc__MhgYA' id='btn_"+row_org[r][Columna_id]+"_"+c+"' onclick='obreDescripcio("+row_org[r][Columna_id]+");' style='width:25px'/>";
      }           
      if (row_org[2][c].toLowerCase().indexOf("llapis")>-1){
        str +="<img src='https://www.shareicon.net/download/2016/07/03/636119_edit.ico' id='btn_"+row_org[r][Columna_id]+"_"+c+"' onclick='editaRegistre("+row_org[r][Columna_id]+");' style='width:25px'/>";
      }                   
          
      if (row_org[2][c].toLowerCase().indexOf("radio:")>-1){
        var opc=row_org[2][c].substring(6,100);
        var opcions=opc.split(",");
        for (p=0;p<opcions.length;p++){
          if (row_org[r][c]==opcions[p]){
            str +="<input type='radio' checked value='"+opcions[p]+"' name='"+row_org[r][Columna_id]+"#$"+row_org[0][c]+"' style='margin-left:5px'/>"+opcions[p];
          } else {
            str +="<input type='radio' value='"+opcions[p]+"' name='"+row_org[r][Columna_id]+"#$"+row_org[0][c]+"' style='margin-left:5px'/>"+opcions[p];
          }
        }
      }            
      if (row_org[2][c].toLowerCase().indexOf("sel:")>-1){
        var opc=row_org[2][c].substring(4,100)
        var opcions=opc.split(",");
        str +="<select name='"+row_org[r][Columna_id]+"#$"+row_org[0][c]+"'>";
        str +="<option value='*'>"+row_org[0][c]+"</option>";
        for (p=0;p<opcions.length;p++){
          if (row_org[r][c]==opcions[p]){
            str +="<option selected value='"+opcions[p]+"'>"+opcions[p]+"</option>";
          } else {
            str +="<option value='"+opcions[p]+"'>"+opcions[p]+"</option>";
          }
        }
        str +="</select>";
      }         
      str +="</td></tr>";
    }
  }
  str +="</table>";
  str +="</form>";

  var msgPeu="<div style='width:50%; float: left'>";
      if (permisEdit=="S"){
         msgPeu +="<input type='button' class='btn' aria-hidden='true' id='btnPermisEditReg' style='margin: 5px' onclick=\"enviarGenerarRegistre("+reg+")\" value='Enviar respostes'/>";
      } else {
         msgPeu +="<input type='button' class='btn' aria-hidden='true' id='btnPermisEditReg' style='margin: 5px' value='Enviar respostes'  onclick=\"missatgeError('No esteu autoritzat a guardar canvis')\" title='No esteu autoritzat a guardar canvis'/>"
      }
      msgPeu +='<button class="btn" data-dismiss="modal" aria-hidden="true" style="margin: 5px" >Tancar</button>';              
      msgPeu +="</div>";

  $('#modalHeaderTargetes').html(msgTitol);
  $('#missatgeTargetes').html(str);
  $('#missatgePeu').html(msgPeu);  
  //$('*').css('cursor','default');    
  $('#finestraTargetes').modal('show');  
}


//preparar parametres i enviar 
function enviarGenerar(){
    //$("*").css("cursor","wait");
    var regArray = new Array();
    regArray=$("#frmDades").serializeArray();   
    var id=$("#idFullCalcul").val();
    var colconfig=$("#colconfig").val();   
    //google.script.run.withSuccessHandler(onSalvarDades).salvarDades(id,colconfig,regArray);         
    var valors=[id,colconfig,regArray];
    carregaDades('salvarDades',valors);         
}


function enviarGenerarRegistre(){
    //$("*").css("cursor","wait");
    var regArray = new Array();
    regArray=$("#frmDadesReg").serializeArray();   
    //console.log(regArray);    
    var id=$("#idFullCalcul").val();
    var colconfig=$("#colconfig").val();  
    //google.script.run.withSuccessHandler(onSalvarDades).salvarDades(id,colconfig,regArray);             
    var valors=[id,colconfig,regArray]    
    carregaDades('salvarDades',valors);                 
}



//preparar parametres i enviar 
function onSalvarDades(missatge){
   //console.log(missatge)
   $('#finestraTargetes').modal('hide');  
   $("#modalHeader").html(missatge[0]);
   
   //determinar columan de la matriu que te la ID   
   for (i=0;i<row_org[0].length;i++){           
      if (row_org[0][i].toLowerCase()=='id'){
         var columna_id=i;
         break;
      }
   }
   var divMissatge="";
      divMissatge +="<table id='tblResultats'>";   
      divMissatge +="<tr><th style='width: 10%; border: solid 1px grey'>Registre</th><th style='width: 10%; border: solid 1px grey'>Columna</th><th style='width: 30%;  border: solid 1px grey'>Valor antic</th><th style='width: 30%;  border: solid 1px grey'>Nou valor</th></tr>";   
      for (c=1; c<missatge.length; c++){
           //divMissatge +=missatge[c];
           divMissatge +="<tr><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][0]+"</td><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][3]+"</td><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][4]+"</td><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][5]+"</td></tr>";
           //modificar canvis en la taula             
           var div="#"+missatge[c][0]+"_"+missatge[c][3];
           $(div).html(missatge[c][5]);
           $(div).val(missatge[c][5]);           
           
           // determinar la columna a modificar
           for (x=0;x<row_org[0].length;x++){           
              if (row_org[0][x]==missatge[c][3]){                  
                 var colMod=x
                 break;
              }
           }

           //canviar les dades a la matriu
           for (r=0;r<row_org.length;r++){
               //console.log(row_org[r][columna_id]+"=="+missatge[c][0]);
               if (row_org[r][columna_id]==missatge[c][0]){
                   row_org[r][colMod]=missatge[c][5];
                   break;
               }
           }
      }
      divMissatge +="</table>";      
   $("#missatge").html(divMissatge);
   $('#finestraInfo').modal('show');
   //$("*").css("cursor","default");    
      
   $("#tblResultats").css({
     "border":"1px solid black",
     "width": "90%",
     "margin": "0 auto",  
     "max-height": "250px",
     "overflow-y": "scroll"});
}



function mostraErrades(missatge){
   $('#finestraTargetes').modal('hide');  
   $("#modalHeader").html(missatge[0][0]);
   var divMissatge="";
      divMissatge +="<table id='tblResultats'>";   
      divMissatge +="<tr><th style='width: 10%; border: solid 1px grey'>"+missatge[0][1]+"</th><th style='width: 10%; border: solid 1px grey'>"+missatge[0][2]+"</th><th style='width: 10%;  border: solid 1px grey'>"+missatge[0][3]+"</th></tr>";   
      for (c=1; c<missatge.length; c++){
         divMissatge +="<tr><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][0]+"</td><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][1]+"</td><td style='border: 1px solid #cacaca !important; padding: 3px !important;'>"+missatge[c][2]+"</td></tr>";           
      }
      divMissatge +="</table>";      
   $("#missatge").html(divMissatge);
   $('#finestraInfo').modal('show');
   //$("*").css("cursor","default");    
      
   $("#tblResultats").css({
     "border":"1px solid black",
     "width": "80%",
     "margin": "0 auto",  
     "max-height": "250px",
     "overflow-y": "scroll"});
}



//preparar parametres i enviar 
function missatgeError(missatge){
   $("#modalHeader").html("Avís");
   var divMissatge=missatge;
   $("#missatge").html(divMissatge);
   $('#finestraInfo').modal('show');
   //$("*").css("cursor","default");    
}



//Actualització de les pàgines 
function creaTarges(targes) {
  $('#imgtemp').css("visibility","visible");   

  divAmplada=$("#divPresTargetes").css("width");  
  divAmpladaTar=parseInt(divAmplada)/parseInt(Num_columnes);
  divAmpladaTar=divAmpladaTar-20; //afegir els marges laterals
  //nTarFila=(parseInt(parseInt(divAmplada)/divAmpladaTar));
  //alert("amplada contenidor: "+divAmplada+"\nNombre de columnes: "+Num_columnes+"\nAmplada targeta: "+divAmpladaTar+"\nNombre de targes per fila: "+nTarFila);
  
  divAmplada=$("#divPresTargetes").css("width");
  divAmpladaTar=parseInt(divAmplada)/parseInt(Num_columnes);
  divAmpladaTar=divAmpladaTar-20; //afegir els marges laterals
  //nTarFila=(parseInt(parseInt(divAmplada)/divAmpladaTar));
  //alert("amplada contenidor: "+divAmplada+"\nNombre de columnes: "+Num_columnes+"\nAmplada targeta: "+divAmpladaTar+"\nNombre de targes per fila: "+nTarFila);
  //var nReg=nTarFila*Num_files;
  var nReg=Num_columnes*Num_files;  
  
  if (numPag<1) {
     numPag=1
  };
  var xIni=Num_columnes*(numPag-1)*Num_files;
  var xFin=Num_columnes*(numPag)*Num_files;  

  if (xFin>targes.length-3) {
      numPag -=1;      
      xIni=Num_columnes*(numPag)*Num_files;
      xFin=targes.length-3;
  };    

    
  var divDades="<div style='clear:both; width: 100%;  right: 0;  left: 0; margin: auto;'>";  
  divDades +="<div class='row'>";    

  for (p=0;p<plantilles.length;p++){
     if (plantilles[p][0]=="targetes"){
       var plant=plantilles[p][2][0];
       break;
     }
  }
     

  var t=0;  
  for (var j = xIni+3; j < targes.length; j++) {  
     //console.log(j+"----"+targes.length);  
     var row_dad=targes[j];
     var plt=aplica_plantilla(plant,row_dad);
     divDades +=plt;
     t +=1;        
     var m=parseInt(t % Num_columnes);     
     if (m==0){
       divDades +="</div><div class='row'>";
     }          
    if (t>=nReg || t>=targes.length) {break};     
  }
  divDades +="</div>";
  divDades +="</div>";  

  if (xIni==0){
    $("#btnB1").css('background-color', '#CACACA');  
    $("#btnB1").css('color', '#FFFFFF');      
    $("#btnB1").prop('disabled', true);      
  } else {
    $("#btnB1").css('background-color', 'inherit');
    $("#btnB1").css('color', 'inherit');      
    $("#btnB1").prop('disabled', false);          
  }
  
  if (xFin>=parseInt(targes.length-3)){
    $("#btnB2").css('background-color', '#CACACA');    
    $("#btnB2").css('color', '#FFFFFF');          
    $("#btnB2").prop('disabled', true);          
  } else {
    $("#btnB2").css('background-color', 'inherit');
    $("#btnB2").css('color', 'inherit');          
    $("#btnB2").prop('disabled', false);          
  }


  if(xIni==0 && xFin>=parseInt(targes.length-3)){
    $("#btnNovaPagina").hide();
  } else {
    //$("#btnNovaPagina").css('visibility','visible');      
    $("#btnNovaPagina").show();             
  }

  var regPagina="Registres: "+(xIni+1)+" a  "+xFin+" de "+parseInt(targes.length-3);
  if(xIni==0 && xFin>=parseInt(targes.length-3)){
    $("#comptadorPagines").html(regPagina);    
    $("#comptadorPagines").hide();             
  } else {
    $("#comptadorPagines").html(regPagina);        
    $("#comptadorPagines").show();             
  }  
  

   
  $('#divPresTargetes').html(divDades);
  $(".targeta").css("width",divAmpladaTar);  
    
  $('#imgtemp').css("display","none");     
  //$("*").css("cursor","default");  
}





function creaMarcadors(finalArray){ // Construeix targes i mostra marcadors en el mapa
   temps1=Math.floor(Date.now() / 1000);
   var repetit=[];
   for (var i=0;i<finalArray.length;i++) {
     repetit[i]=false;
   }        
   var numCentres=0; 
   for(i=0;i<marcadors.length;i++) {
      if (Mostra_clusters=='S'){  
         markers.removeLayer(marcadors[i]);         
      } else {  
         map.removeLayer(marcadors[i]);
         oms.removeMarker(marcadors[i]);
      } 
   }   

   $('#imgtemp').css("display","none"); 
   if(Zoom_automatic=='N') {
     bounds=bounds_all;
     limitsMapa();     
   }
   centres=[];   
   agrupaCentres=[];
   marcadors=[]; 
   row_rep=[];  
   
   var numLlegendes=0;
         
// Agrupament de registres segons el criteri d'agrupament     
     
   for (var i=Num_files_capçalera;i<finalArray.length;i++) {
       if (!repetit[i]) {
         var repes=i+",";
         for(var j=i+1;j<finalArray.length;j++) {
            if (finalArray[j][numColLatitud].length>0 && finalArray[j][numColLongitud].length>0) {    
               var primer=finalArray[i][numColAgrupa];
               var segon=finalArray[j][numColAgrupa];
               if(primer==segon) {
                 repetit[j]=true;
                 repes +=j+",";
               }    
             }                
         }                                                  
         centres[numCentres]=[];
         for(var j=0;j<finalArray[0].length;j++) {
           centres[numCentres][j]=finalArray[i][j];
         }
         row_rep[numCentres]=repes;
         agrupaCentres[numCentres]=finalArray[i][numColAgrupa];      
         numCentres++;
       }  
   }
   
// Alliberar repetit
   repetit=[];
   
   if(numCentres==0) {
      missatgeError("No hi ha cap marcador en el mapa com a resultat dels filtres aplicats.");
   }
  
   var numSenseLloc=0;
   var stringSenseLloc="Relació de registres, segons el criteri d'agrupament, que no disposen de coordenades de localització vàlides <br> S'han situat a les coordenades 0,0 (equador/meridià 0)";
   var senseLloc=[];
   senseLloc[0]=[stringSenseLloc,finalArray[0][numColAgrupa],finalArray[0][numColLatitud],finalArray[0][numColLongitud]]
 
   //var locations=new Array();  
   var iColors=new Array(); 
   var titols=[];
   var llgd =""; //cadena on s'afegiran les icones de la llegenda per no repetir-les
   
   var white = { r: 255, g: 255, b: 255 };
   
// Agrupament de registres en marcadors i creació de les targeta dels marcadors   
   var contingutLlegenda="";
   var filaLlegenda=[];

   if (iniciantMapa) {
          arrayCheckboxesId=[];
          arrayCheckboxesValue=[];
          numCheckboxes=0;
          if(Mostra_poligons=='S') {
            checkboxPoligonsValue=true;
          } else {
            checkboxPoligonsValue=false;
          }
          if(Mostra_clusters=='S') {
            checkboxClustersValue=true;
          } else {
            checkboxClustersValue=false;
          }
          if(Mostra_densitat=='S') {
            checkboxHeatmapValue=true;
          } else {
            checkboxHeatmapValue=false;
          }
          checkboxMarcadorsValue=true;
   }
  
   for (i=0;i<centres.length;i++) {
      var laLatitud=parseFloat(centres[i][numColLatitud]);
      var laLongitud=parseFloat(centres[i][numColLongitud]);

      var clr=Marcador_defecte_color;      
      if (numColColorMark!=""){
         if (centres[i][numColColorMark]!=""){
             var clr=centres[i][numColColorMark] //color del punt al mapa
         }
      }
      //console.log(centres[i][numColAgrupa]+"---"+laLatitud+"---"+laLongitud);
      if (laLatitud==0 || laLongitud==0 || isNaN(laLatitud) || isNaN(laLongitud) ) {
        laLatitud=0; //es posen a 0 per si el problema és que son NaN
        laLongitud=0;
        stringSenseLloc+=agrupaCentres[i]+"\n";
        numSenseLloc++;
        if (isNaN(agrupaCentres[i])){
            senseLloc[numSenseLloc]=[agrupaCentres[i].replace("@", "\@"),centres[i][numColLatitud],centres[i][numColLongitud]];
        } else {
            senseLloc[numSenseLloc]=[agrupaCentres[i],centres[i][numColLatitud],centres[i][numColLongitud]];        
        }
      } 
      
      locations[i]={lat: laLatitud, lng: laLongitud}; 
      
      // INFOWINDOWS
      
      iColors[i]=clr;
      titols[i]="";      
      if (numColTitol!=""){
          titols[i]=centres[i][numColTitol];
      }
      var row_dad=centres[i];
      //var Capçalera=aplica_plantilla(plantilla_1,row_dad);
      
      //creació dels botons de cada registre agrupat
      //var botons="";            
      var str=row_rep[i].substr(0,row_rep[i].length-1);
      var llistaReg=str.split(",");        
      for(var j=0;j<llistaReg.length;j++) { 
         var nId=llistaReg[j];
         var row_dad=finalArray[nId];
         //var boto=aplica_plantilla(plantilla_2,row_dad);
         //botons+=boto;
         //botons+="<br>";
      } 
        
      //Capçalera=Capçalera.replace("{{#Botons#}}",botons);                
      contentString='<div id="content">';               
      //contentString+=Capçalera;
        contentString+="<div id='etqMrc'></div>";        
      contentString+='</div>';   
      
// Icones dels marcadors
    var iniciSVG,finalSVG,cadenaSVG,vertAnchor,pos1,pos2,path,myIconUrl,icon,iconaLlegenda;
    iconaDefinida=false;
      if(numColNomLlegendaMapa!=-1) {
        if(centres[i][numColNomLlegendaMapa]!="") { // Icona segons el tipus indicat
             
             iniciSVG=llegendes.search("<"+centres[i][numColNomLlegendaMapa]+">")+centres[i][numColNomLlegendaMapa].length; // Inline SVG for HTML de https://materialdesignicons.com
             finalSVG=llegendes.search("</"+centres[i][numColNomLlegendaMapa]+">");
             cadenaSVG=llegendes.substring(iniciSVG,finalSVG); 
             
             vertAnchor=pixelsIco*escalaIco/2;
             if (cadenaSVG.search("marcador")!=-1) {  // Si inclou la paraula "marcador"
                vertAnchor = pixelsIco*escalaIco;
             }
             
             pos1=cadenaSVG.search("d=")+3;   
             pos2=cadenaSVG.search(" />")-1;
             path=cadenaSVG.substring(pos1,pos2); 
             
             if (path.length<3) { // Si no es troba la definició a la plantilla
               if(Marcador_defecte_forma!="") { // Si s'ha indicat el marcador per defecte
             
                 iniciSVG=llegendes.search("<"+Marcador_defecte_forma+">")+Marcador_defecte_forma.length;
                 finalSVG=llegendes.search("</"+Marcador_defecte_forma+">");
                 cadenaSVG=llegendes.substring(iniciSVG,finalSVG);
                 
                 vertAnchor=pixelsIco*escalaIco/2;
                 if (cadenaSVG.search("marcador")!=-1) {
                    vertAnchor= pixelsIco*escalaIco;
                 }
                              
                 pos1=cadenaSVG.search("d=")+3;   
                 pos2=cadenaSVG.search(" />")-1;
                 path =cadenaSVG.substring(pos1,pos2);
                 
                 if (path.length<3) { // Si s'ha indicat marcador per defecte però no es troba la definició a la plantilla
                   path=path_defecte;                           
                   vertAnchor = pixelsIco*escalaIco;
                 }                                  
               } else { // Si no s'ha indicat marcador per defecte                 
                 path=path_defecte;                           
                 vertAnchor = pixelsIco*escalaIco;
               }
           }            
                         
             cadenaSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+pixelsIco+' '+pixelsIco+'"><path d="'+path+'" fill="'+iColors[i]+'" /></svg>';
             
             myIconUrl = encodeURI("data:image/svg+xml," + cadenaSVG).replace('#','%23');             
             icon = L.icon( {
                  iconUrl: myIconUrl,
                  iconSize: [pixelsIco*escalaIco, pixelsIco*escalaIco],
                  iconAnchor: [pixelsIco*escalaIco/2, vertAnchor]
             } );
           
             iconaLlegenda ="<input type='checkbox' checked id='ico_"+centres[i][numColNomLlegendaMapa]+"' value='"+centres[i][numColNomLlegendaMapa]+"' style=\"vertical-align:-3px\" onchange=\"desactivaCapa('ico_"+centres[i][numColNomLlegendaMapa]+"')\"/><svg style='height:24px; width:24px; vertical-align:-4px'><path fill='"+iColors[i]+"' d='"+path+"' stroke='black' stroke-width='0' /></svg>";   
             iconaDefinida=true;  
        }
      }
      
      if (!iconaDefinida) {
        if(Marcador_defecte_forma!="") { // Icona per defecte definida per l'usuari                      
             iniciSVG=llegendes.search("<"+Marcador_defecte_forma+">")+Marcador_defecte_forma.length; // Inline SVG for HTML de https://materialdesignicons.com
             finalSVG=llegendes.search("</"+Marcador_defecte_forma+">");
             cadenaSVG=llegendes.substring(iniciSVG,finalSVG);
             
             vertAnchor=pixelsIco*escalaIco/2;
             if (cadenaSVG.search("marcador")!=-1) {
                vertAnchor= pixelsIco*escalaIco;
             }
                          
             pos1=cadenaSVG.search("d=")+3;   
             pos2=cadenaSVG.search(" />")-1;
             path =cadenaSVG.substring(pos1,pos2); 
             
             cadenaSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+pixelsIco+' '+pixelsIco+'"><path d="'+path+'" fill="'+iColors[i]+'" /></svg>';
             
             myIconUrl = encodeURI("data:image/svg+xml," + cadenaSVG).replace('#','%23');             
             icon = L.icon( {
                  iconUrl: myIconUrl,
                  iconSize: [pixelsIco*escalaIco, pixelsIco*escalaIco],
                  iconAnchor: [pixelsIco*escalaIco/2, vertAnchor]
             } );
                 
             iconaLlegenda ="<input type='checkbox' checked id='ico_"+centres[i][numColNomLlegendaMapa]+"' value='"+centres[i][numColNomLlegendaMapa]+"' style=\"vertical-align:-3px\" onchange=\"desactivaCapa('ico_"+centres[i][numColNomLlegendaMapa]+"')\"/><svg style='height:24px; width:24px; vertical-align:-4px'><path fill='"+iColors[i]+"' d='"+path+"' stroke='black' stroke-width='0' /></svg>";
                          
             if(numColNomLlegendaMapa!=-1) { // Per tal que mostri el marcador per defecte definit per l'usuari en la llegenda
               centres[i][numColNomLlegendaMapa]=Marcador_defecte_forma;
             } 
             
        } else {  // Definició de la icona per defecte dels marcadors  
             cadenaSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+pixelsIco+' '+pixelsIco+'"><path d="'+path_defecte+'" fill="'+iColors[i]+'" /></svg>';
             myIconUrl = encodeURI("data:image/svg+xml," + cadenaSVG).replace('#','%23');             
             icon = L.icon( {
                  iconUrl: myIconUrl,
                  iconSize: [pixelsIco*escalaIco, pixelsIco*escalaIco],
                  iconAnchor: [pixelsIco*escalaIco/2, pixelsIco*escalaIco]
             } );
        }        
      } 
           
      //marcadors[i]=L.marker(locations[i],{icon:icon});     
      marcadors[i]=L.circleMarker(locations[i], {
        radius : 6,
        color : iColors[i],
        renderer: myRenderer
      });
      
          
      if (Mostra_clusters=='S'){  
         markers.addLayer(marcadors[i]);         
      } else {  
         marcadors[i].addTo(map);
         oms.addMarker(marcadors[i]);
      }
      
      marcadors[i].bindPopup(contentString);     
      marcadors[i].index=i;


      marcadors[i].on('click', function(e) {
        var idx=e["target"]["index"];
        row=centres[idx];


        var botons="";            
        /*
        var str=row_rep[idx].substr(0,row_rep[idx].length-1);
        var llistaReg=str.split(",");        
        for(var j=0;j<llistaReg.length;j++) { 
          var nId=llistaReg[j];
          var row_dad=finalArray[nId];
          var boto=aplica_plantilla(plantilla_2,row_dad);
          botons+=boto;
          botons+="<br>";
        } 
        //*/
        var boto=aplica_plantilla(plantilla_2,row);        
        botons+=boto;
        botons+="<br>";

        str=aplica_plantilla(plantilla_1,row);
        str=str.replace("{{#Botons#}}",botons);  
        $("#etqMrc").html(str);        
      });



      //marcadors[i].on('click', function(e) {alert("click")})

      //construcció dels elements de la llegenda si té posició       
      
      if (Posicio_llegenda.toLowerCase()!="sense_llegenda"){
        if (numColNomLlegendaMapa!=-1){
           if (llgd.indexOf(centres[i][numColNomLlegendaMapa])==-1){
              llgd +="#$#"+centres[i][numColNomLlegendaMapa];
              filaLlegenda[numLlegendes]="<div style='width:150px; margin: 5px; vertical-align:middle; horizontal-align:left'>"+iconaLlegenda+centres[i][numColNomLlegendaMapa]+"</div>";
              numLlegendes++;
              // Array Checkboxes
              if (iniciantMapa) {
                 arrayCheckboxesId[numCheckboxes]=centres[i][numColNomLlegendaMapa];
                 arrayCheckboxesValue[numCheckboxes]=true;
                 numCheckboxes++;
              }
           }
        }        
      }      
   }   

// Alliberar finalArray, agrupaCentres, row_rep
  finalArray=[];
  agrupaCentres=[];
  row_rep=[];
   
  map.addLayer(markers);
    
    if(numLlegendes==0) {
         cadenaSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+pixelsIco+' '+pixelsIco+'"><path d="'+path_defecte+'" fill="'+Marcador_defecte_color+'" /></svg>';
         //console.log(cadenaSVG);
         myIconUrl = encodeURI("data:image/svg+xml," + cadenaSVG).replace('#','%23');             
         icon = L.icon( {
              //renderer: myRenderer,
              iconUrl: myIconUrl,
              iconSize: [pixelsIco*escalaIco, pixelsIco*escalaIco],
              iconAnchor: [pixelsIco*escalaIco/2, pixelsIco*escalaIco]
         } );
         iconaLlegenda ="<input type='checkbox' checked id='marcadors' value='Marcadors' style=\"vertical-align:-3px\" onchange=\"desactivaCapa('marcadors')\"/><svg style='height:24px; width:24px; vertical-align:-4px'><path fill='"+Marcador_defecte_color+"' d='"+path_defecte+"' stroke='black' stroke-width='0' /></svg>";         
         numLlegendes=1;
         filaLlegenda[0]="<div style='width:150px; margin: 5px; vertical-align:middle; horizontal-align:left'>"+iconaLlegenda+"Marcadors</div>";                
    }   
   
   filaLlegenda.sort(function (a,b){
       return naturalSort(a,b);
   });   
   
   for(i=0;i<numLlegendes;i++){   
      contingutLlegenda+=filaLlegenda[i];
   }
   
   if(Casella_poligons=='S'||Casella_clusters=='S'||Casella_densitat=='S') {
     contingutLlegenda+="<hr/>";
   }


   //clusters
    llgd +="#$#Clusters";    
    path="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z";
    var iconaLlegenda ="<svg style='height:24px; width:24px; vertical-align:-4px'><path fill='#00FF00' d='"+path+"' stroke='black' stroke-width='0' /></svg>"; 
    if (Casella_clusters=='S') {
      contingutLlegenda+="<div style='width:150px; margin: 5px; vertical-align:middle; horizontal-align:left'><input type='checkbox' id='clusters' style='vertical-align:-3px' onchange=\"desactivaClusters(this.id)\"/>"+iconaLlegenda+"Clusters</div>";    
    }
   
    
    llgd +="#$#heatmap";    
    path="M11.71,19C9.93,19 8.5,17.59 8.5,15.86C8.5,14.24 9.53,13.1 11.3,12.74C13.07,12.38 14.9,11.53 15.92,10.16C16.31,11.45 16.5,12.81 16.5,14.2C16.5,16.84 14.36,19 11.71,19M13.5,0.67C13.5,0.67 14.24,3.32 14.24,5.47C14.24,7.53 12.89,9.2 10.83,9.2C8.76,9.2 7.2,7.53 7.2,5.47L7.23,5.1C5.21,7.5 4,10.61 4,14A8,8 0 0,0 12,22A8,8 0 0,0 20,14C20,8.6 17.41,3.8 13.5,0.67Z";
    var iconaLlegenda ="<svg style='height:24px; width:24px; vertical-align:-4px'><path fill='#FF0000' d='"+path+"' stroke='black' stroke-width='0' /></svg>"; 
    if (Casella_densitat=='S') {
      contingutLlegenda+="<div style='width:150px; margin: 5px; vertical-align:middle; horizontal-align:left'><input type='checkbox' id='heatmap' style='vertical-align:-3px' onchange=\"desactivaHeatMap(this.id)\"/>"+iconaLlegenda+"Densitat</div><div style='margin-left:25%'>Transparencia:</div><input type='range' style='margin-left:25%; width:75%' min='1' max='100' value='"+opacitatHeatMap+"' id='opacitatHeatMap'  onchange='canviOpacitatHeatMap(this.value)'>";    
    }
    canviOpacitatHeatMap(opacitatHeatMap);

  //creaPoligons();
  //*
	if(row_poligons!=null) {
		if (row_poligons.length>0){
      		valMax=0;
      		valMin=100;
      		for (p=0;p<row_poligons.length;p++){
        		valMax=Math.max(valMax,parseInt(row_poligons[p]["percent"]));
        		valMin=Math.min(valMin,parseInt(row_poligons[p]["percent"]));        
      		}
      		coefOpacitat=(valMax-valMin)/5;

			if(iniciantMapa) {
				var nom=[];
				var geo=[];
				for (p=0;p<row_poligons.length;p++){
					if (row_poligons[p]["Poligon"]!==null){               	
						nom[p]=row_poligons[p]["Nom_SE"];
						geo[p]=eval(row_poligons[p]["Poligon"]);
						var color=row_poligons[p]["Color"]

						if (color==""){         
							color=getRandomColor();
						}

	        	opPoligon=(opacitatFonsPoligon/100)*(row_poligons[p]["percent"]/100)*coefOpacitat;
	        	//console.log(row_poligons[p]["percent"]+"---"+opacitatFonsPoligon);
	        	//console.log(opPoligon);
						poligons[p] = L.polygon(geo[p], {
	        		fillOpacity: opPoligon,            
							color: color,
              weight: gruixVoraPoligon,
              stroke: true,
	        		pane: 'poligons',
	        		interactive: true
						});
    				infoPoligon="<div style='font-size:1.7rem;padding:5px'><strong>"+row_poligons[p]["Nom_SE"]+"</b></div>";
      			infoPoligon +="<table class='tblInfoPol'>";          
        				infoPoligon +="<tr><td>Centres amb programes d'Innovació</td><td style='text-align:rigth'>"+row_poligons[p]["numCenInnova"]+"</td><td></td></tr>";          
        				infoPoligon +="<tr><td>Total de centres</td><td style='text-align:rigth'>"+row_poligons[p]["totalCen"]+"</td><td></td></tr>";          
        				infoPoligon +="<tr><td>Percentatge de l'àmbit</td><td style='text-align:rigth'>"+parseInt(row_poligons[p]["percent"])+"</td><td>%</td></tr>";                      
      			infoPoligon +="</table>";                      
      			infoPoligon +="<div style='padding: 2px 5px; text-align:center; color:#BF0000; cursor: pointer' id=\""+row_poligons[p]["Nom_SE"]+"\" onClick='carregaDades(\"recollidaEst\",this.id)'>Relació de programes al SE</div>";                                  
    				//infoPoligon +="</div>";          
    				poligons[p].bindPopup(infoPoligon);   
    				if(checkboxPoligonsValue) {
      				poligons[p].addTo(map);
    				}  
					} 
				}
			}
			llgd +="#$#Polígons";    
			path="M17,15.7V13H19V17L10,21L3,14L7,5H11V7H8.3L5.4,13.6L10.4,18.6L17,15.7M22,5V7H19V10H17V7H14V5H17V2H19V5H22Z";
			var iconaLlegenda ="<svg style='height:24px; width:24px; vertical-align:-4px'><path fill='#CC00CC' d='"+path+"' stroke='black' stroke-width='0' /></svg>"; 
    		
    		if (Casella_poligons=='S') {
      			contingutLlegenda+="<div style='width:150px; margin: 5px; vertical-align:middle; horizontal-align:left'><input type='checkbox' id='poligons' style='vertical-align:-3px' onchange=\"desactivaCapa(this.id)\"/>"+iconaLlegenda+"Polígons</div><div style='margin-left:25%'>Transparencia:</div> <input type='range' style='margin-left:25%; width: 75%;' min='1' max='100'  value='"+opacitatFonsPoligon+"' id='opacitatFonsPoligon'  onchange='canviOpacitatFonsPoligon(this.value)'>";               
    		}               
		}
	}    



//construcció de la llegenda si té posició 
 if (Posicio_llegenda.toLowerCase()!="sense_llegenda" && contingutLlegenda!=""){    
          var pos_lle=[["dalt_esquerra","topleft"],["dalt_centre","topright"],["dalt_dreta","topleft"],["esquerra_dalt","topleft"],["esquerra_centre","bottomleft"],["esquerra_baix","bottomleft"],["baix_esquerra","bottomleft"],["dreta_dalt","topleft"],["dreta_centre","bottomright"],["dreta_baix","bottomright"],["baix_centre","bottomright"],["baix_dreta","bottomright"]];
          for (g=0;g<pos_lle.length;g++){
               if(pos_lle[g][0]==Posicio_llegenda){
                  posicio=pos_lle[g][1];         
               }
          }      
          var legend = L.control({position: posicio});
          legend.onAdd = function (map) { 
              map.legend = this;
              var div = L.DomUtil.create('div', 'laLlegenda'); 
              div.innerHTML= contingutLlegenda;              
              // Disable dragging when user's cursor enters the element
              div.addEventListener('mouseover', function () {
              map.dragging.disable();
              });              
              // Re-enable dragging when user's cursor leaves the element
              div.addEventListener('mouseout', function () {
              map.dragging.enable();
              });
              return div;
          }; 

       if (iniciantMapa) {
           legend.addTo(map); 
           $(".laLlegenda").attr('id', 'llegendaMapa');           
       } else {
           $("#llegendaMapa").html(contingutLlegenda);
       }            
  } 
  
          


// Visualització d'errades o omissió de dades de latitud i longitud
   if(numSenseLloc>0){
       if (Visualitzar_errors=="S") {
         mostraErrades(senseLloc);
       }
   }
      
// Determinació dels límits del mapa 
   if (marcadors.length>0) {
     bounds=L.latLngBounds(marcadors[0].getLatLng(), marcadors[0].getLatLng());
     for (var l = 0; l < marcadors.length; l++) {
        bounds.extend(marcadors[l].getLatLng());
     } 

     // Determinació dels límits del mapa inicial      
     if (iniciantMapa) {  
        iniciantMapa=false;


        //*
        bounds_all=bounds;
        var $mapDiv = $('#map');
        var mapDim = { height: $mapDiv.height(), width: $mapDiv.width() };
        map.fitBounds(bounds);
        var zoomMapa=map.getZoom();
        var centreMapa=bounds.getCenter();

        // Recull de variables relacionades amb el mapa inicial
        if (Centre_mapa!='A') {
           var cadenaCentre=Centre_mapa.split(',');
           var latInicial=parseFloat(cadenaCentre[0]);
           var lonInicial=parseFloat(cadenaCentre[1]);
        }
        var zoomInicial=parseFloat(Zoom_inicial);

        // Tipus de mapa inicial
        if (zoomInicial==0 && Centre_mapa=='A') { // tot automàtic
           iniciantMapa=false;
        }
        if (zoomInicial>0 && Centre_mapa=='A') { // centre automàtic
           map.setZoom(zoomInicial);
           map.panTo(centreMapa);
        }
        if (zoomInicial==0 && Centre_mapa!='A') { // zoom automàtic
           map.setZoom(zoomMapa);
           map.panTo(new L.LatLng(latInicial, lonInicial));
        }
        if (zoomInicial>0 && Centre_mapa!='A') { // tot manual
           map.setZoom(zoomInicial);
           map.panTo(new L.LatLng(latInicial, lonInicial));
        }
     } 
   }   
    //return; 
   // Si no hi ha filtres actius, mostra el mapa inicial
   if (filtresActius>0) {
     if (Zoom_automatic=='S') {
         limitsMapa();
     }         
   } else {
   if (!iniciantMapa) {
     bounds=bounds_all;
     limitsMapa();
     }
   }

   // Situar la llegenda al mapa
   if (Posicio_llegenda.toLowerCase()!="sense_llegenda"){
      $("#llegendaMapa").css("visibility","visible");                    
      $("#llegendaMapa").css("display","block");     
   }

   // Mapa de densitat   
   creaHeatMap();  

   // Recordar estat checkboxes
   for(k=0;k<numCheckboxes;k++) {
      var mrk="ico_"+arrayCheckboxesId[k];
      $("[id='"+mrk+"']").prop("checked",arrayCheckboxesValue[k]);
      mostraCapa(mrk);
   }

   $("[id='poligons']").prop("checked",checkboxPoligonsValue);
   $("[id='clusters']").prop("checked",checkboxClustersValue);
   $("[id='heatmap']").prop("checked",checkboxHeatmapValue);
   $("[id='marcadors']").prop("checked",checkboxMarcadorsValue);
   
   // Tancament de la finestra d'espera   
   $('#imgtemp').css("display","none");           
   //$("*").css("cursor","default");    

   if (Mostra_densitat=='S') {
     map.addLayer(heat);
     desactivaMarcadors();
   }
   var durada=Math.floor(Date.now() / 1000)-temps1;
   console.log("creaMarcadors - Durada (segons):"+durada);       

}








function canviOpacitatFonsPoligon(opacitatFonsPoligon){
	if(row_poligons!=null) {
		if (row_poligons.length>0){
  		valMax=0;
  		valMin=100;
  		for (p=0;p<row_poligons.length;p++){
    		valMax=Math.max(valMax,parseInt(row_poligons[p]["percent"]));
    		valMin=Math.min(valMin,parseInt(row_poligons[p]["percent"]));        
  		}
  		coefOpacitat=(valMax-valMin)/5;
			for (p=0;p<row_poligons.length;p++){
				if (row_poligons[p]["Poligon"]!==null){               	
          opPoligon=(opacitatFonsPoligon/100)*(row_poligons[p]["percent"]/100)*coefOpacitat;              
					poligons[p].setStyle({fillOpacity: opPoligon});
				} 
			}
		}
	}    
}





function canviOpacitatHeatMap(opacitatHeatMap){
  var opHeatMap=opacitatHeatMap/100;
  $(".leaflet-heatmap-layer").css("opacity",opHeatMap);
}



function desactivaCapa(ico){
    if (ico=="poligons"){
        checkboxPoligonsValue=!checkboxPoligonsValue;
    } else {
        if (ico=="marcadors"){
           checkboxMarcadorsValue=!checkboxMarcadorsValue; 
        } else {
			var iconaEscollida=0;
			for(j=0;j<numCheckboxes;j++) { 
				if("ico_"+arrayCheckboxesId[j]==ico) { 
					iconaEscollida=j; 
				}
			}
			arrayCheckboxesValue[iconaEscollida]=!arrayCheckboxesValue[iconaEscollida];
		}
    } 
    mostraCapa(ico);
}


function desactivaClusters(ico){
    if($("#clusters").is(":checked")){
        checkboxClustersValue=true;
        Mostra_clusters='S';
        
        for(i=0;i<marcadors.length;i++) {
          map.removeLayer(marcadors[i]);
          oms.removeMarker(marcadors[i]);             
        }     
                
        for (var i = 0; i < marcadors.length; i++) {
          var mrk="ico_"+centres[i][numColNomLlegendaMapa];      
          if ($("[id='"+mrk+"']").is(":checked")) {  
              markers.addLayer(marcadors[i]);      
          } else { 
              markers.removeLayer(marcadors[i]);       
          }
        }

    } else {
        checkboxClustersValue=false;
        Mostra_clusters='N';  
        for (var i = 0; i < marcadors.length; i++) {
            markers.removeLayer(marcadors[i]);
        }  
        oms = new OverlappingMarkerSpiderfier(map,{nearbyDistance:1});
        oms.addListener('spiderfy', function(markers) {
        map.closePopup();
        });
        for (var i = 0; i < marcadors.length; i++) {        
            marcadors[i].addTo(map);
            oms.addMarker(marcadors[i]);
        }
    }
}

function activaMarcadors() {
      for (var i = 0; i < marcadors.length; i++) {
      var mrk="ico_"+centres[i][numColNomLlegendaMapa];
      
         if ($("[id='"+mrk+"']").is(":checked")) {
             if (Mostra_clusters=='S'){  
                markers.addLayer(marcadors[i]);         
             } else {  
                marcadors[i].addTo(map);
                oms.addMarker(marcadors[i]);
             } 
        } else {
             if (Mostra_clusters=='S'){  
                markers.removeLayer(marcadors[i]);         
             } else {  
                map.removeLayer(marcadors[i]);
                oms.removeMarker(marcadors[i]);
             }           
      }
    }
}

function desactivaMarcadors() {
      for (var i = 0; i < marcadors.length; i++) {
             if (Mostra_clusters=='S'){  
                markers.removeLayer(marcadors[i]);         
             } else {  
                map.removeLayer(marcadors[i]);
                oms.removeMarker(marcadors[i]);
             } 
        }
}

function creaHeatMap() {
  heat = L.heatLayer(locations,{
    radius: 15,
    blur: 15, 
    maxZoom: 10,
    max: 0.4,
    gradient: {
      0.0: 'blueviolet',
      0.1: 'deepskyblue',
      0.2: 'dodgerblue',
      0.3: 'aquamarine',
      0.4: 'green',
      0.5: 'lime',
      0.6: 'yellow',
      0.7: 'lightcoral',
      0.8: 'orange',
      0.9: 'orangered',
      1.0: 'red',
    }
  });
}

function desactivaHeatMap(ico){
  if($("#heatmap").is(":checked")){
    checkboxHeatmapValue=true;
    Mostra_densitat='S';    
    map.addLayer(heat);
    canviOpacitatHeatMap($("#opacitatHeatMap").val());
    desactivaMarcadors();
  } else {
    checkboxHeatmapValue=false;
    Mostra_densitat='N';
    map.removeLayer(heat);
    activaMarcadors();
  }  
}

function mostraCapa(ico) {
   if (ico!="poligons"){
      for (var i = 0; i < marcadors.length; i++) {
        if (ico=="marcadors") {
             var mrk=ico;
        } else {
             var mrk="ico_"+centres[i][numColNomLlegendaMapa];
        }        
        
        if (mrk==ico){
           if ($("[id='"+mrk+"']").is(":checked")) {
               if (Mostra_clusters=='S'){  
                  markers.addLayer(marcadors[i]);         
               } else {  
                  marcadors[i].addTo(map);
                  oms.addMarker(marcadors[i]);
               } 
          } else {
               if (Mostra_clusters=='S'){  
                  markers.removeLayer(marcadors[i]);         
               } else {  
                  map.removeLayer(marcadors[i]);
                  oms.removeMarker(marcadors[i]);
               } 
          }  
        }
      }        
  } else {     
    for (var i = 0; i < poligons.length; i++) {
      if($("#poligons").is(":checked")){
           poligons[i].addTo(map);    
      } else {
           poligons[i].remove();
      }
    }
  }
}

function limitsMapa(){  // Actualitza el mapa segons els límits establerts
    if (marcadors.length>0) {     
      map.fitBounds(bounds);
      if(map.getZoom()>Zoom_max) {
         map.setZoom(Zoom_max);
      }
    } 
}

function centrar(){  // Actualitza el mapa segons els filtres actius en mode zoom manual 
  if (filtresActius>0) {
    $('#botoCentrar').attr( "src", "https://drive.google.com/uc?id=1bJRPWpX5MjnYXB8EW65TBHXLXbSMdYYZ" );  
  }
  limitsMapa();
}



//function aplica_plantilla(plantilla,row_dad,row_cap){
function aplica_plantilla(plantilla,row_dad){	
  if (row_dad==undefined){
    alert("No hi ha dades al registre");
    return;
  }

  for (c=0;c<row_cap[0].length; c++){
    if (plantilla.indexOf("{{"+row_cap[0][c]+"}}")>-1){
      var cadena="{{"+row_cap[0][c]+"}}";
      if (row_cap[1][c].toLowerCase().indexOf("datahora")>-1){  
         var date = new Date(row_dad[c]*1000);
         var dia = date.getDate();
         var mes = date.getMonth();
         var any = date.getFullYear();         
         var hours = date.getHours();
         var minutes = "0" + date.getMinutes();
         var seconds = "0" + date.getSeconds();
         var formattedTime = dia + '/' + mes + '/' + any;
         //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);         
         var valSubs=date;
      } else if (row_cap[1][c].toLowerCase().indexOf("carousel")>-1){  
         var atzar=Math.floor((Math.random() * 10000) + 1);
         var valSubs=carousel(row_cap[0][c]+"_"+atzar,row_dad[c]);
      } else if (row_cap[1][c].toLowerCase().indexOf("iframe")>-1) {
         var valSubs="<iframe class='iframe' src='"+row_dad[c]+"'></iframe>";
      } else {
         var valSubs=row_dad[c];          
      }

      plantilla=plantilla.replace(new RegExp(cadena, 'g'), valSubs); 

      $("#ocult").html(plantilla);
      $("#ocult a[href='']").attr("class","nourl");
      $("#ocult img[src='']").attr("class","nologo");      
      
      plantilla=$("#ocult").html();
    }
  }     
  return plantilla;
}



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function addslashes(str) {
  str=str.replace(/[']+/g, '&apos;');
  str=str.replace(/\\/g,'\\\\');
  str=str.replace(/\'/g,'\\\'');
  str=str.replace(/\"/g,'\\"');
  str=str.replace(/\0/g,'\\0');
  str=str.replace("\n","\\n");
  return str;
}

  
function formatDate(date) {
    year=date.substr(date.length -4);
    month=date.substr(3,2);    
    day=date.substr(0,2);        
    //var data=new Date(year, month, day);    
    //data.format('YYYY-MM-DD');
    return new Date(year, month, day);
}

function gm_authFailure() {
  missatgeError('El mapa no es pot mostrar perquè la clau API del full de configuració no és correcta. Si us plau, substituiu-la per una de vàlida');
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}





function onVisuDescripcio(dades){
  
  var msgTitol="<div style='width:15%;float: left;margin-top: -20px;cursor: default;border-right:  3px solid;padding-right:10px;'> <img src='imatges/logos/"+dades[0]["Simbol"]+"' style='max-height: 125px;max-width:200px'></div>";      
     msgTitol +="<div style='width:75%; float: right'>"+dades[0]["Nom_programa"]+"<br><br><i>"+dades[0]['Titol']+"</i></div>";

  var divMsg="<div>";
    divMsg +="<div style='float:left;width:50%; padding: 10px'>";
      divMsg +="<iframe  style='width:100%; height: 300px;padding:5px; border: 1px solid'  src='https://maps.google.com/maps?z=16&t=m&q=loc:"+dades[0]['Latitud']+"+"+dades[0]['Longitud']+"&iwloc=B&output=embed' frameborder='1' scrolling='no' marginheight='0' marginwidth='0'></iframe>";
    divMsg +="</div>";
    divMsg +="<div style='float:left;width:50%'>";
      divMsg +="<p class='subTitol'>";
        divMsg +="<br><b>Centre: </b><i>"+dades[0]['Nom']+"</i>";
        divMsg +="<br><b>Titularitat: </b><i>"+dades[0]['Naturalesa']+"</i>";
        divMsg +="<br><b>Tipus de centre: </b><i>"+dades[0]['TipusCentre']+"</i>";        
        divMsg +="<br><b>Municipi: </b><i>"+dades[0]['Municipi']+"</i>";
        divMsg +="<br><b>Servei Territorial: </b><i>"+dades[0]['Codi_ST']+"</i>";
        divMsg +="<br><b>Programa: </b><i>"+dades[0]['Nom_programa']+"</i>";         
        divMsg +="<br><b>Cursos del centre en el programa: </b><i>"+dades[0]['Cursos']+"</i>";                 
        divMsg +="<br><b>Àmbits curriculars: </b><p style='margin-left:25px'><i>"+dades[0]['Ambits_curriculars']+"</i></p>";                 
        divMsg +="<br><b>Àmbits d'innovació: </b><p style='margin-left:25px'><i>"+dades[0]['Ambits_innovacio']+"</i></p>";                                 
        divMsg +="<br><b>Descripció: </b><p style='margin-left:25px'><i>"+dades[0]['Descripcio']+"</i></p>";                 
        //divMsg +="<br><b>Títol: </b><p style='margin-left:25px'><i>"+dades[0]['Titol']+"</i></p>";                         
    divMsg +='</div>';
  divMsg +='</div>';    

  var msgPeu="";
    if (dades[0]['Enllac']!="" && dades[0]['Enllac']!=null){
      msgPeu +="<a href='"+dades[0]['Enllac']+"' target='_blank' class='url' style='cursor: default; margin: 5px'><button class='btn' aria-hidden='true'>Fitxa del projecte</button></a>";
    } else {
      msgPeu +="<a href='#' class='url' style='cursor: pointer; margin: 5px'><button class='btn' aria-hidden='true' style='color:grey'>Fitxa del projecte</button></a>";      
    }

    if (dades[0]['Web']!="" && dades[0]['Web']!=null){
      msgPeu +="<a href='"+dades[0]['Web']+"' target='_blank' class='url' style='cursor: default; margin: 5px'><button class='btn' aria-hidden='true'>Web del centre</button></a>";   
    } else {
      msgPeu +="<a href='#' class='url' style='cursor: pointer; margin: 5px'><button class='btn' aria-hidden='true' style='color:grey'>Web del centre</button></a>";         
    }
    msgPeu +="<button class='btn' data-dismiss='modal' aria-hidden='true' style='margin: 5px' >Tancar</button>";

  $('#modalHeaderTarja').html(msgTitol);
  $('#missatgeTarja').html(divMsg);
  $('#missatgePeu').html(msgPeu);  
  $('*').css('cursor','default');    
  $('#finestraTarja').modal('show');  
}




function onVisuEstSE(dades){
  var msgTitol="<div style='width:100%; float: right'id='nomSE'>"+dades[0]["Nom_SE"]+"</div>";

  var divMsg ="<table id='tblInfoEst' style='width:100%; padding: 10px;margin:3px'>";
        divMsg +="<tr>";
          divMsg +="<th></th>";                    
          divMsg +="<th>Programa</th>";
          divMsg +="<th>Centres<br>innovació</th>";
          divMsg +="<th>Total<br>Centres</th>";
          divMsg +="<th>% Centres<br>innovació</th>";
          divMsg +="<th style='width:20%'></th>";
        divMsg +='<tr>';          
      for (f=0;f<dades.length;f++){
        //valors='{"id_programa":"'+dades[f]["Id_programa"]+'","Nom_SE":"'+dades[0]["Nom_SE"]+'"}';
        valors=[dades[f]["Id_programa"],'"'+dades[0]["Nom_SE"]+'"'];        
        divMsg +="<tr onClick='carregaDades(\"recollidaPrograma\","+valors+")' style='cursor:pointer'>";
          divMsg +="<td><img src='imatges/view.gif' style='margin: 0px 5px'/></td>";                    
          divMsg +="<td>"+dades[f]["Nom_programa"]+"</td>";                    
          divMsg +="<td>"+dades[f]["numCenInnova"]+"</td>";                                        
          divMsg +="<td>"+dades[f]["totCen"]+"</td>";                                                  
          divMsg +="<td>"+dades[f]["percent"]+" %</td>";                                                            
          divMsg +="<td><progress max='100' value="+dades[f]["percent"]+" class='progress'></progress></td>";                                                                                
        divMsg +='<tr>';      
      }
    divMsg +='</table>';    

  var msgPeu='';
    msgPeu +='<button class="btn" data-dismiss="modal" aria-hidden="true" style="margin: 5px" >Tancar</button>';

  $('#modalHeaderTarja').html(msgTitol);
  $('#missatgeTarja').html(divMsg);
  $('#missatgePeu').html(msgPeu);  
  $('#finestraTarja').modal('show');  

}




function onVisuPrograma(dades){
  //console.log(dades+"\n"+nomSE);
  var msgTitol="<div style='width:25%; float: left'><img src="+dades[0]["Simbol"]+" style='max-height:100px'></div>";
      msgTitol +="<div style='width:75%; float: right'>"+dades[0]["Nom_curt"]+"-"+dades[0]["Nom_programa"]+"</div>";

  var divMsg ="<div>";
          divMsg +="<div><b>Descripció:</b><p style='margin-left:25px'><i>"+dades[0]["Descripcio"]+"</i></p></div>";
          divMsg +="<div><b>Àmbits curriculars:</b><p style='margin-left:25px'><i>"+dades[0]["Ambits_curriculars"]+"</i></p></div>";    
          divMsg +="<div><b>Àmbits d'innovació:</b><p style='margin-left:25px'><i>"+dades[0]["Ambits_innovacio"]+"</i></p></div>";    
        divMsg +='</div>';      
       
        divMsg +="<div id='relCentPrg'></div>";

  var msgPeu='';
    msgPeu +='<button class="btn" data-dismiss="modal" aria-hidden="true" style="margin: 5px" >Tancar</button>';

  $('#capSecundaria').html(msgTitol);
  $('#cosSecundaria').html(divMsg);
  $('#peuSecundaria').html(msgPeu);  
  valors=dades[0]["id_programa"]+","+$("#nomSE").html();
  carregaDades("recollidaCentresProgramaSE",valors);         
  //$('#finestraSecundaria').modal('show');  
}





function onCenProgramaSE(row_cen){
  //console.log(row_cen);
      var divMsg ="<h3>Relació de centres amb el programa d'innovació al "+row_cen[0]["Nom_SE"]+" </h3>";
        divMsg +="<table id='tblCenPrg' class='tableFixHead' style='width:100%; padding: 10px;margin:3px'>";
          divMsg +="<thead>";
            divMsg +="<tr>";          
              divMsg +="<th></th>";                    
              divMsg +="<th>Centre</th>";
              divMsg +="<th>Municipi</th>";
              divMsg +="<th>Naturalesa</th>";
              divMsg +="<th>Estudis</th>";
              divMsg +="<th style='width:90px'>Cursos<br>programa<br>innovacio</th>";            
            divMsg +='<tr>';          
          divMsg +="</thead>";            
        if (row_cen!=null){
          for (f=0;f<row_cen.length;f++){
            divMsg +="<tbody>";            
              divMsg +="<tr>";
                if (row_cen[f]["Web"]=="") {
                  divMsg +="<td><img src='imatges/nodes_grey.png' style='margin: 5px; width:30px'/></td>";                    
                } else {
                  divMsg +="<td><a href='"+row_cen[f]["Web"]+"' target='_blank'><img src='imatges/nodes.png' style='margin: 5px; width:30px'/></a></td>";                    
                }
                divMsg +="<td>"+row_cen[f]["Nom"]+"</td>";                    
                divMsg +="<td>"+row_cen[f]["Municipi"]+"</td>";                                        
                divMsg +="<td>"+row_cen[f]["Naturalesa"]+"</td>";                                                  
                divMsg +="<td>"+row_cen[f]["Estudis"]+"</td>";                                                                                
                divMsg +="<td>"+row_cen[f]["CursosPrograma"]+"</td>";                                                                                            
              divMsg +='<tr>';      
            divMsg +="<tbody>";              
          }
        }
        divMsg +='</table>';   
  $('#relCentPrg').html(divMsg);
  $('#finestraSecundaria').modal('show');  
}




function onVisuProgramaST(dades){
  //console.log(dades+"\n"+nomSE);
  var msgTitol="<div style='width:25%; float: left'><a href='"+dades[0]["Enllac"]+"' target='_blank'><img src='imatges/logos/"+dades[0]["Simbol"]+"' style='max-width:200px;max-height:100px;'></a></div>";
      msgTitol +="<div style='width:75%; float: right'>"+dades[0]["Nom_curt"]+"-"+dades[0]["Nom_programa"]+"</div>";

  var divMsg ="<div>";
          divMsg +="<div><b>Descripció: </b><p style='margin-left:20px'>"+dades[0]["Descripcio"]+"</p></div>";
          divMsg +="<div><b>Àmbits curriculars: </b><p style='margin-left:20px'>"+dades[0]["Ambits_curriculars"]+"</p></div>";    
          divMsg +="<div><b>Àmbits d'innovació: </b><p style='margin-left:20px'>"+dades[0]["Ambits_innovacio"]+"</p></div>";    
          divMsg +="<div><b>Estudis etapes objectiu: </b><p style='margin-left:20px'>"+dades[0]["Tipus_centres"]+"</p></div>";              
          divMsg +="<div><a href='"+dades[0]["Enllac"]+"' target='_blank'>Més informació</a></div>";                        
        divMsg +="</div>";
       
        divMsg +="<div id='relCentPrg'></div>";

  var msgPeu='';
    msgPeu +='<button class="btn" data-dismiss="modal" aria-hidden="true" style="margin: 5px" >Tancar</button>';

  $('#capSecundaria').html(msgTitol);
  $('#cosSecundaria').html(divMsg);
  $('#peuSecundaria').html(msgPeu);  
  valors=dades[0]["id_programa"]+","+$("#nomSE").html();
  carregaDades("recollidaEstadistiquesST",valors);         
  //$('#finestraSecundaria').modal('show');  
}


function onDistCenProgramaST(row){
  //console.log(row_cen);
      var divMsg ="<h3>Distribucció de centres</h3>";
        divMsg +="<table id='tblEstPrgST' class='tableFixHead' style='width:100%; padding: 10px;margin:3px'>";
          divMsg +="<thead>";
            divMsg +="<tr>";          
              divMsg +="<th>Relació<br>Centres</th>";                    
              divMsg +="<th>Codi_ST</th>";
              divMsg +="<th>Centres<br>Programa</th>";
              divMsg +="<th>Centres<br>Totals</th>";
              divMsg +="<th>% centres<br>Programa</th>";
              divMsg +="<th>Centres<br>2015-2016</th>";
              divMsg +="<th>Centres<br>2016-2017</th>";
              divMsg +="<th>Centres<br>2017-2018</th>";              
            divMsg +='<tr>';          
          divMsg +="</thead>";            
        if (row!=null){
          for (f=0;f<row.length;f++){
            divMsg +="<tbody>";            
              divMsg +="<tr style='cursor:pointer' onClick='carregaDades(\"recollidaCentresProgramaST\",["+row[f]["id_programa"]+",\""+row[f]["Codi_ST"]+"\"])'>";
                divMsg +="<td><img src='imatges/llistat.png' style='margin: 5px; width:30px; cursor:pointer' onClick='carregaDades(\"recollidaCentresProgramaST\",["+row[f]["id_programa"]+",\""+row[f]["Codi_ST"]+"\"])' /></td>";
                divMsg +="<td>"+row[f]["Codi_ST"]+"</td>";                    
                divMsg +="<td>"+row[f]["cenPrg"]+"</td>";                                        
                divMsg +="<td>"+row[f]["cenST"]+"</td>";                                                  
                divMsg +="<td>"+row[f]["proporcio"]+"</td>";                                                                                
                divMsg +="<td>"+row[f]["2015-2016"]+"</td>";                                                                                            
                divMsg +="<td>"+row[f]["2016-2017"]+"</td>";                                                                                            
                divMsg +="<td>"+row[f]["2017-2018"]+"</td>";                                                                                                                            
              divMsg +='<tr>';      
            divMsg +="<tbody>";              
          }
        }
        divMsg +='</table>';   

  $('#relCentPrg').html(divMsg);
  $('#finestraSecundaria').modal('show');  
}



function onCenProgramaST(row){
      var msgCap ="<h3>Relació de centres participants inscrits al programa <br><strong>"+row[0]["Nom_programa"]+"</strong> <br>del Servei Territorial <strong>"+row[0]["Codi_ST"]+"</strong></h3>";

        divMsg ="<table id='tblCenPrg' class='tableFixHead' style='width:100%; padding: 10px;margin:3px'>";
          divMsg +="<thead>";
            divMsg +="<tr>";          
              divMsg +="<th>Nodes<br>Centre</th>";                    
              divMsg +="<th>Municipi</th>";              
              divMsg +="<th>Codi</th>";
              divMsg +="<th>Centre</th>";
              divMsg +="<th>Naturalesa</th>";
              divMsg +="<th>Estudis</th>";
              divMsg +="<th style='width:90px'>Cursos<br>programa<br>innovacio</th>";            
            divMsg +='<tr>';          
          divMsg +="</thead>";            
          divMsg +="<tbody>";                      
        if (row!=null){
          for (f=0;f<row.length;f++){
              divMsg +="<tr>";
                if (row[f]["Web"]=="") {
                  divMsg +="<td><img src='imatges/nodes_grey.png' style='margin: 5px; width:30px'/></td>";                    
                } else {
                  divMsg +="<td><a href='"+row[f]["Web"]+"' target='_blank'><img src='imatges/nodes.png' style='margin: 5px; width:30px'/></a></td>";                    
                }
                divMsg +="<td>"+row[f]["Municipi"]+"</td>";                                                        
                divMsg +="<td>"+row[f]["Codi"]+"</td>";                                    
                divMsg +="<td>"+row[f]["Nom"]+"</td>";                    
                divMsg +="<td>"+row[f]["Naturalesa"]+"</td>";                                                  
                divMsg +="<td>"+row[f]["Estudis"]+"</td>";                                                                                
                divMsg +="<td>"+row[f]["CursosPrograma"]+"</td>";                                                                                            
              divMsg +='<tr>';      
          }
        }
        divMsg +="<tbody>";                      
        divMsg +='</table>';   

  var msgPeu='';
    msgPeu +='<button class="btn" data-dismiss="modal" aria-hidden="true" style="margin: 5px" >Tancar</button>';

  $('#capTerciaria').html(msgCap);        
  $('#cosTerciaria').html(divMsg);
  $('#peuTerciaria').html(msgPeu);  
  $('#finestraTerciaria').modal('show');  
}






</script>

<!--div on es carregaran els estils -->
<style id="divEstil">
</style>

<!--div on es carregaran els scripts -->
<div id="divScript">
</div>

<div id="divDiv">
</div>
<script> inicia(); </script>
</html>


