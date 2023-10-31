import React from 'react';

export default function AbsenceItem(props) {

  return (
    <div className="absence-item">
      <p className="employee-name">
        <span className="field-value">{props.name}</span>
      </p>
      <p className="absence-type">
        <span className="field-title">Type of Absence:</span>
        <span className="field-value">{props.type}</span>
      </p>
      <p className="absence-period">
        <span className="field-title">Period:</span>
        <span className="field-value">
          {props.period} {props.period > 1 ? "days" : "day"}
        </span>
      </p>
      {props.note && (
        <p className="absence-note">
          <span className="field-title">Note:</span>
          <span className="field-value">{props.note}</span>
        </p>
      )}
      {props.status && (
        <p className="absence-status">
          <span className="field-title">Status:</span>
          <span className="field-value">{props.status}</span>
        </p>
      )}
      {props.admitterNote && (
        <p className="admitter-note">
          <span className="field-title">Admitter Note:</span>
          <span className="field-value">{props.admitterNote}</span>
        </p>
      )}
    </div>
  );
}
