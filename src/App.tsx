import { AppBar, Button, Container, Icon, IconButton, makeStyles, TextField, Toolbar } from '@material-ui/core';
import React from 'react';

import './App.css';
import FormBuilder, { FormBuilderProps } from './core/FormBuilder';
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

function App() {
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
    data: {
      blocks: [
        {
          id: '1',
          type: 'text',
          data : {
            heading: 'Main Heading'
          }
        },
        {
          id: '2',
          type: 'number',
          data : JSON.parse('{"value":"","label":"What is your new age?","name":"age-question"}')
        },
        {
          id: '3',
          type: 'heading',
          data : JSON.parse('{"label":"What is your new age?"}')
        }
      ]
    }
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start"  color="inherit" aria-label="menu">
            <Icon>description</Icon>
          </IconButton>
          <div className={classes.title}><TextField className={classes.input} value='Untitled Form'></TextField></div>
          <Button color="inherit">Load from json</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <div id="builder">
          <FormBuilder {...builderProps}></FormBuilder>
        </div>
      </Container>
    </div>
  );
}

export default App;
