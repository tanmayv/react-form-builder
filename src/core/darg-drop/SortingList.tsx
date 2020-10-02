import React, { useRef, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

enum ItemTypes {
  SORT_LIST_ITEM = 'sort-list-item',
  EXTERNAL_LIST_ITEM = 'new-list-item'
}

const SortingList: React.FC<any> = ({items, reorderItems, placeholder, externalItemDropped}) => {
  const [ placeHolderIndex, setPlaceholderIndex ] = useState(-1);
  const placeHolderItem = {
    key: 'placeholder',
    item: !!placeholder ? placeholder : <div style={{height: '100px'}}></div>
  }
  const itemsWithPlaceholder = placeHolderIndex > -1? items.slice(0, placeHolderIndex).concat(placeHolderItem).concat(items.slice(placeHolderIndex)) : items;
  const [, drop] = useDrop({
    accept: ItemTypes.EXTERNAL_LIST_ITEM,
    drop(item, monitor) {
      externalItemDropped(item, placeHolderIndex);
      setPlaceholderIndex(-1);
    }
  });
  return (
    <div ref={drop}>
      {itemsWithPlaceholder.map((item: any, index: Number) => <ListItem key={item.key} index={index} item={item.item} reorderItems={reorderItems} setPlaceholderIndex={setPlaceholderIndex}></ListItem>)}
    </div>
  );
};


const ExternalListItem: React.FC<any> = ({item, id, config}) => {
  const [, drag] = useDrag({
    item: { type: ItemTypes.EXTERNAL_LIST_ITEM, config },
  });
  return <div ref={drag}>{item}</div>;
}

const ListItem: React.FC<any> = ({index, reorderItems, item, setPlaceholderIndex}) => {
  const ref = useRef<HTMLDivElement>(null);
  const hoverDeadZone = 50;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SORT_LIST_ITEM, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: [ItemTypes.SORT_LIST_ITEM, ItemTypes.EXTERNAL_LIST_ITEM],
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (item.type === ItemTypes.EXTERNAL_LIST_ITEM) {
        if (hoverClientY > hoverDeadZone && hoverClientY < hoverBoundingRect.bottom - hoverDeadZone) {
          setPlaceholderIndex(hoverIndex); 
        }
      } else {  
        if (dragIndex === hoverIndex) { return; }
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return; }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return; }

        reorderItems(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    },
  });
  const opacity = isDragging ? 0 : 1
  drag(drop(ref));
  return <div style={{opacity}}ref={ref}>{item}</div>
};

export { ExternalListItem };
export default SortingList;