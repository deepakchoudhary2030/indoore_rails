import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Protected(props) {
  let Cmp = props.component;
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      alert("Register Your self or Login to Explore All the Features");
      history.push("/")
    }
  }, [])
  return (
    <div>
      <Cmp/>
    </div>
  );
}
export default Protected;







