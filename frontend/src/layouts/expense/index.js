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



  const[previoustotal, setPrevioustotal] = useState(null)
  const[previouscategory, setPreviouscategory] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null);
  const[amount, setAmount] = useState(null);
  const[category, setCategory] = useState(null);
  const[product, setProduct] = useState(null);
  const[expense, setExpense] = useState(null);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = (new Date().getMonth());
  let monthName = monthNames[monthIndex];
  var today = new Date()
  var date = (today.getDate() + monthName + today.getFullYear())

    const citiesRef = collection(fs, "kshitij");

    // Create a query against the collection.
    const q = query(citiesRef, where("month", "==", monthName));
    const name = "bills"


  const handleSelect = (option) => {
    setCategory(option);
  };

  const balanceref = doc(fs, "kshitij", monthName + " Expense")

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log("started")
    try{
        const docRef = await updateDoc(doc(fs, "kshitij",monthName + " Expense"), {
            balance : (previoustotal - amount),
            expense: (parseInt(expense) + parseInt(amount)),
            // [category]: (previouscategory - amount)
        });
          console.log("success")
    } catch(e) {
        console.log(e)
    }
  
  }

  
	useEffect(( category ) => {
	  getDoc(balanceref).then((data) => {
		setPreviouscategory(data.data()[category])
		setPrevioustotal(data.data().balance)
        setExpense(data.data().expense)
		console.log(data.data()[category])
	  }).catch((error) => {
		console.log("Error getting documents: ", error);
	  });

	},[])

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
     <NavbarDarkExample options = {options} onSelect={handleSelect} /> 

        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={onSubmit}>
            ADD TRANSACTION
          </VuiButton>
        </VuiBox>
        
    </VuiBox>
    </CoverLayout>
    
    </>
    )
}
export default Expense;
