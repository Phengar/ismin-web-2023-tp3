import { Controller, Get, Post, Param, Body, Query, Delete} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Book';
import { BookDTO } from './BookDTO';
import { ISBN13 } from './ISBNDTO';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
    @Get()
    getAllBooks(@Query('author') query: string): Book[]{
      if (query===undefined){
        return this.bookService.getAllBooks();
      }
      return this.bookService.getBooksOf(query);
    }

    @Post()
    addBook(@Body() book: BookDTO): Book{
      this.bookService.addBook(book);
      return book;
    }

    @Post(':search')
    locateBooks(@Param('term') term : string) : Book[]{
      return this.bookService.locateBooks(term);
    }

    @Get(':isbn')
    getBook(@Param('isbn') isbn: ISBN13) : Book{
      return this.bookService.getBook(isbn)
    }

    @Delete(':isbn')
    deleteBook(@Param('isbn') isbn : ISBN13) : void{
      this.bookService.removeBook(isbn);
    }

}
