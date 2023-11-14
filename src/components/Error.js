import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	return (
		<div className="error-page">
			<h2>
				{error.status} <span>{error.statusText}</span>
			</h2>
			<h1>{error.data}</h1>
		</div>
	);
};

export default Error;
