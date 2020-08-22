import React from 'react';

const BtnEqualTo = (props) => {
    return (
        <button id="equals" style={{ gridArea: "equals" }} className="btn operator" onClick={props.handler}>=</button>
    )
}

export default BtnEqualTo;