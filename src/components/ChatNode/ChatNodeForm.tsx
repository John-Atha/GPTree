import React, { FormEvent, useEffect, useState } from "react";
import { MyNode, MyTree } from "../../types";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTrees } from "../../hooks/useTrees";

interface ChatNodeFormProps {
  selectedTreeId: number;
  node: MyNode | null;
  refresh: () => void;
  onClose: () => void;
}

const ChatNodeForm = ({
  selectedTreeId,
  node,
  refresh,
  onClose,
}: ChatNodeFormProps) => {
  const { addNode, updateNode, removeNode, getFlatNodesByTreeId } = useTrees();
  const [parentsOptions, setParentsOptions] = useState<MyNode[]>([]);

  const [id, setId] = useState(node?.attributes?.id || null);
  const [name, setName] = useState(node?.name || "");
  const [description, setDescription] = useState(
    node?.attributes?.description || ""
  );
  const [parentId, setParentId] = useState<number | null>(null);
  const [prompts, setPrompts] = useState(node?.attributes?.prompts || []);
  const [children, setChildren] = useState(node?.children || []);

  useEffect(() => {
    console.log("node inside form:", { node })
    setId(node?.attributes?.id || null);
    setName(node?.name || "");
    setDescription(node?.attributes?.description || "");
    setParentId(null);
    setPrompts(node?.attributes?.prompts || []);
    setChildren(node?.children || []);
  }, [node]);

  useEffect(() => {
    console.log({ selectedTreeId });
    if (!selectedTreeId) return;
    setParentsOptions(getFlatNodesByTreeId(selectedTreeId));
  }, [selectedTreeId]);

  const handleChangeParentId = (event: any) => {
    setParentId(event.target.value);
  };

  const handleRemoveNode = () => {
    if (!id) return;
    removeNode(selectedTreeId, id);
    refresh();
    onClose();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted");
    const data = {
      name,
      attributes: {
        id: id || Math.floor(Math.random() * 1000000),
        description,
        prompts,
      },
      children,
    };
    if (!!id) updateNode(selectedTreeId, id, data as MyNode);
    else if (!!parentId) addNode(selectedTreeId, data as MyNode, parentId);
    refresh();
    onClose();
  };

  return (
    <Stack spacing={3} padding={2} width={300} className="full-height">
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">
            {!!node?.attributes?.id ? `Node ${id}` : `New Node on Tree ${selectedTreeId}`}
          </Typography>
        </Grid>
        {!!node?.attributes?.id && (
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="error"
              onClick={handleRemoveNode}
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
      <form onSubmit={handleSubmit} className="full-height">
        <Grid
          container
          height={"100%"}
          direction="column"
          justifyContent="space-between"
        >
          <Grid item>
            <Stack spacing={2}>
              {!!node?.attributes?.id && <TextField label="Id" disabled value={id} />}
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {!id && (
                <FormControl fullWidth>
                  <InputLabel id="simple-select-parent-node-label">
                    Parent Node
                  </InputLabel>
                  <Select
                    labelId="simple-select-parent-node-label"
                    id="simple-select-parent-node"
                    value={parentId || ""}
                    label="Parent Node"
                    onChange={handleChangeParentId}
                  >
                    {parentsOptions.map((node) => (
                      <MenuItem key={node.attributes.id} value={node.attributes.id}>
                        {node.name} (id {node.attributes.id})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Button
                size="large"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};

export default ChatNodeForm;
