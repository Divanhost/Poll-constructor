import React from 'react';
import Question from './Question/Question';
import Button from '@material-ui/core/Button';
import './Constructor.scss'
const Constructor = ({ poll, addQuestion }) => {
    return (
        <div className='questions-list'>
            {poll.questions.map(item => (
                <Question key={item.id} data={item} />
            ))}
            <Button variant="contained" color="primary" onClick = {(e) => addQuestion(e)}>
                + Add Question
            </Button>
        </div>

    )
}
export default Constructor;