import React, { forwardRef } from "react";
import {
	createSheet,
	useSheet,
	type PolymorphicComponent,
	type PolymorphicRef
} from "$shared";
import styles from "./styles.css";

/* eslint-disable @typescript-eslint/naming-convention */

const getSheet = createSheet(styles);

type CollapseCSSVars = {
	"--is-collapse-duration"?: string;
	"--is-collapse-easing"?: string;
};

export type CollapseProps = {
	in?: boolean;
	orientation?: "both" | "horizontal" | "vertical";
	fade?: boolean;
	detached?: boolean;
	className?: string;
	style?: CollapseCSSVars & React.CSSProperties;
};


export const Collapse = forwardRef(<C extends React.ElementType = "div">({
	as,
	in: isOpen,
	orientation = "vertical",
	fade,
	detached,
	className,
	style,
	...rest
}: CollapseProps & { as?: C }, ref: PolymorphicRef<C>) => {
	
	useSheet(getSheet);
	
	const Component = as || "div";
	
	return (
		<Component
			className={`iS-Collapse${className ? ` ${className}` : ""}`}
			data-detached={detached || undefined}
			data-fade={fade || undefined}
			data-orientation={orientation}
			data-state={isOpen ? "open" : "closed"}
			style={style}
			ref={ref}
			{...rest}
		/>
	);
}) as PolymorphicComponent<"div", CollapseProps>;

Collapse.displayName = "Collapse";
