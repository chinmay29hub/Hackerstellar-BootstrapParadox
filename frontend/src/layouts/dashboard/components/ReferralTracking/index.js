import React from 'react';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import { getDoc, doc } from "firebase/firestore";
import { fs } from "layouts/authentication/firebase";
import { useEffect, useState } from "react";

function ReferralTracking() {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthIndex = (new Date().getMonth());
	let monthName = monthNames[monthIndex];
	const { info, gradients } = colors;
	const { cardContent } = gradients;

	const rewards = doc(fs, "kshitij", "details");
	const balanceref = doc(fs, "kshitij", monthName + " Expense")

	useEffect(() => {
		getDoc(balanceref).then((data) => {
			setRenewable(data.data().renewable)
			setTotal(data.data().totaltransaction)
		  }).catch((error) => {
			console.log("Error getting documents: ", error);
		  });
	},[])

	const[renewable, setRenewable] =useState(null)
	const[total, setTotal] = useState(null)
	return (
		<Card
			sx={{
				height: '100%',
				background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
			}}>
			<VuiBox sx={{ width: '100%' }}>
				<VuiBox
					display='flex'
					alignItems='center'
					justifyContent='space-beetween'
					sx={{ width: '100%' }}
					mb='40px'>
					<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
						Terra Score Tracker
					</VuiTypography>
					<VuiBox
						display='flex'
						justifyContent='center'
						alignItems='center'
						bgColor='#22234B'
						sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
						<FaEllipsisH color={info.main} size='18px' />
					</VuiBox>
				</VuiBox>
				<VuiBox
					display='flex'
					sx={({ breakpoints }) => ({
						[breakpoints.up('xs')]: {
							flexDirection: 'column',
							gap: '16px',
							justifyContent: 'center',
							alignItems: 'center'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}
					})}>
					<Stack
						direction='column'
						spacing='20px'
						width='500px'
						maxWidth='50%'
						sx={({ breakpoints }) => ({
							mr: 'auto',
							[breakpoints.only('md')]: {
								mr: '75px'
							},
							[breakpoints.only('xl')]: {
								width: '500px',
								maxWidth: '40%'
							}
						})}>
						<VuiBox
							display='flex'
							width='500px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px' fontSize="8px">
							{renewable} / {total} eco-friendly transactions
							</VuiTypography>
							<VuiTypography color='white' variant='lg' fontWeight='bold'>
								
							</VuiTypography>
						</VuiBox>
						{/* <VuiBox
							display='flex'
							width='220px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
								Bonus
							</VuiTypography>
							<VuiTypography color='white' variant='lg' fontWeight='bold'>
								1,465
							</VuiTypography>
						</VuiBox> */}
					</Stack>
					<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
						{((parseInt(renewable, 10) / parseInt(total, 10) * 100) < 50) ?
						(<CircularProgress
							variant='determinate'
							value={renewable / total * 100}
							size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
							color='error'
						/>) :
						(<CircularProgress
							variant='determinate'
							value={renewable / total * 100}
							size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
							color='success'
						/>)}
						<VuiBox
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiTypography color='text' variant='button' mb='4px'>
									
								</VuiTypography>
								<VuiTypography
									color='white'
									variant='d5'
									fontWeight='bold'
									mb='4px'
									sx={({ breakpoints }) => ({
										[breakpoints.only('xl')]: {
											fontSize: '32px'
										}
									})}>
									{ (parseInt(renewable, 10) / parseInt(total, 10) * 10).toFixed(1)}
								</VuiTypography>
								<VuiTypography color='text' variant='button'>
									Terra Grade
								</VuiTypography>
							</VuiBox>
						</VuiBox>
					</VuiBox>
				</VuiBox>
			</VuiBox>
		</Card>
	);
}

export default ReferralTracking;
