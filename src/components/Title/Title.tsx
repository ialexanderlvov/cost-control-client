import React, { FC } from 'react';
import classNames from 'classnames';
import { ITitleProps } from './Title.props';

export const Title: FC<ITitleProps> = ({
	className,
	children,
	level = 1,
	...props
}) => {
	const baseClasses = 'm-0';
	
	if (level === 1) {
		return (
			<h1 className={classNames(baseClasses, 'text-3xl font-bold text-white', className)} {...props}>
				{children}
			</h1>
		);
	}
	if (level === 2) {
		return (
			<h2 className={classNames(baseClasses, 'text-2xl font-semibold text-white', className)} {...props}>
				{children}
			</h2>
		);
	}
	if (level === 3) {
		return (
			<h3 className={classNames(baseClasses, 'text-xl font-semibold text-white', className)} {...props}>
				{children}
			</h3>
		);
	}
	if (level === 4) {
		return (
			<h4 className={classNames(baseClasses, 'text-lg font-semibold text-white', className)} {...props}>
				{children}
			</h4>
		);
	}
	return <></>;
};
