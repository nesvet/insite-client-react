import { clsx } from "clsx";
import MenuItem from "@material-ui/core/esm/MenuItem";
import ChevronRightIcon from "@material-ui/icons/esm/ChevronRight";
import { ContextMenu } from "./Menu";
import { ContextMenuItem } from "./Item";
import { classes } from "./classes";


export class ContextMenuSubMenuItem extends ContextMenuItem {
	
	isHovered = false;
	
	hoverTimeout = null;
	
	isMenuPinned = false;
	
	#handlePointerEnter = () => {
		
		if (this.context.subMenu && this.context.subMenu.superItem != this)
			this.context.subMenu.superItem._handleSiblingPointerEnter();
		
		this.isHovered = true;
		clearTimeout(this.hoverTimeout);
		this.hoverTimeout = setTimeout(() => this.isHovered && this.menu?.open(this.node), 150);
		
	};
	
	#handlePointerLeave = () => {
		
		this.isHovered = false;
		clearTimeout(this.hoverTimeout);
		if (!this.isMenuPinned)
			this.hoverTimeout = setTimeout(() => !this.isMenuPinned && this.menu?.close(), 150);
		
	};
	
	_handleSiblingPointerEnter = () => {
		
		clearTimeout(this.hoverTimeout);
		this.hoverTimeout = setTimeout(() => !this.isMenuHovered && this.menu?.close(), 150);
		
	};
	
	#handleClick = event => {
		event.stopPropagation();
		this.menu.open(this.node);
		this.props.onClick?.(event);
		
	};
	
	menuAnchorOrigin = { vertical: "top", horizontal: "right" };
	
	menuTransformOrigin = { vertical: "top", horizontal: "left" };
	
	PopoverClasses = { root: classes.subPopover };
	
	#handleMenuPointerEnter = event => {
		
		this.isMenuHovered = true;
		this.isMenuPinned = true;
		this.props.MenuProps?.onPointerEnter?.(event);
	
	};
	
	#handleMenuPointerLeave = event => {
		
		this.isMenuHovered = false;
		this.props.MenuProps?.onPointerLeave?.(event);
	
	};
	
	#handleMenuClose = event => {
		
		this.isMenuPinned = false;
		this.props.MenuProps?.onClose?.(event);
	
	};
	
	#handleRef = node => {
		this.node = node;
		this.menuListNode = node?.getElementsByClassName("MuiMenu-list")[0];
		
	};
	
	#handleMenuRef = menu => {
		if (menu)
			menu.superItem = this;
		this.menu = menu;
		this.props.MenuProps?.ref?.(menu);
		
	};
	
	
	render() {
		
		const {
			className,
			label,
			children,
			MenuProps: { onPointerEnter, onPointerLeave, onClose, ref, ...restMenuProps },
			...restProps
		} = this.props;
		
		return (<>
			
			<MenuItem
				className={clsx(itemClasses.root, classes.subItem, className)}
				onPointerEnter={this.#handlePointerEnter}
				onPointerLeave={this.#handlePointerLeave}
				onClick={this.#handleClick}
				{ ...restProps }
				ref={this.#handleRef}
			>
				<span>
					{label}
				</span>
				<ChevronRightIcon fontSize="small" />
			</MenuItem>
			
			<ContextMenu
				anchorOrigin={this.menuAnchorOrigin}
				transformOrigin={this.menuTransformOrigin}
				PopoverClasses={this.PopoverClasses}
				{ ...restMenuProps }
				superMenu={this.context}
				onPointerEnter={this.#handleMenuPointerEnter}
				onPointerLeave={this.#handleMenuPointerLeave}
				onClose={this.#handleMenuClose}
				ref={this.#handleMenuRef}
			>
				{children}
			</ContextMenu>
			
		</>);
	}
}
