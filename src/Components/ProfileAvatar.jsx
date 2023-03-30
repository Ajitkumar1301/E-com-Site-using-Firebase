import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {RiUserHeartFill} from 'react-icons/ri'
import {IoMdCart} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import { Carts } from '../Context/Context';
import { useState,useContext } from 'react';
export default function AccountMenu() {


    const { user,logout } = UserAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const Globalstate=useContext(Carts)
  const vendor=Globalstate.singleVendor;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
  
    
      localStorage.setItem('user',false)
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

 const handleChange=()=>{
    navigate('/profile')
 } 

 const handleChanged=()=>{
    navigate('/orders')
 } 

  console.log(user);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32,backgroundColor:'cadetblue' }}>{user?.email?.slice(0, 1).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleChange}>
        <ListItemIcon> <RiUserHeartFill /></ListItemIcon>  Profile
        </MenuItem>
        { user.uid !== vendor?.details?.id &&
        <MenuItem onClick={handleChanged}>
        <ListItemIcon>  <IoMdCart /></ListItemIcon>  My Orders
        </MenuItem>}
        <Divider />
       
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
           <FiLogOut/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
