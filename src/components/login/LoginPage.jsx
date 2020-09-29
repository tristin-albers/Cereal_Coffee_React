import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import Button from "../customButtons/Button";
import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardHeader from "../card/CardHeader";
import CardFooter from "../card/CardFooter";
import CustomInput from "../customInput/CustomInput";

// CSS
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

// Attachments
import image from "../../assets/img/bgLogin.jpg";

// AWS Authentication
import { Auth } from "aws-amplify";


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await Auth.signIn(email, password);
      alert(" yo this is logged in now at ", email);
    } catch (e) {
      alert(e.message);
    }
  };
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    {/* input field that takes in prop for email and updates state onChange */}
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      value={email}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => setEmail(e.target.value),
                        autoFocus: true,
                        autoComplete: true,
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    {/* input field that takes in prop for password and updates state onChange */}
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value={password}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => setPassword(e.target.value),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {/* disabled button until validation is truthy */}
                    <Button 
                      simple color="primary" 
                      size="lg"
                      type="submit"
                      disabled={!validateForm()}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}