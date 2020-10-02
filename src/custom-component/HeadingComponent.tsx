import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';

import { ConfigProps } from '../core/blockconfig/BlockConfigurator';
import { PropertyType } from '../core/blockconfig/PropertyType';

const HeadingComponent: React.FC<ConfigProps> = ({ createProperty, properties }) => {
  const variantOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1', 'subtitle2', 'caption'];
  useEffect(() => {
    createProperty(PropertyType.STRING, 'label', 'Heading');
    createProperty(PropertyType.STRING_OPTIONS, 'variant', {options: variantOptions, selected: 'h5'});
  }, []);
  const variant = properties.variant && properties.variant.selected;
  return (
    <div>
      <Typography variant={variant}>{properties.label}</Typography>
    </div>
  );
};

export default HeadingComponent;