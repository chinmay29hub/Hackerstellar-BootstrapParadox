import React from 'react';

import { Card } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoHappy } from 'react-icons/io5';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import { getDoc, doc } from "firebase/firestore";
import { fs } from "layouts/authentication/firebase";
import { useEffect, useState } from "react";

const SatisfactionRate = () => {
	const { info, gradients } = colors;
	const { cardContent } = gradients;

	const[income, setIncome] =useState(null)
	const[expense, setExpense] = useState(1)

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthIndex = (new Date().getMonth());
	let monthName = monthNames[monthIndex];
  
	const balanceref = doc(fs, "kshitij", monthName + " Expense")
  
	useEffect(() => {
	  getDoc(balanceref).then((data) => {
		setIncome(data.data().income)
		setExpense(data.data().expense)
		console.log(income)
		console.log(expense)
	  }).catch((error) => {
		console.log("Error getting documents: ", error);
	  });
	},[])
  

	return (
		<Card sx={{ height: '340px' }}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='4px'>
					Expenditure This Month
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='20px'>
					Start Saving
				</VuiTypography>
				<VuiBox sx={{ alignSelf: 'center', justifySelf: 'center', zIndex: '-1' }}>
					{((parseInt(expense, 10) / parseInt(income, 10) * 100) < 50) ?
					(<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress variant='determinate' value={ parseInt(expense, 10) / parseInt(income, 10) * 100} size={170} color='info' />
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
							<VuiBox
								sx={{
									background: info.main,
									transform: 'translateY(-50%)',
									width: '50px',
									height: '50px',
									borderRadius: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<IoHappy size='30px' color='#fff' />
							</VuiBox>
						</VuiBox>
					</VuiBox>) : 
					(<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
					<CircularProgress variant='determinate' value={ parseInt(expense, 10) / parseInt(income, 10) * 100} size={170} color='error' />
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
						<VuiBox
							sx={{
								background: info.main,
								transform: 'translateY(-50%)',
								width: '50px',
								height: '50px',
								borderRadius: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<IoHappy size='30px' color='#fff' />
						</VuiBox>
					</VuiBox>
				</VuiBox>)}
				</VuiBox>
				<VuiBox
					sx={({ breakpoints }) => ({
						width: '90%',
						padding: '18px 22px',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						height: '82px',
						mx: 'auto',
						borderRadius: '20px',
						background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
						transform: 'translateY(-90%)',
						zIndex: '1000'
					})}>
					{/* <VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
						0%
					</VuiTypography> */}
					<VuiBox
						flexDirection='column'
						display='flex'
						justifyContent='center'
						alignItems='center'
						sx={{ minWidth: '80px' }}>
						<VuiTypography color='white' variant='h3'>
						{ (parseInt(expense, 10) / parseInt(income, 10) * 100).toFixed(2)} %
						</VuiTypography>
						<VuiTypography color='text' variant='caption' fontWeight='regular'>
							Money Spent
						</VuiTypography>
					</VuiBox>
					{/* <VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
						100%
					</VuiTypography> */}
				</VuiBox>
			</VuiBox>
		</Card>
	);
};

export default SatisfactionRate;
