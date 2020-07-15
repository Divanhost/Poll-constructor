import React from 'react';
import { SortableHandle} from 'react-sortable-hoc';

export const DragHandle = SortableHandle(({ style }) => (
    <span style={{ ...style, ...{ cursor: 'move' } }} >{':::'}</span>)
)