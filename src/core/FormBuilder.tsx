import React, { useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import SortingList, { ExternalListItem } from "./darg-drop/SortingList";
import BlockConfigurator, { ConfigProps } from "./blockconfig/BlockConfigurator";
import { Typography } from "@material-ui/core";

export interface FormBuilderBlockConfig {
  iconClass: string;
  title: string;
  handler: React.FC<ConfigProps>;
}

export interface BlockData {
  id: any;
  type: string;
  data: any;
}

export interface FormBuilderProps {
  data?: { blocks: BlockData[] };
	registry: { [key: string]: FormBuilderBlockConfig };
	viewOnly?: boolean;
	change: (blocks: BlockData[]) => void; 
}

const FormBuilder: React.FC<FormBuilderProps> = ({ data, registry, change }) => {
  const [blocks, setBlocks] = useState((data && data.blocks) || []);
  useEffect(() => {
    change(blocks);
  }, [blocks]);
  
  const reorderItems = useCallback((fromIndex, toIndex) => {
			setBlocks((blocks) => {
				const newBlocks = [...blocks];
				const removedBlock = newBlocks.splice(fromIndex, 1);
				newBlocks.splice(toIndex, 0, ...removedBlock);
        return newBlocks;
      });
    }, [blocks]);

  const addNewBlock = useCallback((item: any, index: number) => {
      setBlocks((blocks) => {
        const newBlocks = [...blocks];
        newBlocks.splice(index, 0, {
          id: blocks.length + 1,
          type: item.config,
          data: {},
				});
        return newBlocks;
			});
		}, [blocks]);
	
	const removedBlock = useCallback((id: any) => {
		setBlocks((blocks) => {
			const newBlocks = [...blocks];
			const index = newBlocks.findIndex((block) => block.id === id)
			newBlocks.splice(index, 1);
			return newBlocks;
		});
  }, [blocks]);
  
  const updateBlock = useCallback((id: any, data) => {
    setBlocks((blocks) => {
			const newBlocks = [...blocks];
			const block = newBlocks.find((block) => block.id === id)
			if (block) block.data = data;
			return newBlocks;
		});
  }, [blocks]);

  const blockList = blocks.map((block: BlockData, index: number) => {
    const formBlock = registry[block.type].handler;
    const { title } = registry[block.type];
    return {
      id: block.id,
      item: (
          <BlockConfigurator
            id={block.id}
            title={title}
            block={formBlock}
            removeBlock={removedBlock}
            updateBlock={updateBlock}
            data={block.data}/>
      ),
    };
  });

  const blockToolViewContainer = Object.keys(registry).map((blockType: string, idx: number) => {
    const config = registry[blockType];
    const item = (
      <Paper variant="outlined" style={{ marginTop: "8px" }} key={idx}>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item><Icon>{config.iconClass}</Icon></Grid>
          <Grid item><Typography variant='subtitle1'>{config.title}</Typography></Grid>
        </Grid>
      </Paper>
    );
    return (
      <ExternalListItem item={item} config={blockType} key={blockType}></ExternalListItem>
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
					<SortingList
					reorderItems={reorderItems}
					items={blockList}
					externalItemDropped={addNewBlock}
					></SortingList>
				</Grid>
        <Grid item xs={3}>
          {blockToolViewContainer}
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default FormBuilder;
