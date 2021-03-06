

import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        heigth: 600,
        margin: 'auto',
        'margin-top': '1em',
        padding: 20
    },
}));

export const CustomModal = ({ children, clickElRef, isOpen }) => {
    
    const classes = useStyles();

    const [opened, toggleModal] = useState(isOpen??false);
    const handleOpen = () => {
        toggleModal(true);
    }

    const handleClose = () => {
        toggleModal(false)
    }
    useEffect(() => {
        toggleModal(isOpen);
      }, [isOpen]);
    return (
        <div>
            <div onClick={handleOpen}>
                {clickElRef}
            </div>
            {/* <Button onClick={handleOpen}>Open</Button> */}
            <Modal className={classes.paper}
                open={opened}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <DialogContent>
                    {children}
                </DialogContent>
            </Modal>
        </div>
    )
}
