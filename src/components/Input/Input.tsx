import React, { FC } from 'react';
import classNames from 'classnames';
import { IInputProps } from './Input.props';

export const Input: FC<IInputProps> = ({ className, ...props }) => {
	return <input className={classNames('w-full', className)} {...props} />;
};
