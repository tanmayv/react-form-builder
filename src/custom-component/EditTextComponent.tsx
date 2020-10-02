import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { PropertyType } from '../core/blockconfig/PropertyType';

const EditTextComponent: React.FC<any> = (props: any) => {
  useEffect(() => {
    const configApi = props.configApi;
    configApi.createProperty(PropertyType.STRING, 'answer', '');
    configApi.createProperty(PropertyType.STRING, 'label', 'What is this?');
    configApi.createProperty(PropertyType.BOOLEAN, 'required', false);
  }, []);
  const data = props.properties;
  return (
    <div>
      <TextField label={data.label} type='text' placeholder='answer here' value={data.answer || ''} onChange={(event) => props.change({answer : event.target.value})}/>
    </div>
  );
};

export default EditTextComponent;