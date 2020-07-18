import React from 'react';
import { QuestionsPool, Question, Sidebar, Preview } from "./components";
import { arrayMove } from 'react-sortable-hoc';
import Button from '@material-ui/core/Button';
import data from '../../shared/data';

export class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: data.polls[0],
            selectedQuestion: data.polls[0].questions[0]
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
            selectedQuestion: poll.questions[0]
        });
    }

    removeQuestion = (event, id) => {
        const { poll } = this.state;
        const index = poll.questions.indexOf(q=>q.id === id);
        poll.questions.splice(index,1);
        this.setState({
            poll: poll,
            selectedQuestion: poll.questions[0]
        });
    }

    selectQuestion = (event, index) => {
        console.log(index);
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
        const { poll } = this.state;
        poll.questions = arrayMove(poll.questions, oldIndex, newIndex);
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    };
    /* /DnD */

    /* Attributes management */
    addOption = (id) => {
        const { poll } = this.state;
        const newOption = {
            id: Math.random() * 10000,
            name: ''
        }
        const options = poll.questions.find(x => x.id === id).options;
        options.push(newOption)
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }
    updateOption = (event, id) => {
        // const {poll} = this.state;
        // const options = poll.questions.find(x=>x.id === id).options;
        // const index = options.findIndex(element => element.id === id)
        // options[index] = { ...options[index], name: event.target.value }
        // this.setState((prevState) => {
        //     return {
        //         ...prevState,
        //         poll: poll
        //     }
        // })
    }
    updateTitle = (event, id) => {
        const { poll } = this.state;
        poll.questions.find(x => x.id === id).title = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }
    updateDescription = (event, id) => {
        const { poll } = this.state;
        poll.questions.find(x => x.id === id).description = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }
    updateType = (event, id) => {
        const { poll } = this.state;
        poll.questions.find(x => x.id === id).type = event.target.value;

        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }
    switchOptional = (event, id) => {
        const { poll } = this.state;
        const question = poll.questions.find(x => x.id === id);
        question.isOptional = event.target.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }
    switchHasDescription = (event, id) => {
        const { poll } = this.state;
        const question = poll.questions.find(x => x.id === id);
        question.hasDescription = event.target.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    /* /Attributes management */

    render() {
        const {selectedQuestion} = this.state;
        return (
            <div className='d-flex'>
                {
                    selectedQuestion &&
                    <Sidebar
                        id={selectedQuestion.id}
                        type={selectedQuestion.type}
                        isOptional={selectedQuestion.isOptional}
                        hasDescription={selectedQuestion.hasDescription}
                        updateType={this.updateType}
                        switchOptional={this.switchOptional}
                        switchHasDescription={this.switchHasDescription}

                    />
                }
                <div>

                    <QuestionsPool onSortEnd={this.onSortEnd} useDragHandle>
                        {this.state.poll.questions.map((item, index) => {
                            return (
                                <Question
                                    key={item.id}
                                    i={index}
                                    index={index}
                                    data={item}
                                    selectQuestion={this.selectQuestion}
                                    removeQuestion = {this.removeQuestion}
                                    addOption={this.addOption}
                                    updateOption={this.updateOption}
                                    updateTitle={this.updateTitle}
                                    updateDescription={this.updateDescription}
                                    updateType={this.updateType}
                                />
                            )
                        })}
                    </QuestionsPool>
                    <Button variant="contained" className="w-100 mb-3" color="primary" onClick={(e) => this.addQuestion(e)}>
                        + Add Question
                    </Button>
                </div>
                <div>
                    {
                        selectedQuestion &&
                        <Preview index={() => this.getSelectedIndex()} question={selectedQuestion}/>
                    }
                </div>
            </div>
        );
    }

}