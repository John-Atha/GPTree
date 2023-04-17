import React from "react";
import Tree from "react-d3-tree";

interface ChatTreeProps {
  data: any;
}

function ChatTree({
  data
}: ChatTreeProps) {
  return (
    <div id="treeWrapper" className="full-height">
      <Tree data={data} orientation="vertical" />
    </div>
  );
}

export default ChatTree;
