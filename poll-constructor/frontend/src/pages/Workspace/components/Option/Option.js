import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
export const Option = ({option, parent, updateOption }) => {
    return (
        <div>
            <div className = "d-flex">
                <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <TextField className="mb-3"
                    label="Name"
                    type="text"
                    defaultValue={option.name}
                    onChange = {(e) => updateOption(e, option, parent)}
                />
            </div>
        </div>
    )
}