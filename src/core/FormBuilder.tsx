import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

import { BuilderProps } from './types/BuilderProps';
import { BuilderBlock } from './types/BuilderBlock';
import BlockConfigurator from './blockconfig/BlockConfigurator';

class FormBuilder extends React.Component<BuilderProps, any> {

    render() {
        const blockRenderedViewContainer = this.props.data.blocks.map((block, idx: number) => {
            const blockComponent = this.props.registry[block.type].handler;
            const { iconClass, title } = this.props.registry[block.type];
            return (<BlockConfigurator key={idx} title={title} iconClass={iconClass} block={blockComponent} data={block.data}></BlockConfigurator>)
        });
        const blockToolViewContainer = Object.keys(this.props.registry).map((key, idx) => {
            const config = this.props.registry[key];
            return (<Paper style={{margin: '16px', padding: '8px'}} key={idx}><Grid container alignItems={'center'}><Icon>{config.iconClass}</Icon><h3>{config.title}</h3></Grid></Paper>)
        });
        return (
            <Grid container spacing={3}>
                <Grid item xs={8}>{blockRenderedViewContainer}</Grid>
                <Grid item xs={4}>{blockToolViewContainer}</Grid>
            </Grid>
        );
    }
}

export default FormBuilder;
