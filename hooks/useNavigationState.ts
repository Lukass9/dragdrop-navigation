import { useState } from "react";
import { navigationData } from "../data/initialState";

export interface NavigationItem {
  id: string;
  label: string;
  url?: string;
  children?: NavigationItem[];
}

export const useNavigationState = (initialItems: NavigationItem[]) => {
  const [navigation, setNavigation] =
    useState<NavigationItem[]>(navigationData);

  const modifyTree = (
    items: NavigationItem[],
    action: (item: NavigationItem, parent: NavigationItem | null) => boolean,
    parent: NavigationItem | null = null
  ): boolean => {
    for (const item of items) {
      if (action(item, parent)) return true;
      if (item.children && modifyTree(item.children, action, item)) return true;
    }
    return false;
  };

  const addItem = (newItem: NavigationItem) => {
    const updatedNavigation = [...navigation];
    updatedNavigation.push(newItem);
    setNavigation(updatedNavigation);
  };

  const addChildrenItem = (parentId: string, newItem: NavigationItem) => {
    const updatedNavigation = [...navigation];
    const addedChildren = modifyTree(updatedNavigation, (item) => {
      if (item.id === parentId) {
        item.children = item.children || [];
        item.children.push(newItem);
        return true;
      }
      return false;
    });
    if (addedChildren) setNavigation(updatedNavigation);
  };

  const updateItem = (
    id: string,
    updatedData: Partial<Omit<NavigationItem, "children">>
  ) => {
    const updatedNavigation = [...navigation];
    const updated = modifyTree(updatedNavigation, (item) => {
      if (item.id === id) {
        Object.assign(item, updatedData);
        return true;
      }
      return false;
    });
    if (updated) setNavigation(updatedNavigation);
  };

  const deleteItem = (id: string) => {
    const updatedNavigation = [...navigation];

    const deleted = modifyTree(updatedNavigation, (item, parent) => {
      if (item.id === id && parent) {
        parent.children = parent.children?.filter((child) => child.id !== id);
        return true;
      }

      if (item.id === id && !parent) {
        const index = updatedNavigation.findIndex(
          (navItem) => navItem.id === id
        );
        if (index !== -1) {
          updatedNavigation.splice(index, 1);
          return true;
        }
      }

      return false;
    });

    if (deleted) setNavigation(updatedNavigation);
  };

  return { navigation, addItem, addChildrenItem, updateItem, deleteItem };
};
