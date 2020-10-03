import { Grid, Icon, IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';

import { ConfigProps } from '../core/blockconfig/BlockConfigurator';
import { PropertyType } from '../core/blockconfig/PropertyType';

const RatingComponent: React.FC<ConfigProps> = ({ createProperty, properties, change }) => {
  useEffect(() => {
    createProperty(PropertyType.NUMBER, 'maxStars', 5);
    createProperty(PropertyType.NUMBER, 'rating', 1);
  }, []);
  const maxStars = properties.maxStars || '0';
  const starColor = (index:number) => index <= properties.rating - 1 ? 'secondary': 'inherit';
  return (
    <Grid container>
      {Array.from(Array(maxStars)).map((_, index) =>
        <Grid item xs={1}>
          <IconButton color={starColor(index)} onClick={e => change({rating: (index + 1)})}><Icon>star</Icon></IconButton>
        </Grid>)
      }
    </Grid>
  );
};

export default RatingComponent;