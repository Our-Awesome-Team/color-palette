import { PropsWithChildren } from 'react';
import Header from '../Header/Header';

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<footer></footer>
		</>
	);
};

export default MainLayout;
