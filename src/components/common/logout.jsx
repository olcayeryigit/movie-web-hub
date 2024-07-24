import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineExitToApp } from 'react-icons/md';
const Logout = () => {
    const [show, setShow] = useState(false);
  

  const handleClose = () => {   setShow(false);       localStorage.removeItem('sessionData');
  }
  const handleShow = () =>{ setShow(true);    }
  return (
    <>

    <Button variant="dark" onClick={handleShow} className="rounded-0 border border-warning  d-md-flex justify-content-center align-items-center ms-1 px-0 flex-wrap py-1" size='' style={{ height: "2.1rem",width:"7rem" }}
> 
<span >Sign Out</span>
<span>  <MdOutlineExitToApp className="fs-5 ms-1 " />
</span>
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

export default Logout
