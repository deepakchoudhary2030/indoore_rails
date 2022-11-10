import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Protected1(props) {
  let Cmp1 = props.component;
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('worker-info')) {
      alert("Register Your self or Login to Explore All the Features");
      history.push("/")
    }
    
  }, [])
  
  return (
    <div>
      <Cmp1/>
    </div>
  );
}
export default Protected1;







