var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Book = /** @class */ (function () {
    function Book(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.available = true;
    }
    return Book;
}());
// to create book and output testing
// const myBook = new Book("HTML", "Bunthorn", "First Edition");
// const myBook1 = new Book("CSS", "Chamnes", "First Edition");
// console.log(myBook);
// console.log(myBook1);
//1.Class Design:
// Define the library class with attributes like name and books.
var Library = /** @class */ (function () {
    //2. Basic Operations:
    function Library(name) {
        this.name = name;
        this.books = [];
    }
    //*adding a book to the library
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    //*remove book by title
    Library.prototype.removeBookByTitle = function (title) {
        this.books = this.books.filter(function (book) { return book.title !== title; });
    };
    //*searching for books by title, author or genre
    Library.prototype.searchByTAG = function (searchCriteria) {
        return this.books.filter(function (book) {
            return book.title.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1 ||
                book.author.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1 ||
                book.genre.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1;
        });
    };
    //*display a list of all available book
    Library.prototype.displayAvailableBooks = function () {
        var _this = this;
        // return this.books.filter(book => book.available);
        var availableBooks = this.books.filter(function (book) { return book.available; });
        console.log("Available Books: ");
        console.log("".concat(this.padString("Title", 25)).concat(this.padString("Author", 25), "Genre"));
        console.log("------------------------------------------------------------------");
        availableBooks.forEach(function (book) {
            console.log("".concat(_this.padString(book.title, 25)).concat(_this.padString(book.author, 25)).concat(book.genre));
        });
    };
    Library.prototype.padString = function (str, length) {
        while (str.length < length) {
            str += " ";
        }
        return str;
    };
    // 3.borrow and return
    //*add method for borrow a book(unavailable)
    Library.prototype.borrowBook = function (title) {
        var bookFound = false;
        for (var i = 0; i < this.books.length; i++) {
            var book = this.books[i];
            if (book.title === title) {
                bookFound = true;
                if (book.available) {
                    book.available = false; // Mark the book as unavailable
                    console.log("Successfully borrowed \"".concat(title, "\"."));
                }
                else {
                    console.log("\"".concat(title, "\" is not available for borrowing."));
                }
                break; // Stop searching after finding the book
            }
        }
        if (!bookFound) {
            console.log("\"".concat(title, "\" is not available in the library."));
        }
    };
    // Method for returning a book (available)
    Library.prototype.returnBook = function (title) {
        var bookFound = false;
        for (var i = 0; i < this.books.length; i++) {
            if (this.books[i].title === title) {
                this.books[i].available = true; // Mark the book as available
                bookFound = true;
                console.log("Successfully returned \"".concat(title, "\"."));
                break; // Stop searching after finding the book
            }
        }
        if (!bookFound) {
            console.log("Book not found.");
        }
    };
    // 4.account
    Library.prototype.removeBorrowedBooks = function (borrowedBooks) {
        var _this = this;
        borrowedBooks.forEach(function (borrowedBook) {
            for (var i = 0; i < _this.books.length; i++) {
                if (_this.books[i].title === borrowedBook.title) {
                    _this.books.splice(i, 1);
                    break; // Exit the loop once the book is removed
                }
            }
        });
    };
    return Library;
}());
// 4. user accounts
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
        this.books = [];
        this.borrowedBooks = [];
    }
    //method to view borrowed books
    User.prototype.viewBorrowedBooks = function () {
        var _this = this;
        var borrowedBooks = this.borrowedBooks.filter(function (book) { return book.available; });
        var output = "";
        borrowedBooks.forEach(function (book) {
            output += "".concat(_this.padString(book.title, 25)).concat(_this.padString(book.author, 25)).concat(book.genre, "\n");
        });
        return borrowedBooks;
    };
    User.prototype.padString = function (str, length) {
        while (str.length < length) {
            str += " ";
        }
        return str;
    };
    return User;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name) {
        return _super.call(this, name) || this;
    }
    //method to borrow a book
    Student.prototype.borrowBook = function (book) {
        if (this.borrowedBooks.length < Student.MAX_BORROW_LIMIT) {
            this.borrowedBooks.push(book);
            console.log(book.title, "borrowed by", this.name);
        }
        else {
            console.log(this.name, "has reached the borrowing limit.");
        }
    };
    Student.MAX_BORROW_LIMIT = 2;
    return Student;
}(User));
//admin class, inheriting form User
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(name) {
        return _super.call(this, name) || this;
    }
    // method to borrow a book
    Admin.prototype.borrowBook = function (book) {
        this.borrowedBooks.push(book);
        console.log(book.title, "borrowed by", this.name);
    };
    return Admin;
}(User));
var myLibrary = new Library("Library: ");
// use function add book to library
var js = new Book("JavaScript", "Bunthorn", "Frist Edition");
var ts = new Book("TypeScript", "Chamnas", "second Edittion");
var html = new Book("HTML", "John", "Third Edition");
var css = new Book("CSS", "Jack", "Forth Edition");
myLibrary.addBook(js);
myLibrary.addBook(ts);
myLibrary.addBook(html);
myLibrary.addBook(css);
console.log("\n=================================");
console.log("Result:\n", myLibrary.books);
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
var stu = new Student("Piseth");
var admin = new Admin("Thorng");
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
