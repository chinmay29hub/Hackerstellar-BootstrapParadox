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
import OCR from "layouts/ocr/OCR";

function Expense() {

    // OCR
    const [image, setImage] = useState(null);
    const [matches, setMatches] = useState([]);
  
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
  
    const handleOCR = async () => {
      try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post('http://localhost:4000/ocr', formData);
        setMatches(response.data.matches);
      } catch (error) {
        console.error(error);
      }
    };




  const [selectedOption, setSelectedOption] = useState(null);
  const[amount, setAmount] = useState(null);
  const[category, setCategory] = useState(null);
  const[product, setProduct] = useState(null);

  const handleSelect = (option) => {
    setCategory(option);
  };

  const onSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <>
    <CoverLayout
      title="Add what you spent on"
      color="white"
      description="Enter your the amount you spend and the category"
      premotto="DON'T SPEND MUCH"
      image={bgSignIn}
    >
        <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Enter Transaction Amount
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)} 
            required
              type="number"
              placeholder="Enter Bill Amount..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            or
          </VuiTypography>
          <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleOCR}>OCR</button>
      {matches.map((match, index) => (
        <div key={index}>{match}</div>
      ))}
    </div>
    <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Enter Product
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
            value={product}
            onChange={(e) => setProduct(e.target.value)} 
            required
              type="text"
              placeholder="Enter Name of Product..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={onSubmit}>
            SIGN IN
          </VuiButton>
        </VuiBox>
        
    </VuiBox>
     <NavbarDarkExample options = {options} onSelect={handleSelect} /> 
    </CoverLayout>
    
    </>
    )
}
export default Expense;
