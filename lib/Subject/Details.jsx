import { OrgDetails } from "./OrgDetails";
import { UserDetails } from "./UserDetails";


export function Details(props) {
	return props.for?.isOrg ? (
		<OrgDetails { ...props } />
	) : (
		<UserDetails { ...props } />
	);
}
