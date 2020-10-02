import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import BlockConfigForm from './BlockConfiguration';
import { PropertyType } from './PropertyType';

export interface BlockConfiguratorProps {
  data: any;
  title: string;
  id: any;
  block: React.FC<ConfigProps>;
}

export interface ConfigProps {
  properties: any;
  change: (properties: any) => void;
  changeOne: (propertyName: string, propertyValue: any) => void;
  createProperty: (type: PropertyType, name: string, defaultValue: any) => void;
}

const BlockConfigurator: React.FC<BlockConfiguratorProps> = ({data, title, id, block}) => {
  const defaultForm = {
    'name': PropertyType.STRING,
    'label': PropertyType.STRING
  }
  const [formData, setFormData] = useState<any>(defaultForm);
  const [properties, setProperties] = useState(data);
  const [editConfig, setEditConfig] = useState(false);
  const createProperty = useCallback((type: PropertyType ,name: string, defaultValue: any) => {
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

  const change = useCallback((newProperties: any) => {
    setProperties((oldProperties: any) => ({...oldProperties, ...newProperties}));
  }, [properties]);

  const changeOne = useCallback((key: string, value: any) => {
    setProperties((oldProperties: any) => {
      const newProperties = {...oldProperties};
      newProperties[key] = value;
      return newProperties;
    });
  }, [properties]);

  const blockProps = { properties, change, changeOne, createProperty };

  const toggleEditConfig = () => setEditConfig((current) => !current);
  const Block = block;
  return (
      <Card style={{margin: '16px'}}>
        <CardContent>
          <Typography variant='h6'>{title || 'MISSING-TITLE'}</Typography>
          {!editConfig && <Block {...blockProps}></Block>}
          {editConfig && <BlockConfigForm {...blockProps} formData={formData}></BlockConfigForm>}
          {editConfig && <code>Raw Data: <br/>{JSON.stringify(properties)}</code>}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={toggleEditConfig}>{editConfig ? 'Apply' : 'Edit'}</Button>
        </CardActions>
      </Card>
  );
}

export default BlockConfigurator;