export interface MyTree {
    id: number;
    name: string;
    description: string;
    root: MyNode;
}

export interface MyNode {
    id: number;
    name: string;
    description: string;
    prompts: string[];
    children: MyNode[];
}
