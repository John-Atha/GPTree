import React, { useEffect } from "react";
import { useTrees } from "../../hooks/useTrees";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MyNode, MyTree } from "../../types";
import ChatTree from "../ChatTree/ChatTree";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

function ChatTrees() {
  const { trees, addNode, removeNode, addTree } = useTrees();

  const [selectedTree, setSelectedTree] = React.useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("handling change");
    setSelectedTree(parseInt(newValue));
  };

  useEffect(() => {
    if (trees.length === 1) {
      setSelectedTree(trees[0].id);
    }
  }, [trees]);

  const addDummyTree = () => {
    const newRoot: MyNode = {
      id: 1,
      name: "New Root",
      description: "This is a new dummy root",
      prompts: ["Dummy prompt 1", "Dummy prompt 2"],
      children: [],
    };
    const newTree: MyTree = {
      id: trees.length + 1,
      name: `Tree ${trees.length + 1}`,
      description: "This is a new dummy tree",
      root: newRoot,
    };
    addTree(newTree);
  };

  if (!trees.length) {
    return (
      <Stack spacing={2}>
        <Typography variant="h6">No trees found</Typography>
        <Button variant="contained" onClick={addDummyTree}>
          Add Tree
        </Button>
      </Stack>
    );
  } else if (!!selectedTree) {
    return (
      <TabContext value={`${selectedTree}`}>
        <Grid container direction="column" height="100%">
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Grid item>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {trees.map((tree) => (
                    <Tab label={tree.name} value={`${tree.id}`} />
                  ))}
                </TabList>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={addDummyTree}>
                  Add Tree
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            {trees.map((tree) => (
              <TabPanel
                value={`${tree.id}`}
                sx={{ height: "-webkit-fill-available" }}
              >
                <ChatTree data={orgChart} />
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </TabContext>
    );
  }
  return <CircularProgress />;
}

export default ChatTrees;