'use client'
import { useState } from "react";

interface ModalProps {
    initialOpen?: boolean;
}

const modalState = ({ initialOpen = false }: ModalProps = {}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return {
        isModalOpen,
        openModal,
        closeModal
    }
};


export default modalState;
