import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect } from 'react';

import { PropertyType } from '../core/blockconfig/PropertyType';
const RadioButtonComponent: React.FC<any> = ({createProperty, properties, change}) => {
  useEffect(() => {
    createProperty(PropertyType.STRING, 'label', 'Choice');
    createProperty(PropertyType.STRING_ARRAY, 'options', ['Yes', 'No']);
    createProperty(PropertyType.STRING, 'selected', 'Yes');
  }, []);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{properties.label}</FormLabel>
      <RadioGroup aria-label="gender" name={properties.name} value={properties.selected || ''} onChange={(e) => change({selected: e.target.value})}>
        {(properties.options || []).map((option:string, idx: number) => 
          <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
        )}
      </RadioGroup>
    </FormControl>
  );
  
}

export default RadioButtonComponent;
