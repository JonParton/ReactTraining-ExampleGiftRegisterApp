import { initGift } from './../models/gift';
import { atom } from "recoil";

export const addEditGiftDialogOpenAtom = atom({
    key: 'addEditGiftDialogOpen', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

export const giftToBeEditedAtom = atom({
  key: 'giftToBeEdited', // unique ID (with respect to other atoms/selectors)
  default: initGift(), // Use our blank Gift object as the initial value. 
});
