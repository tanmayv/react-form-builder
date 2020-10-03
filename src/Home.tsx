import React, { useState } from 'react';
import { AppBar, Container, Icon, IconButton, makeStyles, Tab, Tabs, TextField, Toolbar } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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
  title: string;
  titleChange: (title: string) => void;
}

interface HeaderProps {
  title: string;
  action: Component;
  currentTab: number;
  titleChange: (title: string) => void;
  tabChange: (index: number) => void;
}
const Header: React.FC<HeaderProps> = React.memo(({title, titleChange, action, currentTab, tabChange}) => {
  const classes = useStyles();
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton className={classes.menuButton} edge="start"  color="inherit" aria-label="menu">
          <Icon>description</Icon>
        </IconButton>
        <div className={classes.title}>
          <TextField value={title} onChange={(event:any) => titleChange(event.target.value)}/>
        </div>
        <IconButton><a style={{color: 'white'}} href='https://github.com/tanmayv/react-form-builder' target='_blank'><GitHub /></a></IconButton>
        {action}
      </Toolbar>
      <Tabs
        value={currentTab}
        onChange={(event, newValue) => {tabChange(newValue)}}
        indicatorColor="secondary"
        centered>
          <Tab label="Builder" />
          <Tab label="Preview" />
      </Tabs>
    </AppBar>
  );
}, (props: HeaderProps, newProps: HeaderProps) =>{
  return props.currentTab === newProps.currentTab && props.title === newProps.title;
})

const Home: React.FC<HomeProps> = ({leftTab, rightTab, action, title, titleChange}) => {
  const [ currentTab, setCurrentTab ] = useState<number>(0);
  
  return (
    <div>
      <Header title={title} titleChange={titleChange} action={action} tabChange={setCurrentTab} currentTab={currentTab}></Header>
      <Container maxWidth='md' style={{paddingTop: '16px'}}>
        { currentTab === 0 && leftTab }
        { currentTab === 1 && rightTab }
      </Container>
    </div>
  );
};

export default Home;