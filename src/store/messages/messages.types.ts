import type { SEND_ERROR_MESSAGE, SEND_INFO_MESSAGE } from './messages.constants';

export type MessageState = {
  infoMessage: string | null;
  errorMessage: string | null;
};

export type SendInfoMessageActionType = {
  type: typeof SEND_INFO_MESSAGE;
  payload: { message: string };
};

export type SendErrorMessageActionType = {
  type: typeof SEND_ERROR_MESSAGE;
  payload: { message: string };
};

export type MessagesActionsType = SendErrorMessageActionType | SendInfoMessageActionType;
