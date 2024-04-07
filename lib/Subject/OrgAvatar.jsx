import { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { clsx } from "clsx";
import { classes } from "./Avatar";
import { subscribe, unsubscribe } from "./subscriptions";


export class OrgAvatar extends Component {
	
	render() {
		
		const {
			className,
			for: subject = {},
			tooltip = true,
			size = "m",
			online,
			disableAutoUpdate,
			...restProps
		} = this.props;
		
		const {
			initials = "?",
			avatarUrl
		} = subject;
		
		let avatar = (
			<div className={clsx(
				classes.root,
				classes.org,
				className,
				size && classes[size]
			)} { ...restProps }>
				<div className={classes.contents}>
					{avatarUrl ? (
						<img className={classes.avatar} src={avatarUrl} alt={initials} />
					) : initials}
				</div>
			</div>
		);
		
		const tooltipTitle =
			(tooltip && typeof tooltip == "boolean") ?
				subject.title :
				false;
		
		if (tooltipTitle)
			avatar = (
				<Tooltip
					title={tooltipTitle}
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
		
		const { disableAutoUpdate, subject } = this.props;
		
		if (!disableAutoUpdate && subject?._id)
			subscribe(this);
		
	}
	
	componentWillUnmount() {
		
		unsubscribe(this);
		
	}
	
}
