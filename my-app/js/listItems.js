import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ImageIcon from '@material-ui/icons/Image';
import {Link} from 'react-router-dom';

export default class MainListItems extends React.Component {

	render(){
		return (
			<div>
				<ListItem button component={Link} to='/'>
					<ListItemIcon >
					<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button component={Link} to='/charts'>
					<ListItemIcon>
					<ImageIcon />
					</ListItemIcon>
					<ListItemText primary="Echarts" />
				</ListItem>
				<ListItem button component={Link} to='/user'>
					<ListItemIcon>
					<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
			</div>
		);
	}
}
