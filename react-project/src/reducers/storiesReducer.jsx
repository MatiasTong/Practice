import React from 'react'

export default function storiesReducer(state, action) {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        // case 'SET_STORIES':
        //     return action.payload;
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(
                story => action.payload.objectID !== story.objectID
            ),
            }
        default:
            throw new Error();
    }
}
