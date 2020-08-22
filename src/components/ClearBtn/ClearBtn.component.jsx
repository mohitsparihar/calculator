import React from 'react';

const ClearBtn = (props) => {
    return (
        <button className="btn" id="clear" style={{ gridArea: "clear" }} onClick={props.handler}>C</button>
    )
}

export default ClearBtn;