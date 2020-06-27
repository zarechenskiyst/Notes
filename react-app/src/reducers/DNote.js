import {ACTION_TYPES} from "../actions/DNote";
const initialState ={
    list:[]
}

export const DNote =(state=initialState, actions)=>{
    switch (actions.type){
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list:[...actions.payload]
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, actions.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.id == actions.payload.id ? actions.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id != actions.payload)
            }
        default:
            return state
    }
}