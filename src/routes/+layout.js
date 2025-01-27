export const ssr = false;
export const load = ({ params }) => {
	return { pathname: params.id }; // Use 'id' if your route is '/[id]/'
};
