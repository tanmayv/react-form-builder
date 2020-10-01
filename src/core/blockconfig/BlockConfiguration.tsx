import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PropertyType } from './PropertyType';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

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
  const configurationFormElements: any[] = Object.keys(props.formData).map((key: string, idx: number) => {
    const type = props.formData[key];
    const property = props.properties[key];

    switch(type) {
        case PropertyType.NUMBER :
        case PropertyType.STRING : {
            const inputProps = {
                name: key,
                label: key,
                type: type,
                value: property || '',
                onChange: (event: any) => props.changeOne(key, event.target.value)
            };
            return (
                <div key={idx}>
                    <TextField {...inputProps}/>
                </div>
            )
        }
        case PropertyType.STRING_OPTIONS :{
          const inputProps = {
            name: key,
            label: key,
            value: property.selected,
            onChange: (event: any) => props.changeOne(key, {...property, selected: event.target.value})
        };
        const menuItems = (property.options || []).map((value: string, idx: number) => <option key={idx} value={value}>{value}</option>)
        return (
            <FormControl key={idx}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select native {...inputProps}>
                  {menuItems}
                </Select>
            </FormControl>
        )
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