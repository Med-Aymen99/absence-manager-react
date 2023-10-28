import React from "react";

export default function AbsenceItem(props) {

    return (
        <div className="absence-info" >
            <p className="employee-name">{props.name}</p>
            <p className="absence-type">Type of absence: {props.type}</p>
            <p className="absence-period">Period : {props.period} {props.period > 1 ? "days" : "day"} </p>
            {props.note && <p className="absence-note">Note : {props.note}</p>}
            {props.status && <p className="absence-status">Status : {props.status}</p>}
            {props.admitterNote && <p className="admitter-note">Admitter note : {props.admitterNote}</p>}
        </div>
    )
}