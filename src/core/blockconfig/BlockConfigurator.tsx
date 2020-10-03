import { Card, CardActions, CardContent, Collapse, Grid, Icon, IconButton } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import BlockConfigForm from './BlockConfigForm';
import { PropertyType } from './PropertyType';

export interface BlockConfiguratorProps {
  data: any;
  title: string;
  id: any;
  index: number;
  block: React.FC<ConfigProps>;
  removeBlock: (id: any) => void;
  updateBlock: (id: any, data: any) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
}

export interface ConfigProps {
  properties: any;
  change: (properties: any) => void;
  changeOne: (propertyName: string, propertyValue: any) => void;
  createProperty: (type: PropertyType, name: string, defaultValue: any) => void;
}

const BlockConfigurator: React.FC<BlockConfiguratorProps> = ({index, data, title, id, block, removeBlock, updateBlock, reorderBlocks}) => {
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
      useMemo(() => (
        <Card style={{marginBottom: '16px'}}>
          <CardContent>
            {<Block {...blockProps}></Block>}
          </CardContent>
          <CardActions>
            <Grid container justify='space-between'>
              <Grid item>
                <IconButton onClick={() => reorderBlocks(index, index - 1)}>
                  <Icon>arrow_upward</Icon>
                </IconButton>
                <IconButton onClick={() => reorderBlocks(index, index + 1)}>
                  <Icon>arrow_downward</Icon>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={toggleEditConfig}>
                  <Icon>{editConfig ? 'expand_less': 'expand_more'}</Icon>
                </IconButton>
                <IconButton color='secondary' onClick={(event) => removeBlock(id)}>
                  <Icon>delete</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
          <Collapse in={editConfig} timeout="auto" unmountOnExit>
            <CardContent>
              <BlockConfigForm {...blockProps} formData={formData}></BlockConfigForm>
            </CardContent>
          </Collapse>
        </Card>
      ), [properties, editConfig, index])
    );
}

export default BlockConfigurator;