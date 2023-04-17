import React, { useState } from "react";
import Tree from "react-d3-tree";
import ChatNodeDrawer from "../ChatNode/ChatNodeDrawer";
import { Button, Grid } from "@mui/material";

interface ChatTreeProps {
  treeId: number;
  data: any;
  refresh: () => void;
}

function ChatTree({ treeId, data, refresh }: ChatTreeProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleNodeClick = (node: any, event: any) => {
    event.preventDefault();
    console.log(node);
    setSelectedNodeId(node.data.attributes.id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedNodeId(null);
    setOpen(false);
  };

  const handleAddNode = () => {
    setOpen(true);
  };

  return (
    <>
      <div id="treeWrapper" className="full-height">
        <Tree
          data={data}
          orientation="vertical"
          onNodeClick={handleNodeClick}
          collapsible={false}
        />
      </div>
      <Grid container justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddNode}>
          Add node
        </Button>
      </Grid>
      <ChatNodeDrawer
        selectedTreeId={treeId}
        selectedNodeId={selectedNodeId}
        open={open}
        onClose={handleClose}
        refresh={refresh}
      />
    </>
  );
}

export default ChatTree;
