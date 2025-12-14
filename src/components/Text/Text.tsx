import React, { FC } from 'react';
import classNames from 'classnames';
import { ITextProps } from './Text.props';

export const Text: FC<ITextProps> = ({ className, children, ...props }) => {
	return (
		<p className={classNames('', className)} {...props}>
			{children}
		</p>
	);
};
