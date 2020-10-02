import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { PropertyType } from '../core/blockconfig/PropertyType';
import { ConfigProps } from '../core/blockconfig/BlockConfigurator';

const NumberComponent: React.FC<ConfigProps> = ({ createProperty, properties, change }) => {
  useEffect(() => {
    createProperty(PropertyType.NUMBER, 'value', 10);
    createProperty(PropertyType.STRING, 'label', 'What is your age?');
    createProperty(PropertyType.STRING, 'name', 'age-question');
    createProperty(PropertyType.STRING, 'placeholder', 'enter age');
  }, []);

  return (
    <div>
      <TextField label={properties.label} type='number' placeholder='answer here' value={properties.value} onChange={(event) => change({value : event.target.value})}/>
    </div>
  );
};

export default NumberComponent;