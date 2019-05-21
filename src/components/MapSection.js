import React from 'react';
import Paper from '@material-ui/core/Paper';
import MainMap from './MainMap';
import MapaCentre from './MapaCentre';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { cursCurt } from '../utils/Utils';

function MapSection({ data: { programes, centres, poligons, estudis, cursosDisp }, programa, centre, zona, cursos, currentPrograms, polygons, mapChanged, updateMap }) {

  const singleCentre = centre ? centres.get(centre) : null;
  const poli = zona ? poligons.get(zona) : null;
  const w = window.innerWidth;
  const zoom = w < 600 ? 7 : w < 820 ? 8 : w < 1300 ? 7 : 8;

  const addSchoolsOfProgram = (progId, dest) => {
    const prog = programes.get(progId);
    if (prog)
      Object.keys(prog.centres).forEach(curs => {
        if (!cursos || cursos.includes(curs))
          prog.centres[curs].forEach(centre => {
            if ((!poli || poli.centresInn.has(centre)) && !dest.find(c => c.id === centre.id))
              dest.push(centre)
          });
      });
    return dest;
  };

  const points = [];
  if (!mapChanged) {
    if (singleCentre) {
      points.push(singleCentre);
    }
    else if (programa)
      addSchoolsOfProgram(programa, points);
    else
      currentPrograms.forEach(progId => addSchoolsOfProgram(progId, points));
  }

  const handleSelectCurs = curs => ev => {
    const result = [];
    cursosDisp.forEach(c => {
      if ((curs === c && !cursos.includes(c)) || (curs !== c && cursos.includes(c)))
        result.push(c);
    });
    updateMap({ cursos: result }, true, true);

  }

  return (
    <section className="seccio smapa">
      <Paper className={singleCentre ? 'paper' : 'paper no-padding-top'}>
        {(singleCentre &&
          <MapaCentre
            {...{
              point: singleCentre,
              center: [singleCentre.lat, singleCentre.lng],
              zoom: 15,
              maxZoom: 19,
            }}
          />) ||
          <>
            <Stepper
              className="cursos"
              nonLinear
              alternativeLabel
              activeStep={null}
            >
              {cursosDisp.map((c, k) => (
                <Step key={c}>
                  <StepButton
                    onClick={handleSelectCurs(c)}
                    completed={cursos.includes(c)}
                  >{cursCurt(c)}</StepButton>
                </Step>
              ))}
            </Stepper>
            <MainMap
              {...{
                points,
                polygons,
                programa,
                poli,
                zoom,
                maxZoom: 19,
                estudis,
                updateMap
              }}
            />
          </>
        }
      </Paper>
    </section>
  );
}

export default MapSection;
