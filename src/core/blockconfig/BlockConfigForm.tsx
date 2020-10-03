import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, Typography } from '@material-ui/core';

import { PropertyType } from './PropertyType';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export interface BlockConfigFormProps {
  formData: any;
  properties: any;
  changeOne: any;
}

const BlockConfigForm: React.FC<BlockConfigFormProps> = ({formData, properties, changeOne}) => {
  const classes = useStyles();
  const inputVariant = 'outlined';
  
  const configurationFormElements: any[] = Object.keys(formData).map((key: string, idx: number) => {
    const type = formData[key];
    const property = properties[key];

    switch(type) {
      case PropertyType.NUMBER :
      case PropertyType.STRING : {
        const onChange = (event: any) => changeOne(key, event.target.value); 
          return <TextField variant={inputVariant} key={idx} name={key} label={key} type={type} value={property || ''} onChange={onChange}/>;
      }

      case PropertyType.STRING_ARRAY: {
        const onChange = (event: any) => changeOne(key, event.target.value.split(',')); 
          return <TextField variant={inputVariant} key={idx} name={key} label={key} type={type} value={(property || []).join(',')} onChange={onChange}/>;
      }
      
      case PropertyType.BOOLEAN: {
        return (
          <FormControlLabel key={key}
            control={<Checkbox checked={property} onChange={(event) => changeOne(key, event.target.checked)} name={key} />}
            label={key}
          />
        );
      }

      case PropertyType.STRING_OPTIONS : {
        const onChange = (event: any) => changeOne(key, {...property, selected: event.target.value});
        const menuItems = (property.options || []).map((value: string, idx: number) => <option key={idx} value={value}>{value}</option>);
        return (
            <FormControl variant={inputVariant} key={idx}>
                <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                <Select native name={key} label={key} value={property.selected} onChange={onChange}>
                  {menuItems}
                </Select>
            </FormControl>
        );
      };
    }
    return <div>Input not found</div>;
  });
  return (
    <div style={{padding: '8px 16px'}}>
      <Typography variant='subtitle2' component='h1'>Block Configuration</Typography>
      <form className={classes.root}>
          {configurationFormElements}
      </form>
    </div>
  );
};

export default BlockConfigForm;