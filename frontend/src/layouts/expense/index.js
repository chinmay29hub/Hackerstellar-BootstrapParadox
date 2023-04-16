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

function Expense() {
    // OCR
    const [image, setImage] = useState(null);
    const [matches, setMatches] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);
    const[amount, setAmount] = useState(null);
    const[category, setCategory] = useState(null);
    const[product, setProduct] = useState(null);
  
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
  
    const handleOCR = async () => {
      try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post('http://localhost:4000/ocr', formData);
        setMatches(response.data.matches);
        const amountMatch = response.data.matches[0];
        if (amountMatch) {
          setAmount(amountMatch);
        }
      } catch (error) {
        console.error(error);
      }
    };



  const[previoustotal, setPrevioustotal] = useState(null)
  const[previouscategory, setPreviouscategory] = useState(null)
  const[expense, setExpense] = useState(null);
  const[rewards, setRewards] = useState(null);
  const[renewable, setRenewable] = useState(null);
  const[totaltransaction, setTotaltransaction] = useState(null);
  const[message, setMessage] = useState("")

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
    setCategory(option.value);
    getDoc(balanceref).then((data) => {
		setPreviouscategory(data.data()[option.value])
	  }).catch((error) => {
		console.log("Error getting documents: ", error);
	  });
  };

  

  const balanceref = doc(fs, "kshitij", monthName + " Expense")

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log("started")
    console.log(category)
    try{
        const docRef = await updateDoc(doc(fs, "kshitij",monthName + " Expense"), {
            balance : (previoustotal - amount),
            expense: (parseInt(expense) + parseInt(amount)),
            [category]: (previouscategory - amount)
        });
          console.log("success")
    } catch(e) {
        console.log(e)
    }

    getDoc(balanceref).then((data) => {
		if(data.data()[category] < 0) {
            console.log("reaching")
            axios.post("http://localhost:4000/send_mail", { category: category }).then((e) => console.log(e))

        }
	  }).catch((error) => {
		console.log("Error getting documents: ", error);
	  });

      axios.post("http://localhost:4000/product", { product_name : product }).then((data) => {
        console.log(data.data.key)
        if (data.data.key ==="1") {
            try{
                const docRef = updateDoc(doc(fs, "kshitij",monthName + " Expense"), {
                    rewards : rewards + 2,
                    renewable: renewable + 1,
                    totaltransaction: totaltransaction + 1
                });
                  console.log("renewable")
                  setMessage("Bravo! you won two Terra Rewards")
                  axios.post("http://localhost:4000/send_point_mail",{"product":product,"type":"gain"}).then(e=>console.log(e))
            } catch(e) {
                console.log(e)
            }
        } else {
            try{
                const docRef = updateDoc(doc(fs, "kshitij",monthName + " Expense"), {
                    rewards : rewards - 1,
                    totaltransaction: totaltransaction + 1
                });
                  console.log("non-renewable")
                  setMessage("You lost 1 Terra Reward, try to use renewable resource next time")
                  axios.post("http://localhost:4000/send_point_mail",{"product":product,"type":"loss"}).then(e=>console.log(e))

            } catch(e) {
                console.log(e)
            }
        }
      })

  
  }

  
	useEffect(( category ) => {
	  getDoc(balanceref).then((data) => {
		setPreviouscategory(data.data())
		setPrevioustotal(data.data().balance)
        setExpense(data.data().expense)
        setRewards(data.data().rewards)
        setRenewable(data.data().renewable)
        setTotaltransaction(data.data().totaltransaction)
	  }).catch((error) => {
		console.log("Error getting documents: ", error);
	  });

	},[])

  return (
    <>
    {/* {
    console.log(amount)
    } */}
    <CoverLayout
      title={message}
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
      {/* {matches.map((match, index) => (
        <div key={index}>{match}</div>
      ))} */}
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

        { message == "You lost 1 Terra Reward, try to use renewable resource next time" ? 
        (<VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="error" fontWeight="medium">
              {message}
            </VuiTypography>
        </VuiBox>) :
        (<VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="success" fontWeight="medium">
              {message}
            </VuiTypography>
        </VuiBox>)
}
        
    </VuiBox>
    </CoverLayout>
    
    </>
    )
}
export default Expense;
