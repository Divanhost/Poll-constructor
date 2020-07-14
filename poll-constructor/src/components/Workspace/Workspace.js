import React from 'react';
import Constructor from './Constructor/Constructor';

class Workspace extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            poll: props.poll,
            selectedQuestion: props.poll[0]
        }
        this.addQuestion.bind(this)
    }
    addQuestion = () => {
        const question = {
            id: Math.random()*10000,
            title: '',
            description: '',
            type: 'Rating',
            options: []
        }
        const {poll} = this.state;
        poll.questions.push(question);
        this.setState({
            poll:poll,
            selectedQuestion:poll[0]
        });
    }
    removeQuestion(question) {
        const {poll} = this.state;
        poll.questions = poll.questions.filter(q=>q !== question);
        this.setState({
            poll:poll,
            selectedQuestion:poll.last()
        });
    }
    updateQuestion(question) {
        const {poll} = this.state;
        let oldQuestion = poll.questions.find(q=>q.id === question.id);
        oldQuestion = question;
        this.setState({
            poll:poll,
            selectedQuestion:poll.last()
        });
    }
    // setCurrentQuestion(question) {
    //     const {poll} = this.state;
    //     poll.questions.push(question);
    //     this.setState({
    //         poll:poll,
    //         selectedQuestion:poll.last()
    //     });
    // }
    render() {
        return (
            <Constructor poll = {this.state.poll} addQuestion = {this.addQuestion}></Constructor>
        );
    }
    
}
export default Workspace;