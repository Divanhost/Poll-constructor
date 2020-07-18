import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export const Sidebar = ({
    id,
    type,
    isOptional,
    hasDescription,
    updateType,
    switchOptional,
    switchHasDescription
}) => (
        <div className="sidebar">
            <div className="p-3">
                <FormControl className="w-100">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type ? type : "Rating"}
                        onChange={(e) => updateType(e, id)}
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
                            checked={isOptional ? isOptional : false}
                            onChange={(e) => switchOptional(e, id)}

                        />}
                    label="Is Optional"
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={hasDescription ? hasDescription : false}
                            onChange={(e) => switchHasDescription(e, id)}
                        />}
                    label="Has Description"
                    labelPlacement="start"
                />
        </div>
    )