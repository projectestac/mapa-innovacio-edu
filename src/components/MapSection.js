import React from 'react';
import Paper from '@material-ui/core/Paper';
import MainMap from './MainMap';
import MapaCentre from './MapaCentre';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

function MapSection({ data: { programes, centres, cursos }, programa, centre, curs, currentPrograms, polygons, mapChanged, history, updateMap }) {

  const singleProg = programa ? programes.get(programa) : null;
  const singleCentre = centre ? centres.get(centre) : null;
  const w = window.innerWidth;
  const zoom = w < 600 ? 7 : w < 820 ? 8 : w < 1300 ? 7 : 8;

  const addSchoolsOfProgram = (progId, dest) => {
    const prog = programes.get(progId);
    if (prog)
      Object.keys(prog.centres).forEach(cr => {
        if(!curs || cr === curs)
          prog.centres[cr].forEach(centre => {
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

  const courseSelect = ev => {
    updateMap({ curs: ev.target.value }, true, true);
  }

  const getCurrentCurs = () => curs ? cursos.indexOf(curs) : cursos.length-1;
  
  const handleStep = curs => ev => {
    updateMap({ curs }, true, true);
  }

  return (
    <section className="seccio smapa">
      <Paper className="paper">
        {!singleCentre && !singleProg && <h3>Centres participants {singleProg ? `al programa "${singleProg.nom}"` : 'als programes seleccionats'}</h3>}
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
            <div>
              <Stepper 
                nonLinear
                alternativeLabel 
                activeStep={getCurrentCurs()}
              >
                {cursos.map((c, k) => (
                  <Step key={c}>
                    <StepButton 
                      onClick={handleStep(c)}
                      completed={k<=getCurrentCurs()}
                    >
                      {c}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div>
              <FormControl className="select-curs">
                <InputLabel htmlFor="select-curs">Curs escolar</InputLabel>
                <Select
                  value={curs}
                  onChange={courseSelect}
                  inputProps={{
                    name: 'curs',
                    id: 'select-curs'
                  }}
                >
                  <MenuItem value=""><em>Tots els cursos</em></MenuItem>
                  {cursos.map((curs, k) => (
                    <MenuItem key={k} value={curs}>{curs}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
