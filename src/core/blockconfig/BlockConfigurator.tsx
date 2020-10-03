import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Icon, IconButton, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import BlockConfigForm from './BlockConfigForm';
import { PropertyType } from './PropertyType';

export interface BlockConfiguratorProps {
  data: any;
  title: string;
  id: any;
  block: React.FC<ConfigProps>;
  removeBlock: (id: any) => void;
  updateBlock: (id: any, data: any) => void;
}

export interface ConfigProps {
  properties: any;
  change: (properties: any) => void;
  changeOne: (propertyName: string, propertyValue: any) => void;
  createProperty: (type: PropertyType, name: string, defaultValue: any) => void;
}

const BlockConfigurator: React.FC<BlockConfiguratorProps> = ({data, title, id, block, removeBlock, updateBlock}) => {
  const defaultForm = {
    'name': PropertyType.STRING,
    'label': PropertyType.STRING
  }
  const [formData, setFormData] = useState<any>(defaultForm);
  const [properties, setProperties] = useState(data);
  const [editConfig, setEditConfig] = useState(false);

  useEffect(() => {
    updateBlock(id, properties);
  }, [properties]);

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
        <CardHeader
          title={title}
          action={
            <div>
              <IconButton onClick={toggleEditConfig}>
                <Icon>{editConfig ? 'expand_less': 'expand_more'}</Icon>
              </IconButton>
              <IconButton color='secondary' onClick={(event) => removeBlock(id)}>
                <Icon>delete</Icon>
              </IconButton>
            </div>
          }
        ></CardHeader>
        <CardContent>
          {<Block {...blockProps}></Block>}
        </CardContent>
        <CardActions>
        <Collapse in={editConfig} timeout="auto" unmountOnExit>
          <BlockConfigForm {...blockProps} formData={formData}></BlockConfigForm>
        </Collapse>
        </CardActions>
      </Card>
  );
}

export default BlockConfigurator;