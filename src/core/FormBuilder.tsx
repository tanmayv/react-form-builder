import React from "react";
import Grid from "@material-ui/core/Grid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import SortingList, { ExternalListItem } from "./darg-drop/SortingList";
import BlockConfigurator, { ConfigProps } from "./blockconfig/BlockConfigurator";
import Tool from "./containers/Tool";
import styled from "styled-components";

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
	change: (cb: (currentBlocks: BlockData[]) => BlockData[]) => void; 
}

const StickyDiv = styled.div`
  position: sticky;
  top: 130px;
  max-height: calc(100vh - 130px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px 0px;
`;

const FormBuilder: React.FC<FormBuilderProps> = ({ data, registry, change }) => {
  const blocks = (data && data.blocks) || [];
  
  const reorderBlocks = (fromIndex: number, toIndex: number) => {
    change((oldBlocks: BlockData[]) => {
      const newBlocks = [...oldBlocks];
      toIndex = Math.max(0, Math.min(toIndex, newBlocks.length - 1));
      const removedBlock = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, ...removedBlock);
      return newBlocks;
    });
  };

  const addNewBlock = (item: any, index: number) => {
      change((blocks) => {
        const newBlocks = [...(blocks || [])];
        newBlocks.splice(index, 0, {
          id: Math.ceil(Math.random() * 100000),
          type: item.config,
          data: {},
				});
        return newBlocks;
			});
		};
	
	const removedBlock = (id: any) => {
		change((blocks) => {
			const newBlocks = [...blocks];
			const index = newBlocks.findIndex((block) => block.id === id)
			newBlocks.splice(index, 1);
			return newBlocks;
		});
  };
  
  const updateBlock = (id: any, data: any) => {
    change((blocks) => {
			const newBlocks = [...blocks];
			const block = newBlocks.find((block) => block.id === id)
			if (block) block.data = data;
			return newBlocks;
		});
  };

  const blockList = blocks.map((block: BlockData, index: number) => {
    const formBlock = registry[block.type].handler;
    const { title } = registry[block.type];
    return {
      id: block.id,
      item: (
          <BlockConfigurator
            index={index}
            id={block.id}
            title={title}
            block={formBlock}
            removeBlock={removedBlock}
            updateBlock={updateBlock}
            reorderBlocks={reorderBlocks}
            data={block.data}/>
      ),
    };
  });

  const blockToolViewContainer = Object.keys(registry).map((blockType: string, idx: number) => {
    const config = registry[blockType];
    const item = <Tool onClick={e => addNewBlock({config : blockType}, 0)} title={config.title} iconClass={config.iconClass}/>
    return <ExternalListItem item={item} config={blockType} key={blockType}/>;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
					<SortingList
            reorderItems={reorderBlocks}
            items={blockList}
            externalItemDropped={addNewBlock}
					/>
				</Grid>
        <Grid item xs={3}>
          <StickyDiv>
            {blockToolViewContainer}
          </StickyDiv>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default FormBuilder;
