import { Grid, Icon, Paper, Typography } from '@material-ui/core';
import React from 'react';

export interface ToolProps {
  title: string;
  iconClass: string;
  onClick: (e: any) => void;
}

const Tool: React.FC<ToolProps> = ({onClick, iconClass, title}) => {
  return (
    <div onClick={onClick}>
      <Paper variant="outlined" style={{ marginTop: "8px" }} >
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item><Icon>{iconClass}</Icon></Grid>
          <Grid item><Typography variant='subtitle1'>{title}</Typography></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default React.memo(Tool, () => true);