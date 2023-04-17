export interface MyTree {
    id: number;
    name: string;
    description: string;
    root: MyNode;
}

export interface MyNode {
    name: string;
    attributes: {
        id: number;
        description: string;
        prompts: string[];
    }
    children: MyNode[];
}
