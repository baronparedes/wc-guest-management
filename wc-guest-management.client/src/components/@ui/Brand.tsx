import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../@assets/img/wc-logo.png';

const Brand: React.FC<{
    fluid?: boolean;
    height?: string;
}> = props => {
    return (
        <div>
            <Image
                className={`text-center mx-auto d-block${
                    props.fluid ? ' img-fluid' : ''
                }`}
                src={logo}
                height={props.height}
                alt="wc logo"
            />
        </div>
    );
};

Brand.defaultProps = {
    height: '300px'
};

export default Brand;
