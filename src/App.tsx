import { AppBar, Button, Container, Icon, IconButton, makeStyles, TextField, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';

import './App.css';
import FormBuilder, { BlockData, FormBuilderProps } from './core/FormBuilder';
import CheckboxComponent from './custom-component/Checkbox';
import EditTextComponent from './custom-component/EditTextComponent';
import HeadingComponent from './custom-component/HeadingComponent';
import NumberComponent from './custom-component/NumberComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  input: {
    '& input.MuiInput-input' : {
      color: 'white'
    }
  }
}));

interface FormData {
  title: string;
  blocks?: BlockData[];
}

function App() {
  const [ formData, setFormData ] = useState<FormData>({ title: 'Untitled Form' });
  const builderProps: FormBuilderProps = {
    registry: { 
      text: {
        handler: EditTextComponent,
        title: 'Edit Text',
        iconClass: 'add_circle'
      },
      number: {
        handler: NumberComponent,
        title: 'Number',
        iconClass: 'add_circle'
      },
      heading: {
        handler: HeadingComponent,
        title: 'Heading',
        iconClass: 'add_circle'
      },
      checkbox: {
        handler: CheckboxComponent,
        title: 'Checkbox',
        iconClass: 'add_circle'
      } 
    },
    change: (blocks) => setFormData((oldFormData: FormData) => ({...oldFormData, blocks}))
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start"  color="inherit" aria-label="menu">
            <Icon>description</Icon>
          </IconButton>
          <div className={classes.title}>
            <TextField 
              className={classes.input}
              value={formData.title}
              onChange={event => {event.persist(); setFormData((oldFormData) => ({...oldFormData, title: event.target.value}))}}
            />
            </div>
          <Button color="inherit">Load from json</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <div id="builder">
          {JSON.stringify(formData)}
          <FormBuilder {...builderProps}></FormBuilder>
        </div>
      </Container>
    </div>
  );
}

export default App;
