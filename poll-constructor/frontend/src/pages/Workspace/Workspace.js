import React from 'react';
import { QuestionsPool, Question, Sidebar, Preview } from "./components";
import { arrayMove } from 'react-sortable-hoc';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { PollService } from '../../services';
import './Workspace.scss'
const service = new PollService();
export class Workspace extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id
        this.state = {
            id: id,
            poll: {
                questions: []
            },
            selectedQuestion: null,
            loaded: false,
            isSidebarOpened: false
        }
    }
    componentDidMount() {
        const { id } = this.state;
        if (id) {
            service.get(id).then(data => {
                if (data) {
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            poll: data.payload,
                            loaded: true
                        }
                    })
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    loaded: true
                }
            })
        }

    }
    /* Questions management */
    addQuestion = () => {
        const question = {
            title: null,
            description: null,
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

    removeQuestion = (event, question) => {
        debugger
        const { poll } = this.state;
        const index = poll.questions.findIndex(q => q === question);
        poll.questions.splice(index, 1);
        this.setState({
            poll: poll,
            selectedQuestion: poll.questions[0]
        });
    }
    updateQuestionTitle = (event) => {
        const { poll } = this.state;
        poll.title = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }
    selectQuestion = (event, index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedQuestion: this.state.poll.questions[index],
                isSidebarOpened: true
            }
        })
        console.log(this.state);
    }
    nextQuestion = (event) => {
        const { poll, selectedQuestion } = this.state;
        const index = poll.questions.findIndex(element => element === selectedQuestion);
        if (index + 1 >= poll.questions.length) {
            return null;
        }
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedQuestion: this.state.poll.questions[index + 1]
            }
        })
    }
    prevQuestion = (event) => {
        const { poll, selectedQuestion } = this.state;
        const index = poll.questions.findIndex(element => element === selectedQuestion);
        if (index - 1 < 0) {
            return null;
        }
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedQuestion: this.state.poll.questions[index - 1]
            }
        })
    }
    closeSidebar = (event) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isSidebarOpened: false
            }
        })
    }
    getSelectedIndex = () => {
        return this.state.poll.questions.findIndex(element => element === this.state.selectedQuestion)
    }
    updatePoll = (event, id) => {
        const { poll } = this.state;
        service.update(id, poll).then(data => {
            return data;
        });
    }
    createPoll = (event) => {
        const { poll } = this.state;
        service.create(poll).then(data => {
            return data;
        });
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
            id: 0,
            name: null
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
    updateOption = (event, option, parent) => {
        const { poll } = this.state;
        const options = poll.questions.find(x => x === parent).options;
        const index = options.findIndex(element => element === option)
        options[index] = { ...options[index], name: event.target.value }
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
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
        const { selectedQuestion, isSidebarOpened, loaded, poll, id } = this.state;
        const i = this.getSelectedIndex();
        return (
            <div>
                {
                    !loaded ?
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border"
                                style={{
                                    width: 10 + 'rem',
                                    height: 10 + 'rem'
                                }}
                                role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <div className='d-flex'>
                            {
                                (selectedQuestion && isSidebarOpened) &&
                                <Sidebar
                                    id={selectedQuestion.id}
                                    type={selectedQuestion.type}
                                    isOptional={selectedQuestion.isOptional}
                                    hasDescription={selectedQuestion.hasDescription}
                                    updateType={this.updateType}
                                    switchOptional={this.switchOptional}
                                    switchHasDescription={this.switchHasDescription}
                                    closeSidebar={this.closeSidebar}
                                    nextQuestion={this.nextQuestion}
                                    prevQuestion={this.prevQuestion}
                                    className='w-100'
                                />
                            }
                            <div className='q-pool'>
                                    <TextField
                                        className="mb-1"
                                        label="Title"
                                        type="text"
                                        defaultValue={poll.title}
                                        onChange={(e) => this.updateQuestionTitle(e)}
                                    />
                                    <QuestionsPool onSortEnd={this.onSortEnd} useDragHandle>
                                        {poll.questions.map((item, index) => {
                                            return (
                                                <Question
                                                    key={item.id}
                                                    i={index}
                                                    index={index}
                                                    data={item}
                                                    selectQuestion={this.selectQuestion}
                                                    removeQuestion={this.removeQuestion}
                                                    addOption={this.addOption}
                                                    updateOption={this.updateOption}
                                                    updateTitle={this.updateTitle}
                                                    updateDescription={this.updateDescription}
                                                    updateType={this.updateType}
                                                />
                                            )
                                        })}
                                    </QuestionsPool>
                                <Button variant="contained" className="mb-3"
                                    style={{
                                        width: 310
                                    }}
                                    color="primary" onClick={(e) => this.addQuestion(e)}>
                                    + Add Question
                                </Button>
                                <Button 
                                    variant="contained" 
                                    className="mb-3" 
                                    color="primary" 
                                    style={{
                                            width: 310
                                        }}
                                    onClick={(e) => this.updatePoll(e, id)}>
                                    save
                                </Button>
                                <Button 
                                    variant="contained" 
                                    className="mb-3" 
                                    color="primary"
                                    style={{
                                            width: 310
                                        }}
                                    onClick={(e) => this.createPoll(e,)}>
                                        create
                                </Button>
                            </div>
                            <Preview
                                index={i}
                                question={selectedQuestion}
                                nextQuestion={this.nextQuestion}
                                prevQuestion={this.prevQuestion} />
                           
                        </div>
                }
            </div>

        );
    }

}