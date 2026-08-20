export interface Book {
    id: number;
    title: string;
    author: string;
    publicationDate: string;
}

export interface CreateBook {
    title: string;
    author: string;
    publicationDate: string;
}