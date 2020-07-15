import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SortableElement } from 'react-sortable-hoc';
import { DragHandle, Option } from '../index';

import './Question.scss'
export const Question = SortableElement(({ 
    data,
    index,
    selectQuestion,
    addOption,
    updateOption,
    updateTitle,
    updateDescription,
    updateType}) => {
    return (
        <div>
            <DragHandle />
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    defaultValue={data.type}
                    onChange={updateType}
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
                defaultValue={data.title}
                onChange={(e) => updateTitle}
            />
            <TextField
                className="mb-1"
                label="Description"
                type="text"
                defaultValue={data.description}
                onChange={(e) => updateDescription}
            />
            <Button variant="contained" color="primary" onClick={(e) => selectQuestion(index)}>
                Click me
                </Button>
            {
                data.type === "List" && <div>
                    <div>
                        {data.options.map(item => (
                            <Option key={item.id} id={item.id} name={item.name} updateOption={updateOption} />
                        ))}
                    </div>
                    <Button variant="contained" color="primary" onClick={(e) => addOption()}>
                        + Add Option
                        </Button>
                </div>
            }
        </div>
    )
})