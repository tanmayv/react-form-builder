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
    JSON.parse('{"title":"Registration Form","blocks":[{"id":1,"type":"image","data":{"showCaption":false,"caption":"caption","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png","label":"Title"}},{"id":2,"type":"heading","data":{"variant":{"options":["h1","h2","h3","h4","h5","h6"],"selected":"h5"},"label":"Register your google account","name":"heading"}},{"id":8,"type":"text","data":{"required":false,"label":"Username","value":"","name":"username"}},{"id":3,"type":"text","data":{"required":false,"label":"First Name","value":"","name":"first-name"}},{"id":4,"type":"text","data":{"required":false,"label":"Last Name","value":"","name":"last-name"}},{"id":5,"type":"number","data":{"placeholder":"","name":"phone","label":"Phone number","value":1}},{"id":6,"type":"date","data":{"type":{"options":["date","datetime-local","time"],"selected":"date"},"value":"","label":"Date of birth","name":"dob"}},{"id":7,"type":"radio","data":{"selected":"Yes","options":["Male","Female","No"],"label":"Gender"}}]}'),
    JSON.parse('{"title":"Feedback form","blocks":[{"id":77499,"type":"heading","data":{"variant":{"options":["h1","h2","h3","h4","h5","h6"],"selected":"h4"},"label":"Customer Feedback"}},{"id":98581,"type":"paragraph","data":{"variant":{"options":["subtitle1","subtitle2","caption","body1","body2"],"selected":"subtitle1"},"label":"Please share your experience after using our service."}},{"id":88267,"type":"rating","data":{"rating":1,"maxStars":5,"label":"Rating","name":"rating"}},{"id":81791,"type":"text","data":{"required":false,"label":"Feedback","value":"Please share your feedback","name":"feedback"}},{"id":43082,"type":"textArea","data":{"maxRows":4,"rows":4,"required":false,"label":"Details","value":"","name":"details"}},{"id":86090,"type":"text","data":{"required":false,"label":"name","value":"","name":"name"}},{"id":78351,"type":"number","data":{"placeholder":"","name":"phone","label":"phone no.","value":null}}]}'),
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
}

export default JsonLoader;