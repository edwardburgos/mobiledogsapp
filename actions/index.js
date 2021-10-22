export function changeName(name) {
    return {
        type: 'MODIFY_NAME',
        name
    }
}

export function setClickedNumber(clickedNumber) {
    return {
        type: 'SET_CLICKED_NUMBER',
        clickedNumber
    }
}

export function receiveDogs(dogs) {
    return {
        type: 'RECEIVE_DOGS',
        dogs
    }
}

export function receiveFullDogs(dogs) {
    return {
        type: 'RECEIVE_FULL_DOGS',
        dogs
    }
}

export function changePage(actualPage) {
    return {
        type: 'CHANGE_PAGE',
        actualPage
    }
}

export function receiveTemperaments(temperaments) {
    return {
        type: 'RECEIVE_TEMPERAMENTS',
        temperaments
    }
}

export function deleteCreationMessage() {
    return {
        type: 'DELETE_CREATION_MESSAGE'
    }
}

export function saveCreationMessage(message) {
    return {
        type: 'SAVE_CREATION_MESSAGE',
        message
    }
}

export function modifyFinalResult(finalResult) {
    return {
        type: 'MODIFY_FINAL_RESULT',
        finalResult
    }
}