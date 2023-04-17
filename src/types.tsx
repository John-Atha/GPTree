export interface MyTree {
    id: number;
    name: string;
    description: string;
    root: MyNode;
}

export interface MyNode {
    id: number;
    name: string;
    attributes: {
        description: string;
        prompts: string[];
    }
    children: MyNode[];
}
