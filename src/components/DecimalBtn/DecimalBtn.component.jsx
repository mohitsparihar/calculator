import React from 'react';

const DecimalBtn = (props) => {
    return (
        <button className="btn operator" id="decimal" style={{ gridArea: "decimal" }} onClick={props.handler}>.</button>
    )
}

export default DecimalBtn;