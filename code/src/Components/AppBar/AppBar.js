import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
const Bar = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6">
                    Trello-Like-Task
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default Bar;