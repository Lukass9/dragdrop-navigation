import { useState } from "react";

export interface NavigationItem {
  id: string;
  label: string;
  url?: string;
  children?: NavigationItem[];
}

export const useNavigationState = (initialItems: NavigationItem[]) => {
  const [navigation, setNavigation] = useState<NavigationItem[]>(initialItems);

  const modifyTree = (
    items: NavigationItem[],
    action: (item: NavigationItem) => boolean
  ): boolean => {
    for (const item of items) {
      if (action(item)) return true;
      if (item.children && modifyTree(item.children, action)) return true;
    }
    return false;
  };

  const addItem = (parentId: string, newItem: NavigationItem) => {
    const updatedNavigation = [...navigation];
    const added = modifyTree(updatedNavigation, (item) => {
      if (item.id === parentId) {
        item.children = item.children || [];
        item.children.push(newItem);
        return true;
      }
      return false;
    });
    if (added) setNavigation(updatedNavigation);
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
    const deleted = modifyTree(updatedNavigation, (item) => {
      if (item.children) {
        item.children = item.children.filter((child) => child.id !== id);
        return true;
      }
      return false;
    });
    if (deleted) setNavigation(updatedNavigation);
  };

  return { navigation, addItem, updateItem, deleteItem };
};
