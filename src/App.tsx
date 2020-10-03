import { AppBar, Container, Icon, IconButton, makeStyles, Tab, Tabs, TextField, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';

import './App.css';
import FormBuilder, { BlockData, FormBuilderProps } from './core/FormBuilder';
import FormRenderer from './core/FormRenderer';
import CheckboxComponent from './custom-component/Checkbox';
import EditTextComponent from './custom-component/EditTextComponent';
import HeadingComponent from './custom-component/HeadingComponent';
import NumberComponent from './custom-component/NumberComponent';
import JsonLoader from './JsonLoader';

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
  blocks: BlockData[];
}

function App() {
  const [ formData, setFormData ] = useState<FormData>({ title: 'Untitled Form', blocks: [] });
  const [ currentTab, setCurrentTab ] = useState<number>(0);
  
  const builderProps: FormBuilderProps = {
    registry: { 
      text: {
        handler: EditTextComponent,
        title: 'Edit Text',
        iconClass: 'text_format'
      },
      number: {
        handler: NumberComponent,
        title: 'Number',
        iconClass: 'plus_one'
      },
      heading: {
        handler: HeadingComponent,
        title: 'Heading',
        iconClass: 'text_fields'
      },
      checkbox: {
        handler: CheckboxComponent,
        title: 'Checkbox',
        iconClass: 'check_box'
      }
    },
    data: {
      blocks: formData.blocks
    },
    change: (newBlocks) => setFormData((oldFormData: FormData) => ({...oldFormData, blocks: newBlocks(oldFormData.blocks)}))
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
            <JsonLoader loadJson={(jsonData: any) => setFormData(jsonData)}/>
        </Toolbar>
        <Tabs
            value={currentTab}
            onChange={(event, newValue) => {setCurrentTab(newValue)}}
            indicatorColor="secondary"
            centered
          >
            <Tab label="Builder" />
            <Tab label="Preview" />
          </Tabs>
      </AppBar>
      <Container maxWidth='md' style={{paddingTop: '16px'}}>
        { currentTab === 0 && 
          <div>
            <FormBuilder {...builderProps} key='builder'/>
            <TextField
                fullWidth
                label="JSON Output"
                multiline
                rowsMax={5}
                value={JSON.stringify(formData)}
                variant="outlined"
              />
          </div>
        }
        { currentTab === 1 && <FormRenderer {...builderProps} title={formData.title}/>}
      </Container>
    </div>
  );
}

export default App;
