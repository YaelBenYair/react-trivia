import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { default_limit, SETTING_ACTION, useSettingDispatch, useSettings } from "../SetingsContext";
import axios from 'axios';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { PARAMS, setParams, URL_CATEGORIES } from "../Urls";

// function valuetext(value) {
//   return `${value}`;
// }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function SettingForm() {
    const settingState = useSettings()
    const dispatch = useSettingDispatch()

    const [catrgoryName, setCatrgoryName] = React.useState([]);
    const [difficulty, setDifficulty] = React.useState('');
    const [valueNum, setValueNum] = React.useState(settingState.limit);

    // const valueNum = 5

    


    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setCatrgoryName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value);
      };
    
    const valuetext = (event) => {
        
        console.log(event)
        setValueNum(event.target.value)
        // valueNum = value
        // return `${value}`;
    }


    React.useEffect(() => {
        async function settingCategories(){
            console.log("category request")
            dispatch({type: SETTING_ACTION.SETTING_FETCH_START})
            const respons = await axios.get(URL_CATEGORIES)
            console.log("category resulr", respons.data)
            if (respons.status === 200) {
                dispatch({
                    type: SETTING_ACTION.SETTING_FETCH_SUCCESS,
                    categories: respons.data
                })
            }else{
                dispatch({
                    type: SETTING_ACTION.SETTING_FETCH_ERROR,
                    msg: respons.statusText
                })
            }
        }
        settingCategories()
    },
    []
    )

    const hendleSubmit = (event) => {
        event.preventDefault()
        console.log(catrgoryName, difficulty, valueNum)
        dispatch({
            type: SETTING_ACTION.SETTING_SUBMIT,
            selectCategories: catrgoryName,
            difficult: difficulty,
            limit: valueNum

        })
    }

    const hendleReset = (event) => {
        dispatch({
            type: SETTING_ACTION.SETTING_RESET,
            categories:settingState.categories
        })
        setCatrgoryName([])
        setDifficulty('')
        setValueNum(default_limit)
        setParams(default_limit)
    }


    return(
        <>
            <div>
                <form onSubmit={hendleSubmit}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={catrgoryName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {settingState.categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    <Checkbox checked={catrgoryName.indexOf(category) > -1} />
                                    <ListItemText primary={category} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={difficulty}
                            label="Difficulty"
                            onChange={handleChangeDifficulty}
                        >
                            <MenuItem value={'easy'}>easy</MenuItem>
                            <MenuItem value={'medium'}>medium</MenuItem>
                            <MenuItem value={'hard'}>hard</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ width: 600, marginLeft:1 }}>
                        <Slider
                            aria-label="Temperature"
                            
                            value={valueNum}
                            onChange={valuetext}
                            
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={20}
                        />
                    </Box>
                    <Button type='submit'>SAVE</Button>
                    <Button type='reset' onClick={hendleReset}>RESET TO DEFAULT</Button>
                </form>
            </div>

        </>
    )
    
}