import { ChangeEvent, FormEvent, useState } from "react";
import supabaseClient from "../config/supabase";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [formDataError, setFormDataError] = useState<string>("");
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fullname: formData.fullname,
        },
      },
    });

    if (error) {
      setFormDataError(error.message);
      throw error;
    }

    alert("Check your email for verification link");
    console.log(data);
    navigate("/store");
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setFormDataError(error.message);
      throw error;
    }

    navigate("/store");
  };

  // TODO: This should function make the button change from sign in to log in and vice versa
  const handleSwitchToLogin = () => {
	 setHasSignedUp(prevState => !prevState);
  };

  console.log(formData);
  return (
    <>
      {formDataError && <p>Could not sign up: {formDataError}</p>}
      <form onSubmit={hasSignedUp ? handleSignIn: handleSignUp}>
        { !hasSignedUp && <input 
          name="fullname"
          placeholder="Full Name"
          type="text"
          onChange={handleChange}
        />}
        <input
          name="email"
          placeholder="Email"
          type="text"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">{hasSignedUp ? "LOG IN" : "SIGN UP"}</button>
      </form>
		<p>
			{hasSignedUp ? "Need to sign up? " : "Already signed up? "  }
			<span className="login" onClick={handleSwitchToLogin}>
				{hasSignedUp ? "SIGN UP" : "LOG IN"}
			</span>
		</p>
      {/*TODO:  Add convert form to log in form if user already has account */}
      {/* <LoginButton onClick={handleLogIn}>
        {isLoggedIn ? "LOG OUT" : "LOGIN"}
      </LoginButton> */}
    </>
  );
};

export default SignUpForm;
