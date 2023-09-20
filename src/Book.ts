import {ISBN13} from './ISBNDTO';

export interface Book{
    isbn: ISBN13;
    title: string;
    authors: string;
    num_pages: string;
    publisher: string;
    language_code: string;
    publication_date: string;
}
