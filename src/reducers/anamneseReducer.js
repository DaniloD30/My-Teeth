import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
anamnesis: [],
};

export default function anamneseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
      case Constants.GET_ANAMNESE:
        return {
          ...state,
          anamnesis: action?.payload,
        };
    default:
      return state;
  }
}
