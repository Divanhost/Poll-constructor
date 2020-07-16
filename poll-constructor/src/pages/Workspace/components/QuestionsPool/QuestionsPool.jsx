import React from 'react';
import { SortableContainer} from 'react-sortable-hoc';

export const QuestionsPool = SortableContainer(({ children }) => (
    <div>
        {children}
    </div>
))