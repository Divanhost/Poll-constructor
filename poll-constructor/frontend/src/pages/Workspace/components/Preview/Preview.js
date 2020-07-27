import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './Preview.scss'
export const Preview = ({ index, question, nextQuestion, prevQuestion }) => {
    return (
        <div className="preview-wrapper">
            <div className='inner-container m-3 question-wrapper'>
                {
                    question ?
                        <div>
                            <h3 className="mb-1">
                                {question.title ?? "Title"}
                            </h3>
                            {
                                question.hasDescription &&
                                    <div className="mb-1">
                                        {question.description ?? "Description"}
                                    </div>
                            }
                            {
                                question.type === 'List' &&
                                <div>
                                    <div>
                                        {question.options.map(item => (
                                            <div key={item.id} className="d-flex">
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
                {
                    index !== -1 &&
                    <div className='footer'>
                        <div className='icon'>
                                {index + 1}
                        </div>
                        <div className='buttons'>
                            <KeyboardArrowUpIcon className='icon mr-2' onClick={(e) => prevQuestion(e)}  />
                            <KeyboardArrowDownIcon className='icon mr-2'  onClick={(e) => nextQuestion(e)} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}