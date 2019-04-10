import React from 'react';
import Paper from '@material-ui/core/Paper';

function Centre(props) {

  const { id } = props;

  return (
    <section id={id} className="seccio centre">
      <Paper className="paper">
        <h2>Centre</h2>
        <p>Morbi at massa turpis. Sed suscipit fermentum felis ac lacinia. Integer iaculis dolor commodo, mattis leo et, cursus libero. Curabitur id mattis lorem, et pharetra purus. Praesent mollis risus a lectus vehicula, sed sagittis nisl condimentum. Sed viverra, nulla in dignissim imperdiet, diam turpis vehicula ligula, a cursus quam ligula id ante. Nam sagittis sapien et dignissim finibus.</p>
      </Paper>
    </section>
  );
}

export default Centre;