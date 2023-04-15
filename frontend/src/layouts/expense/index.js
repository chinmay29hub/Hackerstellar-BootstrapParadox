import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import { fs } from "layouts/authentication/firebase";
import { doc, setDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
const options = [
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Home Improvement', value: 'Home Improvement' },
  { label: 'Foods', value: 'Foods' },
  { label: 'Credit Card Payment', value: 'Credit Card Payment' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Misc', value: 'Misc' },
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Paycheck', value: 'Paycheck' },
];
import NavbarDarkExample from "components/NavbarDarkExample";
function Expense() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
    
    <CoverLayout
      title="Add what you spent on"
      color="white"
      description="Enter your the amount you spend and the category"
      premotto="DON'T SPEND MUCH"
      image={bgSignIn}
    >
     <NavbarDarkExample options = {options} onSelect={handleSelect} /> 
    </CoverLayout>
    
    </>
    )
}
export default Expense;
