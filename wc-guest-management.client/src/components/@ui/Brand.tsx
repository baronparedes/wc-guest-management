import logo from '@assets/img/wc-logo.png';
import classnames from 'classnames';
import React from 'react';
import { Image } from 'react-bootstrap';

const Brand: React.FC<{
    fluid?: boolean;
    height?: string;
    className?: string;
}> = (props) => {
    return (
        <div>
            <Image
                className={classnames(
                    'text-center mx-auto d-block',
                    props.className,
                    props.fluid ? 'img-fluid' : ''
                )}
                src={logo}
                height={props.height}
                alt="brand"
            />
        </div>
    );
};

Brand.defaultProps = {
    height: '300px',
};

export default Brand;
