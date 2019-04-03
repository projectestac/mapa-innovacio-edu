import React from 'react';

function Projectes(props) {

  const { id } = props;

  return (
    <section id={id} className="seccio projectes">
      <h2>Projectes</h2>
      <p>Fusce sodales rhoncus dolor ut volutpat. Quisque ut commodo dui, sodales eleifend lorem. Nunc vel odio sed ex hendrerit lacinia. Donec eget arcu nec nisl lacinia lacinia in et eros. Phasellus interdum odio et rutrum ultricies. Donec cursus nulla et fringilla tristique. Fusce eget dolor sed lacus convallis gravida. Curabitur orci quam, malesuada in odio vitae, interdum luctus felis. Morbi non purus orci. Nam tempor quam vel dui mattis volutpat quis eget diam. Integer ut tincidunt massa.</p>
    </section>
  );
}

export default Projectes;