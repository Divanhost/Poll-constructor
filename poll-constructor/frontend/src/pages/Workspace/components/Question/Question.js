import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SortableElement } from 'react-sortable-hoc';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { DragHandle, Option } from '../index';

import './Question.scss'

export const Question = SortableElement(({ 
    data,
    i,
    index,
    selectQuestion,
    removeQuestion,
    addOption,
    updateOption,
    updateTitle,
    updateDescription,
    updateType}) => {
    return (
        <div className="question-wrapper">
            <DragHandle />
            <FormControl className = "w-100">
                <InputLabel>Type</InputLabel>
                <Select
                    value={data.type ? data.type : "Rating"}
                    onChange={(e) => updateType(e,data.id)}
                >
                    <MenuItem value={'Rating'}>Rating</MenuItem>
                    <MenuItem value={'List'}>List</MenuItem>
                </Select>
            </FormControl>
            <TextField
                className="mb-1 w-100"
                label="Title"
                type="text"
                defaultValue={data.title}
                onChange={(e) => updateTitle(e, data.id)}
            />
            {
                data.hasDescription &&
                <TextField
                    className="mb-3 w-100"
                    label="Description"
                    type="text"
                    defaultValue={data.description}
                    onChange={(e) => updateDescription(e, data.id)}
                />
            }
            <div className='buttons'>
                <SettingsIcon
                style={{
                    color:'#666666',
                    cursor:'pointer'
                }}  
                onClick={(e) => selectQuestion(e, i)}/>
                <DeleteOutlineIcon
                 style={{
                    color:'#880bca',
                    cursor:'pointer'
                }}  
                onClick={(e) => removeQuestion(e, data)}/>
            </div>
            {
                data.type === "List" && <div>
                    <div>
                        {data.options.map(item => (
                            <Option key={item.id} option={item} parent={data} updateOption={updateOption} />
                        ))}
                    </div>
                    <Button variant="contained" className="w-100" color="primary" onClick={(e) => addOption(data.id)}>
                        + Add Option
                    </Button>
                </div>
            }
        </div>
    )
})