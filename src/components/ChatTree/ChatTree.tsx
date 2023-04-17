import React, { useState } from "react";
import Tree from "react-d3-tree";
import ChatNodeDrawer from "../ChatNode/ChatNodeDrawer";

interface ChatTreeProps {
  treeId: number;
  data: any;
  refresh: () => void;
}

function ChatTree({ treeId, data, refresh }: ChatTreeProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleNodeClick = (node: any, event: any) => {
    console.log(node);
    setSelectedNodeId(node.data.id);
    event.stopPropagation();
  };

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  return (
    <>
      <div id="treeWrapper" className="full-height">
        <Tree
          data={data}
          orientation="vertical"
          onNodeClick={handleNodeClick}
        />
      </div>
      <ChatNodeDrawer
        selectedTreeId={treeId}
        selectedNodeId={selectedNodeId}
        onClose={handleClose}
        refresh={refresh}
      />
    </>
  );
}

export default ChatTree;
