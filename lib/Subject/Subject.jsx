import { Component } from "react";
import { clsx } from "clsx";
import { createStyles } from "$styles";
import { Avatar } from "./Avatar";
import { Details } from "./Details";
import { sizes } from "./styles";
import { subscribe, unsubscribe } from "./subscriptions";


const classes = createStyles(({ spacing }) => ({
	
	root: {
		display: "flex",
		flexWrap: "nowrap",
		alignItems: "center"
	},
	
	vertical: {
		flexDirection: "column"
	},
	
	...Object.fromEntries(Object.entries(sizes).map(([ key, value ]) => [ key, {
		gap: spacing(.75) + (Math.floor(value / 20) * spacing(.25))
	} ]))
	
}), "Subject");


export class Subject extends Component {
	
	render() {
		
		const {
			className,
			classes: classesProp,
			vertical,
			for: subject = {},
			name = true,
			title = true,
			job = true,
			avatar = true,
			details = true,
			size = "m",
			online = true,
			tooltip = false,
			AvatarProps,
			DetailsProps,
			disableAutoUpdate,
			children,
			...restProps
		} = this.props;
		
		return (
			<div className={clsx(classes.root, vertical && classes.vertical, classes[size], classesProp?.root, className)} { ...restProps }>
				{avatar && (
					avatar === true ? (
						<Avatar
							className={classes.avatar}
							classes={classesProp}
							size={size}
							for={subject}
							online={online}
							tooltip={tooltip}
							disableAutoUpdate
							{ ...AvatarProps }
						/>
					) : avatar
				)}
				{details && (
					<Details
						className={classes.details}
						classes={classesProp}
						vertical={vertical}
						size={size}
						for={subject}
						title
						name
						job
						disableAutoUpdate
						{ ...DetailsProps }
					/>
				)}
				{children}
			</div>
		);
	}
	
	componentDidMount() {
		
		const { disableAutoUpdate, subject } = this.props;
		
		if (!disableAutoUpdate && subject?._id)
			subscribe(this);
		
	}
	
	componentWillUnmount() {
		
		unsubscribe(this);
		
	}
	
	
	static Avatar = Avatar;
	
	static Details = Details;
	
}
