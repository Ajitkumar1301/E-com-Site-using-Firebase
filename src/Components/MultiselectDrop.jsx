import {useContext,React} from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Carts } from '../Context/Context';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { green } from '@mui/material/colors';


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





const MultiselectDrop=()=> {

  const Globalstate=useContext(Carts)
  const prod= Globalstate.prod;
  const prodName= Globalstate.prodName;
  const setProdName= Globalstate.setProdName;
 
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProdName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
console.log('data',prodName);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Brand Name</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={prodName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Brand Name" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
        
          {prod.map((item,i) => {
            return(
            <MenuItem
              key={i}
              value={item.products.brand}
            >
                 <Checkbox checked={prodName.indexOf(item.products.brand) > -1} sx={{color:'green','&.Mui-checked': {
            color: green[600],
          },}} />
              <ListItemText primary={item.products.brand} />
            </MenuItem>
            )}
          )}

        </Select>
      </FormControl>
      
    </div>
  );
}

export default MultiselectDrop;