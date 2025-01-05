import { useContext } from "react";
import UserContext from "../utils/UserContext";

const About = () => {
	const { name } = useContext(UserContext);
	return (
		<>
			<h1>About</h1>
			<h1>{name}</h1>
		</>
	);
};
export default About;
