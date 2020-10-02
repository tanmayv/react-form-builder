import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BuilderProps } from './types/BuilderProps';
import { BuilderBlock } from './types/BuilderBlock';
import BlockConfigurator from './blockconfig/BlockConfigurator';
import SortingList, { ExternalListItem } from './darg-drop/SortingList';
import BlockTool from './BlockTool';

const FormBuilder: React.FC<BuilderProps> = (props) => {

    const [blocks, setBlocks ] = useState(props.data.blocks);
    useEffect(() => {
        setTimeout(() => {
            const newBlocks = [...blocks].reverse();
            setBlocks(newBlocks);
        }, 1000);
    }, []);
    const reorderItems = useCallback((fromIndex, toIndex) => {
        const newBlocks = [...blocks];
        const removedBlock = newBlocks.splice(fromIndex, 1);
        newBlocks.splice(toIndex, 0, ...removedBlock);
        setBlocks(newBlocks);
    }, [blocks]);
    const blockList = blocks.map((block, idx: number) => {
        const blockComponent = props.registry[block.type].handler;
        const { iconClass, title } = props.registry[block.type];
        return {
            key: block.key,
            item: <BlockConfigurator key={block.key} title={title} iconClass={iconClass} block={blockComponent} data={block.data}></BlockConfigurator>
        }
    });
    const blockToolViewContainer = Object.keys(props.registry).map((key, idx) => {
        const config = props.registry[key];
        const item = <Paper style={{margin: '16px', padding: '8px'}} key={idx}><Grid container alignItems={'center'}><Icon>{config.iconClass}</Icon><h3>{config.title}</h3></Grid></Paper>;
        return (<ExternalListItem item={item} config={key} key={key}></ExternalListItem>)
    });
    const newBlockAdded = (item: any, index: number) => {
        
        setBlocks((blocks) => {
            const newBlocks = [...blocks];
            newBlocks.splice(index, 0, {
                key: (blocks.length + 1),
                type: item.config,
                data: {}
            });
            return newBlocks;
        });
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <Grid container spacing={3}>
                <Grid item xs={8}><SortingList reorderItems={reorderItems} items={blockList} externalItemDropped={newBlockAdded}></SortingList></Grid>
                <Grid item xs={4}>{blockToolViewContainer}</Grid>
            </Grid>
        </DndProvider>
    );
}

export default FormBuilder;
