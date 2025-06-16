import React from 'react';
import './FooterSection.css';

const FooterSection: React.FC = () => {
    return (
        <div className='footerSectionContainer'>
            <h4>About Fresha</h4>
            <ul className='footerSectionList'>
                <li>Careers</li>
                <li>Help and support</li>
                <li>Blog</li>
                <li>Sitemap</li>
            </ul>
        </div>
    )
}

export default FooterSection;