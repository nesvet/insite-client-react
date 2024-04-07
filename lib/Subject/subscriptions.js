import { app } from "$app";


const byType = {
	users: new Set(),
	orgs: new Set()
};

export function subscribe(component) {
	const type = component.props.for.isOrg ? "orgs" : "users";
	const components = byType[type];
	
	components.add(component);
	
	if (!components.subscriptionHandler) {
		components.subscriptionHandler = (_, updated) => {
			if (updated)
				for (const component of components)
					if (updated.includes(component.props.for))
						component.setState({});
			
		};
		
		app.usersSubscriptionGroup?.on(`update.${type}`, components.subscriptionHandler);
	}
	
}

export function unsubscribe(component) {
	
	for (const type in byType) {
		const components = byType[type];
		
		if (components.delete(component)) {
			if (!components.size && components.subscriptionHandler) {
				app.usersSubscriptionGroup?.off(`update.${type}`, components.subscriptionHandler);
				
				delete components.subscriptionHandler;
			}
			
			break;
		}
	}
	
}
