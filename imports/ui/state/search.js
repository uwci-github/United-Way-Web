import { Meteor } from 'meteor/meteor'

export const SET_FULL_TEXT_SEARCH_ERROR = 'SET_FULL_TEXT_SEARCH_ERROR'
export const setFullTextSearchError = (searchError) => ({
  type: SET_FULL_TEXT_SEARCH_ERROR,
  searchError,
})

export const SET_FULL_TEXT_SEARCH_RESULTS = 'SET_FULL_TEXT_SEARCH_RESULTS'
export const setFullTextSearchResults = (searchResults) => ({
  type: SET_FULL_TEXT_SEARCH_RESULTS,
  searchResults, 
})

export const SET_FULL_TEXT_SEARCH_RESULTS_LOADING = 'SET_FULL_TEXT_SEARCH_RESULTS_LOADING'
export const setFullTextSearchResultsLoading = (searchResultsLoading) => ({
  type: SET_FULL_TEXT_SEARCH_RESULTS_LOADING,
  searchResultsLoading,
})

export const SET_FULL_TEXT_SEARCH_TERM = 'SET_FULL_TEXT_SEARCH_TERM'
export const setFullTextSearchTerm = (searchTerm) => ({
  type: SET_FULL_TEXT_SEARCH_TERM,
  searchTerm,
})

export const updateFullTextSearchResults = () => (
  (dispatch, getState) => {
    dispatch(setFullTextSearchResultsLoading(true))
    Meteor.call('Search.fullText.all', getState().search.searchTerm, (err, results) => {
      dispatch(setFullTextSearchResultsLoading(false))
      if (err) return dispatch(setFullTextSearchError(err.reason))
      else return dispatch(setFullTextSearchResults(results))
    })
  }
)

const initialState = {
  searchError: null,
  searchResults: [],
  searchResultsLoading: false,
  searchTerm: '',
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FULL_TEXT_SEARCH_ERROR:
      return {...state, searchError: action.searchError}
    case SET_FULL_TEXT_SEARCH_RESULTS:
      return {...state, searchResults: action.searchResults}
    case SET_FULL_TEXT_SEARCH_RESULTS_LOADING:
      return {...state, searchResultsLoading: action.searchResultsLoading}
    case SET_FULL_TEXT_SEARCH_TERM:
      return {...state, searchTerm: action.searchTerm}
    default:
      return state
  }
}