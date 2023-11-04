import { ReactNode } from "react";
import { getBrand } from "../config/Configuration";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import { Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface NavbarLink {
	id: number;
	label: ReactNode;
	url: string;
	auth: number;
}

interface Props {
	links: NavbarLink[];
	onShowSidebar: () => void;
}

const NavbarTop = ({ links, onShowSidebar }: Props) => {
	const { logo, name: appName } = getBrand();

	const user: User | null = useAuth();
	let username = "Anonymous User";
	if (user !== null && user.name) username = user.name;

	const getRelatedLinks = (auth: boolean) => {
		if (auth) {
			return links.map(
				(link) =>
					link.url !== "/login" && (
						<Nav.Link
							as={NavLink}
							to={link.url}
							className="mx-2"
							key={link.id.toString()}
						>
							{link.label === "Account" ? username : link.label}
						</Nav.Link>
					),
			);
		}
		return links.map(
			(link) =>
				link.auth !== 1 && (
					<Nav.Link
						as={NavLink}
						to={link.url}
						className="mx-2"
						key={link.id.toString()}
					>
						{link.label}
					</Nav.Link>
				),
		);
	};

	return (
		<Navbar
			className="bg-dark px-2 px-md-4 bg-gradient"
			bg="black"
			variant="dark"
			expand="lg"
		>
			<span className="d-flex align-items-center d-lg-none">
				<Navbar.Brand as={NavLink} to="/">
					<img
						className="d-inline-block align-middle logo"
						src={logo}
						height="35"
						alt=""
					/>
					<span className="align-middle ms-2">{appName}</span>
				</Navbar.Brand>
				<Button
					type="button"
					variant="outline-dark"
					className="text-white pb-2 border-0"
					onClick={onShowSidebar}
				>
					<BsArrowRight />
				</Button>
			</span>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto fs-5">{getRelatedLinks(user != null)}</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarTop;
