import { Meteor } from 'meteor/meteor'

export const SET_ONBOARDING_FIELD = 'SET_ONBOARDING_FIELD';
export const setOnboardingField = (fieldName, fieldValue) => ({
  type: SET_ONBOARDING_FIELD,
  fieldName,
  fieldValue,
})

export const SET_ONBOARDING_ERROR = 'SET_ONBOARDING_ERROR';
export const setOnboardingError = (error) => ({
  type: SET_ONBOARDING_ERROR,
  error,
})

const initialState = {
  error: null,
  email: '',
  firstName: '',
  lastName: '',
  organizationName: '',
  password1: '',
  password2: '',
}

export const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONBOARDING_ERROR:
      return {...state, error: action.error};
    case SET_ONBOARDING_FIELD:
      return {...state, [action.fieldName]: action.fieldValue};
    default:
      return state
  }
}