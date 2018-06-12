import {SET_VISIBILITY_FILTER,VisibilityFilters}  from '../../action'

export default  (state=VisibilityFilters.SHOW_ALL,action)=>{
    switch (action.type){
        case SET_VISIBILITY_FILTER:
        return action.filter
        default:
        return state;
    }
}