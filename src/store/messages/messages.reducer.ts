import { SEND_ERROR_MESSAGE, SEND_INFO_MESSAGE } from './messages.constants';
import { type MessagesActionsType, type MessageState } from './messages.types';

const initialState: MessageState = {
  infoMessage: null,
  errorMessage: null,
};

export const messageReducer = (state = initialState, action: MessagesActionsType): MessageState => {
  switch (action.type) {
    case SEND_INFO_MESSAGE:
      return { ...state, infoMessage: action.payload.message, errorMessage: null };
    case SEND_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload.message, infoMessage: null };
    default:
      return state;
  }
};
