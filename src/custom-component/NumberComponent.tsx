import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { PropertyType } from '../core/blockconfig/PropertyType';

const NumberComponent: React.FC<any> = (props: any) => {
  useEffect(() => {
    const configApi = props.configApi;
    configApi.createProperty(PropertyType.STRING, 'value', '');
    configApi.createProperty(PropertyType.STRING, 'label', 'What is your age?');
    configApi.createProperty(PropertyType.STRING, 'name', 'age-question');
  }, [props.configApi]);
  const data = props.properties;
  return (
    <div>
      <TextField label={data.label} type='number' placeholder='answer here' value={data.value} onChange={(event) => props.change({value : event.target.value})}/>
    </div>
  );
};

export default NumberComponent;