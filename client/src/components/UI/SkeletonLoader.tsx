import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ ...rest }: SkeletonProps) => {
	return (
		<Skeleton
			baseColor="rgba(215, 215, 215, 0.933)"
			highlightColor="#ecebeb"
			{...rest}
		/>
	);
};

export default SkeletonLoader;
