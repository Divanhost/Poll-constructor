import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export const Preview = ({ index, question }) => {
    return (
        <div>
            <div className="d-flex">
                <div>
                    <h3 className="mb-1">
                        {question.title}
                    </h3>
                    <div className="mb-1">
                        {question.description}
                    </div>
                    {
                        question.type === 'List' &&
                        <div>
                            <div>
                                {question.options.map(item => (
                                    <div  key={item.id} className="d-flex">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        <div className="mb-3">{item.name}</div>
                                    </div>
                            ))}
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}