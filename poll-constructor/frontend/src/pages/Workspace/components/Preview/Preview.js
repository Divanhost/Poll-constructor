import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './Preview.scss'
export const Preview = ({ index, question,nextQuestion,prevQuestion }) => {
    return (
        <div>
            <div className="preview-wrapper">
            {
                question ?
                <div>
                    <h3 className="mb-1">
                        {question.title ?? "Title"}
                    </h3>
                    <div className="mb-1">
                        {question.description ?? "Description"}
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
                                        <div className="mb-3">{item.name ?? "Option"}</div>
                                    </div>
                            ))}
                            </div>
                        </div>
                    }

                </div>
                :
                <div>
                SOSI
                </div>
            }
            <Button variant="contained" className="w-100 mb-3" color="primary" onClick={(e) => nextQuestion(e, index)}>
                    up
            </Button>
            <Button variant="contained" className="w-100 mb-3" color="primary" onClick={(e) => prevQuestion(e, index)}>
                down
            </Button>
            </div>
        </div>
    )
}