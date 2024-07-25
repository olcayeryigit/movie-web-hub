import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import StoreContext from "../../../../../store";
import { updateUser, deleteUser } from "../../../../../helper/api";
import { useNavigate } from "react-router-dom";
import "./settings-form.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi";
import userImage from "../../../../../images/2.png"
import { GoPencil } from "react-icons/go";
const SettingsForm = () => {
  const { currentUser, currentUsers, setCurrentUser, update2, setUpdate2 } =
    useContext(StoreContext);
  const [isClickDelete, setIsClickDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteWithPassword, setDeleteWithPassword] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(
    "Please enter your password to delete your account."
  );
  const formRef = useRef(null);

  const navigate = useNavigate();
//
const[formTextClassName,setFormTextClassName]=useState("text-danger");




  //UserName
  const [u, setU] = useState("");
  const [editUserName, setEditUserName] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [messageUN, setMessageUN] = useState("");
  const [isAvailableUN, setIsAvailableUN] = useState("disabled");
  //FirstName
  const [editFirstName, setEditFirstName] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [isAvailableFN, setIsAvailableFN] = useState("disabled");
  const [messageFN, setMessageFN] = useState("");

  //LastName
  const [editLastName, setEditLastName] = useState(false);
  const [newLastName, setNewLastName] = useState("");
  const [messageLN, setMessageLN] = useState("");
  const [isAvailableLN, setIsAvailableLN] = useState("disabled");
  //Email
  const [e, setE] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [messageE, setMessageE] = useState("");
  const [isAvailableE, setIsAvailableE] = useState("disabled");

  //Password
  const [pStar, setPstar] = useState("");
  const [p, setP] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [messageP, setMessageP] = useState("");
  const [isAvailableP, setIsAvailableP] = useState("disabled");
  const [inputType, setInputType] = useState("password");
  //
  const [display, setDisplay] = useState("");
  const [controlDisabled, setControlDisabled] = useState("");
  
  ///

  useEffect(()=>{
    if(messageUN.includes("valid")||messageP.includes("valid")||messageE.includes("valid")){
    setFormTextClassName("text-success")
    }
    else{
      setFormTextClassName("text-danger");
    }

    },[messageUN,messageP,messageE])

  //***************/
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset(); // Formun tüm kontrol elemanlarını sıfırlar
    }
  };
  //DELETEACCOUNT//
  const handleClickDelete = () => {
    setIsClickDelete(true);
    setDisplay("d-none");

  };

  const handleClickCancelDelete = () => {
    setIsClickDelete(false);
    setDisplay("");

  };

  const handleChangeDelete = (e) => {
    if(e.target.value==""){
      setControlDisabled("disabled");
    }
    else{
      setControlDisabled("");
    
    }

    //console.log(e.target.value);
    setDeleteWithPassword(e.target.value);



  };

  const handleClickDeleteOperation = () => {
    setIsDeleted(true);
  };

  useEffect(() => {
    if (isDeleted && deleteWithPassword) {
      console.log(deleteWithPassword);
      console.log(currentUser.password);

      if (deleteWithPassword == currentUser.password) {
        const deleteUserById = async () => {
          await deleteUser(currentUser.id);
        };

        deleteUserById();
        localStorage.removeItem("sessionData");
        setCurrentUser(null);
        setUpdate2((prev) => !prev);
        navigate("/");
      } else {
        handleReset();
        console.log("Deletion failed, you entered the wrong password.");
        setDeleteMessage("Deletion failed, you entered the wrong password.");
        setIsDeleted(false);
      }
    }
  }, [isDeleted, deleteWithPassword]);

  //***************/

  //USERNAME

  useEffect(() => {
    if (currentUser) {
      setU(currentUser.userName);
    }
  }, [currentUser]);

  const handleClickUN = () => {
    setEditUserName((prev) => !prev);
    setDisplay("d-none");
  };

  const handleClickUNAbort= () => {
    setEditUserName((prev) => !prev);
    setMessageUN("");
    setDisplay("");
  };
  const handleChangeUN = (e) => {
    setNewUserName(e.target.value);
  };

  useEffect(() => {
    let usersUN = [];

    if (currentUsers && newUserName) {
      currentUsers.map((item) => {
        console.log(item.userName);
        console.log(currentUsers);
        usersUN = [...usersUN, item.userName];
      });

      console.log(usersUN);

      if (usersUN.includes(newUserName)) {
        if (newUserName == currentUser.userName) {
          setIsAvailableUN("disabled");
          setMessageUN("Please try a different username from your previous one.");
        } else {
          setMessageUN("This username is already taken.");
        }
      }

      if (!usersUN.includes(newUserName)) {
        if (newUserName.length < 3 || newUserName.length > 15) {
          setMessageUN(
            "Your username can be a maximum of 20 characters and a minimum of 3 characters."
          );
          setIsAvailableUN("disabled");
        } else {
          setMessageUN("Username is valid");
          setIsAvailableUN("");
        }
      }
    }
  }, [currentUsers, currentUser, newUserName]);

  const handleClickUNSend = () => {
    //update isLemi yapilsin

    if (currentUser && newUserName) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          userName: newUserName,
        });
        setUpdate2((prev) => !prev);
      };
      setDisplay("");
      UpdateUserById();

    }

    //updateten sonra ok cancel butonları kaybolsun
    setEditUserName((prev) => !prev);
  };

  //FİRSTNAME
  const handleClickFN = () => {
    setEditFirstName((prev) => !prev);
    setDisplay("d-none");

  };
  const handleClickFNAbort = () => {
    setEditFirstName((prev) => !prev);
    setDisplay("");

  };
  const handleChangeFN = (e) => {
    setMessageFN("");
    setNewFirstName(e.target.value);
    
  };

  useEffect(() => {
    if(!newFirstName){
      setIsAvailableFN("disabled");
    }



    if (currentUser && newFirstName) {
      if (newFirstName == currentUser.firstName) {
        setIsAvailableFN("disabled");
        setMessageFN("Please try a different firstname from your previous one.");
      } else {
        setIsAvailableFN("");
      }
    }
  }, [currentUsers, currentUser, newFirstName]);

  const handleClickFNSend = () => {
    //update isLemi yapilsin
    if (currentUser && newFirstName) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          firstName: newFirstName,
        });
        setUpdate2((prev) => !prev);
      };
      setDisplay("");
      UpdateUserById();

    }

    //updateten sonra  ok cancel butonları kaybolsun
    setEditFirstName((prev) => !prev);
  };

  //LASTTNAME
  const handleClickLN = () => {
    setDisplay("d-none");
    setEditLastName((prev) => !prev);


  };
  const handleClickLNAbort = () => {
    setEditLastName((prev) => !prev);
    setDisplay("");

  };
  const handleChangeLN = (e) => {
    setMessageLN("");

    setNewLastName(e.target.value);
  };

  useEffect(() => {

if(!newLastName){
  setIsAvailableLN("disabled");
}

    if (currentUser && newLastName) {



      if (newLastName == currentUser.lastName) {
        setIsAvailableLN("disabled");
        setMessageLN("Please try a different username from your previous one.");
      } else {
        setIsAvailableLN("");
      }
    }
  }, [currentUsers, currentUser, newLastName]);

  const handleClickLNSend = () => {
    //update isLemi yapilsin
    if (currentUser && newLastName) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          lastName: newLastName,
        });
        setUpdate2((prev) => !prev);
      };
      setDisplay("");

      UpdateUserById();

    }

    //updateten sonra  ok cancel butonları kaybolsun
    setEditLastName((prev) => !prev);


  };

  //EMAİL

  useEffect(() => {
    if (currentUser) {
      setE(currentUser.email);
    }
  }, [currentUser]);

  const handleClickE = () => {
    setEditEmail((prev) => !prev);
    setDisplay("d-none");

  };
  const handleClickEAbort= () => {
    setMessageE("");
    setEditEmail((prev) => !prev);
    setDisplay("");

  };
  const handleChangeE = (e) => {
    setNewEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    let usersE = [];

    if (currentUsers && newEmail) {
      currentUsers.map((item) => {
        console.log(item.email);
        console.log(currentUsers);
        usersE = [...usersE, item.email];
      });

      console.log(usersE);

      if (usersE.includes(newEmail)) {
        if (newEmail == currentUser.email) {
          setIsAvailableE("disabled");

          setMessageE("Please try a different email from your previous one.");
        } else {
          setMessageE("Please try a different email from your previous one.");
        }
      }

      if (!usersE.includes(newEmail)) {
        if (!validateEmail(newEmail)) {
          setMessageE("Please enter a text in email format");
          setIsAvailableE("disable");
        } else {
          setMessageE("Email is valid");
          setIsAvailableE("");
        }
      }
    }
  }, [currentUsers, currentUser, newEmail]);

  const handleClickESend= () => {
    //update isLemi yapilsin
    if (currentUser && newEmail) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          email: newEmail,
        });
        setUpdate2((prev) => !prev);
      };
      setDisplay("");

      UpdateUserById();
    }

    //updateten sonra ok cancel butonları kaybolsun
    setEditEmail((prev) => !prev);
  };

  //PASSWORD

  //password-show-hide-input**t**
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
  };
  //password-show-hide-input****

  //label için önceki psswordu yildiz yapalim
  const createStars = (pd) => {
    let y = "";
    for (let i = 0; i < pd.length; i++) {
      y = y + "*";
    }
    return y;
  };

  useEffect(() => {
    if (currentUser) {
      const starsPassword =createStars(currentUser.password);

      setPstar(starsPassword);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setP(currentUser.password);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUsers && newPassword) {
      if (newPassword == currentUser.password) {
        setIsAvailableP("disabled");
        setMessageP("Please enter a different password from your previous one.");
      }
      if (newPassword != currentUser.password) {
        if (newPassword.length < 8 || newPassword.length > 20) {
          setMessageP("The password can be a maximum of 20 characters and a minimum of 8 characters.");
          setIsAvailableP("disabled");
        } else {
          setIsAvailableP("");
          setMessageP("Password is valid");
        }
      }
    }
  }, [currentUsers, currentUser, newPassword]);

  const handleClickP = () => {
    setEditPassword((prev) => !prev);
    setDisplay("d-none");

  };
  const handleClickPAbort = () => {
    setEditPassword((prev) => !prev);
    setDisplay("");

  };

  const handleClickPSend = () => {
    //update isLemi yapilsin

    if (currentUser && newPassword) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          password: newPassword,
        });
        setUpdate2((prev) => !prev);
      };
      setDisplay("");
      UpdateUserById();
    }

    //updateten sonra  ok cancel butonları kaybolsun
    setEditPassword((prev) => !prev);
  };

  if (currentUser)
    return (

      <Container className="p-0 m-0">
      <Container className="editFormContainer pt-4 pb-5 d-flex justify-content-center align-items-center  ">




        <Form
          ref={formRef}
          className="formEdit py-4 d-flex flex-column justify-content-start align-items-center text-center rounded-3"
        >




<div className="userImage ">
  <img className="img-fluid "  src={userImage} />
  </div>



          {/**USERNAME */}
          <Form.Group
            className=" mt-2 mb-1 d-flex flex-column "
            controlId="formBasicEmail"
          >
            <div className="d-flex gap-2">
            

              {!editUserName ? (
                <Form.Label className="editLabel d-flex justify-content-center align-items-center rounded gap-1">
                  @{u}
                  <Button
                    className={`editİcon text-dark  border-0 p-0 ${display}`}
                    onClick={handleClickUN}
                  >
                    <GoPencil className="mb-1 me-1 text-primary "/>
                  </Button>
                </Form.Label>
              ) : (
                <div className="d-flex flex-column ">
                  <div className="d-flex">
                    <Form.Control

                      type="text"
                      placeholder="Enter your username"
                      className="editFormControl border border-0 rounded rounded-0  "
                      defaultValue=""
                      onChange={(e) => handleChangeUN(e)}
                    />
                  </div>

   <Form.Text className={`formText text-start ${formTextClassName} `}>{messageUN}</Form.Text>

                   



                  <div className="d-flex mt-1 gap-1">
                    <Button
                      className=" m-0 px-4 py-1"
                      onClick={handleClickUNSend}
                      disabled={isAvailableUN}
                      size="dm"
                    >
                      Update
                    </Button>
                    <Button
                                        variant="danger"

                      className="py-1 m-0 px-4"
                      onClick={handleClickUNAbort}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div></div>
                </div>
              )}
            </div>
          </Form.Group>
          {/**FİRSTNAME */}

          <Form.Group
            className="mb-2 d-flex flex-column "
            controlId="formBasicEmail"
          >
            <div className="d-flex gap-2">
              <Form.Label className="editLabel2 rounded text-black ">Firstname</Form.Label>

              {!editFirstName ? (
                <Form.Label className="editLabel rounded d-flex justify-content-between align-items-center">
                  {currentUser.firstName[0].toUpperCase()}
                  {currentUser.firstName.slice(1)}{" "}
                  <Button
                    className={`editİcon text-dark border-0 ms-5 p-0 ${display}`}
                    onClick={handleClickFN}
                  >
                    <GoPencil className="mb-1 me-1 text-primary "/>
                    </Button>
                </Form.Label>
              ) : (
                <div className="d-flex flex-column">

                  
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="editFormControl border border-0 rounded rounded-0   "
                    defaultValue=""
                    onChange={(e) => handleChangeFN(e)}
                  />

<Form.Text className={`formText text-start ${formTextClassName} `}>{messageFN}</Form.Text>

                  <div className="d-flex  gap-1 mt-2">


                    <Button
                      className="py-1 m-0 px-4"
                      onClick={handleClickFNSend}
                      disabled={isAvailableFN}
                      size="sm"
                    >
                      Update
                    </Button>
                    <Button
                                        variant="danger"

                      className="py-1 m-0 px-4"
                      onClick={handleClickFNAbort}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Form.Group>

          {/**LASTNAME */}

          <Form.Group
            className="mb-2 d-flex flex-column "
            controlId="formBasicEmail"
          >
            <div className="d-flex gap-2">
              <div className="editLabel2 rounded text-black">Lastname</div>

              {!editLastName ? (
                <Form.Label className="editLabel rounded  d-flex justify-content-between align-items-center ">

                  {currentUser.lastName[0].toUpperCase()}
                  {currentUser.lastName.slice(1)}{" "}

                  <Button
                    className={`editİcon text-dark  border-0 ms-5 p-0 ${display}`}
                    onClick={handleClickLN}
                  >
                    <GoPencil className="mb-1 me-1 text-primary "/>
                    </Button>
                </Form.Label>
              ) : (
                <div className="d-flex flex-column">
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="editFormControl border border-0 rounded rounded-0 "
                    defaultValue=""
                    onChange={(e) => handleChangeLN(e)}
                  />


<Form.Text className={`formText text-start ${formTextClassName} `}>{messageLN}</Form.Text>

                  <div className="d-flex gap-1 mt-2">
                


                    <Button
                      className="py-1 m-0 px-4"
                      onClick={handleClickLNSend}
                      disabled={isAvailableLN}
                      size="sm"
                    >
Update         
           </Button>
                    <Button
                                        variant="danger"

                      className="py-1 m-0 px-4"
                      onClick={handleClickLNAbort}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Form.Group>

          {/**EMAİL */}
          <Form.Group
            className="mb-2 d-flex flex-column "
            controlId="formBasicEmail"
          >
            <div className="d-flex gap-2">
              <Form.Label className="editLabel2 rounded text-black">Email</Form.Label>

              {!editEmail ? (
                <Form.Label className="editLabel rounded  d-flex justify-content-between align-items-center">
                  {e}
                  <Button
                    className={`editİcon text-dark border-0 p-0 ${display}`}
                    onClick={handleClickE}
                  >
                    <GoPencil className="mb-1 me-1 text-primary "/>
                    </Button>
                </Form.Label>
              ) : (
                <div className="d-flex flex-column ">
                  <div className="d-flex flex-column ">
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="editFormControl border border-0 rounded rounded-0 "
                      defaultValue=""
                      onChange={(e) => handleChangeE(e)}


                    /><Form.Text className={`formText text-start ${formTextClassName} `}>{messageE}</Form.Text>
                    <div className="d-flex mt-1 gap-1">
                      <Button
                        className="p-0 m-0 px-4"
                        onClick={handleClickESend}
                        disabled={isAvailableE}
                        size="sm"
                      >
Update                      </Button>
                      <Button
                                          variant="danger"

                        className="py-1m-0 px-4"
                        onClick={handleClickEAbort}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  
                  <div></div>
                </div>
              )}
            </div>
          </Form.Group>

          {/**PASSWORD */}

          <Form.Group
            className="mb-2 d-flex flex-column"
            controlId="formBasicEmail"
          >
            <div className="d-flex gap-2">
              <Form.Label className="editLabel2 rounded text-black  ">
                Password
              </Form.Label>

              {!editPassword ? (
                <Form.Label className="editLabel rounded  d-flex justify-content-between align-items-center">
                  {pStar}
                  <Button
                    className={`editİcon text-dark border-0 ms-5 p-0 ${display}`}
                    onClick={handleClickP}
                  >
                    <GoPencil className="mb-1 me-1 text-primary "/>
                    </Button>
                </Form.Label>
              ) : (
                <div className="d-flex flex-column ">
                  <div className="d-flex">
                    <Form.Control
                      type={inputType}
                      className="editFormControlPassword border border-0 rounded rounded-0 "
                      defaultValue=""
                      onChange={handlePasswordChange}

                    />

                    <button
                      className="hideShowButton bg-white border border-0 "
                      type="button"
                      onClick={(e) => togglePasswordVisibility(e)}
                    >
                      {inputType === "password" ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                  </div>             
                       <Form.Text className={`formText text-start ${formTextClassName} `}>{messageP}</Form.Text>

                  <div className="d-flex mt-1 gap-1">
                    <Button
                      className="p-0 m-0 px-4"
                      onClick={handleClickPSend}
                      disabled={isAvailableP}
                      size="sm"
                    >


                     Update
                    </Button>
                    <Button
                    variant="danger"
                      className="py-1 m-0 px-4"
                      onClick={handleClickPAbort}
                      size="sm"
                    >
                      Cancel
                    </Button>

                  </div>

                  <div></div>
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="groupDelete p-1 rounded text-start mt-2 ">
            {!isClickDelete && (
              <Button
                variant="danger"
                className={`${display} py-2 ms-2 mt-4 `}
                onClick={handleClickDelete}
                size="sm"
              >
                Delete My Account
              </Button>
            )}
            {isClickDelete && (
              <span className="d-flex flex-column gap-1">
                <span className="deleteMessage p-2 bg-light">
                  {deleteMessage}
                </span>

                <div className="d-flex">
                  <Form.Control
                    type={inputType}
                    className="deleteFormControl border border-0 rounded rounded-0 bg-white"
                    onChange={(e) => handleChangeDelete(e)}

                  />

                  <button
                    type="button "
                    className="bg-white border border-0 fs-5 "
                    onClick={togglePasswordVisibility}
                  >
                    {inputType === "password" ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                </div>

                <span className="mt-1">
                  <Button className="" onClick={handleClickDeleteOperation} size="sm" disabled={controlDisabled} >
                    Delete Account
                  </Button>
                  <Button                     variant="danger"
 className="ms-1" onClick={handleClickCancelDelete} size="sm">
                    Cancel
                  </Button>
                </span>
              </span>
            )}
          </Form.Group>
        </Form>
      </Container>
      </Container>
    );
};

export default SettingsForm;
