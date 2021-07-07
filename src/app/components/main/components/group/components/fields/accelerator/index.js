'use strict';

import React from 'react';

const AcceleratorField = ({field, value, onChange, ...props}) => {
  	const [keys, setKeys] = React.useState([]);
  	const [keyCount, setKeyCount] = React.useState(0);

	const handleKeyDown = (event) => {

        event.preventDefault();

        if (keyCount <= 0) {
            setKeys([]);
        }

        if (keys.indexOf(event.key) === -1) {
            keys.push(event.key);
            setKeyCount(keyCount + 1);
        }

        mapAccelerator(keys);

    }

    const handleKeyUp = (event) => {

        event.preventDefault();
        setKeyCount(keyCount - 1);
        mapAccelerator(keys);

    }

    const mapAccelerator = (keys) => {

        const arr = keys.map((item) => {
            if (item === ' ') return "Space";
            if (item === '+') return "Plus";
            if (/^[a-z]$/.test(item)) return item.toUpperCase();
            return item;
        });

        onChange(arr.join("+"));

    }

  return (
        <div className="field field-accelerator">
            <div className="field-label">{ field.label }</div>
            <input type="text" value={ value || '' } onKeyDown={ handleKeyDown } onKeyUp={ handleKeyUp } readOnly />
            { field.help && <span className="help">{ field.help }</span> }
        </div>
  );
};

export default AcceleratorField;
