import React from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Centres({data}){
  return (
    <DataTable value={data.centres} tableStyle={{minWidth: '50rem'}} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
      <Column field="id" header="Codi"></Column>
      <Column field="nom" header="Centre"></Column>
      <Column field="municipi" header="Localitat"></Column>
    </DataTable>
  );
}

export default Centres;