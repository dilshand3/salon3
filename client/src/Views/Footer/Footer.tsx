import React from 'react';
import './Footer.css';
import Applogo from '../../../public/SVG/AppLogo/Applogo';
import AppleIcon from '../../../public/SvgIcon/AppleIcon/AppleIcon';
import FooterSection from '@/Reusecomponents/FooterSection/FooterSection';

const Footer: React.FC = () => {
    return (
        <div className='footerContainer'>
            <section className='footerBox1'>
                {/* <span> */}
                    <Applogo />
                {/* </span> */}
                <div className='downloadAppBtn'>
                    <span>Get the App</span>
                    <span>
                        <AppleIcon height='27' width='27' />
                    </span>
                </div>
            </section>
            <FooterSection/>
        </div>
    )
}

export default Footer;