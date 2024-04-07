import { Component } from "react";
import IconButton from "@material-ui/core/esm/IconButton";
import EditIcon from "@material-ui/icons/esm/Edit";
import { Dropzone } from "@nesvet/missing-mui4-components/Dropzone";
import { clsx } from "clsx";
import { createStyles } from "$styles";
import { Avatar } from "./Avatar";


const classes = createStyles(({ palette, transitions, alpha }) => ({
	
	dropzone: {},
	
	edit: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		opacity: 0,
		color: palette.background.paper,
		backgroundColor: `${alpha(palette.text.primary, .5)} !important`,
		transitionProperty: "opacity",
		transitionDuration: transitions.duration.shortest,
		zIndex: 1,
		
		"$dropzone:hover &": {
			opacity: 1
		}
	}
	
}), "EditableAvatar");

const dropzoneClasses = createStyles(({ spacing }) => ({
	
	button: {
		borderRadius: "50%"
	},
	
	icon: {
		width: spacing(4),
		height: spacing(4)
	}
	
}), "EditableAvatarDropzone");


export class EditableAvatar extends Component {
	
	#handleEditPointerDown = event =>
		!event.button &&
		this.props.person.avatarUrl &&
		this.props.menu?.open({ event }, this.props.person);
	
	#handleEditClick = () =>
		!this.props.person.avatarUrl &&
		this.props.dialog?.open({ person: this.props.person, openFileDialog: true });
	
	#handleFile = file => this.props.dialog?.open({ person: this.props.person, file });
	
	
	render() {
		
		const { className, size, person, online, editable } = this.props;
		
		return (
			<Dropzone
				className={clsx(classes.dropzone, className)}
				classes={dropzoneClasses}
				onFile={this.#handleFile}
				disabled={!editable}
			>
				<Avatar
					for={person}
					size={size}
					online={online}
					tooltip={false}
					disableAutoUpdate
				/>
				
				{editable && (
					<IconButton
						className={classes.edit}
						onPointerDown={this.#handleEditPointerDown}
						onClick={this.#handleEditClick}
					>
						<EditIcon />
					</IconButton>
				)}
			</Dropzone>
		);
	}
}
