import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
export const Option = ({option, parent, updateOption,removeOption }) => {
    return (
        <div>
            <div className = "d-flex align-items-center">
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
                <ClearIcon 
                style={{
                    color:'#666',
                    cursor:'pointer'
                }}  
                onClick={(e) => removeOption(e, option, parent)}/>
            </div>
        </div>
    )
}