import React from 'react';
import { QuestionsPool, Question } from "./components";
import { arrayMove} from 'react-sortable-hoc';
import Button from '@material-ui/core/Button';
class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: props.poll,
            selectedQuestion: props.poll.questions[0]
        }
    }
    /* Questions management */
    addQuestion = () => {
        const question = {
            id: Math.random() * 10000,
            title: '',
            description: '',
            type: 'Rating',
            options: []
        }
        const { poll } = this.state;
        poll.questions.push(question);
        this.setState({
            poll: poll,
            selectedQuestion: poll.questions[poll.question.length - 1]
        });
    }

    removeQuestion = (question) => {
        const { poll } = this.state;
        poll.questions = poll.questions.filter(q => q !== question);
        this.setState({
            poll: poll,
            selectedQuestion: null
        });
    }

    selectQuestion = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedQuestion: this.state.poll.questions[index]
            }
        })
        console.log(this.state);
    }

    getSelectedIndex = () => {
        this.state.poll.findIndex(element => element.id === this.state.selectedQuestion.id)
    }
    /* /QuestionsManagement */

    /* DnD */
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            questions: arrayMove(this.state.questions, oldIndex, newIndex),
        });
    };
    /* /DnD */

    /* Attributes management */
    addOption = () => {
        let options = [...this.state.options];
        const newOption = {
            id: Math.random() * 10000,
            name: ''
        }
        options.push(newOption)
        this.setState((prevState) => {
            return {
                ...prevState,
                options: options
            }
        })
    }
    updateOption = (event, id) => {
        const index = this.state.options.findIndex(element => element.id === id)
        let options = [...this.state.options];
        options[index] = { ...options[index], name: event.target.value }
        this.setState((prevState) => {
            return {
                ...prevState,
                options: options
            }
        })
    }
    updateTitle = (event) => {
        let title = this.state.title;
        title = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                title: title
            }
        })
    }
    updateDescription = (event) => {
        let description = this.state.description;
        description = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                description: description
            }
        })
    }
    updateType = (event) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                type: event.target.value
            }
        })
    }

    /* /Attributes management */

    render() {
        return (
            <div className='d-flex'>
                <div>
                    <QuestionsPool onSortEnd={this.onSortEnd} useDragHandle>
                        {this.state.poll.questions.map((item, index) => {
                            return (
                                <Question
                                    key={item.id}
                                    index = {index}
                                    data={item}
                                    selectQuestion={this.selectQuestion}
                                    addOption={this.addOption}
                                    updateOption={this.updateOption}
                                    updateTitle={this.updateTitle}
                                    updateDescription={this.updateDescription}
                                    updateType={this.updateType}
                                />
                            )
                        })}
                    </QuestionsPool>
                    <Button variant="contained" color="primary" onClick={(e) => this.addQuestion(e)}>
                        + Add Question
                    </Button>
                </div>
                {/* <Preview index={() => this.getSelectedIndex()} question={this.state.selectedQuestion}/> */}
            </div>
        );
    }

}
export default Workspace;