import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineExitToApp } from 'react-icons/md';
const Logout2 = () => {
    const [show, setShow] = useState(false);
  

  const handleClose = () => {   setShow(false);       localStorage.removeItem('sessionData');
  }
  const handleShow = () =>{ setShow(true);    }
  return (
    <>

    <Button variant="light" onClick={handleShow} className=" ms-1 flex-wrap py-1" size='md' 
> 
<span className='fs-6' >Sign Out</span>

</Button>   

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to sign out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={handleClose} href="/">
         Yes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default Logout2
