import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';

const syntaxHighlight = (json: string) => {
  const keyColor = '#008891';
  const stringColor = '#E67E22';
  const boolColor = '#F24D16';
  const nullColor = '#4CD4B0';
  const numberColor = '#27AE60';
  const tokenRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return json.replace(tokenRegex, function (match: any) {
    let color = numberColor;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        color = keyColor;
      } else {
        color = stringColor;
      }
    } else if (/true|false/.test(match)) {
      color = boolColor;
    } else if (/null/.test(match)) {
      color = nullColor;
    }
    return '<span style="color:' + color + '">' + match + '</span>';
  });
}

const JsonContainer = styled.pre`
  max-height: 400px;
  overflow-y: scroll;
  padding: 24px;
`;

const JsonViewer: React.FC<any> = (props) => {
  const ref = createRef<HTMLPreElement>();
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.innerHTML = syntaxHighlight(JSON.stringify(props.json, null, 2));
    }
  })
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(props.json, null, 2));
  }
  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item><Typography variant='subtitle1'>JSON Output:</Typography></Grid>
      <Grid item>{!!navigator.clipboard && <Button variant='contained' color='secondary' onClick={copyToClipboard}>Copy</Button>}</Grid>
      <Grid item xs={12}><Paper variant='outlined'><JsonContainer ref={ref}>{}</JsonContainer></Paper></Grid>
    </Grid>    
  );
}

export default JsonViewer;