import React from 'react';

const BtnOperator = (props) => {
    return (
        <button className="btn operator" id={props.idProp} style={{ gridArea: props.idProp }} value={props.value} onClick={props.handler}>{props.value}</button>
    )
}

export default BtnOperator;