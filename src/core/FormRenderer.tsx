import React, { useState } from 'react';
import { BlockData, FormBuilderProps } from './FormBuilder';

const FormRenderer: React.FC<FormBuilderProps> = ({registry, data}) => {
  const [formData, setFormData] = useState(data && data.blocks || []);
  
  const blockList: any[] = formData.map((block: BlockData, idx: number) => {
    const FormBlock = registry[block.type].handler;
    const props = {
      properties: block.data,
      change: (newProperties: any) => setFormData((oldFormData: any[]) => {
        const newFormData = [...oldFormData];
        newFormData[idx].data = {...oldFormData[idx].data, ...newProperties}
        return newFormData;
      }),
      changeOne: () => {},
      createProperty: () => {}
    }
    return <FormBlock key={block.id} {...props}></FormBlock>
  });
  return <div>
    <div>{JSON.stringify(formData)}</div>
    <div>{blockList}</div>
  </div>
};

export default FormRenderer;