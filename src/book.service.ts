import { Injectable, OnModuleInit } from '@nestjs/common';
import { Book } from './Book';
import { ISBN13 } from './ISBNDTO';
import { readFile, readFileSync } from 'fs';
//import jsonObject from 'src/dataset.json';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BookModule } from './book.module';
import { BookDTO } from './BookDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BookService implements OnModuleInit{
    constructor(private readonly httpService: HttpService) {}
    books : Book[] = [];

    findAll(): Observable<AxiosResponse<Book[]>> {
        return this.httpService.get('https://api.npoint.io/fbb2a6039fc21e320b30');
    }

    onModuleInit() {
        //console.log(jsonObject);
        //jsonObject.forEach(book => this.addBook(book as Book)); //Il se passe ici des choses vraiment pas nettes (mais bon ça fonctionne)
        //console.log(this.getAllBooks());
        //this.findAll().subscribe(value => (console.log('test', value)));
        /*readFile('./src/dataset.json', (err: NodeJS.ErrnoException, data:Buffer) => {
            const booksJSON = JSON.parse(data.toString());
            console.log(booksJSON);
            
            for(var book in booksJSON){
                this.addBook(book);
                let bookToAdd : Book ;
                bookToAdd.isbn=book.isbn;
            }
        })*/

        const file = readFileSync('./src/dataset.json', 'utf-8');
        const jsonFile = JSON.parse(file);

        fetch('https://api.npoint.io/fbb2a6039fc21e320b30')
            .then(response => response.json())
            .then(jsonFile => {
                let i=0;
                while (jsonFile[i] !== undefined){
                    //let book = plainToClass(BookDTO , jsonFile[i]);
                    let book = Object.assign(new BookDTO() , jsonFile[i]);
                    this.addBook(book);
                    i++;
                }
            })
            .then( _ => console.log(this.getAllBooks()))
            .catch(error => {
                console.error('Error:', error);
            });
        //let test = Object.assign(new Book)
        }
    

    addBook(book: Book): void{
        if (!this.books.some(value => value.isbn===book.isbn)){
                    this.books.push(book);
        }
    }

    getBook(isbn: ISBN13): Book{
        const book = this.books.find(value => value.isbn===isbn);
        if (book=== undefined){
            throw new Error('Livre innexistant');
        }
        return book;
    }

    getBooksOf(author: string): Book[]{
        return this.books.filter(value => value.authors===author);
    }

    getAllBooks(): Book[]{
        return this.books.sort(CompareBooks);
    }

    getTotalNumberOfBooks(): number{
        return this.books.length;
    }

    getBooksPublishedAfter(aDate: string): Book[]{
        return this.books.filter(value => value.publication_date>=aDate);
    }

    removeBook(isbn : ISBN13): Book{
        const book = this.books.find(value => value.isbn===isbn);
        if(book=== undefined){
            throw new Error('Livre innexistant');
        }
        const index = this.books.indexOf(book, 0);
        this.books.splice(index, 1);
        return book;
    }

    locateBooks(term : string) : Book[]{
        const books = this.books.filter(value => value.authors.includes(term) || value.title.includes(term));
        return books;
    }
}



function CompareBooks(b1: Book, b2: Book): number{
    if (b1.title > b2.title){
        return 1;
    }
    if (b1.title === b2.title){
        return 0;
    }
    return -1;
}
