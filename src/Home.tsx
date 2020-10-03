import React, { useState } from 'react';
import { AppBar, Container, Icon, IconButton, makeStyles, Tab, Tabs, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    '& input.MuiInput-input' : {
      color: 'white'
    }
  }
}));

type Component = JSX.Element | React.FC<any>;

export interface HomeProps {
  leftTab: Component,
  rightTab: Component,
  action: Component,
  title: Component
}

const Home: React.FC<HomeProps> = ({leftTab, rightTab, action, title}) => {
  const classes = useStyles();
  const [ currentTab, setCurrentTab ] = useState<number>(0);
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start"  color="inherit" aria-label="menu">
            <Icon>description</Icon>
          </IconButton>
          <div className={classes.title}>{title}</div>
          {action}
        </Toolbar>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {setCurrentTab(newValue)}}
          indicatorColor="secondary"
          centered>
            <Tab label="Builder" />
            <Tab label="Preview" />
        </Tabs>
      </AppBar>
      <Container maxWidth='md' style={{paddingTop: '16px'}}>
        { currentTab === 0 && leftTab }
        { currentTab === 1 && rightTab }
      </Container>
    </div>
  );
};

export default Home;