import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import './App.css';
import FormBuilder, { BlockData, FormBuilderProps } from './core/FormBuilder';
import FormRenderer from './core/FormRenderer';
import CheckboxComponent from './custom-component/Checkbox';
import DateComponent from './custom-component/DateComponent';
import EditTextComponent from './custom-component/EditTextComponent';
import HeadingComponent from './custom-component/HeadingComponent';
import ImageComponent from './custom-component/ImageComponent';
import NumberComponent from './custom-component/NumberComponent';
import ParagraphComponent from './custom-component/ParagraphComponent';
import RadioButtonComponent from './custom-component/RadioButtonComponent';
import RatingComponent from './custom-component/RatingComponent';
import TextAreaComponent from './custom-component/TextAreaComponent';
import Home from './Home';
import JsonLoader from './JsonLoader';
import JsonViewer from './JsonViewer';

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
      paragraph: {
        handler: ParagraphComponent,
        title: 'Paragraph',
        iconClass: 'subject'
      },
      checkbox: {
        handler: CheckboxComponent,
        title: 'Checkbox',
        iconClass: 'check_box'
      },
      date: {
        handler: DateComponent,
        title: 'Date Picker',
        iconClass: 'today'
      },
      textArea: {
        handler: TextAreaComponent,
        title: 'Text Area',
        iconClass: 'view_headline'
      },
      image: {
        handler: ImageComponent,
        title: 'Image',
        iconClass: 'wallpaper'
      },
      rating: {
        handler: RatingComponent,
        title: 'Rating',
        iconClass: 'star'
      },
      radio: {
        handler: RadioButtonComponent,
        title: 'Radio button',
        iconClass: 'radio_button_checked'
      },
    },
    data: {
      blocks: formData.blocks
    },
    change: (newBlocks) => setFormData((oldFormData: FormData) => ({...oldFormData, blocks: newBlocks(oldFormData.blocks)}))
  };
  
  const jsonLoaderAction = <JsonLoader loadJson={(jsonData: any) => setFormData(jsonData)}/>;
  const builderTab = (
    <div>
      <Typography variant='h4'>React Form Builder</Typography>
      <Typography variant='caption'>Build forms by dragging tools from the right to the drop area. You can reorder form block as by dragging them.</Typography>
      <FormBuilder {...builderProps} key='builder'/>
      <JsonViewer json={formData}></JsonViewer>
    </div>
  );
  const previewTab = <FormRenderer {...builderProps} title={formData.title}/>;
  
  return <Home title={formData.title} action={jsonLoaderAction} leftTab={builderTab} rightTab={previewTab}
    titleChange={(title: string) => setFormData(oldData => ({...oldData, title}))}/>
}

export default App;