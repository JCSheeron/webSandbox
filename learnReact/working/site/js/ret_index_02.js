var style = {
    backgroundColor: 'orange',
    color: 'white',
    fontFamily: 'Arial'
}
// Using Plain JavaScript 
/*
const listItem1 = React.createElement(
    'li',
    {},
    'List item 01'
)

const title = React.createElement(
    'ul',
    {id: 'title', className: 'header', style: style},
    listItem1
)
*/
ReactDOM.render(
    <div style={style}>
        <h1 id="heading-element">Hello World!</h1>
        <p>We are glad you are here!</p>
    </div>,
    document.getElementById('root')
)
