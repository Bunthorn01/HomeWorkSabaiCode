class  Book {
    title: string;
    author: string;
    genre: string;
    available: boolean; // initial the book is available
    constructor (title: string, author: string, genre: string) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.available = true;
    }
}
// to create book and output testing
// const myBook = new Book("HTML", "Bunthorn", "First Edition");
// const myBook1 = new Book("CSS", "Chamnes", "First Edition");
// console.log(myBook);
// console.log(myBook1);

//1.Class Design:
// Define the library class with attributes like name and books.
class Library {
    name: string;
    // books: string;
    books: Book[];

    //2. Basic Operations:
    constructor(name: string) {
        this.name = name;
        this.books = [];
    }
    //*adding a book to the library
    addBook(book: Book): void {
        this.books.push(book);
    }
    //*remove book by title
    removeBookByTitle(title: string): void {
        this.books = this.books.filter(book => book.title !== title);
    }
    //*searching for books by title, author or genre
    searchByTAG(searchCriteria: string): Book[] {
        return this.books.filter(book => 
            book.title.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1 ||
            book.author.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1 ||
            book.genre.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1
    );
    }
    //*display a list of all available book
    displayAvailableBooks(): void {
        // return this.books.filter(book => book.available);
        const availableBooks = this.books.filter(book => book.available);
        console.log("Available Books: ");
        console.log(`${this.padString("Title", 25)}${this.padString("Author", 25)}Genre`);
        console.log("------------------------------------------------------------------");
        availableBooks.forEach(book => {
            console.log(`${this.padString(book.title, 25)}${this.padString(book.author, 25)}${book.genre}`);
        });
    }
    private padString(str: string, length: number): string {
        while (str.length < length) {
            str += " ";
        }
        return str;
    }

    // 3.borrow and return
    //*add method for borrow a book(unavailable)
    borrowBook(title: string): void {
        let bookFound = false;
        for (let i = 0; i < this.books.length; i++) {
            const book = this.books[i];
            if (book.title === title) {
                bookFound = true;
                if (book.available) {
                    book.available = false; // Mark the book as unavailable
                    console.log(`Successfully borrowed "${title}".`);
                } else {
                    console.log(`"${title}" is not available for borrowing.`);
                }
                break; // Stop searching after finding the book
            }
        }
        if (!bookFound) {
            console.log(`"${title}" is not available in the library.`);
        }
    }
    // Method for returning a book (available)
    returnBook(title: string): void {
        let bookFound = false;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].title === title) {
                this.books[i].available = true; // Mark the book as available
                bookFound = true;
                console.log(`Successfully returned "${title}".`);
                break; // Stop searching after finding the book
            }
        }
        if (!bookFound) {
            console.log("Book not found.");
        }
    }
    // 4.account
    removeBorrowedBooks(borrowedBooks: Book[]): void {
        borrowedBooks.forEach(borrowedBook => {
            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].title === borrowedBook.title) {
                    this.books.splice(i, 1);
                    break; // Exit the loop once the book is removed
                }
            }
        });
    }
    
}

// 4. user accounts
abstract class User {
    protected name: string;
    protected borrowedBooks: Book[];
    protected books: Book[];

    constructor (name: string) {
        this.name = name;
        this.books = [];
        this.borrowedBooks = [];
    }
    //abstract method to borrow a book
    abstract borrowBook(book: Book): void;
    //method to view borrowed books
    viewBorrowedBooks(): Book[] {
        const borrowedBooks = this.borrowedBooks.filter(book => book.available);
        let output = "";
        borrowedBooks.forEach(book => {
            output += `${this.padString(book.title, 25)}${this.padString(book.author, 25)}${book.genre}\n`;
        });
        return borrowedBooks;
    }    
    
    
    private padString(str: string, length: number): string {
        while (str.length < length) {
            str += " ";
        }
        return str;
    }
}
class Student extends User {
    private static MAX_BORROW_LIMIT: number = 2;
    constructor(name: string) {
        super(name);
    }
    //method to borrow a book
    borrowBook(book: Book): void {
        if (this.borrowedBooks.length < Student.MAX_BORROW_LIMIT) {
            this.borrowedBooks.push(book);
            console.log(book.title, "borrowed by" ,this.name);
        } else {
            console.log(this.name, "has reached the borrowing limit.");
        }
    }
}
//admin class, inheriting form User
class Admin extends User {
    constructor(name: string) {
        super(name);
    }
    // method to borrow a book
    borrowBook(book: Book): void {
        this.borrowedBooks.push(book);
        console.log(book.title, "borrowed by", this.name);
    }
}

const myLibrary = new Library("Library: ");
// use function add book to library
const js = new Book("JavaScript", "Bunthorn", "Frist Edition");
const ts = new Book("TypeScript", "Chamnas", "second Edittion");
const html = new Book("HTML", "John", "Third Edition");
const css = new Book("CSS", "Jack", "Forth Edition");
myLibrary.addBook(js);
myLibrary.addBook(ts);
myLibrary.addBook(html);
myLibrary.addBook(css);
console.log("\n=================================");
console.log("Result:\n",myLibrary.books);

// use function removing book by title
console.log("\n=================================");
// myLibrary.removeBookByTitle("JavaScript");
// console.log("After remove:\n", myLibrary.books);

console.log("\n=================================");     
// Search for books by title, author, or genre
console.log("Search results for");
console.log(myLibrary.searchByTAG("bunthorn"));

console.log("\n=================================");
// display a list of all available book
myLibrary.displayAvailableBooks();

console.log("\n=================================");
// add method for borrow a book
myLibrary.borrowBook("TypeScript");
myLibrary.displayAvailableBooks();
console.log("\n=================================");
// return a book
myLibrary.returnBook("TypeScript");
myLibrary.displayAvailableBooks();

console.log("\n=================================");
// user accounts
const stu = new Student("Piseth");
const admin = new Admin("Thorng");
stu.borrowBook(js);
stu.borrowBook(css);
stu.borrowBook(ts);
admin.borrowBook(html);
console.log("Borrowed Books: ");
console.log("------------------------------------------------------------------");
console.log(stu.viewBorrowedBooks());
console.log(admin.viewBorrowedBooks());

// console.log("\n");
// myLibrary.removeBorrowedBooks([...stu.viewBorrowedBooks(), ...admin.viewBorrowedBooks()]);
// myLibrary.displayAvailableBooks();
// view the borrowed
// console.log("Student's borrowed books: ", stu.viewBorrowedBooks());
// console.log("Admin's borrowed books: ", admin.viewBorrowedBooks());
