import { ISBN13, isISBN13 } from './ISBNDTO';
import {IsDateString, IsISO8601 } from 'class-validator';
import { Validate } from 'class-validator';

export class BookDTO{
    //@Validate(isISBN13)
    isbn: ISBN13 = "123-1234567890";

    title: string = "";
    
    authors: string="";
    num_pages: string="";
    publisher: string="";
    language_code: string="";

    //@IsDateString()
    publication_date: string = '1970';

        


    /*Book(isbn : ISBN13, title : string, author : string, date : string){
        this.isbn=isbn;
        this.title=title;
        this.author=author;
        this.date=date;
    }*/

}
