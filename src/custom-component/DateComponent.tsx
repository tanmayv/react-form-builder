import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';

import { ConfigProps } from '../core/blockconfig/BlockConfigurator';
import { PropertyType } from '../core/blockconfig/PropertyType';

const DateComponent: React.FC<ConfigProps> = ({ createProperty, properties, change }) => {
  const typeOptions = ['date', 'datetime-local', 'time'];
  useEffect(() => {
    createProperty(PropertyType.STRING, 'label', 'Pick a date');
    createProperty(PropertyType.STRING, 'value', '');
    createProperty(PropertyType.STRING_OPTIONS, 'type', {options: typeOptions, selected: 'date'});
  }, []);
  return <TextField
      name={properties.name}
      label={properties.label}
      type={properties.type?.selected}
      value={properties.value || ''}
      onChange={e => change({value: e.target.value})}
      InputLabelProps={{
        shrink: true,
      }}
  />;
  
};

export default DateComponent;