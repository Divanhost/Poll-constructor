import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';
import './Sidebar.scss';
export const Sidebar = ({
    question,
    updateType,
    switchOptional,
    switchHasDescription,
    closeSidebar,
    nextQuestion,
    prevQuestion,
}) => (
        <div className="sidebar">
            <div className='inner-container d-flex flex-column align-items-start'>
                <div className='buttons'>
                    <KeyboardArrowUpIcon className='icon mr-2' onClick={(e) => nextQuestion(e)}/>
                    <KeyboardArrowDownIcon className='icon mr-2' onClick={(e) => prevQuestion(e)}/>
                    <CloseIcon className='icon' onClick={(e) => closeSidebar(e)}/>
                </div>
                <div className="p-3 w-100">
                    <FormControl  className="w-100">
                        <InputLabel>Type</InputLabel>
                        <Select 
                            value={question.type ? question.type : "Rating"}
                            onChange={(e) => updateType(e, question)}
                        >
                            <MenuItem value={'Rating'}>Rating</MenuItem>
                            <MenuItem value={'List'}>List</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={question.isOptional ? question.isOptional : false}
                            onChange={(e) => switchOptional(e, question)}

                        />}
                    label="Is Optional"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={question.hasDescription ? question.hasDescription : false}
                            onChange={(e) => switchHasDescription(e, question)}
                        />}
                    label="Has Description"
                    labelPlacement="start"
                />
            </div>

        </div>
    )