import React from 'react';

const SelectBox = () => {
    return (
        <div>
            <label>Select Query</label>
            <select name="amazon" id="rev">
            <option value="AmazonByyears">AmazonByyears</option>
            <option value="AamzonBasicsByYears">AamzonBasicsByYears</option>
            </select>
        </div>
    );
}

export default SelectBox;
