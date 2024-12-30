import { useState, useImperativeHandle, forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button style={{ margin: '8px' }} onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                <button
                    style={{ marginBottom: '8px' }}
                    onClick={toggleVisibility}
                >
                    Hide
                </button>
                {props.children}
            </div>
        </div>
    );
});

Togglable.displayName = 'Togglable';

export default Togglable;
