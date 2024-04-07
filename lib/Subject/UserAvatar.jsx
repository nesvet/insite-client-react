import { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { clsx } from "clsx";
import { classes } from "./Avatar";
import { subscribe, unsubscribe } from "./subscriptions";


export class UserAvatar extends Component {
	
	render() {
		
		const {
			className,
			for: subject = {},
			online = true,
			tooltip = true,
			size = "m",
			disableAutoUpdate,
			...restProps
		} = this.props;
		
		const {
			initials = "?",
			avatarUrl,
			isOnline
		} = subject;
		
		let avatar = (
			<div className={clsx(
				classes.root,
				className,
				size && classes[size],
				isOnline && classes.online
			)} { ...restProps }>
				<div className={classes.contents}>
					{avatarUrl ? (
						<img className={classes.avatar} src={avatarUrl} alt={initials} />
					) : initials}
				</div>
				{online && isOnline !== undefined && (
					<div className={classes.onlineIndicator} />
				)}
			</div>
		);
		
		if (tooltip === true)
			avatar = (
				<Tooltip
					title={subject.displayLabel}
					placement="bottom"
					arrow
					enterDelay={500}
				>
					{avatar}
				</Tooltip>
			);
		
		return avatar;
	}
	
	componentDidMount() {
		
		if (!this.props.disableAutoUpdate)
			subscribe(this);
		
	}
	
	componentWillUnmount() {
		
		unsubscribe(this);
		
	}
	
}
