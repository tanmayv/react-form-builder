import { AppBar, Button, Container, Dialog, Grid, Icon, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const JsonLoader: React.FC<any> = ({loadJson}) => {
  const defaultForms = [
    JSON.parse('{"title":"Untitled Form2","blocks":[{"id":2,"type":"checkbox","data":{"selected":[],"options":["Yes","No"],"label":"What is this?"}},{"id":4,"type":"text","data":{"required":false,"label":"What is this?","answer":""}},{"id":3,"type":"number","data":{"placeholder":"enter age","name":"age-question","label":"What is your age?","value":1}},{"id":1,"type":"heading","data":{"variant":{"options":["h1","h2","h3","h4","h5","subtitle1","subtitle2","caption"],"selected":"h5"},"label":"Heading"}}]}'),
    JSON.parse('{"title":"Untitled Form2","blocks":[{"id":2,"type":"checkbox","data":{"selected":[],"options":["Yes","No"],"label":"What is this?"}},{"id":4,"type":"text","data":{"required":false,"label":"What is this?","answer":""}},{"id":3,"type":"number","data":{"placeholder":"enter age","name":"age-question","label":"What is your age?","value":1}},{"id":1,"type":"heading","data":{"variant":{"options":["h1","h2","h3","h4","h5","subtitle1","subtitle2","caption"],"selected":"h5"},"label":"Heading"}}]}'),
    JSON.parse('{"title":"Untitled Form2","blocks":[{"id":2,"type":"checkbox","data":{"selected":[],"options":["Yes","No"],"label":"What is this?"}},{"id":4,"type":"text","data":{"required":false,"label":"What is this?","answer":""}},{"id":3,"type":"number","data":{"placeholder":"enter age","name":"age-question","label":"What is your age?","value":1}},{"id":1,"type":"heading","data":{"variant":{"options":["h1","h2","h3","h4","h5","subtitle1","subtitle2","caption"],"selected":"h5"},"label":"Heading"}}]}')
  ];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [jsonString, setJsonString] = React.useState('{}');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    try {
      const jsonObject = JSON.parse(jsonString);
      loadJson(jsonObject);
      setOpen(false);
    }
    catch(e) {
      alert('Err: Not a valid json.');
    }
  };
  
  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>Import</Button>
        <Dialog fullScreen open={open} onClose={handleClose} >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Icon>get_app</Icon>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                JSON loader
              </Typography>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Icon>check</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="JSON Input"
                  multiline
                  rowsMax={5}
                  value={jsonString}
                  onChange={(e) => setJsonString(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle1'>Or Select one of the example forms:</Typography>
              </Grid>
              {defaultForms.map((form, index) => (
                <Grid container spacing={3} item key={index} alignItems='center'>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      rowsMax={5}
                      value={form.title}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="secondary" onClick={() => {loadJson(form); setOpen(false);}}>
                      Load Form
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>  
          </Container>
        </Dialog>
    </div>
);
};

export default JsonLoader;