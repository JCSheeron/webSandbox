class Message extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1 style={{color: this.props.color}}>Hello Everyone! {this.props.msg} </h1>
            <p>I'll check back in {this.props.minutes} minutes.</p>
            </div>
        )
    }
}

ReactDOM.render(
    <Message color="blue" minutes={12} age={50} nice={true} msg="How are you?"/>,
    document.getElementById('root')
)
