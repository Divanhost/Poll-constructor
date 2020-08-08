import React from 'react';
import { QuestionsPool, Question, Sidebar, Preview } from "./components";
import { arrayMove } from 'react-sortable-hoc';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
            isSidebarOpened: false,
            isSaving: false
        }
    }
    componentDidMount() {
        const { id } = this.state;
        if (id) {
            service.get(id).then(data => {
                if (data) {
                    if (data.errorCode === 401) {
                        this.props.logOut();
                    }
                    if (!data.errors.length) {
                        this.setState((prevState) => {
                            return {
                                ...prevState,
                                poll: data.payload,
                                loaded: true
                            }
                        })
                    }
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
    setInterval(this.saveData, 5000);

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
    addOption = (question) => {
        const { poll } = this.state;
        const newOption = {
            name: null
        }
        const options = poll.questions.find(x => x === question).options;
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

    removeOption = (event, option, parent) => {
        const { poll } = this.state;
        const options = poll.questions.find(x => x === parent).options;
        const index = options.findIndex(o => o === option);
        options.splice(index, 1);
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    updateTitle = (event, question) => {
        const { poll } = this.state;
        poll.questions.find(x => x === question).title = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    updateDescription = (event, question) => {
        const { poll } = this.state;
        poll.questions.find(x => x === question).description = event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    updateType = (event, question) => {
        const { poll } = this.state;
        poll.questions.find(x => x === question).type = event.target.value;

        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    switchOptional = (event, question) => {
        const { poll } = this.state;
        poll.questions.find(x => x === question).isOptional = event.target.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    switchHasDescription = (event, question) => {
        const { poll } = this.state;
        poll.questions.find(x => x === question).hasDescription = event.target.checked;
        this.setState((prevState) => {
            return {
                ...prevState,
                poll: poll
            }
        })
    }

    /* /Attributes management */

    saveData = () => {
        try {
            const {poll, id} = this.state;
            if(!poll.title) {
                return;
            }
            poll.questions = poll.questions.filter(x=>x.title !== null && x.title !== '');
            poll.questions.forEach(q=> {
               q.options = q.options.filter(x=>x.title !== null && x.title !== ''); 
            })
            if(id) {
                service.update(id, poll).then(data => {
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            isSaving: false
                        }
                    })
                return data;
            });
            } else {
                service.create(poll).then(data => {
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            isSaving: false
                        }
                    })
                    return data;
                });
            }
        } catch (e) {
            console.log(e);
        }
        
    }

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
                        <div>
                            <div className='poll-title'>
                                <ArrowBackIosIcon className='icon mr-3'/>
                                <TextField
                                    variant="outlined"
                                    label="Poll title"
                                    type="text"
                                    defaultValue={poll.title}
                                    onChange={(e) => this.updateQuestionTitle(e)}
                                />
                            </div>
                            <div className='d-flex'>

                                {
                                    (selectedQuestion && isSidebarOpened) &&
                                    <Sidebar
                                        question={selectedQuestion}
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

                                    <QuestionsPool onSortEnd={this.onSortEnd} useDragHandle>
                                        {poll.questions.map((item, index) => {
                                            return (
                                                <Question
                                                    key={index}
                                                    i={index}
                                                    index={index}
                                                    data={item}
                                                    selectQuestion={this.selectQuestion}
                                                    removeQuestion={this.removeQuestion}
                                                    removeOption={this.removeOption}
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
                                    {
                                        id ?
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
                                            :
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
                                    }
                                </div>
                                <Preview
                                    index={i}
                                    question={selectedQuestion}
                                    nextQuestion={this.nextQuestion}
                                    prevQuestion={this.prevQuestion} />
                            </div>
                        </div>
                }
            </div>
        );
    }
}