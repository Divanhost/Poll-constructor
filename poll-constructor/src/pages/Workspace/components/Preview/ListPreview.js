import React from 'react';
import OptionPreview from './OptionPreview';
const ListPreview = ({index, question }) => {
    return (
        <div>
                <h3 className="mb-1">
                    {question.title}
                </h3>
                <div className="mb-1">
                {question.description}
                </div>
               <div>
                        <div>
                            {question.options.map(item => (
                                <OptionPreview key={item.id} name={item.name} />
                            ))}
                        </div>
                </div>
            </div>
    )
}
export default ListPreview;