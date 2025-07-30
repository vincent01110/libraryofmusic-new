'use client';

import style from './ShelfItemsSort.module.scss';
import { API } from '@/interfaces/api';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import ShelfItemSortable from './shelf-item-sortable/ShelfItemSortable';
import { Flex } from '@chakra-ui/react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface Props {
  shelfItems: API.V1.Response.Shelves.ShelfItem[],
}

const ShelfItemsSort = ({ shelfItems }: Props) => {
    const [items, setItems] = useState(shelfItems);
    const sensors = useSensors(
        useSensor(PointerSensor)
    );

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
      
        if (active && over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = active.data.current?.sortable.index;
                const newIndex = over.data.current?.sortable.index;
          
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Flex className={style.container}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}>
                <SortableContext
                    items={items.map((item, i) => `${item.id}-${i}`)}
                    strategy={verticalListSortingStrategy}>
                    {items.map((item, i) => <ShelfItemSortable shelfItem={item} index={i} key={`${item.id}-${i}`}/>)}
                </SortableContext>

            </DndContext>
        </Flex>);
};

export default ShelfItemsSort;
