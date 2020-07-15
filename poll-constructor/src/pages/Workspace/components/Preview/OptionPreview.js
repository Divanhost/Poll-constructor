import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
const OptionPreview = ({ name }) => {
    return (
        <div>
            <div className = "d-flex">
                <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <div className="mb-3">{name}</div>
            </div>
        </div>
    )
}
export default OptionPreview;