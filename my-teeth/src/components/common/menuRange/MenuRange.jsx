import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

const MenuRange = (props) => {
	return (
		<div className="menu-range" id={props.id}>
			<InputLabel id={`meunu-label-${props.id}`}> {props.label} </InputLabel>
			<Select labelId="label" data-id={"select-"+props.id} value={props.value} onChange={props.onChange}>
				{props.options &&
					props.options.map((value, idx) => (
						<MenuItem key={idx} data-id={"menu-range-"+props.id+"-"+idx} className={"selectItem"} value={value}>
							{value}
						</MenuItem>
					))}
			</Select>
		</div>
	);
};

export default MenuRange;
