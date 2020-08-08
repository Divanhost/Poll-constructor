import React from 'react';
import {CustomModal} from './modal.component';
import {Login} from './login.component';
export const LoginModal = ({isOpen, clickElRef, logIn}) => (
    <CustomModal isOpen={isOpen} clickElRef={clickElRef}>
        <Login logIn={logIn}>
        </Login>
    </CustomModal>
);