export interface Collection {
    items: Array<Item>,
}

export interface Item {
    id: string,
    name: string,
    description: string,
}