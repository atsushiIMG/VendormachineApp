import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VendorRegistStep1 from './VendorRegistStep1';
import VendorRegistStep2 from './VendorRegistStep2';
import { RegistVendorInfo,UpdateVendorInfo } from './hooks/VendorRegistOperations';
import { useNavigate } from "react-router-dom";

const steps = ['自販機の場所を選択', '売ってるジュースを選択']

const VendorRegistSteppers = (props) => {
  // useState
	const [selectedLatLong, SetSelectedLatLong] = React.useState([])
	const [selectedDrinks, SetSelectedDrinks] = React.useState({})
	const [selectedAddress, SetSelectedAddress] = React.useState()
  const navigate = useNavigate()
	// toggleを作成する
	// 子コンポーネントにstateのSetterを渡しただけではpropsで受け取れない
	// toggleにしてあげることで動く
	// 20220414別にラップしなくても正しい関数名を渡せば子でSetできるはず。。
	const toggleSelectedLatLong = (pos) => {
		SetSelectedLatLong(pos)
	}
	const toggleSelectedDrinks = (drinks) => {
		SetSelectedDrinks(drinks)
	}
	const toggleSelectedAdrress = (address) => {
		SetSelectedAddress(address)
	}

  // Stepperの元ネタは
	// https://mui.com/components/steppers/#linear
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
		// 登録ボタンを押下した時は登録処理を行う
		if (activeStep === steps.length - 1) {
      if (props.updFlg == 'true') {
        UpdateVendorInfo(selectedLatLong, selectedDrinks, navigate)
      }
      else {
        RegistVendorInfo(selectedLatLong, selectedDrinks, navigate)
      }
		}
    	setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
	
    const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
  React.useEffect(() => {
    // 「戻る」押下してStep1に戻ったら「次へ」の制御を全て許す
    if (activeStep === 0) {
        var eleman = document.getElementById("nextStep");
        eleman.removeAttribute("disabled"); 
        }
    },[activeStep])

    return (
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* UPDATE */}
            {props.updFlg == 'true' && (
              <div>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  更新に成功しました
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={() => navigate('/')}>自販機一覧に戻る</Button>
                </Box>
              </div>

            )}
            {/* INSERT */}
            {props.updFlg != 'true' && (
              <div>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  繰り返し登録できます
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>もう一度</Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={() => navigate('/')}>自販機一覧に戻る</Button>
                </Box>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              {
                0: <VendorRegistStep1 latlongSetter={toggleSelectedLatLong}/>,
                1: <VendorRegistStep2 infoSetter={toggleSelectedDrinks} updFlg={props.updFlg}/>
              }[activeStep]
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                戻る
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

				{/* Step2のボタン制御をVendorRegistStep2コンポーネントにて行っていますm(__)m */}
              <Button onClick={handleNext} id="nextStep">
                {activeStep === steps.length - 1 ? '登録' : '次へ'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    )
}

export default VendorRegistSteppers