import todos from './todos'
import visibilityFilter from './visibilityFilter'
import { combineReducers } from 'redux'
// const todoApp = (state={},action)=>{
//     return {
//         todos:todos(state.todos,action),
//         visibilityFilter:visibilityFilter(state.visibilityFilter, action)
//     }
// }
//和上边的作用是等价的
const todoApp = combineReducers({
    visibilityFilter,
    todos
})
export default todoApp;