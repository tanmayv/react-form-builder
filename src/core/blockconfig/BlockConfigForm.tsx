import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, Select, Typography } from '@material-ui/core';

import { PropertyType } from './PropertyType';

export interface BlockConfigFormProps {
  formData: any;
  properties: any;
  changeOne: any;
}

const BlockConfigForm: React.FC<BlockConfigFormProps> = ({formData, properties, changeOne}) => {
  const inputVariant = 'outlined';
  
  const configurationFormElements: any[] = Object.keys(formData).map((key: string, idx: number) => {
    const type = formData[key];
    const property = properties[key];

    switch(type) {
      case PropertyType.NUMBER :
      case PropertyType.STRING : {
        const parser = type === PropertyType.NUMBER ? parseInt: (s: any) => s;
        const onChange = (event: any) => changeOne(key, parser(event.target.value)); 
          return <Grid item key={key} sm={6} xs={12}><TextField fullWidth variant={inputVariant} name={key} label={key} type={type} value={property || ''} onChange={onChange}/></Grid>;
      }

      case PropertyType.STRING_ARRAY: {
        const onChange = (event: any) => changeOne(key, event.target.value.split(',')); 
          return <Grid item key={key} sm={6} xs={12}><TextField fullWidth variant={inputVariant} name={key} label={key} type={type} value={(property || []).join(',')} onChange={onChange}/></Grid>;
      }
      
      case PropertyType.BOOLEAN: {
        return (
          <Grid item key={key} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={property} onChange={(event) => changeOne(key, event.target.checked)} name={key} />}
              label={key}
            />
          </Grid>
        );
      }

      case PropertyType.STRING_OPTIONS : {
        const onChange = (event: any) => changeOne(key, {...property, selected: event.target.value});
        const menuItems = (property.options || []).map((value: string, idx: number) => <option key={idx} value={value}>{value}</option>);
        return (
          <Grid item key={idx} sm={6} xs={12}>
            <FormControl variant={inputVariant} fullWidth>
                <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                <Select fullWidth native name={key} label={key} value={property.selected} onChange={onChange}>
                  {menuItems}
                </Select>
            </FormControl>
          </Grid>
        );
      };
    }
    return <div>Input not found</div>;
  });
  return (
    <div style={{padding: '8px 0px'}}>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='subtitle2' component='h1'>Block Configuration</Typography>
          </Grid>
          {configurationFormElements}
        </Grid>
      </form>
    </div>
  );
};

export default BlockConfigForm;