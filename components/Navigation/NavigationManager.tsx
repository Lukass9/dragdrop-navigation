import NavigationItemComponent from "@/components/Navigation/NavigationItem";
import { navigationData } from "@/data/initialState";
import { useNavigationState } from "@/hooks/useNavigationState";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import EmptyMenuState from "./EmptyMenuState";
import NavigationForm from "./NavigationForm";
import { NavigationItem } from "@/types/navigation.types";
import { v4 as uuidv4 } from "uuid";

const NavigationManager: React.FC = () => {
  const {
    navigation,
    addItem,
    addChildrenItem,
    updateItem,
    deleteItem,
    setNavigation,
  } = useNavigationState(navigationData);

  const [isAdd, setIsAdd] = useState(false);
  const handleFormSubmit = (data: Partial<NavigationItem>) => {
    addItem({ id: uuidv4(), ...data } as NavigationItem);
    setIsAdd(false);
  };

  const updateNestedItems = (
    items: NavigationItem[],
    activeId: string,
    overId: string
  ): NavigationItem[] => {
    const oldIndex = items.findIndex((i) => i.id === activeId);
    const newIndex = items.findIndex((i) => i.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      return arrayMove(items, oldIndex, newIndex);
    }

    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: updateNestedItems(item.children, activeId, overId),
        };
      }
      return item;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setNavigation((prev) =>
      updateNestedItems(prev, String(active.id), String(over.id))
    );
  };

  const renderChildren = (items: NavigationItem[]) => (
    <SortableContext
      items={items.map((child) => child.id)}
      strategy={verticalListSortingStrategy}>
      {items.map((child) => (
        <div key={child.id}>
          <NavigationItemComponent
            item={child}
            onAdd={addChildrenItem}
            onEdit={updateItem}
            onDelete={deleteItem}
          />
          {child.children?.length > 0 && (
            <div className='bg-background-secondary pl-16'>
              {renderChildren(child.children)}
            </div>
          )}
        </div>
      ))}
    </SortableContext>
  );

  return (
    <div
      className={`bg-background-secondary rounded-xl w-8/12 ${
        !navigation.length ? "" : "border"
      }`}>
      {!navigation.length ? (
        <EmptyMenuState
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}>
          <ul className='bg-background-secondary'>
            {renderChildren(navigation)}
          </ul>

          <NavigationForm
            isPrimary={false}
            isAdd={isAdd}
            setIsAdd={setIsAdd}
            onSubmit={handleFormSubmit}
          />
        </DndContext>
      )}
    </div>
  );
};

export default NavigationManager;
