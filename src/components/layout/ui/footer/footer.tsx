import { Logo } from '@/components/icons'
import { FC } from 'react'

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
	return (
		<div className={'border-t bg-white'}>
			<div className={'box flex justify-between py-4 items-center'}>
				<Logo />
				<p className={'text-14 text-[#505050]'}>
					©Copyright 2023. All rights reserved
				</p>
			</div>
		</div>
	)
}

export default Footer
