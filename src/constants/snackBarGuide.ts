import {OptionsObject} from "notistack";

const generalSnackbar: OptionsObject = {
    autoHideDuration: 2000

};
export const infoSnackbar: OptionsObject = {
    ...generalSnackbar,
    variant: 'info',
};
export const successSnackbar: OptionsObject = {
    ...generalSnackbar,
    variant: 'success',
};
export const warningSnackbar: OptionsObject = {
    ...generalSnackbar,
    variant: 'warning',
};

export const errorSnackbar: OptionsObject = {
    ...generalSnackbar,
    variant: 'error',
};