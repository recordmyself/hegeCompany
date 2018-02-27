import { store } from './store'
export function resetCondition() {
    store.searchData = {
        name: null,
        createDate: null
    }
}
