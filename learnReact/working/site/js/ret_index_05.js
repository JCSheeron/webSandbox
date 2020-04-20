
let bookList = [
    {"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
    {"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
    {"title": "The Great Cave Mystery", "author": "Frank W. Dixon", "pages": 285},
    {"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 384}
    ]

const Book = ({title, author, pages, freeBookmark}) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>by: {author}</p>
            <p>Pages: {pages} pages</p>
            <p>Free Bookmark Today: {freeBookmark ? 'yes!' : 'no!'}</p>
        </section>
    )
}

const Hiring = () => 
    <div>
        <p>The library is hiring. Go wo www.library.com/jobs for more.</p>
    </div>

const NotHiring = () => 
    <div>
        <p>The library is not hiring. Better luck next time. Take off hoser.</p>
    </div>

class Library extends React.Component {
    state = {
        open: true,
        freeBookmark: false,
        hiring: true,
        data: [],
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch('https://hplussport.com/api/products/order/price/sort/asc/qty//1')
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
    }

    componentDidUpdate() {
        console.log("The component just updated.")
    }

    toggleOpenClosed = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }
    render() {
        console.log(this)
        console.log(this.state)
        const {books} = this.props
        return(
            <div>
                {this.state.hiring ? <Hiring /> : <NotHiring />}
                <h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
                <button onClick={this.toggleOpenClosed}>Change</button>
                {books.map(
                    (book, i) => 
                        <Book
                            key={i}
                            title={book.title}
                            author={book.author}
                            pages={book.pages}
                            freeBookmark={this.state.freeBookmark}/>
                )}
            </div>
        )
    }
}

ReactDOM.render(
    <Library books={bookList}/>,
    document.getElementById('root')
)
