export type keyEventInputType = "UP"|"DOWN"|"SELECT"|"CALL"|"RECORD"

const keyOptions = {
    "UP":"w",
    "DOWN": "s",
    "SELECT": "d",
    "CALL":"Enter",
    "RECORD":"Ctrl"
}

export function getKeyEventValue(value:keyEventInputType){
    return keyOptions[value]

}