import React from 'react';

const BtnNum = (props) => {
    return (
        <button className="btn number" id={props.idProp} style={{ gridArea: props.idProp }} value={props.value} onClick={props.handler}>{props.value}</button>
    )
};

export default BtnNum;