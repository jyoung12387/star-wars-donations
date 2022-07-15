import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Donation from "../components/Donation";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [donations, setDonations] = useState([]);

	const totalDonations = () => {
		const totalDonations = donations.reduce(function (total, donations) {
			return total + parseFloat(donations.amount, 10);
		}, 0);
		return totalDonations;
	};

	const fetchPeople = async () => {
		const randomIndex = Math.ceil(Math.random() * 82);
		const result = await fetch(`https://swapi.dev/api/people/${randomIndex}`);
		const data = await result.json();
		return data.name;
	};

	const getAmount = () => {
		const randomAmount = Math.random() * 1500;
		return randomAmount;
	};

	const addDonation = async () => {
		const name = await fetchPeople();
		const amount = getAmount();
		setDonations((prevDonations) => [
			...prevDonations,
			{ name: name, amount: amount },
		]);
	};

	return (
		<div className="flex flex-col min-h-screen items-center">
			<div className="flex flex-col items-center mt-16">
				<div className="text-5xl text-green-500 font-bold">
					$
					{totalDonations().toLocaleString(undefined, {
						maximumFractionDigits: 2,
					})}
				</div>
				<div className="mt-4 text-2xl font-semibold">
					Average: $
					{donations.length === 0
						? 0
						: (totalDonations() / donations.length).toLocaleString(undefined, {
								maximumFractionDigits: 2,
						  })}
				</div>
				<div className="mt-12 text-4xl text-stone-800 font-bold">Donations</div>
				<div className="mt-6 flex ">
					<button
						onClick={addDonation}
						className="bg-green-500 text-xl text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-all duration-100 active:bg-green-400"
					>
						Add Donation
					</button>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-6 ">
					{donations.length > 0 ? (
						donations
							.slice(0)
							.reverse()
							.map((donor, index) => (
								<Donation key={index} name={donor.name} amount={donor.amount} />
							))
					) : (
						<div className="text-lg font-medium text-center">
							No Donations Recieved
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
