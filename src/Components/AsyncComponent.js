import React from 'react';

export default (component) => {
    return class AsyncComponent extends React.Component {
        constructor() {
            super();
            this.state = {
                component: null
            }
        }


        async componentWillMount() {
            const nodes = await component();
            console.log(nodes)
            this.setState({
                component: nodes
            })
        }

        render() {
            const Ele = this.state.component;
            return Ele ? <Ele /> : null
        }
    }
}