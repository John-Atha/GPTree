import React, { useEffect, useState } from "react";
import { MyNode, MyTree } from "../types";

export const useTrees = () => {
  const [trees, setTrees] = useState<MyTree[]>([]);

  const refresh = () => {
    const treesString = localStorage.getItem("trees");
    const trees: MyTree[] = JSON.parse(treesString || "[]");
    setTrees(trees);
  }

  useEffect(() => {
    refresh();
  }, []);

  const findNodeById = (treeId: number, nodeId: number) => {
    const tree = trees.find((tree) => tree.id === treeId);
    if (tree) {
      return findNode(tree.root, nodeId);
    }
    return null;
  };

  const findNode = (node: MyNode, nodeId: number): MyNode | null => {
    if (node.id === nodeId) {
      return node;
    }
    for (const child of node.children) {
      const found = findNode(child, nodeId);
      if (found) {
        return found;
      }
    }
    return null;
  };

  const addNode = (treeId: number, node: MyNode, parentId: number) => {
    const newTrees = trees.map((tree) => {
      if (tree.id === treeId) {
        const newTree = { ...tree };
        const parent = findNode(newTree.root, parentId);
        if (parent) {
          parent.children.push(node);
        }
        return newTree;
      }
      return tree;
    });
    setTrees(newTrees);
    localStorage.setItem("trees", JSON.stringify(newTrees));
  };

  const removeNode = (treeId: number, nodeId: number) => {
    const newTrees = trees.map((tree) => {
      if (tree.id === treeId) {
        const newTree = { ...tree };
        const parent = findNode(newTree.root, nodeId);
        if (parent) {
          parent.children = [];
        }
        return newTree;
      }
      return tree;
    });
    setTrees(newTrees);
    localStorage.setItem("trees", JSON.stringify(newTrees));
  };

  const addTree = (tree: MyTree) => {
    const newTrees = [...trees, tree];
    setTrees(newTrees);
    localStorage.setItem("trees", JSON.stringify(newTrees));
  };

  const removeTree = (treeId: number) => {
    const newTrees = trees.filter((tree) => tree.id !== treeId);
    setTrees(newTrees);
    localStorage.setItem("trees", JSON.stringify(newTrees));
  };

  const updateNode = (treeId: number, nodeId: number, node: MyNode) => {
    const newTrees = trees.map((tree) => {
      if (tree.id === treeId) {
        const newTree = { ...tree };
        const found = findNode(newTree.root, nodeId);
        if (found) {
          found.id = node.id;
          found.name = node.name;
          found.attributes = node.attributes;
        }
        return newTree;
      }
      return tree;
    });
    setTrees(newTrees);
    localStorage.setItem("trees", JSON.stringify(newTrees));
  };

  return {
    trees,
    refresh,
    addTree,
    removeTree,
    addNode,
    removeNode,
    updateNode,
    findNodeById,
  };
};
