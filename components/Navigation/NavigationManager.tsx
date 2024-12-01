import NavigationItemComponent, {
  NavigationItemData,
} from "@/components/Navigation/NavigationItem";
import { navigationData } from "@/data/initialState";
import {
  NavigationItem as NavigationItemType,
  useNavigationState,
} from "@/hooks/useNavigationState";
import { buildTree, flattenTree } from "@/utils/treeUtils";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import AddEditForm from "./AddEditForm";

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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<NavigationItemType | null>(
    null
  );

  const handleFormSubmit = (data: Partial<NavigationItemData>) => {
    addItem({ id: `${Date.now()}`, ...data } as NavigationItemData);
    setIsAdd(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const flatList = flattenTree(navigation);

    const item = flatList.find(({ item }) => item.id === event.active.id);

    setDraggedItem(item?.item || null);
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const position = determineDropPosition(event);

    reorderNavigation(String(active.id), String(over.id), position);

    setActiveId(null);
    setDraggedItem(null);
  };

  const determineDropPosition = (
    event: DragEndEvent
  ): "top" | "bottom" | "inside" => {
    const { active, over, delta } = event;

    // Jeśli delta.y jest blisko zera, traktuj jako "inside"
    if (Math.abs(delta.y) < 10) {
      return "inside";
    }

    // Jeśli delta.y jest ujemna, oznacza to przeciąganie w górę (top)
    // Jeśli delta.y jest dodatnia, oznacza to przeciąganie w dół (bottom)
    return delta.y < 0 ? "top" : "bottom";
  };

  const reorderNavigation = (
    activeId: string,
    overId: string,
    position: "top" | "bottom" | "inside"
  ) => {
    setNavigation((currentNavigation) => {
      const flatList = flattenTree(currentNavigation);

      const activeItem = flatList.find(({ item }) => item.id === activeId);
      const overItem = flatList.find(({ item }) => item.id === overId);

      if (!activeItem || !overItem) return currentNavigation;

      const filteredFlatList = flatList.filter(
        ({ item }) => item.id !== activeId
      );

      switch (position) {
        case "inside":
          activeItem.parentId = overItem.item.id;
          filteredFlatList.push({
            item: activeItem.item,
            parentId: overItem.item.id,
          });
          break;

        case "top":
          if (overItem.parentId === activeItem.parentId) {
            const activeIndex = filteredFlatList.findIndex(
              ({ item }) => item.id === overItem.item.id
            );
            filteredFlatList.splice(activeIndex, 0, {
              item: activeItem.item,
              parentId: overItem.parentId,
            });
          } else {
            activeItem.parentId = overItem.parentId;
            const activeIndex = filteredFlatList.findIndex(
              ({ item }) => item.id === overItem.item.id
            );
            filteredFlatList.splice(activeIndex, 0, {
              item: activeItem.item,
              parentId: overItem.parentId,
            });
          }
          break;

        case "bottom":
          activeItem.parentId = overItem.parentId;
          const overIndex = filteredFlatList.findIndex(
            ({ item }) => item.id === overItem.item.id
          );
          filteredFlatList.splice(overIndex + 1, 0, {
            item: activeItem.item,
            parentId: overItem.parentId,
          });
          break;
      }

      return buildTree(filteredFlatList);
    });
  };

  return (
    <div className='bg-background-secondary'>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}>
        <ul className='bg-background-secondary'>
          <SortableContext
            items={flattenTree(navigation).map(({ item }) => item.id)}
            strategy={verticalListSortingStrategy}>
            {navigation.map((item) => (
              <NavigationItemComponent
                key={item.id}
                item={item}
                onAdd={addChildrenItem}
                onEdit={updateItem}
                onDelete={deleteItem}
              />
            ))}
          </SortableContext>
        </ul>
        <DragOverlay>
          {activeId && draggedItem ? (
            <div className='absolute top-0 left-0 w-full h-full bg-gray-200 opacity-30'>
              <NavigationItemComponent
                item={draggedItem}
                key={draggedItem.id}
                onAdd={addChildrenItem}
                onEdit={updateItem}
                onDelete={deleteItem}
              />
            </div>
          ) : null}
        </DragOverlay>
        <NavigationForm
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          onSubmit={handleFormSubmit}
        />
      </DndContext>
    </div>
  );
};

export default NavigationManager;

const NavigationForm: React.FC<{
  isAdd: boolean;
  setIsAdd: (state: boolean) => void;
  onSubmit: (data: Partial<NavigationItemData>) => void;
}> = ({ isAdd, setIsAdd, onSubmit }) => (
  <>
    {isAdd ? (
      <AddEditForm onSubmit={onSubmit} onCancel={() => setIsAdd(false)} />
    ) : (
      <button onClick={() => setIsAdd(true)}>Dodaj</button>
    )}
  </>
);
