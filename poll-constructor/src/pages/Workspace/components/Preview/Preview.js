import React from 'react';
import ListPreview from './ListPreview';
import RatingPreview from './RatingPreview';
export const Preview = ({index, question }) => {
    return (
        <div>
            <div className = "d-flex">
               {
                   question.type === 'List' ?
                   <ListPreview index ={index} question = {question}/>
                    :
                    <RatingPreview index ={index} question = {question}/>
               }
            </div>
        </div>
    )
}