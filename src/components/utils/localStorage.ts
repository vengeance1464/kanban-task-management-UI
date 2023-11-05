import { RootState } from "../../redux/store";

function saveToLocalStorage(state:RootState) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch(e) {
        console.warn(e);
        return undefined;
    }
}


export {loadFromLocalStorage,saveToLocalStorage}