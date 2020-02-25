import React from 'react';

const App: React.FC = props => {
    return <div id="content">{props.children}</div>;
};

export default App;
