import React from 'react';

const RatingPreview = ({index, question }) => {
    return (
        <div>
                <h3 className="mb-1">
                    {question.title}
                </h3>
                <div className="mb-1">
                {question.description}
                </div>
            </div>
    )
}
export default RatingPreview;