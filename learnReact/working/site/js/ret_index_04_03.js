
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
class Library extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            open: false
        }
    }
    render() {
        console.log(this)
        console.log(this.state)
        const {books} = this.props
        return(
            <div>
                <h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
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
}

ReactDOM.render(
    <Library books={bookList}/>,
    document.getElementById('root')
)
