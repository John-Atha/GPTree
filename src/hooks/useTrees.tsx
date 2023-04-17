import React, { useEffect, useState } from "react";
import { MyNode, MyTree } from "../types";

export const useTrees = () => {
  const [trees, setTrees] = useState<MyTree[]>([]);

  const getTrees = () => {
    const treesString = localStorage.getItem("trees");
    const trees: MyTree[] = JSON.parse(treesString || "[]");
    return trees;
  };

  const refresh = () => {
    const trees = getTrees();
    setTrees(trees);
  }

  useEffect(() => {
    refresh();
  }, []);

  const findNodeById = (treeId: number, nodeId: number) => {
    const trees_ = getTrees();
    const tree = trees_.find((tree) => tree.id === treeId);
    if (tree) {
      console.log({ tree })
      return findNode(tree.root, nodeId);
    }
    return null;
  };

  const findNode = (node: MyNode, nodeId: number): MyNode | null => {
    if (node.attributes.id === nodeId) {
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
    const trees_ = getTrees();
    const newTrees = trees_.map((tree) => {
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
    localStorage.setItem("trees", JSON.stringify(newTrees));
    refresh();
  };

  const removeNode = (treeId: number, nodeId: number) => {
    const trees_ = getTrees();
    const newTrees = trees_.map((tree) => {
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
    localStorage.setItem("trees", JSON.stringify(newTrees));
    refresh();
  };

  const addTree = (tree: MyTree) => {
    const newTrees = [...trees, tree];
    localStorage.setItem("trees", JSON.stringify(newTrees));
    refresh();
  };

  const removeTree = (treeId: number) => {
    const trees_ = getTrees();
    const newTrees = trees_.filter((tree) => tree.id !== treeId);
    localStorage.setItem("trees", JSON.stringify(newTrees));
    refresh();
  };

  const updateNode = (treeId: number, nodeId: number, node: MyNode) => {
    const trees_ = getTrees();
    const newTrees = trees_.map((tree) => {
      if (tree.id === treeId) {
        const newTree = { ...tree };
        const found = findNode(newTree.root, nodeId);
        if (found) {
          found.attributes.id = node.attributes.id;
          found.name = node.name;
          found.attributes = node.attributes;
        }
        return newTree;
      }
      return tree;
    });
    localStorage.setItem("trees", JSON.stringify(newTrees));
    refresh();
  };

  const getFlatNodesByTreeId = (treeId: number) => {
    const trees_ = getTrees();
    const tree = trees_.find((tree) => tree.id === treeId);
    console.log({ trees_, tree, treeId })
    if (tree) {
      const nodes = getFlatNodes(tree.root);
      console.log({ nodes });
      return nodes;
    }
    return [];
  };

  const getFlatNodes = (node: MyNode): MyNode[] => {
    const flatNodes: MyNode[] = [];
    flatNodes.push(node);
    for (const child of node.children) {
      flatNodes.push(...getFlatNodes(child));
    }
    return flatNodes;
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
    getFlatNodesByTreeId,
  };
};
