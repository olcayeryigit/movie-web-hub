import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  CloseButton,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import * as Yup from "yup";
import StoreContext from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import "./signIn.scss"
const SignInPage = () => {
  const {
    setLoggedInUser,
    currentUsers,
    isFaultyOperation,isTimeOut,
     setIsWentLoginPage
  } = useContext(StoreContext);
  const [disabled, setDisabled] = useState("");
  const [basarisizGirisUyari, setBasarisizGirisUyari] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    setIsWentLoginPage(true);

    if (isFaultyOperation) {
      navigate("/error");
    }
  });

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    currentUsers.map((item) => {
      if (
        item.userName === values.userName &&
        item.password === values.password
      ) {
        setLoggedInUser(item);
        //giriş koşulları sağlandıysa, localStorage'e ve girisYapankullanıcıya kayıt yapalım, girisyapan kullanıcı kaydedildiğinde , loginYapildi sayfasına gidilsin
        const sessionData = {
          userN: item.userName,
          password: item.password,
          id:item.id,
          loginTime: Date.now(), // Oturum başlangıç zamanını saklayın
        };
        localStorage.setItem("sessionData", JSON.stringify(sessionData));
        //
        navigate("/");

      }else{
        setBasarisizGirisUyari(true);
        formik.resetForm();
      }
      
    });
  };

 

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalid = (field) => {
    const res = formik.touched[field] && !!formik.errors[field];
    return res;
  };

  useEffect(() => {
    // console.log("formik.dirty");
    // console.log(formik.dirty);
    formik.dirty ? setDisabled("") : setDisabled("none");
  }, [formik.dirty]);

  return (
    <Container
      fluid
      className="signInContainer d-flex justify-content-center align-items-center"
 
    >


<div className="signInBackground bg-dark ">

</div>


      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="signInForm "
      >

        <h2 className="text-center pt-0">Sign In</h2>
        <p className="text-center mb-4">New user? <Link className="text-primary text-decoration-none"to="/sign-form"> Create account?</Link></p>
        {/*<div className="fs-4 fw-bold mb-2 d-flex justify-content-between text-black  ">
          <a href="/" >
            <CloseButton variant="black"/>
          </a>
        </div>*/}

        <FloatingLabel
          controlId="floatingUserName"
          label="Username"
          className="formFloatingLabel mt-2 mb-3"
        >
          <Form.Control
            type="text"
            placeholder=""
            isInvalid={isInvalid("userName")}
            {...formik.getFieldProps("userName")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="signInControl"
          />
        </FloatingLabel >

        <FloatingLabel       
 controlId="floatingPassword" label="Password" className="formFloatingLabel ">
          <Form.Control
            type="password"
            placeholder=""
            isInvalid={isInvalid("password")}
            {...formik.getFieldProps("password")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="signInControl"
          />
        </FloatingLabel>
      <div className="d-flex align-items-center gap-2 mt-3">
        <Button type="submit" disabled={disabled} className="">
          Sign In
        </Button>

        <Button as={Link} to="/">
            Cancel
          </Button>
</div>


        {basarisizGirisUyari && (
          <Alert variant="danger" className="mt-3">
            Username or password is incorrect. Please try again.
          </Alert>
        )}

{isTimeOut&& (
          <Alert variant="danger" className="mt-3">
           Your session has expired.
          </Alert>
        )}

      </Form>

    </Container>
  );
};

export default SignInPage;
