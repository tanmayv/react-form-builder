import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PropertyType } from './PropertyType';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const BlockConfiguration: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const inputVariant = 'outlined';
  const configurationFormElements: any[] = Object.keys(props.formData).map((key: string, idx: number) => {
    const type = props.formData[key];
    const property = props.properties[key];

    switch(type) {
        case PropertyType.NUMBER :
        case PropertyType.STRING : {
          const onChange = (event: any) => props.changeOne(key, event.target.value); 
            return <TextField variant={inputVariant} key={idx} name={key} label={key} type={type} value={property || ''} onChange={onChange}/>;
        }
        case PropertyType.STRING_OPTIONS :{
          const onChange = (event: any) => props.changeOne(key, {...property, selected: event.target.value});
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
        case PropertyType.STRING_ARRAY: {
          const onChange = (event: any) => props.changeOne(key, event.target.value.split(',')); 
            return <TextField variant={inputVariant} key={idx} name={key} label={key} type={type} value={(property || []).join(',')} onChange={onChange}/>;
        }
        case PropertyType.BOOLEAN: {
          return (
            <FormControlLabel
              control={<Checkbox checked={property} onChange={(event) => props.changeOne(key, event.target.checked)} name={key} />}
              label={key}
            />
          );
        }
    }
  });
  return <div>
    <h1>Block Configuration</h1>
    <form className={classes.root}>
        {configurationFormElements}
    </form>
  </div>
};

export default BlockConfiguration;