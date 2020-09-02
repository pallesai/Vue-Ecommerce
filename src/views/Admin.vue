<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
                <i class="fas fa-bars"></i>
            </a>
        <nav id="sidebar" class="sidebar-wrapper">
            
            <div class="sidebar-content mCustomScrollbar _mCS_1 mCS-autoHide desktop">
                
                <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0"><div id="mCSB_1_container" class="mCSB_container" style="position:relative; top:0; left:0;" dir="ltr">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <router-link :to="{ name : 'Home'}">Vue shop</router-link>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img v-if="getUser.photoURL" :src="getUser.photoURL" style="border-radius: 50%" alt="" width="100px">
                        <img v-else class="img-responsive img-rounded mCS_img_loaded" src="/img/user.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            <strong>{{ profile.name }}</strong>
                        </span>
                        <span class="user-name" v-if="getUser.displayName">
                            @{{ getUser.displayName }}
                        </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>

                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>

                        <li>
                            <router-link :to="{ name: 'Profile'}">
                                <i class="fa fa-user"></i>
                                <span class="menu-text">Profile</span>
                            </router-link>
                        </li>

                        <li class="sidebar-dropdown">
                            <router-link :to="{name: 'MyOrders'}">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">My orders</span>
                                <span class="badge badge-pill badge-warning">New</span>
                            </router-link>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Dashboard 1
                                            <span class="badge badge-pill badge-success">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 3</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="header-menu">
                            <span>Extra</span>
                        </li>

                        <li v-if="profile.isStaff">
                            <router-link :to="{ name : 'Products'}">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Products</span>
                                <span class="badge badge-pill badge-primary">Beta</span>
                            </router-link>
                        </li>
                        <li v-if="profile.isStaff">
                            <router-link :to="{ name: 'Orders'}">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Orders</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: block;"><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; display: block; height: 549px; max-height: 622px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 30px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div></div>
            <!-- sidebar-footer  -->
            
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
  </div>
</template>

<script>
    import firebase, {db} from '../firebase';
    import $ from 'jquery';

export default {
    name: 'Admin',
    data () {
        return {

        }
    },
    components: {
    },
    firestore () {
        const user = firebase.auth().currentUser;

        return {
            profile: db.collection('profiles').doc(user.uid)
        }
    },
    methods: {
        closeMenu () {
            $(".page-wrapper").toggleClass("toggled");
        },

        logout () {
            firebase.auth().signOut()
                .then(() => {
                    this.$router.push({ name: 'Home' });
                })
                .catch(error => console.log(error));
        }
    },
    computed: {
        getUser () {
            return firebase.auth().currentUser;
        }
    }
}
</script>
