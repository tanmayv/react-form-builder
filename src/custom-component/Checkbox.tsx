import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useEffect } from 'react';
import { PropertyType } from '../core/blockconfig/PropertyType';

const CheckboxComponent: React.FC<any> = ({configApi, properties, change}) => {
  useEffect(() => {
    configApi.createProperty(PropertyType.STRING, 'label', 'What is this?');
    configApi.createProperty(PropertyType.STRING_ARRAY, 'options', ['Yes', 'No']);
    configApi.createProperty(PropertyType.STRING_ARRAY, 'selected', []);
  }, []);
  const selectedSet = new Set(properties.selected || []);
  const onChange = ((option: string) => {
    selectedSet.has(option) ? selectedSet.delete(option): selectedSet.add(option);
    change({selected : Array.from(selectedSet)});
  });
  return (properties.options || []).map((option:string, idx: number) => 
    <FormControlLabel
      key={idx}
      control={<Checkbox
        checked={selectedSet.has(option)}
        onChange={(event) => onChange(option)}
        name={option}
        color="primary"/>}
      label={option}
    />
  )
}

export default CheckboxComponent;
