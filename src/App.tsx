import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import './App.css';
import FormBuilder, { BlockData, FormBuilderProps } from './core/FormBuilder';
import FormRenderer from './core/FormRenderer';
import CheckboxComponent from './custom-component/Checkbox';
import EditTextComponent from './custom-component/EditTextComponent';
import HeadingComponent from './custom-component/HeadingComponent';
import NumberComponent from './custom-component/NumberComponent';
import Home from './Home';
import JsonLoader from './JsonLoader';

interface FormData {
  title: string;
  blocks: BlockData[];
}

const App: React.FC<{}> = () => {
  const [ formData, setFormData ] = useState<FormData>({ title: 'Untitled Form', blocks: [] });
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
  
  const title = <TextField value={formData.title}
                  onChange={event => {event.persist(); setFormData((oldFormData) => ({...oldFormData, title: event.target.value}))}}/>;
  const jsonLoaderAction = <JsonLoader loadJson={(jsonData: any) => setFormData(jsonData)}/>;
  const builderTab = (
    <div>
      <Typography variant='h4'>React Form Builder</Typography>
      <Typography variant='caption'>Build froms by dragging tools from the right to the drop area. You can reorder form block as by dragging them.</Typography>
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
  );
  const previewTab = <FormRenderer {...builderProps} title={formData.title}/>;
  
  return <Home title={title} action={jsonLoaderAction} leftTab={builderTab} rightTab={previewTab}/>
}

export default App;
