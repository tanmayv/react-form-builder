import { Grid, Icon, Paper } from '@material-ui/core';
import React from 'react';
import { useDrag } from 'react-dnd';

const BlockTool: React.FC<any> = ({idx, config}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'block-type', config },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return <div ref={drag}><Paper style={{margin: '16px', padding: '8px'}} key={idx}><Grid container alignItems={'center'}><Icon>{config.iconClass}</Icon><h3>{config.title}</h3></Grid></Paper></div>;
}

export default BlockTool;