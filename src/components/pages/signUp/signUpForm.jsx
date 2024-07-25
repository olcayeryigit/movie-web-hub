import { useFormik } from "formik";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { createUser, getUser } from "../../../helper/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../../../store";
import "./signUpForm.scss";
const SignUpForm = () => {
  const {
    setRegisteredUser,
    setIsWentRegistrationPage,
    currentUsers,
    isFaultyOperation,
    setUpdate2,
    signUpUserName,
    setSignUpUserName,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [isFailedRegistration, setIsFailedRegistration] = useState(false);

  useEffect(() => {
    setIsWentRegistrationPage(true);
    if (isFaultyOperation) {
      navigate("/error");
    }
  }, []);

  //1-INITIAL VALUES
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  };
  //2-VALIDATIONSCHEMA

  const userNames = [];
  currentUsers.map((item) => {
    userNames.push(item.userName);
  });
  //console.log(kullaniciIsimleri);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    userName: Yup.string()
      .max(20, "Max 20 chars.")
      .min(3, "Min 3 chars.")
      .required("Required")
      //kulanicilardaki kullanici isimleri ile, userName alınamasın
      .notOneOf(
        userNames,
        "This username is already taken." 
      ),
    //
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .max(20, "Max 20 chars.")
      .min(8, "Min 8 chars.")

      .required("Required"),
  });

  //3-ONSUBMIT
  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await createUser(values);
    } catch (error) {
      console.log("Kayıt islemi basarisiz");
      navigate("/registrationfailed");
      setIsFailedRegistration(true);
    }

    if (!isFailedRegistration) {
      setRegisteredUser(values);
      setSignUpUserName(formik.values.userName);
      formik.resetForm();
      setUpdate2((prev) => !prev);
      navigate("/registrationsuccessful"); 

    }
  };

  //üçünü birleştirme
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInValid = (field) => {
    const res = formik.touched[field] && !!formik.errors[field];
    return res;
  };


  return (
    <Container
      fluid
      className="formContainer d-flex flex-column justify-content-center align-items-center"
    >
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="signUpForm rounded-2 px-4 "
      >
        <div className="signUpHead mb-4 mt-2 fw-bold text-center">Sign Up</div>

        <Form.Group className="" controlId="formGroupFirstName">
          <Form.Label className="signUpLabel">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            {...formik.getFieldProps("firstName")}
            isInvalid={isInValid("firstName")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="" controlId="formGroupLastName">
          <Form.Label className="signUpLabel">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            {...formik.getFieldProps("lastName")}
            isInvalid={isInValid("lastName")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="" controlId="formGroupUserName">
          <Form.Label className="signUpLabel">User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            {...formik.getFieldProps("userName")}
            isInvalid={isInValid("userName")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.userName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="" controlId="formGroupEmail">
          <Form.Label className="signUpLabel">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            {...formik.getFieldProps("email")}
            isInvalid={isInValid("email")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="" controlId="formGroupPassword">
          <Form.Label className="signUpLabel">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            {...formik.getFieldProps("password")}
            isInvalid={isInValid("password")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex align-items-center gap-2 mt-4 mb-3">
          <Button type="submit" size="sm">
            {formik.isSubmitting ? <Spinner size="sm" /> : "Send"}
          </Button>

          <Button variant="danger" as={Link} to="/" size="sm">
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpForm;
