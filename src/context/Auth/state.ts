import {UserProfile} from "../../interfaces/server/Auth";


export interface State {
    user?: UserProfile
    loading?: boolean

}

export const state: State = {
    loading: true
};
export default state;

