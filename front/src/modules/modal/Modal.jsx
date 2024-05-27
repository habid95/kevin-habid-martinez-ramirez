import { Modal } from 'antd'
import React from 'react'

export const CustomModal = ({content, title, isModalOpen, setIsModalOpen,}) => {

    const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    

    return (
        <Modal
            width={800}
            title={title}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            {content}
        </Modal>
    )
}
