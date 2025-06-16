'use client'
import React, { useState } from 'react';
import "./HeroForm.css";
import SearchIcon from '../../../public/SvgIcon/SearchIcon/SearchIcon';
import FormInput1 from '@/Reusecomponents/FormInput1/FormInput1';

const HeroForm: React.FC = () => {
    const [venue, setVenue] = useState<string>("");
    return (
        <div className='heroFormContainer'>
            <FormInput1 Icon={SearchIcon}
                placeHolder='All treatment and venues'
                value={venue}
                onChange={e => setVenue(e.target.value)}
            />
        </div>
    )
}

export default HeroForm;