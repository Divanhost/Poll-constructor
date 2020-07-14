import React from 'react';
import Option from './Option/Option'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Question.scss'
class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.data.id,
            title: props.data.title,
            description: props.data.description,
            type: props.data.type,
            options: props.data.options
        }
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

    render() {
        const isList = this.state.type === "List";
        const {type} = this.state;
        return (
            <div className="question-holder">
                <FormControl>
                    <InputLabel>Type</InputLabel>
                    <Select
                        defaultValue={type}
                        onChange={this.updateType}
                    >
                        <MenuItem value={undefined}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Rating'}>Rating</MenuItem>
                        <MenuItem value={'List'}>List</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className="mb-1"
                    label="Title"
                    type="text"
                    defaultValue={this.state.title}
                    onChange={(e) => this.updateTitle}
                />
                <TextField
                    className="mb-1"
                    label="Description"
                    type="text"
                    defaultValue={this.state.description}
                    onChange={(e) => this.updateDescription}
                />
                {
                    isList && <div>
                        <div>
                            {this.state.options.map(item => (
                                <Option key={item.id} id={item.id} name={item.name} updateOption={this.updateOption} />
                            ))}
                        </div>
                        <Button variant="contained" color="primary" onClick={(e) => this.addOption()}>
                            + Add Option
                        </Button>
                    </div>
                }


            </div>

        );
    }

}
export default Question;