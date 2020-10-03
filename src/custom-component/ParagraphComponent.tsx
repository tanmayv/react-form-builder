import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';

import { ConfigProps } from '../core/blockconfig/BlockConfigurator';
import { PropertyType } from '../core/blockconfig/PropertyType';

const ParagraphComponent: React.FC<ConfigProps> = ({ createProperty, properties }) => {
  const variantOptions = ['subtitle1', 'subtitle2', 'caption', 'body1', 'body2'];
  useEffect(() => {
    createProperty(PropertyType.STRING, 'label', 'Subtitle');
    createProperty(PropertyType.STRING_OPTIONS, 'variant', {options: variantOptions, selected: 'subtitle1'});
  }, []);
  const variant = properties.variant && properties.variant.selected;
  return <Typography variant={variant} component='p'>{properties.label}</Typography>;
};

export default ParagraphComponent;