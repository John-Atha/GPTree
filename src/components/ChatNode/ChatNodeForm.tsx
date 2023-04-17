import React, { FormEvent, useState } from "react";
import { MyNode } from "../../types";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useTrees } from "../../hooks/useTrees";

interface ChatNodeFormProps {
  selectedTreeId: number;
  node: MyNode;
  refresh: () => void;
  onClose: () => void;
}

const ChatNodeForm = ({
  selectedTreeId,
  node,
  refresh,
  onClose,
}: ChatNodeFormProps) => {
  const { updateNode, removeNode } = useTrees();
  const [id, setId] = useState(node.id);
  const [name, setName] = useState(node.name);
  const [description, setDescription] = useState(node.attributes.description);
  const [prompts, setPrompts] = useState(node.attributes.prompts);
  const [children, setChildren] = useState(node.children);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted");
    updateNode(selectedTreeId, id, {
      id,
      name,
      attributes: {
        description,
        prompts,
      },
      children,
    });
    refresh();
    onClose();
  };

  return (
    <Stack spacing={3} padding={2} width={300} className="full-height">
      <Typography variant="h6">Node {id} form</Typography>
      <form onSubmit={handleSubmit} className="full-height">
        <Grid
          container
          height={"100%"}
          direction="column"
          justifyContent="space-between"
        >
          <Grid item>
            <Stack spacing={2}>
              <TextField label="Id" disabled value={id} />
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
