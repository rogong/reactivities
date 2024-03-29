import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button,  Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});
const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Login to NG-Events"
            color="teal"
            textAlign="center"
          />

          <Field name="email" component={TextInput} placeholder="Email" />

          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && (
           <ErrorMessage error={submitError} text='Invalid username or password'/>
          )}
          <br />
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            positive
            content="Login"
            fluid
            color='teal'
          />
       
        </Form>
      )}
    />
  );
};

export default LoginForm;
