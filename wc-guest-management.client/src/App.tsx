import React from 'react';

const App: React.FC = props => {
    return (
        <div id="content">
            {props.children}
            <span className="p-3" />
        </div>
    );
};

export default App;
