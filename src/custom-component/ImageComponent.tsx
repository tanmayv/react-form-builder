import { Grid, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';

import { ConfigProps } from '../core/blockconfig/BlockConfigurator';
import { PropertyType } from '../core/blockconfig/PropertyType';

const ImageComponent: React.FC<ConfigProps> = ({ createProperty, properties }) => {
  useEffect(() => {
    createProperty(PropertyType.STRING, 'label', 'Title');
    createProperty(PropertyType.STRING, 'url', 'https://picsum.photos/600/400');
    createProperty(PropertyType.STRING, 'caption', 'caption');
    createProperty(PropertyType.BOOLEAN, 'showCaption', true);
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}><img width='100%' src={properties.url}/></Grid>
      {properties.showCaption && <Grid item xs={12}><TextField fullWidth value={properties.caption} variant='outlined' style={{pointerEvents: 'none'}}/></Grid>}
    </Grid>
  );
};

export default ImageComponent;