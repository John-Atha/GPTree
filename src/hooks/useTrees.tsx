import React, { useEffect, useState } from "react";
import { MyNode, MyTree } from "../types";

export const useTrees = () => {
  const [trees, setTrees] = useState<MyTree[]>([]);

  useEffect(() => {
    const treesString = localStorage.getItem("trees");
    const trees: MyTree[] = JSON.parse(treesString || "[]");
    setTrees(trees);
  }, []);

  const findNode = (node: MyNode, nodeId: number): MyNode | undefined => {
    if (node.id === nodeId) {
      return node;
    }
    for (const child of node.children) {
      const found = findNode(child, nodeId);
      if (found) {
        return found;
      }
    }
    return undefined;
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

  return { trees, addTree, removeTree, addNode, removeNode };
};
