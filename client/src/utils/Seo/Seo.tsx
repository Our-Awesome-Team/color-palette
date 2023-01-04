import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { onlyText } from '../string/clearText';
import { siteName, titleMerge } from '../../config/seo-config';
import { ISeo } from './Seo.interface';
import { useLocation } from 'react-router-dom';
import logoImage from '../../assets/images/favicon.svg';

const Seo: FC<ISeo> = ({ title, description, image }) => {
	const { pathname } = useLocation();
	const currentUrl = `https:/localhost:3000/${pathname}`;

	return (
		<>
			<Helmet>
				<title itemProp="headline">{titleMerge(title)}</title>
				{description ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={onlyText(description, 152)}
						/>
						<link rel="canonical" href={currentUrl} />
						<meta property="og:locale" content="en" />
						<meta property="og:title" content={titleMerge(title)} />
						<meta property="og:url" content={currentUrl} />
						<meta property="og:image" content={image || logoImage} />
						<meta property="og:site_name" content={siteName} />
						<meta
							property="og:description"
							content={onlyText(description, 197)}
						/>
					</>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Helmet>
		</>
	);
};

export default Seo;
