import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';

import { PropertyType } from '../core/blockconfig/PropertyType';

const HeadingComponent: React.FC<any> = (props: any) => {
  useEffect(() => {
    const configApi = props.configApi;
    configApi.createProperty(PropertyType.STRING, 'label', 'Heading');
    configApi.createProperty(PropertyType.STRING_OPTIONS, 'variant', {options: ['h1', 'h2', 'h3', 'h4'], selected: 'h4'});
  }, [props.configApi]);
  const data = props.properties;
  const variant = data.variant && data.variant.selected;
  return (
    <div>
      <Typography variant={variant}>{data.label}</Typography>
    </div>
  );
};

export default HeadingComponent;