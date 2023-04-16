import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Bootstrap Paradox Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Bootstrap Paradox Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import axios from "axios";

// Images
import bgSignIn from "assets/images/signInImage.png";
import { fs } from "layouts/authentication/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
const options = [
  { label: 'Bills', value: 'bills' },
  { label: 'Education', value: 'education' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Investment', value: 'investment' },
  { label: 'Medical', value: 'medical' },
  { label: 'Misc', value: 'extra' }
];
import NavbarDarkExample from "components/NavbarDarkExample";
import OCR from "layouts/ocr/OCR";

function Plan() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthIndex = (new Date().getMonth());
	let monthName = monthNames[monthIndex];
    const[income, setIncome] = useState("")
    const balanceref = doc(fs, "kshitij", monthName + " Expense")
    const[message, setMessage] = useState("")

    function onSubmit(){
        axios.post("http://localhost:4000/create_budget",{ "income": income}).then((e) => {
            console.log(e)
            setMessage(e.data.generated_text)
        })
    }

    useEffect(() => {

        getDoc(balanceref).then((data) => {
            setIncome(data.data().income)
          }).catch((error) => {
            console.log("Error getting documents: ", error);
          });


    })
  
  return (
    <>
    <CoverLayout
      title="Now Generate an ideal financial plan for you within minutes!!!"
      color="white"
      description="Your Financial Plan"
      premotto="DON'T SPEND MUCH"
      image={bgSignIn}
    >

<VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={onSubmit}>
            GENERATE
          </VuiButton>
        </VuiBox>

        <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            <pre>
            {message}
            </pre>
          </VuiTypography>
    
    </CoverLayout>
    
    </>
    )
}
export default Plan;
