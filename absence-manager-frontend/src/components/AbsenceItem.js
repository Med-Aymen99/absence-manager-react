import React from 'react';
import { generateICalData } from '../utils/helperFunctions';
import {saveAs} from 'file-saver';

export default function AbsenceItem(props) {

 

  const handleDownload = () => {
    const iCalData = generateICalData(props);
    console.log("iCalData :", iCalData);
    const blob = new Blob([iCalData], { type: 'text/calendar' });
    saveAs(blob, `${props.name}-absence.ics`);
  }


  const colorClass = props.status === 'Confirmed' ? 'green' 
    : props.status === 'Rejected' ? 'red'
    : 'yellow';

  return (
    <div className={`absence-item ${colorClass}-item`}>
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
      <button className='save-iCal-button' onClick={handleDownload}>Dwonload iCal</button>
      
    </div>
  );
}
