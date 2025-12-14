import React, { FC } from 'react';
import classNames from 'classnames';
import { ITagProps } from './Tag.props';

export const Tag: FC<ITagProps> = ({ className, children, ...props }) => {
	return (
		<div
			className={classNames(
				'px-3 py-1 text-xs font-semibold border border-primary/40 text-primary bg-primary/10 rounded-full whitespace-nowrap transition-all duration-200 hover:bg-primary hover:text-gray-900 hover:border-primary cursor-pointer shadow-sm hover:shadow-md',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};
