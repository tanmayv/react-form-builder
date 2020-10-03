import { Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import { BlockData } from './FormBuilder';

const FormRenderer: React.FC<any> = ({registry, data, title}) => {
  const [formData, setFormData] = useState((data && data.blocks) || []);
  
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
    return <Grid item xs={12} key={block.id}><FormBlock {...props}></FormBlock></Grid>
  });
  return (
    <Container maxWidth='sm' style={{paddingTop: '16px'}}>
      <Paper style={{padding: '16px'}}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h3'>{title}</Typography>
            </Grid>
            {blockList}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default FormRenderer;