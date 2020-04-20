let skiData = {
    total: 50,
    powder: 20,
    backcountry: 10,
    goal: 100
}

class SkiDayCounter extends React.Component {
    render() {
        const {total, powder, backcountry, goal} = this.props // destructure if desired
        return (
            <section>
                <div>
                    <p>Total Days: {this.props.total}</p>
                </div>
                <div>
                    <p>Powder Days: {this.props.powder}</p>
                </div>
                <div>
                    <p>Backcountry Days: {this.props.backcountry}</p>
                </div>
                <div>
                    <p>My Goal (days): {this.props.goal}</p>
                </div>
            </section>
        )
    }
}

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
    <SkiDayCounter 
        total={skiData.total}
        powder={skiData.powder}
        backcountry={skiData.backcountry}
        goal={skiData.goal}
    />,
    document.getElementById('root')
)
