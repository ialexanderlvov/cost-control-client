import React, { FC } from 'react';
import classNames from 'classnames';
import { IButtonProps } from './Button.props';

export const Button: FC<IButtonProps> = ({
	className,
	children,
	variant = 'dark',
	active = false,
	...props
}) => {
	const baseClasses = 'cursor-pointer px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]';
	
	const variantClasses = {
		primary: active
			? '!border-primary !bg-primary !text-gray-900 shadow-md ring-2 ring-primary/30'
			: 'border-primary/40 text-primary bg-primary/10 hover:bg-primary hover:text-gray-900 hover:border-primary hover:shadow-md',
		danger: active
			? '!border-danger !bg-danger !text-white shadow-md ring-2 ring-danger/30'
			: 'border-danger/40 text-danger bg-danger/10 hover:bg-danger hover:text-white hover:border-danger hover:shadow-md',
		dark: active
			? '!border-gray-600 !bg-gray-700 !text-white shadow-md ring-2 ring-gray-600/30'
			: 'border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white hover:border-gray-600 hover:shadow-md',
	};

	return (
		<button
			className={classNames(baseClasses, variantClasses[variant], className)}
			{...props}
		>
			{children}
		</button>
	);
};
