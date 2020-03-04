<template>
	<div class="main-wrapper">
		<!---Navigation-->
		<Navbar class="nav_logo_img" :topbarColor="topbarColor" :logo="require('@/assets/images/logo/heart-logo-mini.png')" :title="logotitle" />
		<!---Sidebar-->
		<SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks"/>
		<!---Page Container-->
		<div class="main-container-fluid">
		
		<router-view></router-view>
		
		
		</div>	
	</div>
</template>

<script>
 
import Navbar from '@/layout/full/header/Navbar.vue';
import SideBar from '@/layout/full/sidebar/SideBar.vue';
import sidebarLinks from '@/layout/full/sidebar/sidebarlinks.js';
import color from './../../../config/color.js'

export default {
name: "MainContainer",
components: {
Navbar,
SideBar

},
data:() => ({
	// NAV 바 속성변경
	topbarColor: color.theme,
	logotitle: "사랑하는 사람들의 모임",
	sidebarLinks: sidebarLinks,
}),
methods: {
	
},



}  	
</script>