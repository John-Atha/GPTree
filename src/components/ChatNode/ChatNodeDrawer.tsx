import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import ChatNodeForm from "./ChatNodeForm";
import { useTrees } from "../../hooks/useTrees";
import { MyNode } from "../../types";

interface ChatNodeDrawerProps {
  selectedTreeId: number | null;
  selectedNodeId: number | null;
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

export default function ChatNodeDrawer({
  selectedTreeId,
  selectedNodeId,
  open,
  onClose,
  refresh,
}: ChatNodeDrawerProps) {
  const { findNodeById } = useTrees();
  const [node, setNode] = useState<MyNode | null>(null);

  useEffect(() => {
    console.log({ selectedTreeId, selectedNodeId })
    if (selectedTreeId && selectedNodeId) {
      const node_ = findNodeById(selectedTreeId, selectedNodeId);
      console.log({ node_ })
      setNode(node_);
    }
    else {
      setNode(null);
    }
  }, [selectedTreeId, selectedNodeId]);

  if (!open || !selectedTreeId) return null;
  return (
    <Drawer
      sx={{ width: 400 }}
      anchor="right"
      open={!!selectedTreeId}
      onClose={onClose}
    >
      <ChatNodeForm
        selectedTreeId={selectedTreeId}
        node={node}
        refresh={refresh}
        onClose={onClose}
      />
    </Drawer>
  );
}
