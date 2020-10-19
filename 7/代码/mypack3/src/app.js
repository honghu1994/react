import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button,Grid } from 'semantic-ui-react'

class App extends Component {
    render() {
        return (
            <div>
                <Button primary>Primary</Button>

                <Grid relaxed columns={17}>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>
                    <Grid.Column>1</Grid.Column>

                </Grid>
            </div>
        );
    }
}

export default App;