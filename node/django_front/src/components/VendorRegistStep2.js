import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const VendorRegistStep2 = (props) => {
	
	const [drinks, setDrinks] = useState([])
    const [loading, setLoading] = useState(true)
	const [selectedDrinks, SetSelectedDrinks] = useState([])
	const navigate = useNavigate()

    // django_react/settings.pyにてCORS対策済み
    // ページ内に別URLの画面が生成されていることはいけない→CORS
    const baseUrl = 'http://localhost:8000/api/drinks'
	const baseUrlVendor = 'http://localhost:8000/api/vendors/'

	// プルダウンに表示されるDrinkは１回のレンダーで終了したい
    useEffect(() => {
        const fetchData = async() => {
            axios.get(baseUrl)
            .then(res => {
				if (props.updFlg == "true") {
					let updId = (window.location.pathname.split('/'))[3]
					axios.get(baseUrlVendor + updId)
					.then(res => {
						SetSelectedDrinks(res.data.Drinkings)
					})
				}
                setDrinks(res.data.results);
                setLoading(false)
            }, (err) => {
                navigate('/error')
                console.error(err)
            })
        }
        fetchData()
		// MEMO:直接Elementを触るのは良くない気がする…
		// 本当ならstateで管理したいがめんどくさい
		document.getElementById("nextStep").setAttribute("disabled", true)
    },[])

	// プルダウンで選択されたDrinkは最終で取得しているものが
	// コンポーネント終了時に更新されているものである必要がある（正直よくわからんw）
	// https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
	useEffect(() => {
		return (props.infoSetter(selectedDrinks))
	},[selectedDrinks])
	
	return (
		// Autocompleteの元ネタは
		// https://mui.com/components/autocomplete/#checkboxes
		// Boxの元ネタは
		//https://mui.com/components/box/
	<Grid container>
		<Grid item>
			<Box pt={2}>
				<Autocomplete
					multiple
					id="checkboxes-tags-demo"
					options={drinks}
					disableCloseOnSelect
					getOptionLabel={(option) => option.name}
					// valueは常にTextFieldに表示され続ける値
					// onChangeメソッドで表示される値を変える
					// だから初期値にaxiosで取得した更新前のDrinkをセットすればOK
					value={selectedDrinks}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					// 選択したITEMをstateに保持する
					onChange={(event, value) => {
						// 「次へ」ボタンの状態管理
						if (value.length > 0) document.getElementById("nextStep").removeAttribute("disabled")
						else document.getElementById("nextStep").setAttribute("disabled", true)
						SetSelectedDrinks(value)
					}}
					renderOption={(props, option, { selected }) => (
						<li {...props}>
						<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
						/>
						{option.name}
					</li>
					)}
					style={{ width: 400 }}
					renderInput={(params) => (
						<TextField {...params} 
						label="１つ以上選択してください" 
						placeholder="Favorites" 
						error={selectedDrinks.length === 0}
						/>
						)}
						/>
			</Box>
		</Grid>
		<Grid>
			<Typography variant='caption'>飲み物を１つ以上変更しないと登録ボタンが押下できません</Typography>
		</Grid>
	</Grid>
    )   
}

export default VendorRegistStep2