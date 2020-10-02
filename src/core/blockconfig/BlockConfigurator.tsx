import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import BlockConfiguration from './BlockConfiguration';
import { PropertyType } from './PropertyType';

const BlockConfigurator: React.FC<any> = (props: any) => {
  const defaultForm = {
    'name': PropertyType.STRING,
    'label': PropertyType.STRING
  }
  const [formData, setFormData] = useState<any>(defaultForm);
  const [properties, setProperties] = useState(props.data);
  const [editConfig, setEditConfig] = useState(false);
  const createPropertyCb = useCallback((type: PropertyType ,name: string, defaultValue: any) => {
    setProperties((oldProperties: any) => {
      const newProperties: any =  {};
      newProperties[name] = defaultValue;
      return {...newProperties, ...oldProperties};
    });
    setFormData((oldFormData: any) => {
      const newFormData: any =  {...oldFormData };
      newFormData[name] = type;
      return newFormData;
    });
  }, [ properties, formData ]);

  const configApi = {
    createProperty : createPropertyCb
  }

  const blockProps = {
    properties: properties,
    change: (newProperties: any) => {
        setProperties((oldProperties: any) => ({...oldProperties, ...newProperties}));
    },
    changeOne: (key: string, value: any) => {
      setProperties((oldProperties: any) => {
        const newProperties = {...oldProperties};
        newProperties[key] = value;
        return newProperties;
      });
    },
    configApi: configApi
  }

  const toggleEditConfig = () => setEditConfig((current) => !current);
  const Block = props.block;
  return (
      <Card style={{margin: '16px'}}>
        <CardContent>
          <Typography variant='h6'>{props.title || 'hello'}</Typography>
          {!editConfig && <Block {...blockProps}></Block>}
          {editConfig && <BlockConfiguration {...blockProps} formData={formData}></BlockConfiguration>}
          {editConfig && <code>Raw Data: <br/>{JSON.stringify(properties)}</code>}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={toggleEditConfig}>{editConfig ? 'Apply' : 'Edit'}</Button>
        </CardActions>
      </Card>
  );
}

export default BlockConfigurator;