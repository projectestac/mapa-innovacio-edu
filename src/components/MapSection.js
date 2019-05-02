import React from 'react';
import Paper from '@material-ui/core/Paper';
import MainMap from './MainMap';
import MapaCentre from './MapaCentre';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

function MapSection({ data: { programes, centres, cursosDisp }, programa, centre, cursos, currentPrograms, polygons, mapChanged, history, updateMap }) {

  const singleCentre = centre ? centres.get(centre) : null;
  const w = window.innerWidth;
  const zoom = w < 600 ? 7 : w < 820 ? 8 : w < 1300 ? 7 : 8;

  const addSchoolsOfProgram = (progId, dest) => {
    const prog = programes.get(progId);
    if (prog)
      Object.keys(prog.centres).forEach(curs => {
        if (!cursos || cursos.includes(curs))
          prog.centres[curs].forEach(centre => {
            if (!dest.find(c => c.id === centre.id))
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

  const getMaxCurs = () => cursos ? cursos.length - 1 : cursosDisp.length - 1;

  const handleSelectCurs = curs => ev => {
    const cursos = [];
    for (let n = 0; n < cursosDisp.length; n++) {
      cursos.push(cursosDisp[n]);
      if (cursosDisp[n] === curs)
        break;
    }
    updateMap({ cursos }, true, true);
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
              activeStep={getMaxCurs()}
            >
              {cursosDisp.map((c, k) => (
                <Step key={c}>
                  <StepButton
                    onClick={handleSelectCurs(c)}
                    completed={cursos.includes(c)}
                  >
                    {`${c.substr(0, 5)}${c.substr(7, 2)}`}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <MainMap
              {...{
                points,
                polygons,
                programa,
                center: [41.7, 1.8],
                zoom,
                maxZoom: 19,
                history,
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
