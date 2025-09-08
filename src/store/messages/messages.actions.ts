import { SEND_ERROR_MESSAGE, SEND_INFO_MESSAGE } from './messages.constants';
import type { SendErrorMessageActionType, SendInfoMessageActionType } from './messages.types';

export const sendErrorMessage = (message: string): SendErrorMessageActionType => ({
  type: SEND_ERROR_MESSAGE,
  payload: { message },
});

export const sendInfoMessage = (message: string): SendInfoMessageActionType => ({
  type: SEND_INFO_MESSAGE,
  payload: { message },
});
