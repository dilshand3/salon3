import React from 'react';
import './FormInput1.css';

interface IformInput1 {
    Icon: React.FC;
    placeHolder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput1: React.FC<IformInput1> = ({ Icon, placeHolder, value, onChange }) => {
    return (
        <div className='forminput1Container'>
            <input
                type='text'
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
            />
            <span className='forminput1Icon'>
                <Icon />
            </span>
        </div>
    )
}

export default FormInput1