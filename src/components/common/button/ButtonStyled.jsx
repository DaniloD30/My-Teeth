import React from 'react';

import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        // textTransform: 'capitalize',
        flex: 1,
        margin: '5px',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

const ButtonStyled = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.root}
            {...props}
        >
            {props.children}
        </Button>
    );
}

export default ButtonStyled;