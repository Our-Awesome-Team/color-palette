import { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<footer></footer>
		</>
	);
};

export default MainLayout;
