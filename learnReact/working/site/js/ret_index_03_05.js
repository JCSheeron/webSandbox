let skiData = {
    total: 37,
    powder: 20,
    backcountry: 10,
    goal: 100
}

const getPercent = decimal => {
    return decimal * 100 + '%'
}

const calcGoalProgress = (total, goal) => {
    return getPercent(total/goal)
}

const SkiDayCounter = ({total, powder, backcountry, goal}) => {
    return (
        <section>
            <div>
                <p>Total Days: {total}</p>
            </div>
            <div>
                <p>Powder Days: {powder}</p>
            </div>
            <div>
                <p>Backcountry Days: {backcountry}</p>
            </div>
            <div>
                <p>My Goal (days): {goal}</p>
                <p>My Goal Progress: {calcGoalProgress(total, goal)}</p>
            </div>
        </section>
    )
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
