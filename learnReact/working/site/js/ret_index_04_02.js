
let bookList = [
    {"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
    {"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
    {"title": "The Great Cave Mystery", "author": "Frank W. Dixon", "pages": 285},
    {"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 384}
    ]

const Book = ({title, author, pages}) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>by: {author}</p>
            <p>Pages: {pages} pages</p>
        </section>
    )
}
const Library = ({books}) => {
    return (
        <div>
            {books.map(
                (book, i) => 
                    <Book
                        key={i}
                        title={book.title}
                        author={book.author}
                        pages={book.pages}/>
            )}
        </div>
    )
}

<Book title="The Sun Also Rises" author="Ernest Hemingway" pages={260} />

ReactDOM.render(
    <Library books={bookList}/>,
    document.getElementById('root')
)
