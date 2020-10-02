import { Container } from '@material-ui/core';
import React from 'react';

import './App.css';
import FormBuilder from './core/FormBuilder';
import { BuilderProps } from './core/types/BuilderProps';
import Checkbox from './custom-component/Checkbox';
import EditTextComponent from './custom-component/EditTextComponent';
import HeadingComponent from './custom-component/HeadingComponent';
import NumberComponent from './custom-component/NumberComponent';

function App() {
  const builderProps: BuilderProps = {
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
        handler: Checkbox,
        title: 'Checkbox',
        iconClass: 'add_circle'
      } 
    },
    data: {
      blocks: [
        {
          key: '1',
          type: 'text',
          data : {
            heading: 'Main Heading'
          }
        },
        {
          key: '2',
          type: 'number',
          data : JSON.parse('{"value":"","label":"What is your new age?","name":"age-question"}')
        },
        {
          key: '3',
          type: 'heading',
          data : JSON.parse('{"label":"What is your new age?"}')
        }
      ]
    }
  };
  return (
    <Container fixed>
      <div id="builder">
        <FormBuilder {...builderProps}></FormBuilder>
      </div>
    </Container>
  );
}

export default App;
