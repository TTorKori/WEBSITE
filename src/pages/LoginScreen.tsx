import Title from "../components/Title";
import SignUpForm from "../components/SignUpForm";

const LoginScreen = () => {
  // Make states for has signed up to change the form to a log in form 

  return (
    <div className="app">
      <Title />
      <SignUpForm />
    </div>
  );
};

export default LoginScreen;
