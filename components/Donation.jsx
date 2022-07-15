import React from "react";

export default function Donation({ name, amount }) {
	return (
		<div className="text-lg font-medium shadow-sm">
			{name} donated{" "}
			{amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} Republic
			Credits
		</div>
	);
}
