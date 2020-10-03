import { Button } from '@material-ui/core';
import React from 'react';

const JsonLoader: React.FC<any> = ({loadJson}) => {
  const defaultJson = JSON.parse('{"title":"Untitled Form2","blocks":[{"id":2,"type":"checkbox","data":{"selected":[],"options":["Yes","No"],"label":"What is this?"}},{"id":4,"type":"text","data":{"required":false,"label":"What is this?","answer":""}},{"id":3,"type":"number","data":{"placeholder":"enter age","name":"age-question","label":"What is your age?","value":1}},{"id":1,"type":"heading","data":{"variant":{"options":["h1","h2","h3","h4","h5","subtitle1","subtitle2","caption"],"selected":"h5"},"label":"Heading"}}]}');
  return (
    <Button color="inherit" onClick={() => loadJson(defaultJson)}>Load from json</Button>
  );
};

export default JsonLoader;