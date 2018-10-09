import React from 'react'

export default props => {
    if (props.teste) {
        const Verdadeiro = props.verdadeiro
        return (<Verdadeiro {...props}/>)
    } else {
        const Falso = props.falso
        return (<Falso {...props}/>)
    }
}