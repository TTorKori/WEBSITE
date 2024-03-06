import { ChangeEvent, FormEvent, useState } from "react";
import supabaseClient from "../config/supabase";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [formDataError, setFormDataError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

  };

  console.log(formData);
  return (
    <>
    {formDataError && <p>Could not sign up: {formDataError}</p>}
    <form onSubmit={handleSubmit}> <input
        name="fullname"
        placeholder="Full Name"
        type="text"
        onChange={handleChange}
      />
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
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default LoginScreen;
