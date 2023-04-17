import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import ChatNodeForm from "./ChatNodeForm";
import { useTrees } from "../../hooks/useTrees";
import { MyNode } from "../../types";

interface ChatNodeDrawerProps {
  selectedTreeId: number | null;
  selectedNodeId: number | null;
  onClose: () => void;
  refresh: () => void;
}

export default function ChatNodeDrawer({
  selectedTreeId,
  selectedNodeId,
  onClose,
  refresh,
}: ChatNodeDrawerProps) {
  const { findNodeById } = useTrees();
  const [node, setNode] = useState<MyNode | null>(null);

  useEffect(() => {
    if (selectedTreeId && selectedNodeId) {
      const node = findNodeById(selectedTreeId, selectedNodeId);
      setNode(node);
    }
    else {
      setNode(null);
    }
  }, [selectedTreeId, selectedNodeId]);

  if (!node || !selectedTreeId) return null;
  return (
    <Drawer
      sx={{ width: 400 }}
      anchor="right"
      open={!!selectedTreeId && !!selectedNodeId}
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
