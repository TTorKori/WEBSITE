import {useState} from "react";

const LoginScreen = () => {
	 
	const [formData, setFormData] = useState({
		fullname: "",
		email: "",
		password: ""
	})

	const handleChange = (event : any) => {
		setFormData((prevState) => {
			return {
				...prevState,
				[event.target.name]: event.target.value
			}
		})
	}

	 console.log(formData);
  return (
    <form>
      <input name="fullname" placeholder="Full Name"type="text" onChange={handleChange} />
      <input name="email" placeholder="Email" type="text" onChange={handleChange} />
      <input name="password" placeholder="Password" type="text" onChange={handleChange}/>
	  <button type="submit">Submit</button>
    </form>
  );
};

export default LoginScreen;
