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

// Images
import bgSignIn from "assets/images/signInImage.png";
import { fs } from "layouts/authentication/firebase";
import { doc, setDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";


function Budget() {

    
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = (new Date().getMonth());
  let monthName = monthNames[monthIndex];
  var today = new Date()
  var date = (today.getDate() + monthName + today.getFullYear())

    const citiesRef = collection(fs, "kshitij");

    // Create a query against the collection.
    const q = query(citiesRef, where("month", "==", monthName));

    useEffect(() => {
        getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) { // Check if the query returned any documents
            const data = querySnapshot.docs[0].data();
            setIncome(data.income)
            setBills(data.bills)
            setGrocery(data.grocery)
            setInvestment(data.investment)
            setMedical(data.medical)
            setEducation(data.education)
            setextraextra(data.extra)
            // and so on...
          } else {
            console.log("No documents found");
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },[])
  const[income, setIncome] = useState(null);
  const[education, setEducation] = useState(null);
  const[bills, setBills] = useState(null);
  const[grocery, setGrocery] = useState(null);
  const[investment, setInvestment] = useState(null);
  const[medical, setMedical] = useState(null);
  const[extra, setExtra] = useState(null);
  const[message, setMessage] = useState("");
  const[extraextra, setextraextra] = useState("");


  const update = async (e) => {
    setExtra(income - (education + bills + grocery + investment + medical))
    if (extra > 0) {
        console.log("extra")
        try {
            const docRef = await setDoc(doc(fs, "kshitij",monthName + " Budget"), {
                income: income,
                education: education,
                bills: bills,
                grocery: grocery,
                investment: investment,
                medical: medical,
                extra: extra,
                date: date,
                month: monthName,
            });
            const docRef1 = await setDoc(doc(fs, "kshitij",monthName + " Expense"), {
                income: income,
                education: education,
                bills: bills,
                grocery: grocery,
                investment: investment,
                medical: medical,
                extra: extra,
                date: date,
                month: monthName,
                balance: income,     
                expense: 0,
                totaltransaction: 0,
                renewable: 0,
                rewards: 0
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        setMessage("You have extra " + extra + " to spend on miscellaneous things")
    } else if (extra < 0) {
        setMessage("jitni chadar ho utna hin pair failana chahiye")
        console.log("less")
    }
    else {
        setMessage("You got ZERO extra Money trying saving more next time!")
        console.log("equal")
    }
  }


  return (
    ((today.getDate()) <=  30) ?
    (<CoverLayout
      title="Let's get your budget ready"
      color="white"
      description="Enter your monthly income and how you want your budget to be and we will track it"
      premotto="INSPIRED BY THE FUTURE:"
      motto="Whoever said 'money can't buy happiness' probably never lost a few thousand dollars."
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Income in Terras
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
            value={income}
            onChange={(e) => setIncome(e.target.valueAsNumber)} 
              type="number"
              placeholder="Your monthly income"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Education
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
                        value={education}
                        onChange={(e) => setEducation(e.target.valueAsNumber)} 
              type="number"
              placeholder="Education Expenditure"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Bills
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
                        value={bills}
                        onChange={(e) => setBills(e.target.valueAsNumber)} 
              type="number"
              placeholder="Your monthly bills"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Grocery
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
                        value={grocery}
                        onChange={(e) => setGrocery(e.target.valueAsNumber)} 
              type="number"
              placeholder="Monthly spend on Groceries"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Investments
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
                        value={investment}
                        onChange={(e) => setInvestment(e.target.valueAsNumber)} 
              type="number"
              placeholder="Amount you want to invest monthly"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Medical
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
                        value={medical}
                        onChange={(e) => setMedical(e.target.valueAsNumber)} 
              type="number"
              placeholder="Monthly saving for medical emergency"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" onClick={update} fullWidth>
            UPDATE MONTHLY BUDGET
          </VuiButton>
        </VuiBox>
        { (extra > 0) ?
        (<VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="success" fontWeight="medium">
            "You have extra {extra} monthly to spend on miscellaneous things"
            </VuiTypography>
        </VuiBox>) :
        (<VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="error" fontWeight="medium">
            "jitni chadar ho utna hin pair failana chahiye"
            </VuiTypography>
        </VuiBox>)}
      </VuiBox>
    </CoverLayout>) :
    (<CoverLayout
        title="Let's get your budget ready"
        color="white"
        description="Enter your monthly income and how you want your budget to be and we will track it"
        premotto="INSPIRED BY THE FUTURE:"
        motto="Whoever said 'money can't buy happiness' probably never lost a few thousand dollars."
        image={bgSignIn}
      >
        <VuiBox component="form" role="form">
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Income in Terras
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
              disabled
              value={income}
              onChange={(e) => setIncome(e.target.valueAsNumber)} 
                type="number"
                placeholder="Your monthly income"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Education
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput disabled
                          value={education}
                          onChange={(e) => setEducation(e.target.valueAsNumber)} 
                type="number"
                placeholder="Education Expenditure"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Bills
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput disabled
                          value={bills}
                          onChange={(e) => setBills(e.target.valueAsNumber)} 
                type="number"
                placeholder="Your monthly bills"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Grocery
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput disabled
                          value={grocery}
                          onChange={(e) => setGrocery(e.target.valueAsNumber)} 
                type="number"
                placeholder="Monthly spend on Groceries"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Investments
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput disabled
                          value={investment}
                          onChange={(e) => setInvestment(e.target.valueAsNumber)} 
                type="number"
                placeholder="Amount you want to invest monthly"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Medical
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput disabled
                          value={medical}
                          onChange={(e) => setMedical(e.target.valueAsNumber)} 
                type="number"
                placeholder="Monthly saving for medical emergency"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" onClick={update} fullWidth disabled>
              UPDATE MONTHLY BUDGET
            </VuiButton>
          </VuiBox><VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="success" fontWeight="medium">
              "You have extra " + {extraextra} + " to spend on miscellaneous things"
              </VuiTypography>
          </VuiBox>     
        </VuiBox>
      </CoverLayout>)
  );
}

export default Budget;
